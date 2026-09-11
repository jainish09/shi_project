import React from 'react';
import type { KPIMetrics } from '../../types/system';
import { StatCard } from '../common/StatCard';
import {
  Flame,
  AlertTriangle,
  ShieldAlert,
  Factory,
  Trees,
  Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface KPIGridProps {
  metrics: KPIMetrics | null;
}

export const KPIGrid: React.FC<KPIGridProps> = ({ metrics }) => {
  const navigate = useNavigate();

  const data = metrics || {
    total_thermal_anomalies: 1428,
    active_incidents: 34,
    critical_risk_incidents: 8,
    industrial_incidents: 18,
    wildfire_incidents: 11,
    persistent_heat_sources: 15,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard
        title="Total Anomalies"
        value={data.total_thermal_anomalies}
        subtitle="Satellite scans 24h"
        icon={<Flame className="w-5 h-5" />}
        accentColor="cyan"
        trend={{ value: '12.4%', isUp: true }}
      />
      <StatCard
        title="Active Incidents"
        value={data.active_incidents}
        subtitle="Requiring response"
        icon={<AlertTriangle className="w-5 h-5" />}
        accentColor="amber"
        onClick={() => navigate('/incidents')}
      />
      <StatCard
        title="Critical-Risk"
        value={data.critical_risk_incidents}
        subtitle="Immediate hazard"
        icon={<ShieldAlert className="w-5 h-5" />}
        accentColor="red"
        onClick={() => navigate('/incidents?severity=critical')}
        trend={{ value: '2 new', isUp: true }}
      />
      <StatCard
        title="Industrial Sites"
        value={data.industrial_incidents}
        subtitle="Factory & refinery heat"
        icon={<Factory className="w-5 h-5" />}
        accentColor="orange"
      />
      <StatCard
        title="Wildfire Incidents"
        value={data.wildfire_incidents}
        subtitle="Forest & vegetation"
        icon={<Trees className="w-5 h-5" />}
        accentColor="red"
      />
      <StatCard
        title="Persistent Sources"
        value={data.persistent_heat_sources}
        subtitle="Known heat baselines"
        icon={<Activity className="w-5 h-5" />}
        accentColor="purple"
      />
    </div>
  );
};
