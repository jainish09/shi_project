import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  accentBorder?: 'cyan' | 'red' | 'amber' | 'emerald' | 'purple' | 'none';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  footer,
  accentBorder = 'none',
}) => {
  const accentStyles = {
    cyan: 'border-t-2 border-t-cyan-500',
    red: 'border-t-2 border-t-red-500',
    amber: 'border-t-2 border-t-amber-500',
    emerald: 'border-t-2 border-t-emerald-500',
    purple: 'border-t-2 border-t-purple-500',
    none: '',
  };

  return (
    <div
      className={`bg-slate-900/90 backdrop-blur-xs border border-slate-800 rounded-md shadow-lg overflow-hidden flex flex-col ${accentStyles[accentBorder]} ${className}`}
    >
      {header && (
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          {header}
        </div>
      )}
      <div className="p-5 flex-1">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/40 text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
};
