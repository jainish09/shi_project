import React, { useState, useEffect } from 'react';
import { AnomaliesTimeline } from '../components/analytics/AnomaliesTimeline';
import { CategoryDistribution } from '../components/analytics/CategoryDistribution';
import { RiskLevelDistribution } from '../components/analytics/RiskLevelDistribution';
import { HeatTypeComparison } from '../components/analytics/HeatTypeComparison';
import { IncidentOriginChart } from '../components/analytics/IncidentOriginChart';
import { apiService } from '../services/api';
import type { AnalyticsOverview } from '../types/analytics';
import { BarChart3, Download, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsOverview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.getAnalyticsOverview();
      setData(res);
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 uppercase font-mono flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>SPATIAL & TEMPORAL THERMAL ANALYTICS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Geospatial intelligence trends, risk level breakdowns, and heat source classification statistics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={fetchAnalytics}
          >
            Refresh Analytics
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => alert('Exporting Analytics Data (JSON format)...')}
          >
            Export Data
          </Button>
        </div>
      </div>

      {data && (
        <div className="space-y-6">
          {/* Main Timeline & Category Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AnomaliesTimeline data={data.anomalies_over_time} />
            </div>
            <div>
              <CategoryDistribution data={data.event_category_distribution} />
            </div>
          </div>

          {/* Risk Level & Heat Type Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskLevelDistribution data={data.risk_level_distribution} />
            <HeatTypeComparison data={data.persistent_vs_sudden} />
          </div>

          {/* Industrial vs Natural Origin Long Term Chart */}
          <div className="grid grid-cols-1 gap-6">
            <IncidentOriginChart data={data.industrial_vs_natural} />
          </div>
        </div>
      )}
    </div>
  );
};
