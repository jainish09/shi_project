export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

export type IncidentStatus = 'active' | 'investigating' | 'contained' | 'resolved';

export type EventType = 
  | 'wildfire' 
  | 'industrial' 
  | 'agricultural' 
  | 'urban_heat' 
  | 'flare_stack' 
  | 'unknown';

export interface IncidentLocation {
  name: string;
  lat: number;
  lng: number;
  region: string;
}

export interface Incident {
  id: string;
  title: string;
  location: IncidentLocation;
  event_type: EventType;
  confidence: number;
  risk_score: number;
  severity: SeverityLevel;
  status: IncidentStatus;
  temperature_kelvin: number;
  frp_mw: number;
  detected_at: string;
  satellite_source: string;
  historical_anomaly_count: number;
  is_persistent: boolean;
  description: string;
  recommended_actions: string[];
}

export interface IncidentFilterOptions {
  search: string;
  severity: SeverityLevel | 'all';
  status: IncidentStatus | 'all';
  eventType: EventType | 'all';
  sortBy: 'risk_score' | 'detected_at' | 'severity' | 'confidence';
  sortOrder: 'asc' | 'desc';
}
