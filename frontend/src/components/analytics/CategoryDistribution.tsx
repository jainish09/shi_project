import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { Card } from '../common/Card';
import { PieChart as PieIcon } from 'lucide-react';
import type { CategoryDistribution as CategoryData } from '../../types/analytics';

interface CategoryDistributionProps {
  data: CategoryData[];
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data }) => {
  return (
    <Card
      header={
        <div className="flex items-center gap-2">
          <PieIcon className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-slate-100 text-sm tracking-wider uppercase">
            Event Category Distribution
          </span>
        </div>
      }
    >
      <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
              nameKey="category"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-xs font-mono">
        {data.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
            <span className="text-slate-300 truncate">{item.category} ({item.percentage}%)</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
