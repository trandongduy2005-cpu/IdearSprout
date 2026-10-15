import React, { useState } from 'react';
import { SproutResult } from '../types';
import { JourneyTimeline } from './JourneyTimeline';
import { VideoConceptViewer } from './VideoConceptViewer';
import { RefinementChat } from './RefinementChat';
import {
  Sprout,
  Rocket,
  FileText,
  Film,
  MessageSquare,
  Copy,
  Check,
  Download,
  Share2,
  Star,
  Users,
  AlertTriangle,
  Lightbulb,
  Layers,
  ArrowRight,
  ExternalLink,
  Code2,
  Calendar,
  Sparkles,
} from 'lucide-react';

import { UILanguage, TRANSLATIONS } from '../i18n/translations';
import { UserProfile } from '../types';

interface SproutViewProps {
  sprout: SproutResult;
  uiLanguage?: UILanguage;
  currentUser?: UserProfile;
  onToggleFavorite: (id: string) => void;
  onOpenOnePager: () => void;
  onNewSprout: () => void;
}

export const SproutView: React.FC<SproutViewProps> = ({
  sprout,
  uiLanguage = 'vi',
  currentUser,
  onToggleFavorite,
  onOpenOnePager,
  onNewSprout,
}) => {
  const t = TRANSLATIONS[uiLanguage] || TRANSLATIONS.vi;
  const [activeTab, setActiveTab] = useState<'all' | 'overview' | 'analysis' | 'draft' | 'video' | 'markdown' | 'refine'>('all');
  const [copiedMd, setCopiedMd] = useState(false);

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(sprout.formattedMarkdown);
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([sprout.formattedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sprout.productName.toLowerCase().replace(/\s+/g, '-')}-prd.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-7 pb-16 animate-fade-in">
      {/* Concept Hero Header Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/5 border border-emerald-100 overflow-hidden">
        {/* Soft emerald background highlights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-100/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            {/* Personalized Real-User Greeting Badge */}
            {sprout.greeting && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 text-xs sm:text-sm font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{sprout.greeting}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nurtured Blueprint</span>
              </span>
              {sprout.userName && (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                  Creator: {sprout.userName} ({sprout.authProvider === 'google' ? 'Google OAuth' : 'Facebook'})
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
                Detected: {sprout.languageDetected || 'Auto'}
              </span>
              <span className="text-xs text-stone-400">
                {new Date(sprout.createdAt).toLocaleDateString()}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {sprout.productName}
            </h2>

            <p className="text-base sm:text-lg text-emerald-700 font-medium leading-relaxed">
              {sprout.tagline}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => onToggleFavorite(sprout.id)}
              className="p-2.5 rounded-2xl border border-stone-200 hover:border-amber-300 bg-white hover:bg-amber-50/50 text-stone-600 transition-colors shadow-2xs"
              title="Star favorite"
            >
              <Star
                className={`w-4 h-4 ${
                  sprout.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-stone-400'
                }`}
              />
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border border-stone-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/50 text-xs font-semibold text-stone-700 transition-all shadow-2xs"
              title={t.copyMarkdown}
            >
              {copiedMd ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.copyMarkdown}</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenOnePager}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              title={t.onePager}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.onePager}</span>
            </button>

            <button
              onClick={onNewSprout}
              className="px-3.5 py-2 rounded-2xl border border-dashed border-stone-300 hover:border-emerald-400 text-xs font-medium text-stone-600 hover:text-emerald-700 transition-colors"
            >
              {t.newIdea}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-10 flex items-center gap-1 sm:gap-2 mt-8 pt-4 border-t border-stone-100 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold select-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            {t.tabAll}
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            {t.tabOverview}
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'analysis'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            {t.tabExpansion}
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'draft'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            {t.tabDraft}
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'video'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            <span>{t.tabVideo}</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-400 text-stone-900 text-[10px] font-black">
              PRO
            </span>
          </button>
          <button
            onClick={() => setActiveTab('markdown')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 ${
              activeTab === 'markdown'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            {t.tabMarkdown}
          </button>
          <button
            onClick={() => setActiveTab('refine')}
            className={`px-3.5 py-2 rounded-xl transition-all shrink-0 flex items-center gap-1 ${
              activeTab === 'refine'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:bg-emerald-50/70 hover:text-emerald-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{t.tabConsult}</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT: MARKDOWN ONLY */}
      {activeTab === 'markdown' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Full Structured IdeaSprout Document</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                {copiedMd ? 'Copied!' : 'Copy Raw Markdown'}
              </button>
              <button
                onClick={handleDownloadMarkdown}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
              >
                Download .md
              </button>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 font-mono text-xs sm:text-sm text-stone-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {sprout.formattedMarkdown}
          </div>
        </div>
      )}

      {/* TAB CONTENT: REFINE CONSULTATION */}
      {activeTab === 'refine' && <RefinementChat sprout={sprout} currentUser={currentUser} />}

      {/* TAB CONTENT: SECTION 1 OVERVIEW */}
      {(activeTab === 'all' || activeTab === 'overview') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>🌿 1. Idea Overview (Tổng quan Ý tưởng)</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Distillation & Validation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Original Idea Summary */}
            <div className="p-5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Original Idea Summary</span>
              </div>
              <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed">
                {sprout.overview.originalIdeaSummary}
              </p>
              <p className="text-[11px] text-stone-400 italic pt-1">
                Distilled from: "{sprout.rawInput}"
              </p>
            </div>

            {/* Core Value Proposition */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-teal-50/50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Core Value Proposition (UVP)</span>
              </div>
              <p className="text-sm sm:text-base text-emerald-950 font-semibold leading-relaxed">
                {sprout.overview.coreValueProposition}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium pt-1">
                The central unfair advantage and unique catalyst for adoption.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: SECTION 2 EXPANSION & ANALYSIS */}
      {(activeTab === 'all' || activeTab === 'analysis') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>🚀 2. Idea Expansion & Analysis (Mở rộng & Phân tích)</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Market & Product Fit
            </span>
          </div>

          {/* Problem Solved */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-600">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Problem Solved (Vấn đề giải quyết)</span>
            </div>
            <p className="text-sm sm:text-base text-stone-850 leading-relaxed font-medium">
              {sprout.analysis.problemSolved}
            </p>
          </div>

          {/* Target Audience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Target Audience (Khách hàng mục tiêu)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {sprout.analysis.targetAudience.map((aud, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {aud.segment}
                    </span>
                    <span className="text-xs text-stone-300 font-mono">0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {aud.description}
                  </p>
                  {aud.personaQuote && (
                    <blockquote className="text-[11px] text-stone-500 italic border-l-2 border-emerald-300 pl-2 mt-2">
                      "{aud.personaQuote}"
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Features (MVP) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Key Features (Tính năng cốt lõi MVP)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sprout.analysis.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-emerald-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        {feat.priority}
                      </span>
                      <span className="text-xs font-bold text-stone-400">
                        MVP #{idx + 1}
                      </span>
                    </div>
                    <h5 className="text-sm font-bold text-stone-900 mb-1.5">
                      {feat.name}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Challenges & Solutions */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Potential Challenges & Solutions (Thách thức & Giải pháp)</span>
            </div>

            <div className="space-y-3">
              {sprout.analysis.challengesAndSolutions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      Roadblock #{idx + 1}:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {item.challenge}
                    </p>
                  </div>
                  <div className="space-y-1 md:border-l md:border-stone-200 md:pl-4">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Counter-Strategy:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: SECTION 3 PRODUCT CONCEPT DRAFT */}
      {(activeTab === 'all' || activeTab === 'draft') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-7">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>📋 3. Product Concept Draft (Bản phác thảo Sản phẩm)</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              PRD & Execution
            </span>
          </div>

          {/* Suggested Names (3 alternatives) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Suggested App/Product Names (Gợi ý tên sản phẩm)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {sprout.conceptDraft.suggestedNames.map((n, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gradient-to-b from-stone-50 to-white border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Option {idx + 1}
                    </span>
                    {n.vibe && (
                      <span className="text-[10px] text-stone-400 font-medium italic">
                        {n.vibe}
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-black text-stone-900 mb-1">
                    {n.name}
                  </h4>
                  <p className="text-xs text-stone-600 leading-snug">
                    "{n.tagline}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* User Journey Blueprint (Input -> Core Action -> Value Outcome) */}
          <JourneyTimeline steps={sprout.conceptDraft.userJourney} />

          {/* Recommended Tech Stack */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Code2 className="w-4 h-4 text-emerald-600" />
              <span>Recommended Tech Stack (Công nghệ đề xuất)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {sprout.conceptDraft.recommendedTechStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-1.5"
                >
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                    {tech.category}
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                    {tech.recommendation}
                  </h5>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {tech.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Steps */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Recommended Execution Steps (Lộ trình triển khai)</span>
            </div>

            <div className="space-y-2.5">
              {sprout.conceptDraft.executionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-stone-900 mr-2">
                        {step.phase}:
                      </span>
                      <span className="text-xs text-stone-700">{step.task}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 shrink-0 self-start sm:self-auto">
                    {step.timeframe}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: SECTION 4 PREMIUM REAL-WORLD VIDEO CONCEPT */}
      {(activeTab === 'all' || activeTab === 'video') && (
        <section>
          <VideoConceptViewer
            videoConcept={sprout.videoConcept}
            productName={sprout.productName}
          />
        </section>
      )}
    </div>
  );
};
