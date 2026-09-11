"""Transparent risk scoring for thermal anomalies."""

from __future__ import annotations

from typing import Any, Dict


def _normalize(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float(default)


def score_risk(features: Dict[str, Any], config: Dict[str, float] | None = None) -> Dict[str, Any]:
    """Compute a transparent 0-100 risk score.

    The formula is intentionally simple and configurable to allow domain tuning
    without changing the surrounding integration contract.
    """
    config = config or {
        "thermal_intensity_weight": 0.30,
        "industrial_proximity_weight": 0.25,
        "rapid_increase_weight": 0.20,
        "population_weight": 0.15,
        "hazardous_facility_weight": 0.10,
    }

    thermal_intensity = _normalize(features.get("thermal_intensity"), 0.0)
    industrial_distance = _normalize(features.get("distance_to_industrial_facility_km"), 9999.0)
    recent_trend = _normalize(features.get("recent_thermal_trend"), 0.0)
    nearby_population = _normalize(features.get("nearby_population"), 0.0)
    hazardous_facility = 1.0 if _normalize(features.get("facility_type_refinery"), 0.0) > 0 or _normalize(features.get("facility_type_industrial"), 0.0) > 0 else 0.0
    abnormality = _normalize(features.get("abnormality_score"), 0.0)

    thermal_component = min(100.0, thermal_intensity / 6.0)
    industrial_component = max(0.0, min(100.0, (10.0 - industrial_distance) * 10.0))
    rapid_increase_component = min(100.0, recent_trend * 100.0)
    population_component = min(100.0, nearby_population / 50.0)
    hazardous_component = 100.0 if hazardous_facility > 0 else 0.0

    weighted_score = (
        thermal_component * config["thermal_intensity_weight"]
        + industrial_component * config["industrial_proximity_weight"]
        + rapid_increase_component * config["rapid_increase_weight"]
        + population_component * config["population_weight"]
        + hazardous_component * config["hazardous_facility_weight"]
        + abnormality * 0.25
    )

    risk_score = max(0.0, min(100.0, weighted_score))

    if risk_score <= 30:
        risk_level = "Low"
    elif risk_score <= 60:
        risk_level = "Medium"
    elif risk_score <= 80:
        risk_level = "High"
    else:
        risk_level = "Critical"

    coverage = {
        "thermal_intensity": round(float(thermal_component), 2),
        "industrial_proximity": round(float(industrial_component), 2),
        "rapid_increase": round(float(rapid_increase_component), 2),
        "nearby_population": round(float(population_component), 2),
        "hazardous_facility": round(float(hazardous_component), 2),
    }

    return {
        "risk_score": round(risk_score, 2),
        "risk_level": risk_level,
        "risk_factors": [
            f"Thermal intensity contribution: {coverage['thermal_intensity']}",
            f"Industrial proximity: {coverage['industrial_proximity']}",
            f"Rapid increase: {coverage['rapid_increase']}",
            f"Nearby population exposure: {coverage['nearby_population']}",
            f"Hazardous facility factor: {coverage['hazardous_facility']}",
        ],
    }
