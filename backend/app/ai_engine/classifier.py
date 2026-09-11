"""Prototype thermal event classifier."""

from __future__ import annotations

from typing import Any, Dict

import numpy as np


def _safe_float(value: Any, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return float(default)


def predict_event(features: Dict[str, Any]) -> Dict[str, Any]:
    """Classify a hotspot event using a transparent rule-based prototype.

    This is intentionally not presented as a validated physical classifier. It is a
    modular placeholder that can later be replaced by a trained model while
    keeping the same interface for integration.
    """
    thermal_intensity = _safe_float(features.get("thermal_intensity"), 0.0)
    fire_radiative_power = _safe_float(features.get("fire_radiative_power"), 0.0)
    satellite_confidence = _safe_float(features.get("satellite_confidence"), 0.0)
    industrial_distance = _safe_float(features.get("distance_to_industrial_facility_km"), 9999.0)
    forest_distance = _safe_float(features.get("distance_to_forest_km"), 9999.0)
    ag_distance = _safe_float(features.get("distance_to_agricultural_land_km"), 9999.0)
    persistence = _safe_float(features.get("persistence_count"), 0.0)
    recent_trend = _safe_float(features.get("recent_thermal_trend"), 0.0)
    hotspot_growth = _safe_float(features.get("hotspot_growth"), 0.0)
    abnormality = _safe_float(features.get("abnormality_score"), 0.0)
    population = _safe_float(features.get("nearby_population"), 0.0)

    scores = {
        "Industrial Fire": 0.0,
        "Wildfire": 0.0,
        "Agricultural Burning": 0.0,
        "Gas Flare": 0.0,
        "Mining Activity": 0.0,
        "Building / Local Fire": 0.0,
        "Other / Unknown": 0.0,
    }

    land_cover = str(features.get("land_cover") or "unknown").lower()
    if "industrial" in land_cover:
        scores["Industrial Fire"] += 28
    if "forest" in land_cover:
        scores["Wildfire"] += 24
    if "agricultural" in land_cover:
        scores["Agricultural Burning"] += 28
    if "urban" in land_cover:
        scores["Building / Local Fire"] += 24

    if industrial_distance <= 5.0:
        scores["Industrial Fire"] += 22
        scores["Gas Flare"] += 10
    if forest_distance <= 3.0:
        scores["Wildfire"] += 20
    if ag_distance <= 3.0:
        scores["Agricultural Burning"] += 18

    scores["Industrial Fire"] += min(20, thermal_intensity / 20)
    scores["Wildfire"] += min(20, thermal_intensity / 25)
    scores["Agricultural Burning"] += min(18, hotspot_growth * 8)
    scores["Gas Flare"] += min(18, (fire_radiative_power / 25.0) + persistence * 2)
    scores["Mining Activity"] += min(18, (thermal_intensity / 30.0) + (1 if features.get("facility_type_mining") else 0) * 10)
    scores["Building / Local Fire"] += min(18, population / 150.0 + recent_trend * 10)
    scores["Other / Unknown"] += min(10, max(0.0, 10 - satellite_confidence * 8))

    scores["Industrial Fire"] += min(15, abnormality / 5)
    scores["Wildfire"] += min(15, max(0.0, recent_trend * 20))
    scores["Gas Flare"] += min(12, max(0.0, persistence * 4))

    if not any(v > 0 for v in scores.values()):
        scores["Other / Unknown"] = 100.0

    values = np.array(list(scores.values()), dtype=float)
    total = float(np.sum(values))
    if total <= 0:
        probabilities = {category: 0.0 for category in scores}
        probabilities["Other / Unknown"] = 1.0
    else:
        probabilities = {category: float(score / total) for category, score in scores.items()}

    best_label = max(probabilities, key=probabilities.get)
    confidence = probabilities[best_label]

    return {
        "classification": best_label,
        "confidence": round(float(confidence), 4),
        "probabilities": {k: round(float(v), 4) for k, v in probabilities.items()},
    }
