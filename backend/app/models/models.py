    import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey, Enum, Boolean, Text
from sqlalchemy.orm import relationship
from app.database.session import Base

class Hotspot(Base):
    __tablename__ = "hotspots"

    id = Column(String, primary_key=True, default=lambda: f"HS{uuid.uuid4().hex[:6].upper()}")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    classification = Column(String, nullable=False) # e.g. Industrial Fire, Wildfire
    confidence = Column(Integer, nullable=False)
    risk_score = Column(Integer, nullable=False)
    severity = Column(String, nullable=False) # Low, Medium, High, Critical
    status = Column(String, default="Active") # Active, Under Review, Resolved
    thermal_intensity = Column(Float, nullable=False) # Brightness Temp (K)
    frp = Column(Float, nullable=False) # Fire Radiative Power (MW)
    land_cover = Column(String, nullable=False)
    nearby_facility = Column(String, nullable=True)
    distance_to_facility = Column(Float, nullable=True) # meters
    persistence = Column(String, nullable=False) # Sudden, Recurrent, Persistent
    detected_at = Column(DateTime, default=datetime.utcnow)
    data_source = Column(String, default="Demo Data") # Demo Data vs Live Satellite Data

    incidents = relationship("Incident", back_populates="hotspot")
    thermal_history = relationship("ThermalHistory", back_populates="hotspot")

class Facility(Base):
    __tablename__ = "facilities"

    id = Column(String, primary_key=True, default=lambda: f"FAC{uuid.uuid4().hex[:4].upper()}")
    name = Column(String, nullable=False)
    facility_type = Column(String, nullable=False) # Refinery, Chemical Plant, Landfill
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True, default=lambda: f"INC{uuid.uuid4().hex[:6].upper()}")
    hotspot_id = Column(String, ForeignKey("hotspots.id"), nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="Investigating") # Investigating, Confirmed, False Alarm, Contained
    assigned_unit = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    hotspot = relationship("Hotspot", back_populates="incidents")

class ThermalHistory(Base):
    __tablename__ = "thermal_history"

    id = Column(Integer, primary_key=True, autoincrement=True)
    hotspot_id = Column(String, ForeignKey("hotspots.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False)
    frp = Column(Float, nullable=False)
    thermal_intensity = Column(Float, nullable=False)

    hotspot = relationship("Hotspot", back_populates="thermal_history")

class CitizenReport(Base):
    __tablename__ = "citizen_reports"

    id = Column(String, primary_key=True, default=lambda: f"REP{uuid.uuid4().hex[:6].upper()}")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    report_type = Column(String, nullable=False) # Smoke, Active Fire, Explosion
    description = Column(Text, nullable=False)
    image_url = Column(String, nullable=True)
    reported_at = Column(DateTime, default=datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, default=lambda: f"ALT{uuid.uuid4().hex[:6].upper()}")
    hotspot_id = Column(String, ForeignKey("hotspots.id"), nullable=False)
    alert_level = Column(String, nullable=False) # Warning, Critical, Evacuate
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)