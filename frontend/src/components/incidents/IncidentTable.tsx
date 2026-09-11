import React from 'react';
import type { Incident } from '../../types/incident';
import { SeverityBadge, StatusBadge, EventTypeBadge } from '../common/Badge';
import { Button } from '../common/Button';
import { Eye, ArrowUpDown, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

interface IncidentTableProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
  onSortChange: (column: 'risk_score' | 'detected_at' | 'confidence') => void;
  currentSortBy: string;
  currentSortOrder: 'asc' | 'desc';
}

export const IncidentTable: React.FC<IncidentTableProps> = ({
  incidents,
  onSelectIncident,
  onSortChange,
  currentSortBy,
  currentSortOrder,
}) => {
  const renderSortIcon = (column: string) => {
    if (currentSortBy !== column) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return currentSortOrder === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-md shadow-lg overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <th className="py-3 px-4 font-semibold">Incident ID</th>
              <th className="py-3 px-4 font-semibold">Location</th>
              <th className="py-3 px-4 font-semibold">Event Type</th>
              <th
                onClick={() => onSortChange('confidence')}
                className="py-3 px-4 font-semibold cursor-pointer group hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Confidence</span>
                  {renderSortIcon('confidence')}
                </div>
              </th>
              <th
                onClick={() => onSortChange('risk_score')}
                className="py-3 px-4 font-semibold cursor-pointer group hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Risk Score</span>
                  {renderSortIcon('risk_score')}
                </div>
              </th>
              <th className="py-3 px-4 font-semibold">Severity</th>
              <th className="py-3 px-4 font-semibold">Status</th>
              <th
                onClick={() => onSortChange('detected_at')}
                className="py-3 px-4 font-semibold cursor-pointer group hover:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Detected Time</span>
                  {renderSortIcon('detected_at')}
                </div>
              </th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80">
            {incidents.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-500 font-mono">
                  No thermal incidents found matching current filters.
                </td>
              </tr>
            ) : (
              incidents.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => onSelectIncident(inc)}
                  className="hover:bg-slate-850/80 transition-colors cursor-pointer group"
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
                    {inc.id}
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[200px]">{inc.location.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono pl-5">
                      {inc.location.region}
                    </div>
                  </td>

                  {/* Event Type */}
                  <td className="py-3.5 px-4">
                    <EventTypeBadge eventType={inc.event_type} />
                  </td>

                  {/* Confidence */}
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>{inc.confidence}%</span>
                      <div className="w-12 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-cyan-500 h-full rounded-full"
                          style={{ width: `${inc.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Risk Score */}
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span
                      className={
                        inc.risk_score >= 85
                          ? 'text-red-400'
                          : inc.risk_score >= 60
                          ? 'text-orange-400'
                          : 'text-emerald-400'
                      }
                    >
                      {inc.risk_score} / 100
                    </span>
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-4">
                    <SeverityBadge severity={inc.severity} />
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={inc.status} />
                  </td>

                  {/* Detected Time */}
                  <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">
                    {new Date(inc.detected_at).toLocaleString([], {
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => onSelectIncident(inc)}
                    >
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div>
          Displaying <span className="text-cyan-400 font-bold">{incidents.length}</span> thermal incident records
        </div>
        <div>REAL-TIME DATA MATCHING API CONTRACT</div>
      </div>
    </div>
  );
};
