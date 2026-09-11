# Thermal Sentinel AI

Thermal Sentinel AI is the AI and analytics layer for the Thermal Sentinel project. It focuses on thermal anomaly detection, classification, risk assessment, and explainable evidence generation for geospatial hotspot events.

## Scope

This module is intentionally isolated from the API layer and frontend. It exposes reusable Python functions that can be called by backend integration code without creating any FastAPI routes or duplicating unrelated backend logic.

## AI pipeline

1. Feature engineering: convert raw hotspot and GIS context into model-ready inputs.
2. Trend analysis: distinguish persistent heating from sudden spikes.
3. Classification: label the event by likely category using a transparent prototype model.
4. Risk scoring: combine thermal severity, industrial exposure, trend acceleration, and population factors into a 0–100 score.
5. Explainability: produce evidence and recommended actions for each prediction.
6. Impact zone: create an illustrative directional GeoJSON polygon for planning and visualization.

## Module layout

- backend/app/ai_engine/feature_engineering.py — feature vector creation
- backend/app/ai_engine/trend_analysis.py — historical baseline and abnormality analysis
- backend/app/ai_engine/classifier.py — prototype classification engine
- backend/app/ai_engine/risk_engine.py — transparent risk scoring
- backend/app/ai_engine/explainability.py — evidence-based explanation output
- backend/app/ai_engine/impact_zone.py — illustrative impact-zone GeoJSON generator
- backend/app/ai_engine/model_loader.py — model selection contract for future trained models

## Example usage

```python
from backend.app.ai_engine.feature_engineering import build_feature_vector
from backend.app.ai_engine.trend_analysis import analyze_thermal_trend
from backend.app.ai_engine.classifier import predict_event
from backend.app.ai_engine.risk_engine import score_risk
from backend.app.ai_engine.explainability import generate_explanation

hotspot = {
    "thermal_intensity": 420,
    "fire_radiative_power": 260,
    "satellite_confidence": 0.88,
    "latitude": 13.756,
    "longitude": 100.501,
    "land_cover": "industrial",
}

gis_context = {
    "distance_to_industrial_facility_km": 1.2,
    "distance_to_forest_km": 8.0,
    "distance_to_agricultural_land_km": 12.0,
    "historical_thermal_frequency": 4,
    "persistence_count": 1,
    "recent_thermal_trend": 0.72,
    "hotspot_growth": 2.3,
    "facility_type": "refinery",
    "nearby_population": 1600,
}

features = build_feature_vector(hotspot, gis_context)
trend = analyze_thermal_trend([100, 105, 110, 120], hotspot["thermal_intensity"])
result = predict_event(features)
risk = score_risk(features)
explanation = generate_explanation(
    result["classification"],
    result["confidence"],
    result["probabilities"],
    features,
)
```

## Demo model note

The default classifier is a transparent prototype designed to work without training data. It is intentionally labeled as a demo or prototype and should not be claimed as validated scientific accuracy. In future iterations, the same function signatures can be swapped to a real trained model while preserving the same integration contract.

## Classification labels

- Industrial Fire
- Wildfire
- Agricultural Burning
- Gas Flare
- Mining Activity
- Building / Local Fire
- Other / Unknown

## Risk levels

- Low: 0–30
- Medium: 31–60
- High: 61–80
- Critical: 81–100

## Impact-zone note

The impact-zone output is an illustrative directional GeoJSON polygon created for planning and user interface testing. It does not represent a scientifically validated smoke dispersion or plume model.
