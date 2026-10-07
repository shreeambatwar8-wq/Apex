import React from 'react';
import { GENERATED_IMAGES } from '../data/articles';
import { SafeImage } from './SafeImage';

interface AboutViewProps {
  onExploreArticles: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onExploreArticles }) => {
  const masthead = [
    {
      name: 'Lorenzo Vance',
      role: 'Editor-in-Chief & Chief Race Strategy Editor',
      desk: 'Maranello / Imola Desk',
      bio: 'Twelve years covering pit-wall simulation architectures, tyre compound thermodynamics, and Grand Prix race engineering across Europe.',
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Principal Aerodynamics Correspondent',
      desk: 'Silverstone / Zurich',
      bio: 'Former computational fluid dynamics (CFD) researcher specializing in ground-effect Venturi floor structures, vortex shedding, and active aero systems.',
    },
    {
      name: 'Marco Bellini',
      role: 'Senior Motorsport Historian & Culture Editor',
      desk: 'Milan / Monte Carlo',
      bio: 'Archivist and long-form essayist documenting seven decades of Grand Prix rivalries, iconic circuits, and the junior single-seater pyramid.',
    },
    {
      name: 'Julian Sterling',
      role: 'Human Performance & Telemetry Analyst',
      desk: 'Monaco / Brackley',
      bio: 'Specializes in biometric driver load telemetry, ECU sensor networks, and driver-in-the-loop simulator correlation.',
    },
  ];

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/15 pb-10 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
          <span className="text-[#E10600] font-semibold">EDITORIAL MANIFESTO & MASTHEAD</span>
          <span aria-hidden="true">·</span>
          <span>WHERE SPEED MEETS STRATEGY</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase max-w-4xl">
          APEX — THE F1 RACING JOURNAL
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-[#B8B8B8] max-w-3xl leading-relaxed">
          An independent long-form Formula 1 publication dedicated to the engineering, race strategy, telemetry, and human drama of Grand Prix motorsport.
        </p>
      </div>

      {/* Asymmetric Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#F5F5F0]/90 leading-relaxed">
          <h2 className="text-2xl font-display font-bold text-[#F5F5F0] uppercase">
            01. Our Editorial Philosophy
          </h2>
          <p>
            Modern Formula 1 is frequently reduced to thirty-second soundbites, yet a single Grand Prix weekend involves 2.5 million Monte Carlo strategy simulations, 1.5 terabytes of encrypted sensor telemetry, and drivers withstanding 6G lateral loads at 175 beats per minute.
          </p>
          <p>
            <strong>APEX — The F1 Racing Journal</strong> was founded to bridge the gap between trackside engineering briefings and classic motorsport photojournalism. Every article in our archive pairs long-form technical analysis with custom telemetry diagrams, compound degradation models, and high-contrast documentary visuals.
          </p>

          <div className="pt-4">
            <button
              onClick={onExploreArticles}
              className="px-6 py-3 text-xs font-mono-tabular font-semibold bg-[#E10600] hover:bg-[#B00000] text-[#F5F5F0] transition-colors"
            >
              EXPLORE ALL 10 JOURNAL DISPATCHES
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-[#151515] border border-white/15">
            <SafeImage
              src={GENERATED_IMAGES.aeroTunnel}
              alt="Aerodynamic wind tunnel testing"
              aspectRatio="4:3"
            />
            <div className="p-5 border-t border-white/10 text-xs font-mono-tabular text-[#B8B8B8]">
              <span className="text-[#E10600] block mb-1">INDEPENDENT JOURNALISM</span>
              APEX operates with complete editorial independence, analyzing aerodynamic regulations, pit-stop choreography, and championship battles without commercial team bias.
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Masthead */}
      <div className="mb-16">
        <h2 className="text-2xl font-display font-bold text-[#F5F5F0] uppercase mb-6 pb-3 border-b border-white/15">
          02. The Editorial Masthead
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masthead.map((editor) => (
            <div key={editor.name} className="bg-[#151515] border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono-tabular text-[#E10600] block mb-1">
                  {editor.desk}
                </span>
                <h3 className="text-xl font-display font-bold text-[#F5F5F0]">
                  {editor.name}
                </h3>
                <span className="text-xs font-mono-tabular text-[#F5C542] block mt-1 mb-4">
                  {editor.role}
                </span>
                <p className="text-sm text-[#B8B8B8] leading-relaxed">{editor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Independence & Legal Disclaimer Box */}
      <div className="bg-[#151515] border-l-2 border-[#E10600] p-6 sm:p-8">
        <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest block mb-2">
          03. Independence & Data Attribution Notice
        </span>
        <p className="text-sm text-[#B8B8B8] leading-relaxed max-w-4xl">
          APEX — The F1 Racing Journal is an independent motorsport editorial publication. This website is unofficial and is not associated in any way with the Formula 1 companies, Scuderia Ferrari, Ferrari S.p.A., or the Fédération Internationale de l’Automobile (FIA). F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V. All race statistics, championship standings, and telemetry charts presented in this digital edition are curated sample/demo editorial datasets for analysis and visualization.
        </p>
      </div>
    </div>
  );
};
