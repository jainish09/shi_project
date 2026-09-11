from fastapi import FastAPI, Depends, HTTPException, Query
from typing import List

from app.config import settings
from app.database.session import engine, Base
from app.schemas.schemas import (
    HotspotResponse, IncidentResponse, IncidentStatusUpdate,
    FacilityResponse, ThermalTrendPoint, CitizenReportCreate,
    CitizenReportResponse, AlertResponse, AnalyticsSummary
)
from app.services.firms_service import DataIngestionService

# Initialize FastAPI App
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url="/api/openapi.json"
)

# Startup hook to create database tables
@app.on_event("startup")
def startup_db_client():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Thermal Sentinel AI API is running. Visit /docs for documentation."}

# -------------------------------------------------------------------
# Hotspots APIs
# -------------------------------------------------------------------
@app.get("/api/hotspots", response_model=List[HotspotResponse], tags=["Hotspots"])
def get_hotspots():
    raw_data, source_type = DataIngestionService.fetch_thermal_data()
    for item in raw_data:
        item["data_source"] = source_type
    return raw_data

@app.get("/api/hotspots/{id}", response_model=HotspotResponse, tags=["Hotspots"])
def get_hotspot_by_id(id: str):
    raw_data, source_type = DataIngestionService.fetch_thermal_data()
    match = next((item for item in raw_data if item["id"] == id), None)
    if not match:
        raise HTTPException(status_code=404, detail="Hotspot anomaly not found")
    match["data_source"] = source_type
    return match

@app.get("/api/hotspots/{id}/trend", response_model=List[ThermalTrendPoint], tags=["Hotspots"])
def get_hotspot_trend(id: str):
    return [
        {"timestamp": "2026-09-11T08:00:00Z", "frp": 80.5, "thermal_intensity": 390.0},
        {"timestamp": "2026-09-11T09:00:00Z", "frp": 110.2, "thermal_intensity": 420.1},
        {"timestamp": "2026-09-11T10:30:00Z", "frp": 125.4, "thermal_intensity": 450.2},
    ]

# -------------------------------------------------------------------
# Incidents APIs
# -------------------------------------------------------------------
@app.get("/api/incidents", response_model=List[IncidentResponse], tags=["Incidents"])
def get_incidents():
    hotspots, source = DataIngestionService.fetch_thermal_data()
    return [
        {
            "id": "INC001",
            "hotspot_id": "HS001",
            "title": "Refinery Thermal Spike",
            "status": "Investigating",
            "assigned_unit": "Unit-4 Safety Team",
            "created_at": "2026-09-11T10:35:00Z",
            "hotspot": {**hotspots[0], "data_source": source}
        }
    ]

@app.get("/api/incidents/{id}", response_model=IncidentResponse, tags=["Incidents"])
def get_incident_by_id(id: str):
    incidents = get_incidents()
    if incidents and incidents[0]["id"] == id:
        return incidents[0]
    raise HTTPException(status_code=404, detail="Incident not found")

@app.patch("/api/incidents/{id}/status", response_model=dict, tags=["Incidents"])
def update_incident_status(id: str, payload: IncidentStatusUpdate):
    return {"id": id, "status": payload.status, "message": "Incident status successfully updated"}

# -------------------------------------------------------------------
# Facilities & GIS Context APIs
# -------------------------------------------------------------------
@app.get("/api/facilities", response_model=List[FacilityResponse], tags=["Facilities"])
def get_facilities():
    return [
        {
            "id": "FAC001",
            "name": "ABC Refinery",
            "facility_type": "Refinery",
            "latitude": 12.9720,
            "longitude": 77.5950,
            "risk_level": "High"
        }
    ]

@app.get("/api/land-cover", response_model=dict, tags=["Facilities"])
def get_land_cover(lat: float = Query(...), lon: float = Query(...)):
    return {
        "latitude": lat,
        "longitude": lon,
        "land_cover_class": "Industrial Zone",
        "ndvi_index": 0.12
    }

# -------------------------------------------------------------------
# Alerts & Analytics APIs
# -------------------------------------------------------------------
@app.get("/api/alerts", response_model=List[AlertResponse], tags=["Alerts & Analytics"])
def get_alerts():
    return [
        {
            "id": "ALT001",
            "hotspot_id": "HS001",
            "alert_level": "Critical",
            "message": "High FRP flare detected near industrial infrastructure boundary.",
            "created_at": "2026-09-11T10:31:00Z"
        }
    ]

@app.get("/api/analytics", response_model=AnalyticsSummary, tags=["Alerts & Analytics"])
def get_analytics():
    _, data_source = DataIngestionService.fetch_thermal_data()
    return {
        "total_active_hotspots": 14,
        "critical_incidents": 3,
        "industrial_vs_wildfire_ratio": {"Industrial": 4, "Wildfire": 8, "Other": 2},
        "average_risk_score": 68.4,
        "data_source_mode": data_source
    }

# -------------------------------------------------------------------
# Citizen Reports APIs
# -------------------------------------------------------------------
@app.post("/api/reports", response_model=CitizenReportResponse, status_code=201, tags=["Citizen Reports"])
def submit_citizen_report(report: CitizenReportCreate):
    return {
        "id": "REP98231",
        "status": "Received",
        "reported_at": "2026-09-11T12:00:00Z"
    }