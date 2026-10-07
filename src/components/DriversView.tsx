import React, { useState } from 'react';
import { DRIVERS, Driver } from '../data/f1Data';
import { SafeImage } from './SafeImage';
import { ArrowUpRight } from 'lucide-react';

interface DriversViewProps {
  onSelectArticleById: (id: string) => void;
}

export const DriversView: React.FC<DriversViewProps> = ({ onSelectArticleById }) => {
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<string>('ALL');
  const [activeDriver, setActiveDriver] = useState<Driver | null>(null);

  const uniqueTeams = ['ALL', ...Array.from(new Set(DRIVERS.map((d) => d.team)))];

  const filteredDrivers =
    selectedTeamFilter === 'ALL'
      ? DRIVERS
      : DRIVERS.filter((d) => d.team === selectedTeamFilter);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12">
      {/* Page Header */}
      <div className="border-b border-white/15 pb-8 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
            <span className="text-[#E10600] font-semibold">2026 CHAMPIONSHIP GRID</span>
            <span aria-hidden="true">·</span>
            <span>SAMPLE TELEMETRY & STANDINGS DATA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
            THE DRIVERS
          </h1>
          <p className="mt-3 text-base text-[#B8B8B8] max-w-2xl">
            Portraits, championship telemetry, qualifying benchmarks, and career statistics for the protagonists of the World Championship.
          </p>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#151515] border border-white/10 overflow-x-auto">
          {uniqueTeams.map((team) => (
            <button
              key={team}
              onClick={() => setSelectedTeamFilter(team)}
              className={`px-3 py-1.5 text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 ${
                selectedTeamFilter === team
                  ? 'bg-[#E10600] text-[#F5F5F0] font-semibold'
                  : 'text-[#B8B8B8] hover:text-[#F5F5F0]'
              }`}
            >
              {team === 'ALL' ? 'All Constructors' : team.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Driver Telemetry Drawer */}
      {activeDriver && (
        <div className="mb-12 bg-[#151515] border-l-2 border-[#E10600] p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                DRIVER TELEMETRY DOSSIER · #{activeDriver.number} {activeDriver.countryCode}
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F5F0] mt-1">
                {activeDriver.name} — {activeDriver.team}
              </h2>
            </div>
            <button
              onClick={() => setActiveDriver(null)}
              className="self-start md:self-auto px-3 py-1.5 text-xs font-mono-tabular bg-[#080808] text-[#B8B8B8] hover:text-[#F5F5F0] border border-white/10"
            >
              CLOSE DOSSIER
            </button>
          </div>

          <p className="mt-4 text-sm sm:text-base text-[#F5F5F0]/90 max-w-3xl leading-relaxed">
            {activeDriver.bio}
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Championship Pos', val: `P${activeDriver.position}` },
              { label: 'Season Points', val: `${activeDriver.points} PTS` },
              { label: 'Grand Prix Wins', val: `${activeDriver.wins}` },
              { label: 'Pole Positions', val: `${activeDriver.poles}` },
              { label: 'Avg Qualifying', val: `P${activeDriver.avgQualifying}` },
              { label: 'Avg Race Finish', val: `P${activeDriver.avgFinish}` },
            ].map((item) => (
              <div key={item.label} className="bg-[#080808] p-4 border border-white/10">
                <span className="text-xs text-[#B8B8B8] block">{item.label}</span>
                <span className="text-xl font-mono-tabular font-bold text-[#F5F5F0] mt-1 block">
                  {item.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portrait Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            onClick={() => setActiveDriver(driver)}
            className="group cursor-pointer bg-[#151515] border border-white/10 hover:border-[#E10600] transition-colors flex flex-col justify-between"
          >
            <div>
              {/* Top Championship Position & Car Number Strip */}
              <div className="px-5 py-3.5 bg-[#080808] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-tabular">
                  <span className="text-[#E10600] font-bold">P0{driver.position}</span>
                  <span aria-hidden="true" className="text-white/20">·</span>
                  <span className="text-[#B8B8B8]">{driver.countryCode}</span>
                </div>
                <span className="text-xl font-mono-tabular font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                  #{driver.number}
                </span>
              </div>

              {/* 3:4 Portrait */}
              <div className="relative overflow-hidden">
                <SafeImage
                  src={driver.portrait}
                  alt={driver.name}
                  aspectRatio="3:4"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-xs font-mono-tabular text-[#B8B8B8] block">
                    {driver.team}
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-[#F5F5F0] tracking-tight leading-tight mt-0.5">
                    {driver.firstName}{' '}
                    <span className="uppercase text-[#E10600]">{driver.lastName}</span>
                  </h3>
                </div>
              </div>

              {/* Driver Stats Matrix */}
              <div className="p-5">
                <div className="grid grid-cols-3 gap-2 pt-1 pb-4 border-b border-white/10 text-center">
                  <div>
                    <span className="text-[11px] font-mono-tabular text-[#B8B8B8] block">POINTS</span>
                    <span className="text-lg font-mono-tabular font-bold text-[#F5F5F0]">
                      {driver.points}
                    </span>
                  </div>
                  <div className="border-l border-r border-white/10">
                    <span className="text-[11px] font-mono-tabular text-[#B8B8B8] block">WINS</span>
                    <span className="text-lg font-mono-tabular font-bold text-[#E10600]">
                      {driver.wins}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono-tabular text-[#B8B8B8] block">PODIUMS</span>
                    <span className="text-lg font-mono-tabular font-bold text-[#F5F5F0]">
                      {driver.podiums}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-[#B8B8B8] line-clamp-2 leading-relaxed">
                  {driver.bio}
                </p>
              </div>
            </div>

            <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] group-hover:text-[#F5F5F0]">
              <span>INSPECT TELEMETRY</span>
              <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
            </div>
          </div>
        ))}
      </div>

      {/* Editorial Feature Link Banner */}
      <div className="mt-16 bg-[#151515] border border-white/15 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono-tabular text-[#E10600]">
            FEATURED PERFORMANCE DISPATCH
          </span>
          <h3 className="text-2xl font-display font-bold text-[#F5F5F0] mt-1">
            How an F1 Driver Prepares for Race Day: 6G Neck Loads & Neuro-Visual Conditioning
          </h3>
        </div>
        <button
          onClick={() => onSelectArticleById('driver-prepares-race-day')}
          className="px-5 py-2.5 text-xs font-mono-tabular font-semibold bg-[#E10600] hover:bg-[#B00000] text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0"
        >
          READ FULL ANALYSIS
        </button>
      </div>
    </div>
  );
};
