import React, { useState, useEffect } from 'react';
import { IncidentTable } from '../components/incidents/IncidentTable';
import { IncidentFilterBar } from '../components/incidents/IncidentFilterBar';
import { IncidentDetailModal } from '../components/incidents/IncidentDetailModal';
import { apiService } from '../services/api';
import type { Incident, IncidentFilterOptions } from '../types/incident';
import { Flame, Download, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useSearchParams } from 'react-router-dom';

export const IncidentsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSeverity = searchParams.get('severity') || 'all';

  const [filters, setFilters] = useState<IncidentFilterOptions>({
    search: '',
    severity: initialSeverity as any,
    status: 'all',
    eventType: 'all',
    sortBy: 'risk_score',
    sortOrder: 'desc',
  });

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchIncidents = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getIncidents(filters);
      setIncidents(data);
    } catch (err) {
      console.error('Error fetching incidents:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [filters]);

  const handleFilterChange = (updated: Partial<IncidentFilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      severity: 'all',
      status: 'all',
      eventType: 'all',
      sortBy: 'risk_score',
      sortOrder: 'desc',
    });
  };

  const handleSortChange = (column: 'risk_score' | 'detected_at' | 'confidence') => {
    setFilters((prev) => ({
      ...prev,
      sortBy: column,
      sortOrder: prev.sortBy === column && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100 uppercase font-mono flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500" />
            <span>INCIDENT MANAGEMENT CENTER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Query, triage, and manage satellite thermal incidents across all registered geographic sectors
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />}
            onClick={fetchIncidents}
          >
            Reload Records
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={() => alert('Exporting Incident Log (CSV format)...')}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <IncidentFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Incident Table */}
      <IncidentTable
        incidents={incidents}
        onSelectIncident={(inc) => setSelectedIncident(inc)}
        onSortChange={handleSortChange}
        currentSortBy={filters.sortBy}
        currentSortOrder={filters.sortOrder}
      />

      {/* Incident Details Modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        isOpen={Boolean(selectedIncident)}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};
