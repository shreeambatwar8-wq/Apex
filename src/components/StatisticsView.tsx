import React, { useState } from 'react';
import { DRIVERS, TEAMS } from '../data/f1Data';

export const StatisticsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DRIVERS' | 'CONSTRUCTORS'>('DRIVERS');

  const maxDriverPoints = Math.max(...DRIVERS.map((d) => d.points));
  const maxTeamPoints = Math.max(...TEAMS.map((t) => t.points));

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/15 pb-8 mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
            <span className="text-[#E10600] font-semibold">CHAMPIONSHIP DATA ANALYTICS</span>
            <span aria-hidden="true">·</span>
            <span>SAMPLE / DEMO TELEMETRY STANDINGS AFTER ROUND 18</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
            DATA & STATISTICS
          </h1>
          <p className="mt-3 text-base text-[#B8B8B8] max-w-2xl">
            Comprehensive Drivers’ and Constructors’ World Championship standings, average qualifying vs race finish deltas, pole conversions, and fastest lap tallies.
          </p>
        </div>

        {/* View Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#151515] border border-white/10 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('DRIVERS')}
            className={`px-4 py-2 text-xs font-mono-tabular transition-colors whitespace-nowrap ${
              activeTab === 'DRIVERS'
                ? 'bg-[#E10600] text-[#F5F5F0] font-semibold'
                : 'text-[#B8B8B8] hover:text-[#F5F5F0]'
            }`}
          >
            Drivers’ Standings
          </button>
          <button
            onClick={() => setActiveTab('CONSTRUCTORS')}
            className={`px-4 py-2 text-xs font-mono-tabular transition-colors whitespace-nowrap ${
              activeTab === 'CONSTRUCTORS'
                ? 'bg-[#E10600] text-[#F5F5F0] font-semibold'
                : 'text-[#B8B8B8] hover:text-[#F5F5F0]'
            }`}
          >
            Constructors’ Standings
          </button>
        </div>
      </div>

      {/* Top 4 Benchmark KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#151515] border border-white/10 p-6">
          <span className="text-xs font-mono-tabular text-[#B8B8B8] block">
            CHAMPIONSHIP LEADER GAP
          </span>
          <span className="text-3xl font-mono-tabular font-bold text-[#E10600] mt-2 block">
            +14 PTS
          </span>
          <span className="text-xs text-[#B8B8B8] mt-1 block">
            C. Leclerc (342) over M. Verstappen (328)
          </span>
        </div>

        <div className="bg-[#151515] border border-white/10 p-6">
          <span className="text-xs font-mono-tabular text-[#B8B8B8] block">
            QUALIFYING POLE BENCHMARK
          </span>
          <span className="text-3xl font-mono-tabular font-bold text-[#F5F5F0] mt-2 block">
            8 POLES
          </span>
          <span className="text-xs text-[#B8B8B8] mt-1 block">
            Charles Leclerc · 1.8 Avg Starting Grid Slot
          </span>
        </div>

        <div className="bg-[#151515] border border-white/10 p-6">
          <span className="text-xs font-mono-tabular text-[#B8B8B8] block">
            CONSTRUCTORS ADVANTAGE
          </span>
          <span className="text-3xl font-mono-tabular font-bold text-[#F5C542] mt-2 block">
            +63 PTS
          </span>
          <span className="text-xs text-[#B8B8B8] mt-1 block">
            Scuderia Maranello (618) vs Woking (555)
          </span>
        </div>

        <div className="bg-[#151515] border border-white/10 p-6">
          <span className="text-xs font-mono-tabular text-[#B8B8B8] block">
            FASTEST PIT STOP RECORD
          </span>
          <span className="text-3xl font-mono-tabular font-bold text-[#F5F5F0] mt-2 block">
            1.82 SEC
          </span>
          <span className="text-xs text-[#B8B8B8] mt-1 block">
            Suzuka Lap 24 · Four-Wheel C2 Hard Change
          </span>
        </div>
      </div>

      {/* Main Standings Table */}
      {activeTab === 'DRIVERS' ? (
        <div className="bg-[#151515] border border-white/15 overflow-x-auto">
          <div className="px-6 py-4 bg-[#080808] border-b border-white/10 flex items-center justify-between">
            <h2 className="text-base font-display font-bold text-[#F5F5F0] uppercase">
              2026 World Drivers’ Championship Classification (Sample Telemetry)
            </h2>
            <span className="text-xs font-mono-tabular text-[#B8B8B8]">18 OF 24 ROUNDS COMPLETED</span>
          </div>

          <table className="w-full text-left border-collapse font-mono-tabular text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[#B8B8B8] bg-[#101010]">
                <th className="py-3.5 px-4">POS</th>
                <th className="py-3.5 px-4">DRIVER</th>
                <th className="py-3.5 px-4">CONSTRUCTOR</th>
                <th className="py-3.5 px-4 text-right">WINS</th>
                <th className="py-3.5 px-4 text-right">PODIUMS</th>
                <th className="py-3.5 px-4 text-right">POLES</th>
                <th className="py-3.5 px-4 text-right">FAST LAPS</th>
                <th className="py-3.5 px-4 text-right">AVG QUALI</th>
                <th className="py-3.5 px-4 text-right">AVG FINISH</th>
                <th className="py-3.5 px-6 text-right">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {DRIVERS.map((d) => {
                const barWidth = Math.round((d.points / maxDriverPoints) * 100);
                return (
                  <tr key={d.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#E10600]">0{d.position}</td>
                    <td className="py-4 px-4">
                      <div className="font-sans font-bold text-[#F5F5F0]">
                        {d.name} <span className="font-mono-tabular text-xs text-[#B8B8B8]">#{d.number}</span>
                      </div>
                      <div className="w-32 h-1 bg-[#080808] mt-1.5">
                        <div className="h-full bg-[#E10600]" style={{ width: `${barWidth}%` }} />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#B8B8B8]">{d.team}</td>
                    <td className="py-4 px-4 text-right font-bold text-[#F5F5F0]">{d.wins}</td>
                    <td className="py-4 px-4 text-right text-[#F5F5F0]">{d.podiums}</td>
                    <td className="py-4 px-4 text-right text-[#F5C542]">{d.poles}</td>
                    <td className="py-4 px-4 text-right text-[#B8B8B8]">{d.fastestLaps}</td>
                    <td className="py-4 px-4 text-right text-[#B8B8B8]">P{d.avgQualifying}</td>
                    <td className="py-4 px-4 text-right text-[#B8B8B8]">P{d.avgFinish}</td>
                    <td className="py-4 px-6 text-right font-bold text-base text-[#F5F5F0]">
                      {d.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[#151515] border border-white/15 overflow-x-auto">
          <div className="px-6 py-4 bg-[#080808] border-b border-white/10 flex items-center justify-between">
            <h2 className="text-base font-display font-bold text-[#F5F5F0] uppercase">
              2026 World Constructors’ Championship Classification (Sample Telemetry)
            </h2>
            <span className="text-xs font-mono-tabular text-[#B8B8B8]">18 OF 24 ROUNDS COMPLETED</span>
          </div>

          <table className="w-full text-left border-collapse font-mono-tabular text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[#B8B8B8] bg-[#101010]">
                <th className="py-3.5 px-4">POS</th>
                <th className="py-3.5 px-4">CONSTRUCTOR</th>
                <th className="py-3.5 px-4">CHASSIS / POWER UNIT</th>
                <th className="py-3.5 px-4 text-right">WINS</th>
                <th className="py-3.5 px-4 text-right">PODIUMS</th>
                <th className="py-3.5 px-4 text-right">POLES</th>
                <th className="py-3.5 px-4 text-right">FAST LAPS</th>
                <th className="py-3.5 px-6 text-right">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {TEAMS.map((t) => {
                const barWidth = Math.round((t.points / maxTeamPoints) * 100);
                return (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-[#E10600]">0{t.position}</td>
                    <td className="py-4 px-4">
                      <div className="font-sans font-bold text-[#F5F5F0]">{t.name}</div>
                      <div className="w-40 h-1 bg-[#080808] mt-1.5">
                        <div className="h-full bg-[#E10600]" style={{ width: `${barWidth}%` }} />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#B8B8B8]">
                      {t.chassis} · {t.powerUnit}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-[#F5F5F0]">{t.wins}</td>
                    <td className="py-4 px-4 text-right text-[#F5F5F0]">{t.podiums}</td>
                    <td className="py-4 px-4 text-right text-[#F5C542]">{t.poles}</td>
                    <td className="py-4 px-4 text-right text-[#B8B8B8]">{t.fastestLaps}</td>
                    <td className="py-4 px-6 text-right font-bold text-base text-[#F5F5F0]">
                      {t.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Visual Qualifying vs Race Pace Comparison Chart */}
      <div className="mt-12 bg-[#151515] border border-white/15 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
              SATURDAY VS SUNDAY EXECUTION
            </span>
            <h3 className="text-xl font-display font-bold text-[#F5F5F0] mt-0.5">
              Average Qualifying Position vs. Average Race Finish
            </h3>
          </div>
          <span className="text-xs font-mono-tabular text-[#B8B8B8]">
            LOWER VALUES INDICATE FRONT-ROW DOMINANCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DRIVERS.slice(0, 6).map((d) => {
            const qualiWidth = Math.max(15, 100 - parseFloat(d.avgQualifying) * 10);
            const finishWidth = Math.max(15, 100 - parseFloat(d.avgFinish) * 10);

            return (
              <div key={d.id} className="bg-[#080808] p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-[#F5F5F0]">
                    {d.name} <span className="text-xs font-mono-tabular text-[#B8B8B8]">({d.team})</span>
                  </span>
                  <span className="text-xs font-mono-tabular text-[#E10600]">
                    {d.poles} Poles / {d.wins} Wins
                  </span>
                </div>

                <div className="space-y-2.5 font-mono-tabular text-xs">
                  <div>
                    <div className="flex justify-between text-[#B8B8B8] mb-1">
                      <span>AVG QUALIFYING SLOT</span>
                      <span className="text-[#F5F5F0]">P{d.avgQualifying}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#151515]">
                      <div className="h-full bg-[#E10600]" style={{ width: `${qualiWidth}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#B8B8B8] mb-1">
                      <span>AVG SUNDAY CLASSIFICATION</span>
                      <span className="text-[#F5C542]">P{d.avgFinish}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#151515]">
                      <div className="h-full bg-[#F5C542]" style={{ width: `${finishWidth}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
