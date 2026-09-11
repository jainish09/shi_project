import math

from backend.app.ai_engine.classifier import predict_event
from backend.app.ai_engine.explainability import generate_explanation
from backend.app.ai_engine.feature_engineering import build_feature_vector
from backend.app.ai_engine.impact_zone import generate_impact_zone
from backend.app.ai_engine.risk_engine import score_risk
from backend.app.ai_engine.trend_analysis import analyze_thermal_trend


def test_build_feature_vector_contains_expected_fields():
    hotspot = {
        "thermal_intensity": 420.0,
        "fire_radiative_power": 240.0,
        "satellite_confidence": 0.82,
        "latitude": 13.756,
        "longitude": 100.501,
        "land_cover": "industrial",
    }
    gis_context = {
        "distance_to_industrial_facility_km": 1.2,
        "distance_to_forest_km": 6.5,
        "distance_to_agricultural_land_km": 8.0,
        "historical_thermal_frequency": 3.0,
        "persistence_count": 2,
        "recent_thermal_trend": 0.45,
        "hotspot_growth": 1.8,
        "facility_type": "refinery",
        "nearby_population": 1500,
        "wind_direction_deg": 120,
        "wind_speed_kmh": 18,
    }

    features = build_feature_vector(hotspot, gis_context)

    assert features["thermal_intensity"] == 420.0
    assert "anomaly_score" in features
    assert "distance_to_industrial_facility_km" in features
    assert "facility_type_refinery" in features
    assert features["land_cover_industrial"] == 1.0


def test_analyze_thermal_trend_marks_sudden_event():
    analysis = analyze_thermal_trend([115, 120, 110, 125], 450.0)

    assert analysis["pattern"] in {"Sudden", "Persistent"}
    assert analysis["historical_average"] > 0
    assert analysis["current_intensity"] == 450.0
    assert analysis["deviation_percent"] > 0
    assert analysis["abnormality_score"] >= 0


def test_predict_event_returns_classification():
    features = {
        "thermal_intensity": 510.0,
        "fire_radiative_power": 300.0,
        "satellite_confidence": 0.9,
        "distance_to_industrial_facility_km": 0.4,
        "distance_to_forest_km": 16.0,
        "distance_to_agricultural_land_km": 10.0,
        "historical_thermal_frequency": 4.0,
        "persistence_count": 1,
        "recent_thermal_trend": 0.7,
        "hotspot_growth": 2.4,
        "nearby_population": 1800,
        "facility_type_refinery": 1.0,
        "land_cover_industrial": 1.0,
        "industry_proximity_score": 8.0,
        "historic_abnormality": 0.7,
        "abnormality_score": 85.0,
    }

    result = predict_event(features)

    assert result["classification"] in {
        "Industrial Fire",
        "Wildfire",
        "Agricultural Burning",
        "Gas Flare",
        "Mining Activity",
        "Building / Local Fire",
        "Other / Unknown",
    }
    assert result["confidence"] >= 0.0
    assert result["probabilities"]


def test_risk_score_has_level_and_reasoning():
    features = {
        "thermal_intensity": 430.0,
        "distance_to_industrial_facility_km": 0.8,
        "recent_thermal_trend": 0.8,
        "nearby_population": 3500,
        "facility_type_refinery": 1.0,
        "abnormality_score": 88.0,
    }

    risk = score_risk(features)

    assert 0 <= risk["risk_score"] <= 100
    assert risk["risk_level"] in {"Low", "Medium", "High", "Critical"}
    assert risk["risk_factors"]


def test_generate_impact_zone_returns_geojson_polygon():
    zone = generate_impact_zone(13.756, 100.501, 135, 20, "High")

    assert zone["type"] == "Feature"
    assert zone["properties"]["label"] == "Illustrative Potential Impact Zone"
    assert zone["geometry"]["type"] == "Polygon"
    assert len(zone["geometry"]["coordinates"]) > 0


def test_generate_explanation_includes_evidence_and_action():
    explanation = generate_explanation(
        classification="Industrial Fire",
        confidence=0.92,
        probabilities={"Industrial Fire": 0.92, "Wildfire": 0.04, "Gas Flare": 0.03, "Other": 0.01},
        features={
            "land_cover_industrial": 1.0,
            "distance_to_industrial_facility_km": 0.6,
            "abnormality_score": 88.0,
            "recent_thermal_trend": 0.8,
        },
    )

    assert explanation["classification"] == "Industrial Fire"
    assert explanation["confidence"] >= 0.9
    assert explanation["evidence"]
    assert explanation["recommended_action"]
