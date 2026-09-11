import type { Incident, IncidentFilterOptions } from '../types/incident';
import type { Alert, AlertFilterOptions } from '../types/alert';
import type { AnalyticsOverview } from '../types/analytics';
import type { SystemStatus, KPIMetrics } from '../types/system';
import {
  mockIncidents,
  mockAlerts,
  mockAnalyticsOverview,
  mockKPIMetrics,
  mockSystemStatus,
} from './mockData';

// Switch to true when backend FastAPI is active
const USE_LIVE_BACKEND = false;
const API_BASE_URL = '/api/v1';

export const apiService = {
  async getSystemStatus(): Promise<SystemStatus> {
    if (USE_LIVE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/system/status`);
      return res.json();
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockSystemStatus), 150));
  },

  async getKPIMetrics(): Promise<KPIMetrics> {
    if (USE_LIVE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/kpi/summary`);
      return res.json();
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockKPIMetrics), 150));
  },

  async getIncidents(options?: Partial<IncidentFilterOptions>): Promise<Incident[]> {
    if (USE_LIVE_BACKEND) {
      const params = new URLSearchParams();
      if (options?.search) params.append('search', options.search);
      if (options?.severity && options.severity !== 'all') params.append('severity', options.severity);
      if (options?.status && options.status !== 'all') params.append('status', options.status);
      if (options?.eventType && options.eventType !== 'all') params.append('event_type', options.eventType);
      const res = await fetch(`${API_BASE_URL}/incidents?${params.toString()}`);
      return res.json();
    }

    return new Promise((resolve) => {
      let filtered = [...mockIncidents];

      if (options?.search) {
        const query = options.search.toLowerCase();
        filtered = filtered.filter(
          (inc) =>
            inc.id.toLowerCase().includes(query) ||
            inc.title.toLowerCase().includes(query) ||
            inc.location.name.toLowerCase().includes(query) ||
            inc.location.region.toLowerCase().includes(query)
        );
      }

      if (options?.severity && options.severity !== 'all') {
        filtered = filtered.filter((inc) => inc.severity === options.severity);
      }

      if (options?.status && options.status !== 'all') {
        filtered = filtered.filter((inc) => inc.status === options.status);
      }

      if (options?.eventType && options.eventType !== 'all') {
        filtered = filtered.filter((inc) => inc.event_type === options.eventType);
      }

      if (options?.sortBy) {
        const key = options.sortBy;
        const order = options.sortOrder === 'asc' ? 1 : -1;
        filtered.sort((a, b) => {
          if (key === 'risk_score') return (a.risk_score - b.risk_score) * order;
          if (key === 'confidence') return (a.confidence - b.confidence) * order;
          if (key === 'detected_at') return (new Date(a.detected_at).getTime() - new Date(b.detected_at).getTime()) * order;
          return 0;
        });
      }

      setTimeout(() => resolve(filtered), 200);
    });
  },

  async getIncidentById(id: string): Promise<Incident | null> {
    if (USE_LIVE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/incidents/${id}`);
      if (!res.ok) return null;
      return res.json();
    }
    const found = mockIncidents.find((inc) => inc.id === id);
    return new Promise((resolve) => setTimeout(() => resolve(found || null), 100));
  },

  async getAlerts(options?: Partial<AlertFilterOptions>): Promise<Alert[]> {
    if (USE_LIVE_BACKEND) {
      const params = new URLSearchParams();
      if (options?.category && options.category !== 'all') params.append('category', options.category);
      if (options?.severity && options.severity !== 'all') params.append('severity', options.severity);
      if (options?.status && options.status !== 'all') params.append('status', options.status);
      const res = await fetch(`${API_BASE_URL}/alerts?${params.toString()}`);
      return res.json();
    }

    return new Promise((resolve) => {
      let filtered = [...mockAlerts];

      if (options?.search) {
        const query = options.search.toLowerCase();
        filtered = filtered.filter(
          (alt) =>
            alt.id.toLowerCase().includes(query) ||
            alt.title.toLowerCase().includes(query) ||
            alt.location.toLowerCase().includes(query) ||
            alt.reason.toLowerCase().includes(query)
        );
      }

      if (options?.category && options.category !== 'all') {
        filtered = filtered.filter((alt) => alt.alert_type === options.category);
      }

      if (options?.severity && options.severity !== 'all') {
        filtered = filtered.filter((alt) => alt.severity === options.severity);
      }

      if (options?.status && options.status !== 'all') {
        filtered = filtered.filter((alt) => alt.status === options.status);
      }

      setTimeout(() => resolve(filtered), 200);
    });
  },

  async acknowledgeAlert(alertId: string): Promise<boolean> {
    if (USE_LIVE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/alerts/${alertId}/acknowledge`, { method: 'POST' });
      return res.ok;
    }
    const alert = mockAlerts.find((a) => a.id === alertId);
    if (alert) {
      alert.status = 'acknowledged';
    }
    return new Promise((resolve) => setTimeout(() => resolve(true), 150));
  },

  async getAnalyticsOverview(): Promise<AnalyticsOverview> {
    if (USE_LIVE_BACKEND) {
      const res = await fetch(`${API_BASE_URL}/analytics/overview`);
      return res.json();
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockAnalyticsOverview), 200));
  },
};
