import React from 'react';

interface TechnicalDiagramProps {
  type:
    | 'undercut-telemetry'
    | 'venturi-ground-effect'
    | 'rivalry-timeline'
    | 'driver-biometrics'
    | 'pit-crew-matrix'
    | 'qualifying-track-evolution'
    | 'circuit-corner-loads'
    | 'telemetry-packet-stream'
    | 'feeder-series-funnel'
    | 'power-unit-2026-split';
}

export const TechnicalDiagram: React.FC<TechnicalDiagramProps> = ({ type }) => {
  switch (type) {
    case 'undercut-telemetry':
      return (
        <figure className="my-10 bg-[#151515] border border-white/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                Technical Telemetry Figure 01.A
              </span>
              <h4 className="text-lg font-display font-bold text-[#F5F5F0] mt-0.5">
                Lap-Time Crossover: The Lap 18 Undercut Window
              </h4>
            </div>
            <div className="flex items-center gap-6 text-xs font-mono-tabular text-[#B8B8B8]">
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#E10600] inline-block" /> Car A (Undercut Stop Lap 18)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-0.5 bg-[#B8B8B8] inline-block" /> Car B (Stays Out Until Lap 19)
              </span>
            </div>
          </div>

          <svg viewBox="0 0 700 220" className="w-full h-auto overflow-visible">
            {/* Grid lines */}
            {[30, 75, 120, 165].map((y, idx) => (
              <g key={y}>
                <line x1="55" y1={y} x2="670" y2={y} stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
                <text x="10" y={y + 4} fill="#B8B8B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                  {['1:31.0', '1:32.0', '1:33.0', '1:34.0'][idx]}
                </text>
              </g>
            ))}

            {/* X-axis labels */}
            {['LAP 15', 'LAP 16', 'LAP 17', 'LAP 18 (BOX)', 'LAP 19 (CROSS)', 'LAP 20', 'LAP 21'].map((lbl, i) => (
              <text
                key={lbl}
                x={80 + i * 92}
                y="205"
                fill={i === 3 || i === 4 ? '#E10600' : '#B8B8B8'}
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
                textAnchor="middle"
              >
                {lbl}
              </text>
            ))}

            {/* Car B (Silver - Old Tyres degrading) */}
            <path
              d="M 80,105 L 172,115 L 264,128 L 356,148 L 448,162 L 540,78 L 632,74"
              fill="none"
              stroke="#B8B8B8"
              strokeWidth="2.5"
            />
            {/* Car A (Crimson - Undercut Pits Lap 18 and flies on Out-Lap) */}
            <path
              d="M 80,110 L 172,120 L 264,132 L 356,65 L 448,45 L 540,52 L 632,56"
              fill="none"
              stroke="#E10600"
              strokeWidth="3"
            />

            {/* Crossover Highlight Zone */}
            <rect x="330" y="25" width="145" height="155" fill="rgba(225,6,0,0.08)" stroke="rgba(225,6,0,0.3)" />
            <circle cx="356" cy="65" r="5" fill="#E10600" />
            <circle cx="448" cy="45" r="5" fill="#F5C542" />
            <text x="402" y="40" fill="#F5C542" fontSize="10" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              NET GAIN: +1.68s
            </text>
          </svg>
          <figcaption className="mt-4 text-xs text-[#B8B8B8] font-mono-tabular">
            Sample Simulation Telemetry · Switching from 18-lap worn C3 Mediums to fresh C2 Hards yields a 1.68s out-lap delta, inverting track position before Turn 2.
          </figcaption>
        </figure>
      );

    case 'venturi-ground-effect':
      return (
        <figure className="my-10 bg-[#151515] border border-white/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                Aerodynamic Section Profile 02.B
              </span>
              <h4 className="text-lg font-display font-bold text-[#F5F5F0] mt-0.5">
                Underfloor Venturi Throat & Diffuser Pressure Distribution
              </h4>
            </div>
            <span className="text-xs font-mono-tabular text-[#F5C542]">
              PEAK SUCTION: -4.2 Cp AT MID-CHASSIS THROAT
            </span>
          </div>

          <svg viewBox="0 0 700 200" className="w-full h-auto">
            {/* Ground Plane */}
            <line x1="30" y1="160" x2="670" y2="160" stroke="#B8B8B8" strokeWidth="2" />
            <text x="40" y="180" fill="#B8B8B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
              ASPHALT REFERENCE PLANE (DYNAMIC RIDE HEIGHT: 4.2mm)
            </text>

            {/* Venturi Floor Profile */}
            <path
              d="M 70,115 Q 180,115 280,146 L 440,148 Q 540,145 630,85 L 630,65 L 430,85 L 180,85 L 70,100 Z"
              fill="#080808"
              stroke="#F5F5F0"
              strokeWidth="2"
            />

            {/* Airflow Streamlines */}
            <path
              d="M 35,135 Q 180,135 290,153 L 450,154 Q 560,150 655,105"
              fill="none"
              stroke="#E10600"
              strokeWidth="2.5"
            />
            <path
              d="M 35,148 Q 180,148 290,157 L 450,157 Q 560,154 655,130"
              fill="none"
              stroke="#F5C542"
              strokeWidth="1.5"
              strokeDasharray="6 3"
            />

            {/* Downforce Vectors */}
            {[260, 310, 360, 410].map((x) => (
              <g key={x}>
                <line x1={x} y1="100" x2={x} y2="142" stroke="#E10600" strokeWidth="2" />
                <polygon points={`${x - 4},138 ${x + 4},138 ${x},146`} fill="#E10600" />
              </g>
            ))}

            {/* Annotations */}
            <text x="115" y="72" fill="#B8B8B8" fontSize="10" fontFamily="JetBrains Mono, monospace">
              1. INLET FENCES
            </text>
            <text x="295" y="72" fill="#E10600" fontSize="10" fontFamily="JetBrains Mono, monospace">
              2. VENTURI THROAT (MAX VELOCITY)
            </text>
            <text x="525" y="55" fill="#F5C542" fontSize="10" fontFamily="JetBrains Mono, monospace">
              3. REAR DIFFUSER EXPANSION
            </text>
          </svg>
        </figure>
      );

    case 'pit-crew-matrix':
      return (
        <figure className="my-10 bg-[#151515] border border-white/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                Pit Box Spatial Architecture 05.A
              </span>
              <h4 className="text-lg font-display font-bold text-[#F5F5F0] mt-0.5">
                22-Mechanic Sub-Two-Second Pit Lane Formation
              </h4>
            </div>
            <span className="text-xs font-mono-tabular text-[#B8B8B8]">
              TARGET STATIONARY WINDOW: 1.85 SECONDS
            </span>
          </div>

          <svg viewBox="0 0 700 220" className="w-full h-auto">
            {/* Pit Lane Box Markings */}
            <rect x="160" y="35" width="380" height="150" fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="6 4" />
            <line x1="190" y1="30" x2="190" y2="190" stroke="#E10600" strokeWidth="2" />

            {/* F1 Car Top-Down Silhouette */}
            <rect x="210" y="88" width="280" height="44" fill="#080808" stroke="#E10600" strokeWidth="2" />
            {/* 4 Wheels */}
            <rect x="235" y="62" width="38" height="20" fill="#151515" stroke="#F5F5F0" strokeWidth="1.5" />
            <rect x="235" y="138" width="38" height="20" fill="#151515" stroke="#F5F5F0" strokeWidth="1.5" />
            <rect x="425" y="62" width="42" height="20" fill="#151515" stroke="#F5F5F0" strokeWidth="1.5" />
            <rect x="425" y="138" width="42" height="20" fill="#151515" stroke="#F5F5F0" strokeWidth="1.5" />

            {/* Crew Nodes: 3 per wheel + Front/Rear Jacks + Stabilizers */}
            {[
              { x: 225, y: 42, c: '#E10600', l: 'OFF' },
              { x: 254, y: 38, c: '#F5C542', l: 'GUN' },
              { x: 283, y: 42, c: '#F5F5F0', l: 'ON' },
              { x: 225, y: 178, c: '#E10600', l: 'OFF' },
              { x: 254, y: 182, c: '#F5C542', l: 'GUN' },
              { x: 283, y: 178, c: '#F5F5F0', l: 'ON' },
              { x: 415, y: 42, c: '#E10600', l: 'OFF' },
              { x: 445, y: 38, c: '#F5C542', l: 'GUN' },
              { x: 475, y: 42, c: '#F5F5F0', l: 'ON' },
              { x: 415, y: 178, c: '#E10600', l: 'OFF' },
              { x: 445, y: 182, c: '#F5C542', l: 'GUN' },
              { x: 475, y: 178, c: '#F5F5F0', l: 'ON' },
            ].map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r="10" fill="#080808" stroke={node.c} strokeWidth="2" />
                <text x={node.x} y={node.y + 3} fill="#F5F5F0" fontSize="7" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
                  {node.l}
                </text>
              </g>
            ))}

            {/* Front & Rear Jacks */}
            <circle cx="175" cy="110" r="12" fill="#E10600" />
            <text x="175" y="113" fill="#F5F5F0" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              FJ
            </text>
            <circle cx="525" cy="110" r="12" fill="#E10600" />
            <text x="525" y="113" fill="#F5F5F0" fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              RJ
            </text>
          </svg>
        </figure>
      );

    default:
      return (
        <figure className="my-10 bg-[#151515] border border-white/10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                APEX Telemetry Diagnostic
              </span>
              <h4 className="text-lg font-display font-bold text-[#F5F5F0] mt-0.5">
                Multi-Channel Performance & Load Comparison
              </h4>
            </div>
            <span className="text-xs font-mono-tabular text-[#F5C542]">
              SAMPLE TELEMETRY BENCHMARK
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Peak Lateral Load', val: '5.8G', pct: 92, sub: 'High-Speed Aero Sweeps' },
              { label: 'Thermal Efficiency', val: '52.4%', pct: 86, sub: 'V6 Turbo-Hybrid + 350kW MGU-K' },
              { label: 'Full-Throttle Duty Cycle', val: '78.2%', pct: 78, sub: 'Power-Sensitive Circuit Profile' },
            ].map((bar) => (
              <div key={bar.label} className="bg-[#080808] p-4 border border-white/10">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs text-[#B8B8B8]">{bar.label}</span>
                  <span className="text-lg font-mono-tabular font-bold text-[#E10600]">{bar.val}</span>
                </div>
                <div className="w-full h-1.5 bg-[#151515] overflow-hidden mb-2">
                  <div className="h-full bg-[#E10600]" style={{ width: `${bar.pct}%` }} />
                </div>
                <span className="text-[11px] font-mono-tabular text-[#B8B8B8]">{bar.sub}</span>
              </div>
            ))}
          </div>
        </figure>
      );
  }
};
