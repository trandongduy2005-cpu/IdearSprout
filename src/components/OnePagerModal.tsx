import React from 'react';
import { SproutResult } from '../types';
import { X, Printer, Download, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

interface OnePagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sprout: SproutResult;
}

export const OnePagerModal: React.FC<OnePagerModalProps> = ({
  isOpen,
  onClose,
  sprout,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([sprout.formattedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sprout.productName.toLowerCase().replace(/\s+/g, '-')}-blueprint.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-100 my-8">
        {/* Controls Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              IdeaSprout One-Pager
            </span>
            <span className="text-xs text-stone-400">
              Generated {new Date(sprout.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-emerald-300 text-xs font-semibold text-stone-700 hover:bg-emerald-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable One-Pager Document */}
        <div className="py-6 space-y-6 text-stone-850">
          {/* Header */}
          <div className="border-b border-emerald-100 pb-5 space-y-2">
            {sprout.greeting && (
              <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl inline-block border border-emerald-200">
                ✨ {sprout.greeting}
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {sprout.productName}
            </h1>
            <p className="text-base text-emerald-700 font-semibold mt-1">
              {sprout.tagline}
            </p>
            {sprout.userName && (
              <p className="text-xs text-stone-400">
                Verified Creator: {sprout.userName} • {sprout.authProvider === 'google' ? 'Google OAuth' : 'Facebook Login'}
              </p>
            )}
          </div>

          {/* Section 1: Overview & Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                🌿 Original Idea Summary
              </h3>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                {sprout.overview.originalIdeaSummary}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                ✨ Core Value Proposition
              </h3>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {sprout.overview.coreValueProposition}
              </p>
            </div>
          </div>

          {/* Problem & Audience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                🎯 Target Audience
              </h3>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {sprout.analysis.targetAudience.map((aud, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>
                      <strong className="text-stone-900">{aud.segment}:</strong>{' '}
                      {aud.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                ⚡ Problem Solved
              </h3>
              <p className="text-xs text-stone-700 leading-relaxed">
                {sprout.analysis.problemSolved}
              </p>
            </div>
          </div>

          {/* Key MVP Features */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              🚀 Key Features (MVP)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sprout.analysis.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                  <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 mb-1">
                    {feat.priority}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 mb-1">{feat.name}</h4>
                  <p className="text-[11px] text-stone-600 leading-snug">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User Journey Blueprint */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              📋 User Journey Blueprint
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {sprout.conceptDraft.userJourney.map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/40 border border-emerald-100">
                  <div className="text-[11px] font-bold text-emerald-700 mb-1">
                    {step.phase}
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 mb-1">{step.title}</h4>
                  <p className="text-[11px] text-stone-600 mb-2 leading-relaxed">{step.description}</p>
                  <div className="text-[10px] text-stone-500">
                    <strong>Action:</strong> {step.userAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-World Video Concept */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-stone-900 text-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🎬 Real-World Video Concept (Premium)</span>
            </h3>
            <h4 className="text-sm font-bold text-white mb-1.5">
              {sprout.videoConcept.conceptTitle}
            </h4>
            <p className="text-xs text-stone-300 font-mono leading-relaxed line-clamp-3">
              "{sprout.videoConcept.videoGenerationPrompt}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
