# AI Engine API Contract

This document defines the integration contract for the Thermal Sentinel AI engine. It is intended for Backend Member 1 to consume the AI functions without duplicating API logic or creating new routes.

## Scope

- Reusable Python functions only
- No FastAPI routes
- No frontend changes
- No duplication of backend API logic
- All outputs are demo/prototype unless explicitly validated later

## Module entry points

### `backend.app.ai_engine.feature_engineering.build_feature_vector`

Input:
- `hotspot: dict`
- `gis_context: dict`

Returns:
- `dict[str, float]`

Example payload:

```python
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
```

Required features include:
- `thermal_intensity`
- `fire_radiative_power`
- `satellite_confidence`
- `distance_to_industrial_facility_km`
- `distance_to_forest_km`
- `distance_to_agricultural_land_km`
- `historical_thermal_frequency`
- `persistence_count`
- `recent_thermal_trend`
- `hotspot_growth`
- `facility_type_*`
- `land_cover_*`
- `nearby_population`
- `industry_proximity_score`
- `historic_abnormality`
- `anomaly_score`

### `backend.app.ai_engine.trend_analysis.analyze_thermal_trend`

Input:
- `historical_values: Iterable[float]`
- `current_intensity: float`

Returns:

```python
{
    "pattern": "Sudden",
    "historical_average": 120,
    "current_intensity": 450,
    "deviation_percent": 275,
    "persistence_count": 1,
    "trend_direction": "Rising",
    "abnormality_score": 91,
}
```

Interpretation:
- `pattern`: `Sudden` or `Persistent`
- `historical_average`: mean of prior thermal observations
- `current_intensity`: latest observed value
- `deviation_percent`: relative change from historical average
- `persistence_count`: count of repeated elevated observations
- `abnormality_score`: 0–100 anomaly severity indicator

### `backend.app.ai_engine.classifier.predict_event`

Input:
- `features: dict[str, Any]`

Returns:

```python
{
    "classification": "Industrial Fire",
    "confidence": 0.92,
    "probabilities": {
        "Industrial Fire": 0.92,
        "Wildfire": 0.04,
        "Gas Flare": 0.03,
        "Other / Unknown": 0.01,
    },
}
```

Possible labels:
- Industrial Fire
- Wildfire
- Agricultural Burning
- Gas Flare
- Mining Activity
- Building / Local Fire
- Other / Unknown

This output is a likely classification, not a validated physical cause.

### `backend.app.ai_engine.risk_engine.score_risk`

Input:
- `features: dict[str, Any]`
- `config: dict[str, float] | None = None`

Returns:

```python
{
    "risk_score": 84.2,
    "risk_level": "High",
    "risk_factors": [
        "Thermal intensity contribution: 89.2",
        "Industrial proximity: 80.0",
        "Rapid increase: 73.5",
        "Nearby population exposure: 42.0",
        "Hazardous facility factor: 100.0",
    ],
}
```

Risk thresholds:
- 0–30: Low
- 31–60: Medium
- 61–80: High
- 81–100: Critical

### `backend.app.ai_engine.explainability.generate_explanation`

Input:
- `classification: str`
- `confidence: float`
- `probabilities: dict[str, float]`
- `features: dict[str, Any]`

Returns:

```python
{
    "classification": "Industrial Fire",
    "confidence": 0.92,
    "probabilities": {
        "Industrial Fire": 0.92,
        "Wildfire": 0.04,
        "Gas Flare": 0.03,
        "Other / Unknown": 0.01,
    },
    "evidence": [
        "Industrial land-cover detected",
        "Nearby industrial facility identified",
        "Sudden thermal increase observed",
        "Current intensity above historical baseline",
    ],
    "recommended_action": "Immediate investigation recommended",
}
```

### `backend.app.ai_engine.impact_zone.generate_impact_zone`

Input:
- `latitude: float`
- `longitude: float`
- `wind_direction_deg: float`
- `wind_speed_kmh: float`
- `risk_level: str`

Returns:
- GeoJSON Feature with Polygon geometry

Example return shape:

```python
{
    "type": "Feature",
    "properties": {
        "label": "Illustrative Potential Impact Zone",
        "risk_level": "High",
        "wind_direction_deg": 135,
        "wind_speed_kmh": 20,
        "note": "Illustrative Potential Impact Zone — not a validated smoke-dispersion model.",
    },
    "geometry": {
        "type": "Polygon",
        "coordinates": [[...]],
    },
}
```

This output is clearly marked as illustrative and must not be presented as a scientifically validated plume or smoke-dispersion model.

## Backward-compatible model contract

The AI engine is designed to allow a trained model to replace the default prototype later without changing the calling interface. The default engine is intentionally transparent and explainable.

## Demo vs validated statement

The current implementation is a demo prototype. It is suitable for integration, testing, and user-facing presentation in a prototype environment. It should not be described as a validated real-world fire-cause classifier without separate domain validation.

## Implementation status

Completed modules:
- feature_engineering
- trend_analysis
- classifier
- risk_engine
- explainability
- impact_zone
- model_loader

Test coverage:
- feature generation
- trend detection
- classification contract
- risk scoring
- impact-zone generation
- explanation generation
