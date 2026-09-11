import React from 'react';
import { Modal } from '../common/Modal';
import type { Incident } from '../../types/incident';
import { SeverityBadge, StatusBadge, EventTypeBadge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  MapPin,
  Flame,
  Satellite,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

interface IncidentDetailModalProps {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IncidentDetailModal: React.FC<IncidentDetailModalProps> = ({
  incident,
  isOpen,
  onClose,
}) => {
  if (!incident) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title={
        <div className="flex items-center gap-2">
          <span className="font-mono text-cyan-400 font-bold">{incident.id}</span>
          <span className="text-slate-400">•</span>
          <span className="truncate">{incident.title}</span>
        </div>
      }
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" icon={<ShieldCheck className="w-4 h-4" />}>
            Initiate Response Workflow
          </Button>
        </>
      }
    >
      <div className="space-y-6 text-sm">
        {/* Header Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-md border border-slate-800">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Severity</div>
            <div className="mt-1">
              <SeverityBadge severity={incident.severity} pulse />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Status</div>
            <div className="mt-1">
              <StatusBadge status={incident.status} />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Category</div>
            <div className="mt-1">
              <EventTypeBadge eventType={incident.event_type} />
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">Satellite Sensor</div>
            <div className="mt-1 flex items-center gap-1 font-mono text-xs font-bold text-cyan-400">
              <Satellite className="w-3.5 h-3.5" />
              <span>{incident.satellite_source}</span>
            </div>
          </div>
        </div>

        {/* Risk & Telemetry Stat Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Risk Score</div>
            <div className="text-xl font-mono font-extrabold text-red-400 mt-0.5">
              {incident.risk_score} / 100
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-mono">AI Confidence</div>
            <div className="text-xl font-mono font-extrabold text-cyan-400 mt-0.5">
              {incident.confidence}%
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Temp (Kelvin)</div>
            <div className="text-xl font-mono font-extrabold text-amber-400 mt-0.5">
              {incident.temperature_kelvin} K
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Fire Rad Power</div>
            <div className="text-xl font-mono font-extrabold text-orange-400 mt-0.5">
              {incident.frp_mw} MW
            </div>
          </div>
        </div>

        {/* Location & Geospatial Context */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Geospatial Context</span>
          </div>
          <div className="p-3 bg-slate-950 rounded border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-200 font-semibold">{incident.location.name}</div>
            <div className="text-slate-400">
              Region: {incident.location.region} | Lat: {incident.location.lat}° N, Lng: {incident.location.lng}° W
            </div>
            <div className="text-slate-400">
              Historical Hotspots in Zone: <span className="text-cyan-400">{incident.historical_anomaly_count}</span> | 
              Persistent Site: <span className="text-amber-400">{incident.is_persistent ? 'YES' : 'NO'}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>AI Incident Intelligence Assessment</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded border border-slate-800">
            {incident.description}
          </p>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Recommended Command Actions</span>
          </div>
          <div className="space-y-1.5">
            {incident.recommended_actions.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800 text-xs text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
