import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import type { AlertFilterOptions, AlertType, AlertStatus } from '../../types/alert';
import type { SeverityLevel } from '../../types/incident';
import { Search } from 'lucide-react';
import { Button } from '../common/Button';

interface AlertFilterBarProps {
  filters: AlertFilterOptions;
  onFilterChange: (updated: Partial<AlertFilterOptions>) => void;
  onReset: () => void;
}

export const AlertFilterBar: React.FC<AlertFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-md shadow-md space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Search alerts by title, location, or reason..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Select
            label="Alert Category"
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value as AlertType | 'all' })}
            options={[
              { value: 'all', label: 'All Categories' },
              { value: 'critical_incident', label: 'Critical Incidents' },
              { value: 'high_risk', label: 'High Risk' },
              { value: 'citizen_report', label: 'Citizen Reports' },
              { value: 'abnormal_event', label: 'Abnormal Heat Events' },
            ]}
          />

          <Select
            label="Severity"
            value={filters.severity}
            onChange={(e) => onFilterChange({ severity: e.target.value as SeverityLevel | 'all' })}
            options={[
              { value: 'all', label: 'All Severities' },
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
            ]}
          />

          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as AlertStatus | 'all' })}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'unacknowledged', label: 'Unacknowledged' },
              { value: 'acknowledged', label: 'Acknowledged' },
              { value: 'investigating', label: 'Investigating' },
              { value: 'resolved', label: 'Resolved' },
            ]}
          />
        </div>

        <div className="flex items-end">
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
