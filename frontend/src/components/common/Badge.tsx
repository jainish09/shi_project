import type { SeverityLevel, IncidentStatus, EventType } from '../../types/incident';
import type { AlertType, AlertStatus } from '../../types/alert';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  pulse = false,
}) => {
  const variantStyles = {
    critical: 'bg-red-950/80 text-red-400 border border-red-800/60 shadow-xs shadow-red-900/40',
    high: 'bg-orange-950/80 text-orange-400 border border-orange-800/60',
    medium: 'bg-amber-950/80 text-amber-400 border border-amber-800/60',
    low: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60',
    info: 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60',
    success: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60',
    warning: 'bg-yellow-950/80 text-yellow-400 border border-yellow-800/60',
    neutral: 'bg-slate-800/80 text-slate-300 border border-slate-700/60',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 font-medium tracking-wide uppercase',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wider uppercase',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
};

export const SeverityBadge: React.FC<{ severity: SeverityLevel; pulse?: boolean }> = ({
  severity,
  pulse = false,
}) => {
  const variantMap: Record<SeverityLevel, 'critical' | 'high' | 'medium' | 'low'> = {
    critical: 'critical',
    high: 'high',
    medium: 'medium',
    low: 'low',
  };

  return (
    <Badge variant={variantMap[severity]} pulse={severity === 'critical' || pulse}>
      {severity}
    </Badge>
  );
};

export const StatusBadge: React.FC<{ status: IncidentStatus | AlertStatus }> = ({ status }) => {
  const variantMap: Record<string, BadgeProps['variant']> = {
    active: 'critical',
    unacknowledged: 'critical',
    investigating: 'warning',
    acknowledged: 'info',
    contained: 'info',
    resolved: 'success',
  };

  return <Badge variant={variantMap[status] || 'neutral'}>{status.replace('_', ' ')}</Badge>;
};

export const EventTypeBadge: React.FC<{ eventType: EventType }> = ({ eventType }) => {
  const labelMap: Record<EventType, string> = {
    wildfire: 'Wildfire',
    industrial: 'Industrial',
    agricultural: 'Agricultural',
    urban_heat: 'Urban Heat',
    flare_stack: 'Flare Stack',
    unknown: 'Unclassified',
  };

  const variantMap: Record<EventType, BadgeProps['variant']> = {
    wildfire: 'critical',
    industrial: 'info',
    agricultural: 'warning',
    urban_heat: 'neutral',
    flare_stack: 'high',
    unknown: 'neutral',
  };

  return <Badge variant={variantMap[eventType]}>{labelMap[eventType]}</Badge>;
};

export const CategoryBadge: React.FC<{ category: AlertType }> = ({ category }) => {
  const labelMap: Record<AlertType, string> = {
    critical_incident: 'Critical Incident',
    high_risk: 'High Risk',
    citizen_report: 'Citizen Report',
    abnormal_event: 'Abnormal Heat',
  };

  const variantMap: Record<AlertType, BadgeProps['variant']> = {
    critical_incident: 'critical',
    high_risk: 'high',
    citizen_report: 'info',
    abnormal_event: 'warning',
  };

  return <Badge variant={variantMap[category]}>{labelMap[category]}</Badge>;
};
