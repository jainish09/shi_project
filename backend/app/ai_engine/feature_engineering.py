"""Feature engineering for thermal hotspot events."""

from __future__ import annotations

from typing import Any, Dict


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float(default)


def build_feature_vector(hotspot: Dict[str, Any], gis_context: Dict[str, Any]) -> Dict[str, float]:
    """Convert raw hotspot metadata and GIS context into model-ready features.

    The feature set is designed for a transparent prototype model and can be
    replaced later by a trained estimator without changing the calling interface.
    """
    hotspot = hotspot or {}
    gis_context = gis_context or {}

    thermal_intensity = _safe_float(hotspot.get("thermal_intensity"), 0.0)
    fire_radiative_power = _safe_float(hotspot.get("fire_radiative_power"), 0.0)
    satellite_confidence = _safe_float(hotspot.get("satellite_confidence"), 0.0)
    latitude = _safe_float(hotspot.get("latitude"), 0.0)
    longitude = _safe_float(hotspot.get("longitude"), 0.0)
    land_cover = str(hotspot.get("land_cover") or "unknown").lower()

    distance_to_industrial = _safe_float(
        gis_context.get("distance_to_industrial_facility_km"),
        9999.0,
    )
    distance_to_forest = _safe_float(gis_context.get("distance_to_forest_km"), 9999.0)
    distance_to_ag = _safe_float(
        gis_context.get("distance_to_agricultural_land_km"),
        9999.0,
    )
    historical_frequency = _safe_float(gis_context.get("historical_thermal_frequency"), 0.0)
    persistence_count = _safe_float(gis_context.get("persistence_count"), 0.0)
    recent_trend = _safe_float(gis_context.get("recent_thermal_trend"), 0.0)
    hotspot_growth = _safe_float(gis_context.get("hotspot_growth"), 0.0)
    facility_type = str(gis_context.get("facility_type") or "unknown").lower()
    nearby_population = _safe_float(gis_context.get("nearby_population"), 0.0)
    wind_direction = _safe_float(gis_context.get("wind_direction_deg"), 0.0)
    wind_speed = _safe_float(gis_context.get("wind_speed_kmh"), 0.0)

    baseline_reference = max(1.0, historical_frequency * 40.0)
    anomaly_score = min(100.0, max(0.0, (thermal_intensity / baseline_reference) * 100.0))

    feature_vector: Dict[str, float] = {
        "thermal_intensity": thermal_intensity,
        "fire_radiative_power": fire_radiative_power,
        "satellite_confidence": min(1.0, max(0.0, satellite_confidence)),
        "latitude": latitude,
        "longitude": longitude,
        "land_cover": land_cover,
        "distance_to_industrial_facility_km": distance_to_industrial,
        "distance_to_forest_km": distance_to_forest,
        "distance_to_agricultural_land_km": distance_to_ag,
        "historical_thermal_frequency": historical_frequency,
        "persistence_count": persistence_count,
        "recent_thermal_trend": recent_trend,
        "hotspot_growth": hotspot_growth,
        "facility_type": facility_type,
        "nearby_population": nearby_population,
        "wind_direction_deg": wind_direction,
        "wind_speed_kmh": wind_speed,
        "industry_proximity_score": max(0.0, 10.0 - distance_to_industrial),
        "forest_proximity_score": max(0.0, 10.0 - distance_to_forest),
        "agricultural_proximity_score": max(0.0, 10.0 - distance_to_ag),
        "historic_abnormality": min(1.0, anomaly_score / 100.0),
        "anomaly_score": anomaly_score,
    }

    for land_label in ["industrial", "forest", "agricultural", "urban", "mining", "water", "unknown"]:
        feature_vector[f"land_cover_{land_label}"] = 1.0 if land_label == land_cover else 0.0

    if facility_type:
        feature_vector[f"facility_type_{facility_type}"] = 1.0

    return feature_vector
