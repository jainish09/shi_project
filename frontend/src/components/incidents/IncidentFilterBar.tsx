import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import type { IncidentFilterOptions, SeverityLevel, IncidentStatus, EventType } from '../../types/incident';
import { Search, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';

interface IncidentFilterBarProps {
  filters: IncidentFilterOptions;
  onFilterChange: (updated: Partial<IncidentFilterOptions>) => void;
  onReset: () => void;
}

export const IncidentFilterBar: React.FC<IncidentFilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-md shadow-md space-y-4">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Search incident ID, location name, region..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Select
            label="Severity"
            value={filters.severity}
            onChange={(e) => onFilterChange({ severity: e.target.value as SeverityLevel | 'all' })}
            options={[
              { value: 'all', label: 'All Severities' },
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' },
            ]}
          />

          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as IncidentStatus | 'all' })}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'investigating', label: 'Investigating' },
              { value: 'contained', label: 'Contained' },
              { value: 'resolved', label: 'Resolved' },
            ]}
          />

          <Select
            label="Event Type"
            value={filters.eventType}
            onChange={(e) => onFilterChange({ eventType: e.target.value as EventType | 'all' })}
            options={[
              { value: 'all', label: 'All Event Types' },
              { value: 'wildfire', label: 'Wildfire' },
              { value: 'industrial', label: 'Industrial' },
              { value: 'agricultural', label: 'Agricultural' },
              { value: 'urban_heat', label: 'Urban Heat' },
              { value: 'flare_stack', label: 'Flare Stack' },
              { value: 'unknown', label: 'Unclassified' },
            ]}
          />

          <Select
            label="Sort By"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as IncidentFilterOptions['sortBy'] })}
            options={[
              { value: 'risk_score', label: 'Risk Score' },
              { value: 'detected_at', label: 'Detected Time' },
              { value: 'confidence', label: 'AI Confidence' },
            ]}
          />
        </div>

        {/* Action button */}
        <div className="flex items-end">
          <Button
            variant="secondary"
            size="md"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
