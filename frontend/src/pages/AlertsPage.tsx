import React, { useState, useEffect } from 'react';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertFilterBar } from '../components/alerts/AlertFilterBar';
import { Modal } from '../components/common/Modal';
import { apiService } from '../services/api';
import type { Alert, AlertFilterOptions } from '../types/alert';
import { BellRing, RefreshCw, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/common/Button';
import { SeverityBadge, StatusBadge, CategoryBadge } from '../components/common/Badge';

export const AlertsPage: React.FC = () => {
  const [filters, setFilters] = useState<AlertFilterOptions>({
    category: 'all',
    severity: 'all',
    status: 'all',
    search: '',
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAlerts = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getAlerts(filters);
      setAlerts(data);
    } catch (err) {
      console.error('Error loading alerts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [filters]);

  const handleAcknowledge = async (alertId: string) => {
    try {
      await apiService.acknowledgeAlert(alertId);
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, status: 'acknowledged' } : a))
      );
    } catch (err) {
      console.error('Error acknowledging alert:', err);
    }
  };

  const handleFilterChange = (updated: Partial<AlertFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setFilters({ category: 'all', severity: 'all', status: 'all', search: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 uppercase font-mono flex items-center gap-2">
            <BellRing className="w-6 h-6 text-red-500 animate-pulse" />
            <span>ALERTS TRIAGE FEED</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time emergency feed categorizing critical thermal spikes, citizen reports, and abnormal heat outbursts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={fetchAlerts}
          >
            Refresh Alerts
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <AlertFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Grid of Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {alerts.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 font-mono bg-slate-900 border border-slate-800 rounded-md">
            No alerts match current search and category filters.
          </div>
        ) : (
          alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={handleAcknowledge}
              onInspect={(a) => setSelectedAlert(a)}
            />
          ))
        )}
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <Modal
          isOpen={Boolean(selectedAlert)}
          onClose={() => setSelectedAlert(null)}
          title={
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-400">{selectedAlert.id}</span>
              <span>• Alert Inspection</span>
            </div>
          }
          footer={
            <Button variant="secondary" onClick={() => setSelectedAlert(null)}>
              Close
            </Button>
          }
        >
          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={selectedAlert.alert_type} />
              <SeverityBadge severity={selectedAlert.severity} />
              <StatusBadge status={selectedAlert.status} />
            </div>

            <div className="text-base font-bold text-slate-100 font-sans">{selectedAlert.title}</div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Location: {selectedAlert.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Timestamp: {new Date(selectedAlert.timestamp).toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
              <div className="text-slate-400 font-bold uppercase">Trigger Logic & Reason</div>
              <p className="text-slate-200 font-sans">{selectedAlert.reason}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
