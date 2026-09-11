import React from 'react';
import type { Alert } from '../../types/alert';
import { SeverityBadge, StatusBadge, CategoryBadge } from '../common/Badge';
import { Button } from '../common/Button';
import { MapPin, Clock, AlertTriangle, ShieldCheck, UserCheck } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge: (alertId: string) => void;
  onInspect: (alert: Alert) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onAcknowledge,
  onInspect,
}) => {
  const isUnacknowledged = alert.status === 'unacknowledged';

  return (
    <div
      className={`bg-slate-900 border rounded-md p-5 transition-all duration-150 flex flex-col justify-between space-y-4 ${
        isUnacknowledged
          ? 'border-red-600/70 shadow-lg shadow-red-950/40 bg-gradient-to-r from-red-950/20 to-slate-900'
          : 'border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="space-y-3">
        {/* Top bar: Alert Type, Severity, Status */}
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={alert.alert_type} />
            <SeverityBadge severity={alert.severity} pulse={isUnacknowledged} />
            <StatusBadge status={alert.status} />
          </div>
          <span className="font-mono text-cyan-400 font-bold text-xs">{alert.id}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-100 leading-snug">{alert.title}</h3>

        {/* Location & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-1">
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-850">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">{alert.location}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded border border-slate-850">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {new Date(alert.timestamp).toLocaleString([], {
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        {/* Reason */}
        <div className="p-3 bg-slate-950/80 rounded border border-slate-800 text-xs space-y-1">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>Trigger Reason</span>
          </div>
          <p className="text-slate-300">{alert.reason}</p>
        </div>

        {alert.reporter_info && (
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Source: {alert.reporter_info}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        {isUnacknowledged ? (
          <Button
            variant="danger"
            size="sm"
            icon={<ShieldCheck className="w-4 h-4" />}
            onClick={() => onAcknowledge(alert.id)}
          >
            Acknowledge Alert
          </Button>
        ) : (
          <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Acknowledged
          </span>
        )}

        <Button variant="secondary" size="sm" onClick={() => onInspect(alert)}>
          Full Details
        </Button>
      </div>
    </div>
  );
};
