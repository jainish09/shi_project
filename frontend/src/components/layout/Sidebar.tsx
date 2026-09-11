import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Flame,
  BellRing,
  BarChart3,
  Shield,
  Activity,
  ChevronRight,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  activeAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeAlertsCount }) => {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      badge: null,
    },
    {
      to: '/incidents',
      label: 'Incidents Table',
      icon: <Flame className="w-5 h-5" />,
      badge: '34 Active',
    },
    {
      to: '/alerts',
      label: 'Alerts Triage',
      icon: <BellRing className="w-5 h-5" />,
      badge: activeAlertsCount > 0 ? `${activeAlertsCount} New` : null,
      badgeColor: 'bg-red-950 text-red-400 border-red-800',
    },
    {
      to: '/analytics',
      label: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
      <div className="p-4 space-y-6">
        {/* Navigation Category */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-3">
            Command Modules
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-md font-medium text-sm transition-all duration-150 group cursor-pointer ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 shadow-sm shadow-cyan-950'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="group-hover:scale-105 transition-transform">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* GIS Layer Reserved Status */}
        <div className="pt-4 border-t border-slate-800">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-3">
            GIS Integration Status
          </div>
          <div className="bg-slate-950 p-3 rounded border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Map Layer Status</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Leaflet container reserved for Member 2 map integration.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono pt-1 border-t border-slate-900">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>CONTAINER MOUNTED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between font-mono">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>Thermal Sentinel AI</span>
        </div>
        <span>DISASTER READY</span>
      </div>
    </aside>
  );
};
