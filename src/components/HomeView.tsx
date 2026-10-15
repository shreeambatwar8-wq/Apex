import React, { useState, useEffect } from 'react';
import { ARTICLES, Article, GENERATED_IMAGES } from '../data/articles';
import { DRIVERS, TEAMS, CIRCUITS } from '../data/f1Data';
import { SafeImage } from './SafeImage';
import { ArrowUpRight, Clock, Check } from 'lucide-react';

interface HomeViewProps {
  onSelectArticle: (article: Article) => void;
  onNavigateTab: (tab: string) => void;
  initialCategoryFilter?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectArticle,
  onNavigateTab,
  initialCategoryFilter = 'ALL',
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategoryFilter);
  const [countdown, setCountdown] = useState({ days: 11, hours: 18, mins: 42, secs: 19 });
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'IDLE' | 'ERROR' | 'SUBSCRIBED'>('IDLE');

  useEffect(() => {
    setCategoryFilter(initialCategoryFilter);
  }, [initialCategoryFilter]);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setEmailStatus('ERROR');
      return;
    }
    setEmailStatus('SUBSCRIBED');
    setEmail('');
  };

  const leadArticle = ARTICLES[0]; // "The Strategy Wars That Decide a Grand Prix"
  const secondaryHighlights = ARTICLES.slice(1, 6); // 5 key stories around lead
  const categories = ['ALL', 'Strategy', 'Technical', 'History', 'Performance', 'Circuits', 'Data & Telemetry', 'Culture', 'Future Tech'];

  const filteredArchive =
    categoryFilter === 'ALL'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === categoryFilter);

  return (
    <div className="bg-[#080808] text-[#F5F5F0]">
      {/* 1. Full-Screen Cinematic Hero Section */}
      <section className="relative min-h-[560px] sm:min-h-[70vh] lg:min-h-[82vh] flex items-end overflow-hidden border-b border-white/15 bg-[#080808]">
        {/* Background Hero Image with Measured Dark & Crimson Scrim */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <SafeImage
            src={GENERATED_IMAGES.heroCar}
            alt="APEX Formula 1 crimson race car speeding through corner with sparks"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#080808] to-transparent" />
        </div>

        {/* Hero Editorial Content */}
        <div className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-8 pt-20 sm:pt-28 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-3xl">
            {/* Brand Journal Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono-tabular text-[#F5F5F0] mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-[#E10600] inline-block shrink-0" />
              <span className="font-bold tracking-widest text-[#E10600]">APEX</span>
              <span aria-hidden="true" className="text-white/30">—</span>
              <span className="tracking-wider uppercase text-[#F5F5F0]">The F1 Racing Journal</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-[#F5C542] hidden sm:inline">Where speed meets strategy.</span>
            </div>

            {/* Dominant Display Headline */}
            <h1
              className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase leading-[1.08] sm:leading-[1.03]"
              style={{ textWrap: 'balance' }}
            >
              THE ART OF GOING FASTER.
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-[#F5F5F0]/85 leading-relaxed max-w-2xl">
              Race weekends, rivalries, strategy, technology and the stories behind Formula 1.
            </p>

            {/* Single Dominant Primary CTA */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-editorial-grid');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-mono-tabular font-semibold tracking-wider uppercase bg-[#E10600] hover:bg-[#B00000] text-[#F5F5F0] transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <span>EXPLORE THE LATEST</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectArticle(leadArticle)}
                className="px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-mono-tabular tracking-wider uppercase bg-[#151515]/90 hover:bg-white/10 text-[#F5F5F0] border border-white/20 transition-colors text-center whitespace-nowrap"
              >
                READ COVER STORY: STRATEGY WARS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live-Looking Race Information Strip (Below Hero) */}
      <section className="bg-[#151515] border-b border-white/15">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-white/10 font-mono-tabular">
            <div className="pt-2 md:pt-0">
              <span className="text-[11px] text-[#E10600] font-semibold block">NEXT RACE (RD 19)</span>
              <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block truncate">
                United States GP
              </span>
            </div>

            <div className="pt-2 md:pt-0 md:pl-5">
              <span className="text-[11px] text-[#B8B8B8] block">CIRCUIT</span>
              <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block truncate">
                Circuit of the Americas
              </span>
            </div>

            <div className="pt-2 md:pt-0 md:pl-5">
              <span className="text-[11px] text-[#B8B8B8] block">RACE DATE</span>
              <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block">
                18 OCT 2026
              </span>
            </div>

            <div className="pt-2 md:pt-0 md:pl-5">
              <span className="text-[11px] text-[#B8B8B8] block">CHAMPIONSHIP LEADER</span>
              <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block truncate">
                C. Leclerc <span className="text-[#E10600]">(342 PTS)</span>
              </span>
            </div>

            <div className="pt-2 md:pt-0 md:pl-5">
              <span className="text-[11px] text-[#B8B8B8] block">CONSTRUCTORS LEADER</span>
              <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block truncate">
                Scuderia Maranello <span className="text-[#F5C542]">(618)</span>
              </span>
            </div>

            <div className="pt-2 md:pt-0 md:pl-5">
              <span className="text-[11px] text-[#F5C542] flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#E10600]" />
                LIGHTS OUT COUNTDOWN
              </span>
              <span className="text-sm font-bold text-[#F5F5F0] mt-0.5 block">
                {String(countdown.days).padStart(2, '0')}D : {String(countdown.hours).padStart(2, '0')}H :{' '}
                {String(countdown.mins).padStart(2, '0')}M :{' '}
                <span className="text-[#E10600]">{String(countdown.secs).padStart(2, '0')}S</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Articles Asymmetric 3-Tier Editorial Grid */}
      <section id="featured-editorial-grid" className="max-w-[1380px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-white/15 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-2">
              <span className="text-[#E10600] font-semibold">ISSUE XIV · AUTUMN CHAMPIONSHIP EDITION</span>
              <span aria-hidden="true">·</span>
              <span>WHERE SPEED MEETS STRATEGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
              FEATURED STORIES
            </h2>
          </div>
          <span className="text-xs font-mono-tabular text-[#B8B8B8]">
            SELECT ANY DISPATCH FOR FULL MAGAZINE VIEW & TELEMETRY
          </span>
        </div>

        {/* Tier 1 (Lead Cover Story) + Tier 2 (2 Side Stories) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Dominant Cover Story (7 Columns) */}
          <div
            onClick={() => onSelectArticle(leadArticle)}
            className="lg:col-span-7 group cursor-pointer bg-[#151515] border border-white/15 hover:border-[#E10600] transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="overflow-hidden relative">
                <SafeImage
                  src={leadArticle.heroImage}
                  alt={leadArticle.title}
                  aspectRatio="16:9"
                  className="group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-4 left-4 bg-[#080808]/90 px-3 py-1 border-l-2 border-[#E10600] text-xs font-mono-tabular text-[#F5F5F0]">
                  COVER DISPATCH · NO. {leadArticle.number}
                </div>
              </div>

              <div className="p-6 sm:p-8">
                {/* Clean unboxed metadata */}
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-3">
                  <span className="text-[#E10600] font-semibold">{leadArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.readingTime}</span>
                </div>

                <h3
                  className="text-2xl sm:text-4xl font-display font-extrabold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {leadArticle.title}
                </h3>

                <p className="mt-4 text-base text-[#B8B8B8] leading-relaxed">
                  {leadArticle.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] group-hover:text-[#F5F5F0]">
              <span>BY {leadArticle.author.name.toUpperCase()}</span>
              <span className="inline-flex items-center gap-1.5 text-[#E10600] font-semibold">
                READ FULL ANALYSIS <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Right Column: 2 Stacked Secondary Features (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {secondaryHighlights.slice(0, 2).map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectArticle(story)}
                className="group cursor-pointer bg-[#151515] border border-white/10 hover:border-[#E10600] transition-colors flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="overflow-hidden">
                    <SafeImage
                      src={story.heroImage}
                      alt={story.title}
                      aspectRatio="16:9"
                      className="max-h-48 group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-2">
                      <span className="text-[#E10600] font-bold">{story.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{story.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{story.readingTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>{story.date}</span>
                    </div>
                    <h3 className="text-xl font-display font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#B8B8B8] line-clamp-2 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] group-hover:text-[#F5F5F0]">
                  <span>{story.author.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 3: 3-Column Feature Row for Remaining Featured Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryHighlights.slice(2, 5).map((story) => (
            <div
              key={story.id}
              onClick={() => onSelectArticle(story)}
              className="group cursor-pointer bg-[#151515] border border-white/10 hover:border-[#E10600] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden">
                  <SafeImage
                    src={story.heroImage}
                    alt={story.title}
                    aspectRatio="4:3"
                    className="group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-2">
                    <span className="text-[#E10600] font-bold">{story.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.readingTime}</span>
                    <span aria-hidden="true">·</span>
                    <span>{story.date}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                    {story.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#B8B8B8] line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] group-hover:text-[#F5F5F0]">
                <span>READ DISPATCH</span>
                <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Complete 10-Article Interactive Index & Category Filter */}
      <section className="bg-[#101010] border-t border-b border-white/15 py-16 lg:py-20">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 mb-10 border-b border-white/15 gap-6">
            <div>
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest block mb-2">
                COMPLETE EDITORIAL ARCHIVE · 10 IN-DEPTH ESSAYS
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
                THE COMPLETE RACING JOURNAL
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#151515] border border-white/10 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-mono-tabular transition-colors whitespace-nowrap shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-[#E10600] text-[#F5F5F0] font-semibold'
                      : 'text-[#B8B8B8] hover:text-[#F5F5F0]'
                  }`}
                >
                  {cat === 'ALL' ? 'All 10 Articles' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArchive.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="group cursor-pointer bg-[#151515] border border-white/10 hover:border-[#E10600] transition-colors grid grid-cols-1 sm:grid-cols-12 overflow-hidden"
              >
                <div className="sm:col-span-5 overflow-hidden">
                  <SafeImage
                    src={article.heroImage}
                    alt={article.title}
                    aspectRatio="4:3"
                    className="h-full group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-2">
                      <span className="text-[#E10600] font-bold">NO. {article.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#B8B8B8] line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8]">
                    <span>{article.date}</span>
                    <span className="text-[#E10600] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      OPEN ARTICLE <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Championship Standings & Circuit Telemetry Preview Hub */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Top Drivers & Constructors Standings Snapshot */}
          <div className="lg:col-span-7 bg-[#151515] border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                    CHAMPIONSHIP PULSE (SAMPLE TELEMETRY)
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-[#F5F5F0] mt-0.5 uppercase">
                    2026 Title Race Standings
                  </h3>
                </div>
                <button
                  onClick={() => onNavigateTab('statistics')}
                  className="text-xs font-mono-tabular text-[#E10600] hover:underline whitespace-nowrap"
                >
                  FULL TELEMETRY TABLE →
                </button>
              </div>

              <div className="space-y-4">
                {DRIVERS.slice(0, 5).map((d) => (
                  <div key={d.id} className="bg-[#080808] p-4 border border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono-tabular mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[#E10600] font-bold">P0{d.position}</span>
                        <span className="font-sans font-bold text-sm text-[#F5F5F0]">
                          {d.name}
                        </span>
                        <span className="text-[#B8B8B8]">#{d.number} · {d.team}</span>
                      </div>
                      <span className="text-sm font-bold text-[#F5F5F0]">{d.points} PTS</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#151515]">
                      <div
                        className="h-full bg-[#E10600]"
                        style={{ width: `${Math.round((d.points / 350) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tabular">
              <span className="text-[#B8B8B8]">
                CONSTRUCTORS LEADER: <strong className="text-[#F5F5F0]">{TEAMS[0].name} (618 PTS)</strong>
              </span>
              <button
                onClick={() => onNavigateTab('drivers')}
                className="text-[#F5C542] hover:underline"
              >
                EXPLORE ALL DRIVER PROFILES →
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Technical Circuit Diagram Spotlight */}
          <div className="lg:col-span-5 bg-[#151515] border border-white/15 p-6 sm:p-8 flex flex-col justify-between bg-speed-grid">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                    CIRCUIT TELEMETRY SPOTLIGHT
                  </span>
                  <h3 className="text-2xl font-display font-extrabold text-[#F5F5F0] mt-0.5 uppercase">
                    {CIRCUITS[0].name}
                  </h3>
                </div>
                <span className="text-xs font-mono-tabular text-[#F5C542]">
                  {CIRCUITS[0].lengthKm}
                </span>
              </div>

              <div className="py-6 bg-[#080808] border border-white/10 flex items-center justify-center mb-6">
                <svg viewBox="0 0 200 130" className="w-60 h-36">
                  <path
                    d={CIRCUITS[0].svgPath}
                    fill="none"
                    stroke="rgba(225,6,0,0.25)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d={CIRCUITS[0].svgPath}
                    fill="none"
                    stroke="#E10600"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono-tabular text-center mb-6">
                <div className="bg-[#080808] p-3 border border-white/10">
                  <span className="text-[10px] text-[#B8B8B8] block">V-MAX</span>
                  <span className="text-base font-bold text-[#F5F5F0]">358 km/h</span>
                </div>
                <div className="bg-[#080808] p-3 border border-white/10">
                  <span className="text-[10px] text-[#B8B8B8] block">FULL THROTTLE</span>
                  <span className="text-base font-bold text-[#E10600]">81%</span>
                </div>
                <div className="bg-[#080808] p-3 border border-white/10">
                  <span className="text-[10px] text-[#B8B8B8] block">LAP RECORD</span>
                  <span className="text-base font-bold text-[#F5C542]">1:21.046</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('circuits')}
              className="w-full py-3 text-xs font-mono-tabular font-semibold bg-[#080808] hover:bg-[#E10600] text-[#F5F5F0] border border-white/15 transition-colors"
            >
              LAUNCH INTERACTIVE CIRCUIT ATLAS →
            </button>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Section: "THE WEEKEND BRIEF" */}
      <section className="bg-[#151515] border-t border-white/15 bg-diagonal-stripe">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8 py-16 lg:py-20">
          <div className="bg-[#080808] border border-white/15 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E10600] mb-3">
                <span className="w-2 h-2 bg-[#E10600] inline-block" />
                <span>FREE PADDOCK DISPATCH · EVERY THURSDAY & SUNDAY NIGHT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#F5F5F0] uppercase">
                THE WEEKEND BRIEF
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#B8B8B8] leading-relaxed max-w-2xl">
                Get the biggest F1 stories, race analysis and strategy breakdowns delivered to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {emailStatus === 'SUBSCRIBED' ? (
                <div className="bg-[#151515] border-l-2 border-[#E10600] p-6">
                  <div className="flex items-center gap-2 text-sm font-mono-tabular text-[#F5C542] font-bold">
                    <Check className="w-4 h-4 text-[#E10600]" />
                    <span>SUBSCRIPTION CONFIRMED</span>
                  </div>
                  <p className="text-xs text-[#B8B8B8] mt-2 leading-relaxed">
                    You are now registered for <strong>The Weekend Brief</strong>. Your next pre-race telemetry dossier arrives ahead of FP1 in Austin.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3" noValidate>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailStatus === 'ERROR') setEmailStatus('IDLE');
                      }}
                      placeholder="Enter your email address..."
                      aria-label="Email address for The Weekend Brief"
                      className="flex-1 px-4 py-3.5 bg-[#151515] border border-white/20 text-sm text-[#F5F5F0] placeholder-[#B8B8B8]/60 focus:outline-none focus:border-[#E10600]"
                    />
                    <button
                      type="submit"
                      className="px-7 py-3.5 text-xs font-mono-tabular font-bold tracking-wider uppercase bg-[#E10600] hover:bg-[#B00000] text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0"
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                  {emailStatus === 'ERROR' && (
                    <p className="text-xs font-mono-tabular text-[#E10600]">
                      Please enter a valid email address (e.g. strategist@apexjournal.com).
                    </p>
                  )}
                  <p className="text-[11px] font-mono-tabular text-[#B8B8B8]">
                    Zero spam. Pure telemetry, tyre strategy, and technical journalism.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
