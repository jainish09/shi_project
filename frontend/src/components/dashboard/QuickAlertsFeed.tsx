import React from 'react';
import { Card } from '../common/Card';
import { Bell, ArrowRight, ShieldAlert } from 'lucide-react';
import type { Alert } from '../../types/alert';
import { SeverityBadge, CategoryBadge } from '../common/Badge';
import { useNavigate } from 'react-router-dom';

interface QuickAlertsFeedProps {
  alerts: Alert[];
}

export const QuickAlertsFeed: React.FC<QuickAlertsFeedProps> = ({ alerts }) => {
  const navigate = useNavigate();

  return (
    <Card
      header={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="font-bold text-slate-100 text-sm tracking-wider uppercase">
              RECENT ALERTS FEED
            </span>
          </div>
          <button
            onClick={() => navigate('/alerts')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {alerts.slice(0, 4).map((alert) => (
          <div
            key={alert.id}
            onClick={() => navigate('/alerts')}
            className="p-3 bg-slate-950/60 hover:bg-slate-850 rounded border border-slate-800 transition-colors cursor-pointer flex flex-col gap-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <CategoryBadge category={alert.alert_type} />
                <SeverityBadge severity={alert.severity} />
              </div>
              <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-200">{alert.title}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate">{alert.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
