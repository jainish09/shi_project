# Thermal Sentinel AI - API Contract Specification

Version: `1.0.0`  
Base URL: `/api/v1`

---

## 1. System Status Endpoint

### `GET /api/v1/system/status`
Returns real-time status of satellite telemetry ingestion, AI classification pipeline, and active alert systems.

**Response `200 OK`**:
```json
{
  "system_status": "operational",
  "satellite_feeds": {
    "MODIS": "active",
    "VIIRS": "active",
    "SENTINEL3": "active"
  },
  "last_telemetry_sync": "2026-09-11T12:00:00Z",
  "active_nodes": 12,
  "ai_model_version": "v2.4-thermal-sentinel",
  "active_alerts_count": 5
}
```

---

## 2. KPI Metrics Endpoint

### `GET /api/v1/kpi/summary`
Returns top-level metric counters for the command center dashboard.

**Response `200 OK`**:
```json
{
  "total_thermal_anomalies": 1428,
  "active_incidents": 34,
  "critical_risk_incidents": 8,
  "industrial_incidents": 18,
  "wildfire_incidents": 11,
  "persistent_heat_sources": 15
}
```

---

## 3. Incident Management Endpoints

### `GET /api/v1/incidents`
Query parameters:
- `search`: string (filters location, title, ID)
- `severity`: `critical` | `high` | `medium` | `low`
- `status`: `active` | `investigating` | `contained` | `resolved`
- `event_type`: `wildfire` | `industrial` | `agricultural` | `urban_heat` | `flare_stack` | `unknown`
- `sort_by`: `risk_score` | `detected_at` | `severity` | `confidence`
- `order`: `asc` | `desc`

**Response `200 OK`**:
```json
[
  {
    "id": "INC-2026-089",
    "title": "High Thermal Radiance in North Ridge Sector",
    "location": {
      "name": "North Ridge Forestry Reserve, Zone B",
      "lat": 34.0522,
      "lng": -118.2437,
      "region": "Northern Sector"
    },
    "event_type": "wildfire",
    "confidence": 94.5,
    "risk_score": 92.0,
    "severity": "critical",
    "status": "active",
    "temperature_kelvin": 685.2,
    "frp_mw": 145.8,
    "detected_at": "2026-09-11T11:45:00Z",
    "satellite_source": "VIIRS",
    "historical_anomaly_count": 0,
    "is_persistent": false,
    "description": "Rapidly expanding thermal footprint detected in dense vegetation canopy.",
    "recommended_actions": [
      "Dispatch aerial thermal surveillance drone",
      "Issue immediate warning to local forestry stations",
      "Deploy ground containment team"
    ]
  }
]
```

### `GET /api/v1/incidents/{incident_id}`
Returns full details for a single incident.

---

## 4. Alerts Endpoints

### `GET /api/v1/alerts`
Query parameters:
- `category`: `critical_incident` | `high_risk` | `citizen_report` | `abnormal_event`
- `status`: `unacknowledged` | `acknowledged` | `investigating` | `resolved`

**Response `200 OK`**:
```json
[
  {
    "id": "ALT-9041",
    "incident_id": "INC-2026-089",
    "alert_type": "critical_incident",
    "title": "Severe Heat Spike - Uncontrolled Flare Potential",
    "location": "Industrial Corridor Sector 4",
    "severity": "critical",
    "timestamp": "2026-09-11T11:50:00Z",
    "reason": "Thermal emission exceeded normal operating baseline by 340%",
    "status": "unacknowledged"
  }
]
```

### `POST /api/v1/alerts/{alert_id}/acknowledge`
Acknowledge an active alert.

---

## 5. Analytics Endpoints

### `GET /api/v1/analytics/overview`
Returns spatial and temporal aggregation for analytics visualization charts.

**Response `200 OK`**:
```json
{
  "anomalies_over_time": [
    { "timestamp": "00:00", "anomalies": 12, "critical": 2 },
    { "timestamp": "04:00", "anomalies": 18, "critical": 3 }
  ],
  "event_category_distribution": [
    { "category": "Industrial Heat", "count": 45, "percentage": 38.0 },
    { "category": "Wildfire / Vegetation", "count": 32, "percentage": 27.0 },
    { "category": "Flare Stacks", "count": 22, "percentage": 18.5 },
    { "category": "Urban Heat Island", "count": 14, "percentage": 11.5 },
    { "category": "Agricultural Burning", "count": 6, "percentage": 5.0 }
  ],
  "risk_level_distribution": [
    { "level": "Critical", "count": 8, "color": "#ef4444" },
    { "level": "High", "count": 14, "color": "#f97316" },
    { "level": "Medium", "count": 22, "color": "#eab308" },
    { "level": "Low", "count": 35, "color": "#10b981" }
  ],
  "persistent_vs_sudden": [
    { "type": "Persistent Heat Sources", "count": 15, "description": "Known industrial & refinery sites" },
    { "type": "Sudden Anomaly Spikes", "count": 28, "description": "Unpredicted thermal outbursts" }
  ],
  "industrial_vs_natural": [
    { "month": "Jan", "industrial": 120, "natural": 45 },
    { "month": "Feb", "industrial": 115, "natural": 38 }
  ]
}
```
