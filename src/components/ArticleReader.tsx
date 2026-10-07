import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Check, Clock, BookOpen, ArrowUpRight } from 'lucide-react';
import { Article, ARTICLES } from '../data/articles';
import { SafeImage } from './SafeImage';
import { TechnicalDiagram } from './TechnicalDiagrams';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
}) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const relatedArticles = ARTICLES.filter((a) => article.relatedIds.includes(a.id));

  return (
    <article className="min-h-screen bg-[#080808] text-[#F5F5F0] pb-24">
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-0.5 bg-white/10">
        <div
          className="h-full bg-[#E10600] transition-transform duration-75 origin-left"
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* Top Return Bar */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-6 pb-4 flex items-center justify-between border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] hover:text-[#F5F5F0] transition-colors whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 text-[#E10600]" />
          <span>RETURN TO JOURNAL INDEX</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono-tabular text-[#B8B8B8]">
          <span>DISPATCH NO. {article.number}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#E10600]">{article.category}</span>
        </div>
      </div>

      {/* Magazine Editorial Header */}
      <header className="max-w-[1380px] mx-auto px-4 sm:px-8 pt-10 pb-12">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-4">
            <span className="text-[#E10600] font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#E10600]" />
              {article.readingTime}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#F5F5F0] leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#B8B8B8] leading-relaxed max-w-3xl">
            {article.subtitle}
          </p>
        </div>

        {/* Author Byline & Share Action Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs font-mono-tabular">
            <div>
              <span className="text-[#B8B8B8] block">WRITTEN BY</span>
              <span className="text-[#F5F5F0] font-semibold">{article.author.name}</span>
            </div>
            <span className="text-white/20">/</span>
            <div>
              <span className="text-[#B8B8B8] block">DESK ASSIGNMENT</span>
              <span className="text-[#F5F5F0]">{article.author.role}</span>
            </div>
            <span className="text-white/20 hidden sm:inline">/</span>
            <div className="hidden sm:block">
              <span className="text-[#B8B8B8] block">FILING LOCATION</span>
              <span className="text-[#F5C542]">{article.author.location}</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono-tabular bg-[#151515] hover:bg-[#E10600] text-[#F5F5F0] border border-white/15 transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#F5C542]" />
                <span>LINK COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE DISPATCH</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Full-Bleed Cinematic Hero Visual */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 mb-14">
        <div className="border border-white/15 bg-[#151515]">
          <SafeImage
            src={article.heroImage}
            alt={article.title}
            aspectRatio="16:9"
            priority
            className="max-h-[600px]"
          />
          <div className="px-6 py-3.5 bg-[#101010] border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8]">
            <span>{article.heroCaption}</span>
            <span className="text-[#E10600] shrink-0 ml-4">APEX ARCHIVE</span>
          </div>
        </div>
      </div>

      {/* 4-Metric Quick Telemetry Strip */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-8 mb-16">
        <div className="bg-[#151515] border-l-2 border-[#E10600] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
              Executive Telemetry Summary · Sample Benchmark Data
            </span>
            <BookOpen className="w-4 h-4 text-[#B8B8B8]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {article.quickStats.map((stat) => (
              <div key={stat.label} className="border-t border-white/10 pt-4">
                <span className="text-xs text-[#B8B8B8] block mb-1">{stat.label}</span>
                <span className="text-2xl sm:text-3xl font-mono-tabular font-bold text-[#F5F5F0] block">
                  {stat.value}
                </span>
                <span className="text-xs text-[#B8B8B8]/80 mt-1 block">{stat.context}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric Two-Column Reading Canvas (70% Main Essay / 30% Margin Notes) */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left/Center Main Narrative Column */}
        <div className="lg:col-span-8">
          {article.sections.map((section, sIdx) => (
            <section key={section.heading} className="mb-14">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F5F0] mb-6 pb-3 border-b border-white/10">
                {section.heading}
              </h2>

              <div className="space-y-6 text-base sm:text-[17px] text-[#F5F5F0]/90 leading-[1.8] max-w-[68ch]">
                {section.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      sIdx === 0 && pIdx === 0
                        ? 'first-letter:text-5xl first-letter:font-display first-letter:font-extrabold first-letter:text-[#E10600] first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none'
                        : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Custom Technical SVG Diagram */}
              {section.diagramType && <TechnicalDiagram type={section.diagramType} />}

              {/* Editorial Pull Quote */}
              {section.pullQuote && (
                <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#E10600] py-2">
                  <p className="text-xl sm:text-2xl font-display italic text-[#F5F5F0] leading-relaxed">
                    “{section.pullQuote.quote}”
                  </p>
                  <footer className="mt-3 text-xs font-mono-tabular text-[#F5C542]">
                    — {section.pullQuote.attribution}
                  </footer>
                </blockquote>
              )}

              {/* Structured Data Card */}
              {section.dataCard && (
                <div className="my-10 bg-[#151515] border border-white/10 p-6 sm:p-8">
                  <div className="pb-4 mb-6 border-b border-white/10">
                    <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
                      Engineering Data Breakdown
                    </span>
                    <h3 className="text-lg font-display font-bold text-[#F5F5F0] mt-1">
                      {section.dataCard.title}
                    </h3>
                    <p className="text-xs text-[#B8B8B8] mt-0.5">{section.dataCard.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.dataCard.metrics.map((m) => (
                      <div key={m.label} className="bg-[#080808] p-4 border border-white/10">
                        <span className="text-xs font-mono-tabular text-[#B8B8B8] block">
                          {m.label}
                        </span>
                        <span className="text-xl font-mono-tabular font-bold text-[#F5F5F0] mt-1 block">
                          {m.value}
                        </span>
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular">
                          <span className="text-[#E10600]">{m.delta}</span>
                          <span className="text-[#B8B8B8]">{m.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Editorial Image */}
              {section.secondaryImage && (
                <figure className="my-10 border border-white/10 bg-[#151515]">
                  <SafeImage
                    src={section.secondaryImage.src}
                    alt={section.secondaryImage.caption}
                    aspectRatio="16:9"
                  />
                  <figcaption className="px-5 py-3 text-xs font-mono-tabular text-[#B8B8B8] border-t border-white/10">
                    {section.secondaryImage.caption}
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        {/* Right Margin Sidebar (30% Sticky Key Takeaways & Chapter Index) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Key Technical Takeaways */}
            <div className="bg-[#151515] border border-white/10 p-6">
              <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest block mb-3">
                Briefing Key Takeaways
              </span>
              <h3 className="text-base font-display font-bold text-[#F5F5F0] mb-4">
                Essential Technical Conclusions
              </h3>
              <ul className="space-y-4">
                {article.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#B8B8B8] leading-relaxed">
                    <span className="font-mono-tabular text-xs text-[#E10600] font-bold mt-0.5">
                      0{i + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter Outline */}
            <div className="bg-[#151515] border border-white/10 p-6">
              <span className="text-xs font-mono-tabular text-[#B8B8B8] uppercase tracking-widest block mb-3">
                Article Architecture
              </span>
              <div className="space-y-2.5 text-xs font-mono-tabular">
                {article.sections.map((sec) => (
                  <div key={sec.heading} className="py-1.5 border-b border-white/10 text-[#F5F5F0]">
                    {sec.heading}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Dispatches Section */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-8 mt-20 pt-12 border-t border-white/15">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-mono-tabular text-[#E10600] uppercase tracking-widest">
              Continue Reading
            </span>
            <h3 className="text-2xl font-display font-bold text-[#F5F5F0] mt-1">
              Related Technical & Editorial Dispatches
            </h3>
          </div>
          <button
            onClick={onBack}
            className="text-xs font-mono-tabular text-[#B8B8B8] hover:text-[#E10600] transition-colors"
          >
            VIEW ALL 10 ARTICLES →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectArticle(rel)}
              className="group cursor-pointer bg-[#151515] border border-white/10 hover:border-[#E10600] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden">
                  <SafeImage
                    src={rel.heroImage}
                    alt={rel.title}
                    aspectRatio="4:3"
                    className="group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#B8B8B8] mb-2">
                    <span className="text-[#E10600] font-bold">{rel.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rel.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{rel.readingTime}</span>
                  </div>
                  <h4 className="text-lg font-display font-bold text-[#F5F5F0] group-hover:text-[#E10600] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-sm text-[#B8B8B8] mt-2 line-clamp-2">{rel.excerpt}</p>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-tabular text-[#B8B8B8] group-hover:text-[#F5F5F0]">
                <span>READ DISPATCH</span>
                <ArrowUpRight className="w-4 h-4 text-[#E10600]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
