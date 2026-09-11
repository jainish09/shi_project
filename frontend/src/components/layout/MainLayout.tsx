import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { apiService } from '../../services/api';
import type { SystemStatus } from '../../types/system';
import { LayoutDashboard, Flame, BellRing, BarChart3 } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [activeAlertsCount, setActiveAlertsCount] = useState<number>(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await apiService.getSystemStatus();
        setSystemStatus(status);
        setActiveAlertsCount(status.active_alerts_count);
      } catch (err) {
        console.error('Failed to fetch system status:', err);
      }
    };
    fetchStatus();
  }, []);

  const handleAlertsClick = () => {
    navigate('/alerts');
  };

  const mobileNavItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/incidents', label: 'Incidents', icon: <Flame className="w-5 h-5" /> },
    { to: '/alerts', label: 'Alerts', icon: <BellRing className="w-5 h-5" />, badge: activeAlertsCount },
    { to: '/analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        systemStatus={systemStatus}
        activeAlertsCount={activeAlertsCount}
        onAlertsClick={handleAlertsClick}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeAlertsCount={activeAlertsCount} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-20 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900 border-t border-slate-800 flex items-center justify-around z-40 px-2">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors cursor-pointer relative ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
