import React, { useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, FileText, User, Shield, MapPin } from 'lucide-react';
import { ARTICLES, Article } from '../data/articles';
import { DRIVERS, TEAMS, CIRCUITS } from '../data/f1Data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  onSelectArticle: (article: Article) => void;
  onNavigateTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  query,
  setQuery,
  onSelectArticle,
  onNavigateTab,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();

  const matchedArticles = normalized
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(normalized) ||
          a.subtitle.toLowerCase().includes(normalized) ||
          a.category.toLowerCase().includes(normalized) ||
          a.excerpt.toLowerCase().includes(normalized)
      )
    : ARTICLES.slice(0, 4);

  const matchedDrivers = normalized
    ? DRIVERS.filter(
        (d) =>
          d.name.toLowerCase().includes(normalized) ||
          d.team.toLowerCase().includes(normalized) ||
          d.nationality.toLowerCase().includes(normalized)
      )
    : [];

  const matchedTeams = normalized
    ? TEAMS.filter(
        (t) =>
          t.name.toLowerCase().includes(normalized) ||
          t.base.toLowerCase().includes(normalized) ||
          t.technicalProfile.toLowerCase().includes(normalized)
      )
    : [];

  const matchedCircuits = normalized
    ? CIRCUITS.filter(
        (c) =>
          c.name.toLowerCase().includes(normalized) ||
          c.country.toLowerCase().includes(normalized) ||
          c.city.toLowerCase().includes(normalized)
      )
    : [];

  const quickTopics = ['Undercut Strategy', 'Ground Effect', 'Senna', 'Pit Stop', 'Monza', 'Qualifying', '2026 Regulations'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-3xl bg-[#151515] border border-white/15 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-white/10 bg-[#080808]">
          <Search className="w-5 h-5 text-[#E10600] mr-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, drivers, teams, circuits, or technical topics..."
            className="w-full bg-transparent text-[#F5F5F0] placeholder-[#B8B8B8]/60 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-mono-tabular text-[#B8B8B8] hover:text-[#F5F5F0] mr-3 px-2 py-1"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-[#B8B8B8] hover:text-[#F5F5F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Topic Filters */}
        <div className="px-6 py-3 bg-[#101010] border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono-tabular text-[#B8B8B8] shrink-0 mr-1">Topics:</span>
          {quickTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setQuery(topic)}
              className="px-2.5 py-1 text-xs font-mono-tabular bg-[#151515] hover:bg-[#E10600] text-[#F5F5F0] border border-white/10 transition-colors whitespace-nowrap shrink-0"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-6 space-y-6">
          {/* Articles Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono-tabular uppercase tracking-widest text-[#B8B8B8]">
                {normalized ? `Matching Editorial Stories (${matchedArticles.length})` : 'Featured Journal Dispatches'}
              </span>
            </div>
            {matchedArticles.length === 0 ? (
              <p className="text-sm text-[#B8B8B8] py-2">No matching articles found.</p>
            ) : (
              <div className="divide-y divide-white/10 border-t border-b border-white/10">
                {matchedArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="w-full py-3.5 px-2 flex items-start justify-between gap-4 text-left hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-[#E10600] mt-1 shrink-0" />
                      <div>
                        <div className="text-xs font-mono-tabular text-[#B8B8B8] mb-0.5">
                          <span>{art.number}</span>
                          <span className="mx-1.5">·</span>
                          <span className="text-[#E10600]">{art.category}</span>
                          <span className="mx-1.5">·</span>
                          <span>{art.readingTime}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                          {art.title}
                        </h4>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#B8B8B8] group-hover:text-[#E10600] shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Drivers, Teams, Circuits Matches when searching */}
          {normalized && (matchedDrivers.length > 0 || matchedTeams.length > 0 || matchedCircuits.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {matchedDrivers.length > 0 && (
                <div className="bg-[#080808] p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E10600] mb-3">
                    <User className="w-3.5 h-3.5" />
                    <span>DRIVERS ({matchedDrivers.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedDrivers.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          onNavigateTab('drivers');
                          onClose();
                        }}
                        className="w-full text-left text-xs py-1.5 hover:text-[#E10600] transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-[#F5F5F0]">{d.name}</span>
                        <span className="font-mono-tabular text-[#B8B8B8]">#{d.number}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedTeams.length > 0 && (
                <div className="bg-[#080808] p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E10600] mb-3">
                    <Shield className="w-3.5 h-3.5" />
                    <span>TEAMS ({matchedTeams.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedTeams.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          onNavigateTab('teams');
                          onClose();
                        }}
                        className="w-full text-left text-xs py-1.5 hover:text-[#E10600] transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-[#F5F5F0]">{t.name}</span>
                        <span className="font-mono-tabular text-[#B8B8B8]">P{t.position}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {matchedCircuits.length > 0 && (
                <div className="bg-[#080808] p-4 border border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#E10600] mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>CIRCUITS ({matchedCircuits.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedCircuits.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onNavigateTab('circuits');
                          onClose();
                        }}
                        className="w-full text-left text-xs py-1.5 hover:text-[#E10600] transition-colors flex items-center justify-between"
                      >
                        <span className="font-semibold text-[#F5F5F0] truncate">{c.name}</span>
                        <span className="font-mono-tabular text-[#B8B8B8] shrink-0 ml-2">{c.country}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
