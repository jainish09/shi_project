import React from 'react';
import { Layers, MapPin, Compass, Maximize2, Crosshair, Radio } from 'lucide-react';
import { Card } from '../common/Card';

export const MapPlaceholder: React.FC = () => {
  return (
    <Card
      accentBorder="cyan"
      className="relative min-h-[420px] lg:min-h-[480px] p-0 flex flex-col overflow-hidden border border-slate-800"
      header={
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow" />
            <span className="font-bold text-slate-100 text-sm tracking-wider uppercase">
              GEOSPATIAL THERMAL MAP COMMAND
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-sm">
              LEAFLET PLACEHOLDER
            </span>
          </div>

          {/* Tactical Layer Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded text-xs font-mono text-slate-300 border border-slate-800">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAYERS: THERMAL / SENTINEL-3 / VIIRS</span>
            </div>
            <button
              title="Expand view"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      }
    >
      {/* Map Canvas Placeholder */}
      <div className="relative flex-1 bg-slate-950 tactical-grid flex items-center justify-center overflow-hidden min-h-[360px]">
        {/* Radar Sweep Effect */}
        <div className="absolute w-[400px] h-[400px] opacity-20 pointer-events-none">
          <div className="radar-sweep"></div>
          <div className="absolute inset-0 border border-cyan-500/30 rounded-full"></div>
          <div className="absolute inset-[25%] border border-cyan-500/20 rounded-full"></div>
          <div className="absolute inset-[50%] border border-cyan-500/20 rounded-full"></div>
        </div>

        {/* Center Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Crosshair className="w-12 h-12 text-cyan-500/30" />
        </div>

        {/* Simulated Thermal Hotspot Pins on Grid */}
        <div className="absolute top-[28%] left-[32%] group cursor-pointer">
          <div className="relative">
            <span className="flex h-4 w-4 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border border-white items-center justify-center text-[9px] font-mono font-bold text-white">
                1
              </span>
            </span>
            <div className="absolute left-6 -top-2 hidden group-hover:block bg-slate-900 border border-red-800 p-2 rounded text-[11px] font-mono text-slate-100 whitespace-nowrap shadow-xl z-20">
              <div className="font-bold text-red-400">INC-2026-089 (Critical)</div>
              <div>North Ridge Canopy Fire</div>
              <div className="text-slate-400">FRP: 185.4 MW | 720K</div>
            </div>
          </div>
        </div>

        <div className="absolute top-[52%] left-[64%] group cursor-pointer">
          <div className="relative">
            <span className="flex h-3.5 w-3.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500 border border-white"></span>
            </span>
            <div className="absolute left-5 -top-2 hidden group-hover:block bg-slate-900 border border-orange-800 p-2 rounded text-[11px] font-mono text-slate-100 whitespace-nowrap shadow-xl z-20">
              <div className="font-bold text-orange-400">INC-2026-088 (Refinery)</div>
              <div>Flare Stack Emission</div>
            </div>
          </div>
        </div>

        <div className="absolute top-[70%] left-[22%] group cursor-pointer">
          <div className="relative">
            <span className="flex h-3 w-3 relative">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-slate-900"></span>
            </span>
          </div>
        </div>

        {/* Tactical overlay message box */}
        <div className="relative z-10 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 p-6 rounded-lg max-w-md text-center shadow-2xl space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <MapPin className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-slate-100 text-base uppercase tracking-wide">
              LEAFLET GIS MAP CONTAINER
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Main interactive map space reserved for <strong className="text-cyan-400">Member 2</strong>.
            </p>
          </div>
          <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-left text-[11px] font-mono text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>BOUNDS:</span>
              <span className="text-cyan-300">34.0522° N, 118.2437° W</span>
            </div>
            <div className="flex justify-between">
              <span>PROJECTION:</span>
              <span className="text-cyan-300">EPSG:3857 (Web Mercator)</span>
            </div>
            <div className="flex justify-between">
              <span>GIS MODULE:</span>
              <span className="text-emerald-400 font-semibold">CONTAINER READY</span>
            </div>
          </div>
        </div>

        {/* Coordinates status bar overlay bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-900/80 backdrop-blur-xs px-3 py-1.5 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Radio className="w-3 h-3 animate-pulse" /> TELEMETRY ACTIVE
            </span>
            <span className="hidden sm:inline">SCALE: 1:50,000</span>
          </div>
          <div>CURSOR: 34.0522° N, 118.2437° W</div>
        </div>
      </div>
    </Card>
  );
};
