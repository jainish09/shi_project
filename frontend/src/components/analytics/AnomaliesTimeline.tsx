import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card } from '../common/Card';
import { Clock } from 'lucide-react';
import type { AnomalyTimelinePoint } from '../../types/analytics';

interface AnomaliesTimelineProps {
  data: AnomalyTimelinePoint[];
}

export const AnomaliesTimeline: React.FC<AnomaliesTimelineProps> = ({ data }) => {
  return (
    <Card
      header={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-slate-100 text-sm tracking-wider uppercase">
              Thermal Anomalies Over Time (24h Telemetry)
            </span>
          </div>
        </div>
      }
    >
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="wildfireGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="industrialGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="timestamp" stroke="#64748b" fontSize={11} />
            <YAxis stroke="#64748b" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '6px',
                color: '#f8fafc',
                fontSize: '12px',
                fontFamily: 'monospace',
              }}
            />
            <Area
              type="monotone"
              dataKey="industrial"
              stackId="1"
              stroke="#3b82f6"
              fill="url(#industrialGrad)"
              name="Industrial Heat"
            />
            <Area
              type="monotone"
              dataKey="wildfire"
              stackId="1"
              stroke="#ef4444"
              fill="url(#wildfireGrad)"
              name="Wildfire / Forest"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
