import type { SeverityLevel } from './incident';

export type AlertType = 
  | 'critical_incident' 
  | 'high_risk' 
  | 'citizen_report' 
  | 'abnormal_event';

export type AlertStatus = 'unacknowledged' | 'acknowledged' | 'investigating' | 'resolved';

export interface Alert {
  id: string;
  incident_id?: string;
  alert_type: AlertType;
  title: string;
  location: string;
  severity: SeverityLevel;
  timestamp: string;
  reason: string;
  status: AlertStatus;
  reporter_info?: string;
}

export interface AlertFilterOptions {
  category: AlertType | 'all';
  severity: SeverityLevel | 'all';
  status: AlertStatus | 'all';
  search: string;
}
