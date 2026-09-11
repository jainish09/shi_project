from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class HotspotBase(BaseModel):
    latitude: float
    longitude: float
    classification: str
    confidence: int
    risk_score: int
    severity: str
    status: str
    thermal_intensity: float
    frp: float
    land_cover: str
    nearby_facility: Optional[str] = None
    distance_to_facility: Optional[float] = None
    persistence: str
    detected_at: datetime

class HotspotResponse(HotspotBase):
    id: str
    data_source: str = Field(description="'Demo Data' or 'Live Satellite Data'")

    class Config:
        from_attributes = True

class IncidentStatusUpdate(BaseModel):
    status: str

class IncidentResponse(BaseModel):
    id: str
    hotspot_id: str
    title: str
    status: str
    assigned_unit: Optional[str] = None
    created_at: datetime
    hotspot: HotspotResponse

    class Config:
        from_attributes = True

class FacilityResponse(BaseModel):
    id: str
    name: str
    facility_type: str
    latitude: float
    longitude: float
    risk_level: str

    class Config:
        from_attributes = True

class ThermalTrendPoint(BaseModel):
    timestamp: datetime
    frp: float
    thermal_intensity: float

class CitizenReportCreate(BaseModel):
    latitude: float
    longitude: float
    report_type: str
    description: str
    image_metadata: Optional[str] = None

class CitizenReportResponse(BaseModel):
    id: str
    status: str = "Received"
    reported_at: datetime

class AlertResponse(BaseModel):
    id: str
    hotspot_id: str
    alert_level: str
    message: str
    created_at: datetime

class AnalyticsSummary(BaseModel):
    total_active_hotspots: int
    critical_incidents: int
    industrial_vs_wildfire_ratio: dict
    average_risk_score: float
    data_source_mode: str