import React from 'react';
import { TEAMS } from '../data/f1Data';
import { SafeImage } from './SafeImage';
import { ArrowUpRight } from 'lucide-react';

interface TeamsViewProps {
  onSelectArticleById: (id: string) => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ onSelectArticleById }) => {
  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/15 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
            <span className="text-[#E10600] font-semibold">CONSTRUCTORS CHAMPIONSHIP</span>
            <span aria-hidden="true">·</span>
            <span>ENGINEERING & CHASSIS ARCHITECTURE (SAMPLE DATA)</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
            THE CONSTRUCTORS
          </h1>
          <p className="mt-3 text-base text-[#B8B8B8] max-w-2xl">
            Inside the aerodynamic philosophies, power unit partnerships, and championship tallies of Formula 1’s premier engineering houses.
          </p>
        </div>

        <button
          onClick={() => onSelectArticleById('evolution-modern-f1-car')}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-tabular bg-[#151515] hover:bg-[#E10600] text-[#F5F5F0] border border-white/15 transition-colors whitespace-nowrap"
        >
          <span>READ CHASSIS EVOLUTION REPORT</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Constructors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TEAMS.map((team) => (
          <div
            key={team.id}
            className="bg-[#151515] border border-white/10 hover:border-[#E10600] transition-colors flex flex-col justify-between overflow-hidden group"
          >
            <div>
              {/* Top Bar with Position & Points */}
              <div className="px-6 py-4 bg-[#080808] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-mono-tabular font-bold text-[#E10600]">
                    P0{team.position}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs font-mono-tabular text-[#B8B8B8]">
                    {team.base}
                  </span>
                </div>
                <div className="text-right font-mono-tabular">
                  <span className="text-xl font-bold text-[#F5F5F0]">{team.points}</span>
                  <span className="text-xs text-[#B8B8B8] ml-1.5">PTS</span>
                </div>
              </div>

              {/* 16:9 Team Car Visual */}
              <div className="relative overflow-hidden">
                <SafeImage
                  src={team.heroImage}
                  alt={team.name}
                  aspectRatio="16:9"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs font-mono-tabular text-[#F5C542] block">
                      CHASSIS: {team.chassis} · PU: {team.powerUnit}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#F5F5F0] mt-0.5">
                      {team.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Technical Profile & Drivers */}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] pb-4 mb-4 border-b border-white/10">
                  <span className="text-[#F5F5F0] font-semibold">LINEUP:</span>
                  <span>{team.drivers[0]}</span>
                  <span aria-hidden="true">/</span>
                  <span>{team.drivers[1]}</span>
                  <span aria-hidden="true">·</span>
                  <span>PRINCIPAL: {team.teamPrincipal}</span>
                </div>

                <p className="text-sm text-[#B8B8B8] leading-relaxed mb-6">
                  {team.technicalProfile}
                </p>

                {/* Metrics Row */}
                <div className="grid grid-cols-4 gap-3 bg-[#080808] p-4 border border-white/10 text-center font-mono-tabular">
                  <div>
                    <span className="text-[11px] text-[#B8B8B8] block">WINS</span>
                    <span className="text-lg font-bold text-[#E10600]">{team.wins}</span>
                  </div>
                  <div className="border-l border-white/10">
                    <span className="text-[11px] text-[#B8B8B8] block">PODIUMS</span>
                    <span className="text-lg font-bold text-[#F5F5F0]">{team.podiums}</span>
                  </div>
                  <div className="border-l border-white/10">
                    <span className="text-[11px] text-[#B8B8B8] block">POLES</span>
                    <span className="text-lg font-bold text-[#F5F5F0]">{team.poles}</span>
                  </div>
                  <div className="border-l border-white/10">
                    <span className="text-[11px] text-[#B8B8B8] block">FAST LAPS</span>
                    <span className="text-lg font-bold text-[#F5C542]">{team.fastestLaps}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
