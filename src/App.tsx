/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown, Check } from 'lucide-react';
import { ARTICLES, Article } from './data/articles';
import { HomeView } from './components/HomeView';
import { ArticleReader } from './components/ArticleReader';
import { DriversView } from './components/DriversView';
import { TeamsView } from './components/TeamsView';
import { CircuitsView } from './components/CircuitsView';
import { CalendarView } from './components/CalendarView';
import { StatisticsView } from './components/StatisticsView';
import { AboutView } from './components/AboutView';
import { SearchModal } from './components/SearchModal';

type NavTab =
  | 'home'
  | 'latest'
  | 'analysis'
  | 'drivers'
  | 'teams'
  | 'circuits'
  | 'calendar'
  | 'statistics'
  | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const handleNavigate = (tab: NavTab) => {
    setSelectedArticle(null);
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const handleSelectArticleById = (id: string) => {
    const found = ARTICLES.find((a) => a.id === id);
    if (found) {
      setSelectedArticle(found);
    }
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail.includes('@')) {
      setFooterSubscribed(true);
      setFooterEmail('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F5F0]">
      {/* Sticky Navigation Bar — Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#080808]/95 backdrop-blur-md border-b border-white/15">
        <div className="max-w-[1380px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('home');
            }}
            className="text-2xl font-display font-extrabold tracking-tight text-[#F5F5F0] hover:text-[#E10600] transition-colors whitespace-nowrap"
          >
            APEX
          </a>

          {/* Zone 2: Clean text navigation links (5 visible + More dropdown on desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono-tabular tracking-wider uppercase">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'analysis', label: 'Analysis' },
                { id: 'drivers', label: 'Drivers' },
                { id: 'teams', label: 'Teams' },
                { id: 'circuits', label: 'Circuits' },
              ] as { id: NavTab; label: string }[]
            ).map((item) => {
              const isActive = !selectedArticle && activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#E10600] text-[#F5F5F0] font-semibold'
                      : 'border-transparent text-[#B8B8B8] hover:text-[#F5F5F0] hover:border-white/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* More Dropdown for Calendar, Statistics, About */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1 py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  !selectedArticle && ['calendar', 'statistics', 'about'].includes(activeTab)
                    ? 'border-[#E10600] text-[#F5F5F0] font-semibold'
                    : 'border-transparent text-[#B8B8B8] hover:text-[#F5F5F0]'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute right-0 mt-3 w-44 bg-[#151515] border border-white/15 shadow-2xl py-1.5 z-50"
                >
                  {(
                    [
                      { id: 'calendar', label: 'Calendar' },
                      { id: 'statistics', label: 'Statistics' },
                      { id: 'about', label: 'About' },
                    ] as { id: NavTab; label: string }[]
                  ).map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleNavigate(sub.id)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-mono-tabular uppercase transition-colors ${
                        !selectedArticle && activeTab === sub.id
                          ? 'bg-[#E10600] text-[#F5F5F0]'
                          : 'text-[#B8B8B8] hover:bg-white/5 hover:text-[#F5F5F0]'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: 1–2 Primary Actions (Search + Prominent Red "LATEST" Button) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search articles, drivers, teams, and circuits"
              className="p-2 text-[#B8B8B8] hover:text-[#F5F5F0] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                handleNavigate('latest');
                setTimeout(() => {
                  const grid = document.getElementById('featured-editorial-grid');
                  if (grid) grid.scrollIntoView({ behavior: 'smooth' });
                }, 60);
              }}
              className="px-4 py-2 text-xs font-mono-tabular font-bold tracking-wider uppercase bg-[#E10600] hover:bg-[#B00000] text-[#F5F5F0] transition-colors whitespace-nowrap shrink-0"
            >
              LATEST
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-[#F5F5F0] hover:text-[#E10600] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080808] border-b border-white/15 px-4 pt-3 pb-6 space-y-1">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'latest', label: 'Latest Stories' },
                { id: 'analysis', label: 'Technical & Strategy Analysis' },
                { id: 'drivers', label: 'Drivers' },
                { id: 'teams', label: 'Teams' },
                { id: 'circuits', label: 'Circuits' },
                { id: 'calendar', label: 'Race Calendar' },
                { id: 'statistics', label: 'Data & Statistics' },
                { id: 'about', label: 'About APEX' },
              ] as { id: NavTab; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-3 py-2.5 text-xs font-mono-tabular uppercase tracking-wider border-l-2 transition-colors ${
                  !selectedArticle && activeTab === item.id
                    ? 'border-[#E10600] bg-[#151515] text-[#F5F5F0] font-bold'
                    : 'border-transparent text-[#B8B8B8] hover:text-[#F5F5F0]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedArticle ? (
          <ArticleReader
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onSelectArticle={handleSelectArticle}
          />
        ) : (
          <>
            {(activeTab === 'home' || activeTab === 'latest') && (
              <HomeView
                onSelectArticle={handleSelectArticle}
                onNavigateTab={(t) => handleNavigate(t as NavTab)}
                initialCategoryFilter="ALL"
              />
            )}
            {activeTab === 'analysis' && (
              <HomeView
                onSelectArticle={handleSelectArticle}
                onNavigateTab={(t) => handleNavigate(t as NavTab)}
                initialCategoryFilter="Strategy"
              />
            )}
            {activeTab === 'drivers' && (
              <DriversView onSelectArticleById={handleSelectArticleById} />
            )}
            {activeTab === 'teams' && (
              <TeamsView onSelectArticleById={handleSelectArticleById} />
            )}
            {activeTab === 'circuits' && (
              <CircuitsView onSelectArticleById={handleSelectArticleById} />
            )}
            {activeTab === 'calendar' && (
              <CalendarView onNavigateCircuits={() => handleNavigate('circuits')} />
            )}
            {activeTab === 'statistics' && <StatisticsView />}
            {activeTab === 'about' && (
              <AboutView onExploreArticles={() => handleNavigate('home')} />
            )}
          </>
        )}
      </main>

      {/* Large Editorial Footer */}
      <footer className="bg-[#080808] border-t border-white/15 pt-16 pb-12 text-[#B8B8B8]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Col 1: Brand & Tagline (4 Cols) */}
            <div className="lg:col-span-4">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('home');
                }}
                className="text-3xl font-display font-extrabold tracking-tight text-[#F5F5F0]"
              >
                APEX
              </a>
              <p className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest mt-1">
                The F1 Racing Journal — Where speed meets strategy.
              </p>
              <p className="mt-4 text-sm text-[#B8B8B8] leading-relaxed max-w-sm">
                An independent Formula 1 digital magazine dedicated to race strategy, ground-effect aerodynamics, driver telemetry, and the culture of Grand Prix motorsport.
              </p>
            </div>

            {/* Col 2: Journal Navigation (2 Cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5F5F0] mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs font-mono-tabular">
                {(
                  [
                    { id: 'home', label: 'Home' },
                    { id: 'latest', label: 'Latest Dispatches' },
                    { id: 'drivers', label: 'Drivers Grid' },
                    { id: 'teams', label: 'Constructors' },
                    { id: 'circuits', label: 'Circuit Atlas' },
                    { id: 'calendar', label: 'Race Calendar' },
                    { id: 'statistics', label: 'Data & Standings' },
                    { id: 'about', label: 'About & Masthead' },
                  ] as { id: NavTab; label: string }[]
                ).map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigate(item.id)}
                      className="hover:text-[#E10600] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: 10 Editorial Dispatches Quick Access (3 Cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5F5F0] mb-4">
                Featured Dispatches
              </h4>
              <ul className="space-y-2 text-xs">
                {ARTICLES.slice(0, 6).map((art) => (
                  <li key={art.id}>
                    <button
                      onClick={() => handleSelectArticle(art)}
                      className="text-left hover:text-[#F5F5F0] transition-colors line-clamp-1"
                    >
                      <span className="font-mono-tabular text-[#E10600] mr-1.5">{art.number}.</span>
                      {art.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Newsletter & Socials (3 Cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-xs font-mono-tabular uppercase tracking-widest text-[#F5F5F0] mb-4">
                The Weekend Brief
              </h4>
              <p className="text-xs text-[#B8B8B8] leading-relaxed mb-4">
                Receive Thursday technical previews and Sunday post-race strategy telemetry straight to your inbox.
              </p>
              {footerSubscribed ? (
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#F5C542]">
                  <Check className="w-4 h-4 text-[#E10600]" />
                  <span>SUBSCRIBED TO BRIEFING</span>
                </div>
              ) : (
                <form onSubmit={handleFooterSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Email address..."
                    aria-label="Footer newsletter email"
                    className="w-full px-3 py-2 bg-[#151515] border border-white/15 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#E10600]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#E10600] hover:bg-[#B00000] text-xs font-mono-tabular font-bold text-[#F5F5F0] shrink-0"
                  >
                    JOIN
                  </button>
                </form>
              )}

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-4 text-xs font-mono-tabular">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-[#F5F5F0] hover:text-[#E10600] transition-colors"
                >
                  SEARCH ARCHIVE
                </button>
                <span>·</span>
                <button
                  onClick={() => handleNavigate('about')}
                  className="text-[#F5F5F0] hover:text-[#E10600] transition-colors"
                >
                  MASTHEAD
                </button>
              </div>
            </div>
          </div>

          {/* Copyright & Mandatory Independence Disclaimer */}
          <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs font-mono-tabular text-[#B8B8B8]/80">
            <div>
              © {new Date().getFullYear()} APEX — The F1 Racing Journal. All rights reserved.
            </div>
            <p className="max-w-3xl text-[11px] leading-relaxed">
              Disclaimer: APEX is an independent F1 editorial project and is not affiliated with, endorsed by, or associated with Scuderia Ferrari, Ferrari S.p.A., Formula One Management, or the FIA. Standings and telemetry metrics are curated sample datasets for editorial demonstration.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        query={searchQuery}
        setQuery={setSearchQuery}
        onSelectArticle={handleSelectArticle}
        onNavigateTab={(t) => handleNavigate(t as NavTab)}
      />
    </div>
  );
}

