export interface SystemStatus {
  system_status: 'operational' | 'degraded' | 'maintenance';
  satellite_feeds: {
    MODIS: 'active' | 'offline' | 'syncing';
    VIIRS: 'active' | 'offline' | 'syncing';
    SENTINEL3: 'active' | 'offline' | 'syncing';
  };
  last_telemetry_sync: string;
  active_nodes: number;
  ai_model_version: string;
  active_alerts_count: number;
}

export interface KPIMetrics {
  total_thermal_anomalies: number;
  active_incidents: number;
  critical_risk_incidents: number;
  industrial_incidents: number;
  wildfire_incidents: number;
  persistent_heat_sources: number;
}
