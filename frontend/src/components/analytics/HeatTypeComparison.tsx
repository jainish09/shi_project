import React from 'react';
import { Card } from '../common/Card';
import { Activity, Zap } from 'lucide-react';
import type { HeatTypeComparison as HeatTypeData } from '../../types/analytics';

interface HeatTypeComparisonProps {
  data: HeatTypeData[];
}

export const HeatTypeComparison: React.FC<HeatTypeComparisonProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card
      header={
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-slate-100 text-sm tracking-wider uppercase">
            Persistent vs. Sudden Heat Sources
          </span>
        </div>
      }
    >
      <div className="space-y-6 py-2">
        {data.map((item, idx) => {
          const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : 0;
          const isPersistent = idx === 0;

          return (
            <div key={item.type} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {isPersistent ? (
                    <Activity className="w-4 h-4 text-purple-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-red-400 animate-pulse" />
                  )}
                  <span className="font-bold text-slate-200">{item.type}</span>
                </div>
                <span className="font-bold text-cyan-400">
                  {item.count} sites ({percentage}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPersistent ? 'bg-purple-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className="text-[11px] text-slate-400 font-mono italic">{item.description}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
