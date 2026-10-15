import React, { useState, useEffect } from 'react';
import { VideoConcept } from '../types';
import {
  Film,
  Sparkles,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Camera,
  Layers,
  Wand2,
  Tv,
} from 'lucide-react';

interface VideoConceptViewerProps {
  videoConcept: VideoConcept;
  productName: string;
}

export const VideoConceptViewer: React.FC<VideoConceptViewerProps> = ({
  videoConcept,
  productName,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenes = videoConcept.cinematicScenarioScript || [];

  // Storyboard playback simulation timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && scenes.length > 0) {
      timer = setInterval(() => {
        setActiveSceneIndex((prev) => {
          if (prev >= scenes.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, scenes.length]);

  const handleCopyPrompt = async () => {
    if (!videoConcept.videoGenerationPrompt) return;
    try {
      await navigator.clipboard.writeText(videoConcept.videoGenerationPrompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handlePlayToggle = () => {
    if (!isPlaying && activeSceneIndex >= scenes.length - 1) {
      setActiveSceneIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner - Premium Feature Preview */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-emerald-900 via-teal-950 to-stone-900 text-white shadow-xl border border-emerald-500/30">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400/20 to-emerald-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold mb-3 tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>PREMIUM FEATURE PREVIEW</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Film className="w-6 h-6 text-emerald-400" />
              <span>{videoConcept.conceptTitle || `Real-World Cinematic Scenario: ${productName}`}</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Hyper-realistic 15–30 second application scenario demonstrating real-world user adoption, emotional impact, and visual marketing power.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs text-emerald-200 text-xs font-medium border border-white/10">
              Ratio: {videoConcept.aspectRatio || '16:9'}
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-xs text-amber-200 text-xs font-medium border border-white/10">
              Compatible: Veo • Sora • Runway Gen-3
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Storyboard Simulator & Cards */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Tv className="w-5 h-5 text-emerald-600" />
              <span>Cinematic Scenario Script (15–30s Storyboard)</span>
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Click any frame or press Play to walk through the storyboard sequence
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayToggle}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Storyboard</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play Simulation</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setActiveSceneIndex(0);
              }}
              className="p-1.5 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors"
              title="Reset Storyboard"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Current Active Scene Spotlight */}
        {scenes[activeSceneIndex] && (
          <div className="rounded-2xl p-5 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-stone-50 border border-emerald-200/80 shadow-inner">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white text-xs font-black tracking-wider">
                  {scenes[activeSceneIndex].timeframe || `Scene ${activeSceneIndex + 1}`}
                </span>
                <span className="text-sm font-bold text-stone-900">
                  {scenes[activeSceneIndex].scene}
                </span>
              </div>
              <span className="text-xs text-emerald-800 font-semibold">
                Frame {activeSceneIndex + 1} of {scenes.length}
              </span>
            </div>

            <p className="text-sm text-stone-800 font-medium mb-3 leading-relaxed">
              {scenes[activeSceneIndex].action}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-emerald-100 flex items-start gap-2">
                <Camera className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-700 block mb-0.5">Visual & Lighting Cue:</span>
                  <span className="text-stone-600 leading-normal">
                    {scenes[activeSceneIndex].visualCue}
                  </span>
                </div>
              </div>

              {scenes[activeSceneIndex].audioOrVoiceover && (
                <div className="p-3 bg-white rounded-xl border border-teal-100 flex items-start gap-2">
                  <Film className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-700 block mb-0.5">Audio & Voiceover:</span>
                    <span className="text-stone-600 italic leading-normal">
                      "{scenes[activeSceneIndex].audioOrVoiceover}"
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scene Thumbnails / Track Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scenes.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <div
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setActiveSceneIndex(idx);
                }}
                className={`cursor-pointer rounded-2xl p-4 border transition-all text-left relative overflow-hidden ${
                  isActive
                    ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'bg-stone-50/70 border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {scene.timeframe || `Frame ${idx + 1}`}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>
                <h5 className="text-xs font-bold text-stone-900 line-clamp-1 mb-1">
                  {scene.scene}
                </h5>
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                  {scene.action}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hyper-Detailed Video Generation Prompt Box */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-emerald-600" />
              <span>Hyper-Detailed AI Video Generation Prompt</span>
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              Production-ready prompt with camera framing, atmospheric lighting, and high-fidelity motion
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copiedPrompt
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-emerald-800 text-white'
            }`}
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-200" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy AI Video Prompt</span>
              </>
            )}
          </button>
        </div>

        <div className="relative rounded-2xl bg-stone-950 p-5 text-stone-200 font-mono text-xs sm:text-sm leading-relaxed border border-stone-800 shadow-inner group overflow-hidden">
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-stone-800 text-[10px] text-stone-400 font-sans uppercase tracking-wider">
              Prompt for Veo / Runway / Sora
            </span>
          </div>

          <p className="whitespace-pre-wrap selection:bg-emerald-500/30">
            {videoConcept.videoGenerationPrompt}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 pt-1">
          <span className="font-semibold text-stone-700">Quick instructions:</span>
          <span>Paste into Google Veo, Runway Gen-3 Alpha, or OpenAI Sora. For best results, select 16:9 cinematic aspect ratio with 24fps motion smoothing.</span>
        </div>
      </div>
    </div>
  );
};
