import React, { useState, useEffect } from 'react';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { MapPlaceholder } from '../components/dashboard/MapPlaceholder';
import { TrendChart } from '../components/dashboard/TrendChart';
import { QuickAlertsFeed } from '../components/dashboard/QuickAlertsFeed';
import { apiService } from '../services/api';
import type { KPIMetrics } from '../types/system';
import type { Alert } from '../types/alert';
import type { AnomalyTimelinePoint } from '../types/analytics';
import { RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [timeline, setTimeline] = useState<AnomalyTimelinePoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [kpiRes, alertRes, analyticsRes] = await Promise.all([
        apiService.getKPIMetrics(),
        apiService.getAlerts(),
        apiService.getAnalyticsOverview(),
      ]);
      setMetrics(kpiRes);
      setAlerts(alertRes);
      setTimeline(analyticsRes.anomalies_over_time);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 uppercase font-mono">
            COMMAND CENTER DASHBOARD
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-Time Satellite Thermal Intelligence & AI Anomaly Assessment System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={loadDashboardData}
          >
            Refresh Telemetry
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <KPIGrid metrics={metrics} />

      {/* Main Map Placeholder Area (Member 2 Leaflet Integration) */}
      <MapPlaceholder />

      {/* Secondary Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart data={timeline} />
        </div>
        <div>
          <QuickAlertsFeed alerts={alerts} />
        </div>
      </div>
    </div>
  );
};
