import React, { useState, useEffect } from 'react';
import { CALENDAR_ROUNDS } from '../data/f1Data';
import { SafeImage } from './SafeImage';
import { Clock, CheckCircle2, Flag } from 'lucide-react';

interface CalendarViewProps {
  onNavigateCircuits: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onNavigateCircuits }) => {
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'UPCOMING'>('ALL');
  const [countdown, setCountdown] = useState({ days: 11, hours: 18, mins: 42, secs: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredRounds = CALENDAR_ROUNDS.filter((r) => {
    if (filter === 'ALL') return true;
    if (filter === 'COMPLETED') return r.status === 'COMPLETED';
    return r.status === 'NEXT RACE' || r.status === 'UPCOMING';
  });

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="border-b border-white/15 pb-8 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
            <span className="text-[#E10600] font-semibold">2026 WORLD CHAMPIONSHIP SCHEDULE</span>
            <span aria-hidden="true">·</span>
            <span>CHAMPIONSHIP RUN-IN TIMELINE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
            RACE CALENDAR
          </h1>
          <p className="mt-3 text-base text-[#B8B8B8] max-w-2xl">
            Follow the decisive autumn flyaway rounds across Europe, Asia, and the Americas with live countdowns, circuit maps, and podium archives.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-[#151515] border border-white/10 self-start lg:self-auto">
          {(['ALL', 'COMPLETED', 'UPCOMING'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-1.5 text-xs font-mono-tabular transition-colors whitespace-nowrap ${
                filter === tab
                  ? 'bg-[#E10600] text-[#F5F5F0] font-semibold'
                  : 'text-[#B8B8B8] hover:text-[#F5F5F0]'
              }`}
            >
              {tab === 'ALL' ? 'All Rounds' : tab === 'COMPLETED' ? 'Completed Results' : 'Upcoming Grands Prix'}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-white/15 ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-10">
        {filteredRounds.map((round) => {
          const isNext = round.status === 'NEXT RACE';
          const isCompleted = round.status === 'COMPLETED';

          return (
            <div
              key={round.round}
              className={`relative bg-[#151515] border transition-colors ${
                isNext ? 'border-[#E10600]' : 'border-white/10'
              }`}
            >
              {/* Timeline Node Marker */}
              <div
                className={`absolute -left-[33px] sm:-left-[49px] top-6 w-4 h-4 border-2 ${
                  isNext
                    ? 'bg-[#E10600] border-[#F5C542]'
                    : isCompleted
                    ? 'bg-[#080808] border-[#B8B8B8]'
                    : 'bg-[#080808] border-white/30'
                }`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Image */}
                <div className="lg:col-span-4 relative">
                  <SafeImage
                    src={round.image}
                    alt={round.grandPrix}
                    aspectRatio="16:9"
                    className="h-full"
                  />
                  <div className="absolute top-3 left-3 bg-[#080808]/90 px-3 py-1 border border-white/15 text-xs font-mono-tabular text-[#F5F5F0]">
                    ROUND {round.round}
                  </div>
                </div>

                {/* Middle Column: Race Info */}
                <div className="lg:col-span-5 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular mb-2">
                      {isNext && (
                        <span className="inline-flex items-center gap-1.5 text-[#E10600] font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          NEXT GRAND PRIX
                        </span>
                      )}
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1.5 text-[#B8B8B8]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F5C542]" />
                          FINAL CLASSIFICATION
                        </span>
                      )}
                      {round.status === 'UPCOMING' && (
                        <span className="inline-flex items-center gap-1.5 text-[#B8B8B8]">
                          <Flag className="w-3.5 h-3.5" />
                          SCHEDULED ROUND
                        </span>
                      )}
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <span className="text-[#F5F5F0]">{round.dateRange}</span>
                    </div>

                    <h2 className="text-2xl font-display font-extrabold text-[#F5F5F0]">
                      {round.grandPrix}
                    </h2>
                    <p className="text-xs font-mono-tabular text-[#B8B8B8] mt-1">
                      {round.circuitName} · {round.city}, {round.country}
                    </p>
                  </div>

                  {/* Winner or Countdown */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    {isCompleted ? (
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono-tabular">
                        <div>
                          <span className="text-[#B8B8B8] block">RACE WINNER</span>
                          <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block">
                            {round.winner}
                          </span>
                          <span className="text-[11px] text-[#E10600]">{round.winningTeam}</span>
                        </div>
                        <div>
                          <span className="text-[#B8B8B8] block">POLE POSITION TIME</span>
                          <span className="text-sm font-bold text-[#F5C542] mt-0.5 block">
                            {round.poleTime}
                          </span>
                        </div>
                      </div>
                    ) : isNext ? (
                      <div>
                        <span className="text-[11px] font-mono-tabular text-[#E10600] block mb-2">
                          LIGHTS OUT COUNTDOWN (AUSTIN, TEXAS)
                        </span>
                        <div className="grid grid-cols-4 gap-2 text-center font-mono-tabular bg-[#080808] p-3 border border-white/10">
                          <div>
                            <span className="text-lg font-bold text-[#F5F5F0]">
                              {String(countdown.days).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-[#B8B8B8] block">DAYS</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold text-[#F5F5F0]">
                              {String(countdown.hours).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-[#B8B8B8] block">HRS</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold text-[#F5F5F0]">
                              {String(countdown.mins).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-[#B8B8B8] block">MIN</span>
                          </div>
                          <div>
                            <span className="text-lg font-bold text-[#E10600]">
                              {String(countdown.secs).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-[#B8B8B8] block">SEC</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8]">
                        <span>TELEMETRY PREVIEW OPENS 7 DAYS PRIOR</span>
                        <button
                          onClick={onNavigateCircuits}
                          className="text-[#E10600] hover:underline"
                        >
                          CIRCUIT SPECS →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Circuit Vector Diagram */}
                <div className="lg:col-span-3 p-6 bg-[#080808] flex flex-col items-center justify-center">
                  <svg viewBox="0 0 200 130" className="w-36 h-24">
                    <path
                      d={round.svgPath}
                      fill="none"
                      stroke="#E10600"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <button
                    onClick={onNavigateCircuits}
                    className="mt-3 text-xs font-mono-tabular text-[#B8B8B8] hover:text-[#F5F5F0] transition-colors"
                  >
                    INSPECT TRACK MAP →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
