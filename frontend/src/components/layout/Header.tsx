import React, { useState, useEffect } from 'react';
import { Flame, Bell, Radio } from 'lucide-react';
import type { SystemStatus } from '../../types/system';

interface HeaderProps {
  systemStatus: SystemStatus | null;
  activeAlertsCount: number;
  onAlertsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  systemStatus,
  activeAlertsCount,
  onAlertsClick,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 lg:px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center shadow-md shadow-red-900/40">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-slate-100 text-lg uppercase font-mono">
                THERMAL SENTINEL <span className="text-cyan-400">AI</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-sm">
                v2.4 GIS
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:block tracking-tight">
              Satellite Thermal Intelligence & AI Risk Assessor
            </span>
          </div>
        </div>

        {/* Tactical Feed Status Badges */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM ONLINE</span>
          </div>
          {systemStatus && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
              <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>SATELLITE FEEDS:</span>
              <span className="text-cyan-300 font-semibold">MODIS / VIIRS / SENTINEL-3</span>
            </div>
          )}
        </div>
      </div>

      {/* Right: Live Clock, Alert Bell & User */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Live Clock */}
        <div className="hidden lg:flex flex-col items-end text-right font-mono">
          <span className="text-xs font-semibold text-slate-200">{time || '2026-09-11 12:00:00 UTC'}</span>
          <span className="text-[10px] text-slate-400">TELEMETRY LATENCY: &lt;1.2s</span>
        </div>

        {/* Alerts Bell */}
        <button
          onClick={onAlertsClick}
          aria-label="View alerts feed"
          className="relative p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5 text-slate-200" />
          {activeAlertsCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 text-[10px] font-bold font-mono bg-red-600 text-white rounded-full border border-slate-900 animate-pulse">
              {activeAlertsCount}
            </span>
          )}
        </button>

        {/* System Operator Profile */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold font-mono text-xs">
            OP-1
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200">Cmdr. FrontEnd-1</span>
            <span className="text-[10px] text-slate-400">Disaster Command</span>
          </div>
        </div>
      </div>
    </header>
  );
};
