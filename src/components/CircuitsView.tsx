import React, { useState } from 'react';
import { CIRCUITS, Circuit } from '../data/f1Data';
import { SafeImage } from './SafeImage';
import { ArrowUpRight } from 'lucide-react';

interface CircuitsViewProps {
  onSelectArticleById: (id: string) => void;
}

export const CircuitsView: React.FC<CircuitsViewProps> = ({ onSelectArticleById }) => {
  const [selectedCircuit, setSelectedCircuit] = useState<Circuit>(CIRCUITS[0]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/15 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
            <span className="text-[#E10600] font-semibold">TECHNICAL CIRCUIT ATLAS</span>
            <span aria-hidden="true">·</span>
            <span>GEOMETRY, DOWNFORCE & LAP RECORDS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
            THE CIRCUITS
          </h1>
          <p className="mt-3 text-base text-[#B8B8B8] max-w-2xl">
            Interactive telemetry profiles, red-line vector circuit diagrams, and aerodynamic wing trim specifications for the world’s most demanding tracks.
          </p>
        </div>

        <button
          onClick={() => onSelectArticleById('most-challenging-circuits')}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-tabular bg-[#151515] hover:bg-[#E10600] text-[#F5F5F0] border border-white/15 transition-colors whitespace-nowrap"
        >
          <span>READ CIRCUIT ENGINEERING FEATURE</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Circuit Selector Bar */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {CIRCUITS.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedCircuit(c)}
            className={`px-4 py-2.5 text-xs font-mono-tabular border transition-colors whitespace-nowrap shrink-0 ${
              selectedCircuit.id === c.id
                ? 'bg-[#E10600] text-[#F5F5F0] border-[#E10600] font-semibold'
                : 'bg-[#151515] text-[#B8B8B8] border-white/10 hover:text-[#F5F5F0] hover:border-white/30'
            }`}
          >
            0{idx + 1}. {c.country.toUpperCase()} — {c.city.split(',')[0].toUpperCase()}
          </button>
        ))}
      </div>

      {/* Active Circuit Technical Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 bg-[#151515] border border-white/15 p-6 sm:p-8">
        {/* Left: Technical Red-Line Circuit Diagram & Telemetry */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#080808] border border-white/10 p-6 bg-speed-grid">
          <div>
            <div className="flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] pb-4 border-b border-white/10">
              <span className="text-[#E10600] font-bold">VECTOR TRACK TELEMETRY</span>
              <span>WING TRIM: {selectedCircuit.downforceLevel.toUpperCase()}</span>
            </div>

            {/* SVG Circuit Map */}
            <div className="py-8 flex items-center justify-center">
              <svg viewBox="0 0 200 130" className="w-full max-w-[340px] h-auto overflow-visible">
                {/* Subtle outer glow path */}
                <path
                  d={selectedCircuit.svgPath}
                  fill="none"
                  stroke="rgba(225, 6, 0, 0.25)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Main Crimson Track Line */}
                <path
                  d={selectedCircuit.svgPath}
                  fill="none"
                  stroke="#E10600"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Start / Finish Line Marker */}
                <circle
                  cx={selectedCircuit.startFinishCoords.x}
                  cy={selectedCircuit.startFinishCoords.y}
                  r="4.5"
                  fill="#F5C542"
                  stroke="#080808"
                  strokeWidth="1.5"
                />
                <text
                  x={selectedCircuit.startFinishCoords.x}
                  y={selectedCircuit.startFinishCoords.y + 14}
                  fill="#F5C542"
                  fontSize="7"
                  fontFamily="JetBrains Mono, monospace"
                  textAnchor="middle"
                >
                  S/F LINE
                </text>
              </svg>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div>
              <div className="flex justify-between text-xs font-mono-tabular mb-1">
                <span className="text-[#B8B8B8]">FULL THROTTLE LAP RATIO</span>
                <span className="text-[#E10600] font-bold">{selectedCircuit.fullThrottlePct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#151515]">
                <div
                  className="h-full bg-[#E10600] transition-all duration-200"
                  style={{ width: `${selectedCircuit.fullThrottlePct}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono-tabular pt-2">
              <div className="bg-[#151515] p-3 border border-white/10">
                <span className="text-[#B8B8B8] block">V-MAX SPEED TRAP</span>
                <span className="text-base font-bold text-[#F5F5F0] mt-0.5 block">
                  {selectedCircuit.topSpeedKmh} km/h
                </span>
              </div>
              <div className="bg-[#151515] p-3 border border-white/10">
                <span className="text-[#B8B8B8] block">SECTOR 1 / 2 BENCH</span>
                <span className="text-base font-bold text-[#F5C542] mt-0.5 block">
                  {selectedCircuit.sectorSplits.s1} / {selectedCircuit.sectorSplits.s2}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Circuit Photograph & Full Technical Metrics */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                {selectedCircuit.country} · {selectedCircuit.city}
              </span>
              <span className="text-xs font-mono-tabular text-[#B8B8B8]">
                {selectedCircuit.officialName}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#F5F5F0] mb-4">
              {selectedCircuit.name}
            </h2>

            <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed mb-6">
              {selectedCircuit.editorialNote}
            </p>

            <div className="mb-6 border border-white/10">
              <SafeImage
                src={selectedCircuit.image}
                alt={selectedCircuit.name}
                aspectRatio="16:9"
                className="max-h-[300px]"
              />
            </div>
          </div>

          {/* 4-Column Specification Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 font-mono-tabular">
            <div className="bg-[#080808] p-4 border border-white/10">
              <span className="text-xs text-[#B8B8B8] block">TRACK LENGTH</span>
              <span className="text-xl font-bold text-[#F5F5F0] mt-1 block">
                {selectedCircuit.lengthKm}
              </span>
            </div>
            <div className="bg-[#080808] p-4 border border-white/10">
              <span className="text-xs text-[#B8B8B8] block">CORNERS / LAPS</span>
              <span className="text-xl font-bold text-[#F5F5F0] mt-1 block">
                {selectedCircuit.corners} / {selectedCircuit.laps}
              </span>
            </div>
            <div className="bg-[#080808] p-4 border border-white/10">
              <span className="text-xs text-[#B8B8B8] block">RACE DISTANCE</span>
              <span className="text-xl font-bold text-[#F5F5F0] mt-1 block">
                {selectedCircuit.raceDistanceKm}
              </span>
            </div>
            <div className="bg-[#080808] p-4 border border-white/10">
              <span className="text-xs text-[#B8B8B8] block">LAP RECORD</span>
              <span className="text-xl font-bold text-[#E10600] mt-1 block">
                {selectedCircuit.lapRecord.time}
              </span>
              <span className="text-[10px] text-[#B8B8B8] block truncate">
                {selectedCircuit.lapRecord.driver} ({selectedCircuit.lapRecord.year})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Circuits Comparison Grid */}
      <h3 className="text-xl font-display font-bold text-[#F5F5F0] mb-6 uppercase">
        Full Circuit Directory
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CIRCUITS.map((circuit) => (
          <div
            key={circuit.id}
            onClick={() => {
              setSelectedCircuit(circuit);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`cursor-pointer bg-[#151515] border transition-colors p-6 flex flex-col justify-between ${
              selectedCircuit.id === circuit.id
                ? 'border-[#E10600]'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] mb-3">
                <span className="text-[#E10600] font-semibold">{circuit.country}</span>
                <span>{circuit.lengthKm} · {circuit.corners} Turns</span>
              </div>
              <h4 className="text-lg font-display font-bold text-[#F5F5F0] mb-4">
                {circuit.name}
              </h4>

              {/* Mini SVG Track Preview */}
              <div className="h-28 bg-[#080808] border border-white/10 flex items-center justify-center p-4 mb-4">
                <svg viewBox="0 0 200 130" className="w-36 h-20">
                  <path
                    d={circuit.svgPath}
                    fill="none"
                    stroke="#E10600"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular">
              <span className="text-[#B8B8B8]">RECORD: {circuit.lapRecord.time}</span>
              <span className="text-[#F5C542]">INSPECT →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
