import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  accentColor?: 'red' | 'orange' | 'amber' | 'cyan' | 'emerald' | 'purple';
  trend?: {
    value: string;
    isUp: boolean;
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  accentColor = 'cyan',
  trend,
  onClick,
}) => {
  const accentStyles = {
    red: {
      border: 'border-l-4 border-l-red-500',
      iconBg: 'bg-red-950/80 text-red-400 border border-red-800/50',
      value: 'text-red-400',
    },
    orange: {
      border: 'border-l-4 border-l-orange-500',
      iconBg: 'bg-orange-950/80 text-orange-400 border border-orange-800/50',
      value: 'text-orange-400',
    },
    amber: {
      border: 'border-l-4 border-l-amber-500',
      iconBg: 'bg-amber-950/80 text-amber-400 border border-amber-800/50',
      value: 'text-amber-400',
    },
    cyan: {
      border: 'border-l-4 border-l-cyan-500',
      iconBg: 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/50',
      value: 'text-cyan-400',
    },
    emerald: {
      border: 'border-l-4 border-l-emerald-500',
      iconBg: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50',
      value: 'text-emerald-400',
    },
    purple: {
      border: 'border-l-4 border-l-purple-500',
      iconBg: 'bg-purple-950/80 text-purple-400 border border-purple-800/50',
      value: 'text-purple-400',
    },
  };

  const style = accentStyles[accentColor];

  return (
    <div
      onClick={onClick}
      className={`bg-slate-900/90 border border-slate-800 rounded-md p-4 flex flex-col justify-between shadow-md transition-all duration-150 ${
        style.border
      } ${onClick ? 'cursor-pointer hover:bg-slate-850 hover:border-slate-700' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className={`text-2xl lg:text-3xl font-extrabold font-mono mt-1 ${style.value}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>
        <div className={`p-2.5 rounded-md ${style.iconBg}`}>{icon}</div>
      </div>
      {(subtitle || trend) && (
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold ${
                trend.isUp ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {trend.isUp ? '▲' : '▼'} {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
