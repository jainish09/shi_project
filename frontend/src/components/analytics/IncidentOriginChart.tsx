import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '../common/Card';
import { Factory } from 'lucide-react';
import type { OriginComparisonPoint } from '../../types/analytics';

interface IncidentOriginChartProps {
  data: OriginComparisonPoint[];
}

export const IncidentOriginChart: React.FC<IncidentOriginChartProps> = ({ data }) => {
  return (
    <Card
      header={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-slate-100 text-sm tracking-wider uppercase">
              Industrial vs. Natural Incident Origins
            </span>
          </div>
        </div>
      }
    >
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
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
            <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'monospace' }} />
            <Bar dataKey="industrial" name="Industrial Origin" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="natural" name="Natural / Wildfire" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="agricultural" name="Agricultural Burn" fill="#eab308" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
