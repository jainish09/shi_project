"""Explainable outputs for AI classification and risk assessment."""

from __future__ import annotations

from typing import Any, Dict, List


def generate_explanation(
    classification: str,
    confidence: float,
    probabilities: Dict[str, float],
    features: Dict[str, Any],
) -> Dict[str, Any]:
    """Generate evidence-backed explanation for a thermal incident prediction."""
    evidence: List[str] = []

    if features.get("land_cover_industrial"):
        evidence.append("Industrial land-cover detected")
    elif features.get("land_cover_forest"):
        evidence.append("Forest land-cover detected")
    elif features.get("land_cover_agricultural"):
        evidence.append("Agricultural land-cover detected")

    if features.get("distance_to_industrial_facility_km", 9999.0) <= 5.0:
        evidence.append("Nearby industrial facility identified")
    if features.get("abnormality_score", 0.0) >= 60:
        evidence.append("Current intensity above historical baseline")
    if features.get("recent_thermal_trend", 0.0) >= 0.5:
        evidence.append("Sudden thermal increase observed")
    if features.get("persistence_count", 0.0) > 1:
        evidence.append("Persistent thermal pattern repeated over time")
    if not evidence:
        evidence.append("No dominant geospatial signal identified from available context")

    recommended_action = "Monitor and review with additional context"
    if classification in {"Industrial Fire", "Gas Flare"}:
        recommended_action = "Immediate investigation recommended"
    elif classification == "Wildfire":
        recommended_action = "Escalate to wildfire response review"
    elif classification == "Agricultural Burning":
        recommended_action = "Field check and local burn-status verification"
    elif classification in {"Building / Local Fire", "Mining Activity"}:
        recommended_action = "Local response and site verification recommended"

    return {
        "classification": classification,
        "confidence": round(float(confidence), 4),
        "probabilities": {k: round(float(v), 4) for k, v in probabilities.items()},
        "evidence": evidence,
        "recommended_action": recommended_action,
    }
