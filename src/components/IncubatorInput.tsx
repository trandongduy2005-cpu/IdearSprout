import React, { useState, useEffect, useRef } from 'react';
import { SeedTemplate, UserProfile } from '../types';
import { SEED_TEMPLATES } from '../data/seedTemplates';
import { UILanguage, TRANSLATIONS } from '../i18n/translations';
import {
  Sprout,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  Globe,
  SlidersHorizontal,
  RotateCcw,
  Lightbulb,
  Settings2,
  Lock,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

interface IncubatorInputProps {
  onSubmit: (input: string, intensity: string, language: string) => void;
  isLoading: boolean;
  uiLanguage: UILanguage;
  defaultAiLanguage: string;
  onOpenLanguageModal: () => void;
  currentUser: UserProfile;
  onOpenAuthModal: () => void;
}

export const IncubatorInput: React.FC<IncubatorInputProps> = ({
  onSubmit,
  isLoading,
  uiLanguage,
  defaultAiLanguage,
  onOpenLanguageModal,
  currentUser,
  onOpenAuthModal,
}) => {
  const t = TRANSLATIONS[uiLanguage] || TRANSLATIONS.vi;
  const [input, setInput] = useState('');
  const [intensity, setIntensity] = useState('standard');
  const [language, setLanguage] = useState(defaultAiLanguage || 'auto');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  const isAuthenticated = currentUser.isAuthenticated && currentUser.provider !== 'guest';

  // Sync default AI language if parent changes it
  useEffect(() => {
    if (defaultAiLanguage) {
      setLanguage(defaultAiLanguage);
    }
  }, [defaultAiLanguage]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'vi' || uiLanguage === 'vi' ? 'vi-VN' : 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setInput((prev) => {
            const separator = prev.trim() ? ' ' : '';
            return prev + separator + transcript;
          });
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language, uiLanguage]);

  const [micNotice, setMicNotice] = useState<string | null>(null);

  const toggleMic = () => {
    if (!speechSupported || !recognitionRef.current) {
      setMicNotice('Trình duyệt chưa hỗ trợ ghi âm trực tiếp. Bạn có thể nhập ý tưởng bằng văn bản.');
      setTimeout(() => setMicNotice(null), 4000);
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setMicNotice(null);
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleApplySeed = (seed: SeedTemplate) => {
    setInput(seed.content);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onOpenAuthModal();
      return;
    }
    if (!input.trim() || isLoading) return;
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    onSubmit(input.trim(), intensity, language);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Authentication Banner if Not Logged In */}
      {!isAuthenticated && (
        <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50/60 border border-amber-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Authentication Required
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-200 text-amber-900 font-bold">
                  Strict Real Users Only
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-relaxed">
                Please log in with your Google or Facebook account to access IdeaSprout.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Log in to continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Soil Card / Input Area */}
      <div className="relative bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-100 overflow-hidden transition-all">
        {/* Soft decorative background glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-100/30 rounded-full blur-2xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          {/* Top row with verified user identity badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.incubatorTitle}</span>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified: {currentUser.name} ({currentUser.provider === 'google' ? 'Google' : 'Facebook'})</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="text-amber-800 font-medium hover:underline flex items-center gap-1 text-[11px]"
              >
                <Lock className="w-3 h-3 text-amber-700" />
                <span>Login required to sprout</span>
              </button>
            )}
          </div>

          {/* Textarea */}
          <div className="relative rounded-2xl border-2 border-emerald-100 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 bg-white transition-all">
            <textarea
              ref={textareaRef}
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.textareaPlaceholder}
              disabled={isLoading}
              className="w-full p-4 sm:p-5 text-sm sm:text-base text-stone-850 placeholder-stone-400 focus:outline-none resize-none bg-transparent"
            />

            {/* Bottom tools inside textarea */}
            <div className="p-3 bg-stone-50/60 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 rounded-b-2xl">
              <div className="flex items-center gap-2">
                {/* Voice Dictation Button */}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-white hover:bg-emerald-50 text-stone-700 border border-stone-200'
                  }`}
                  title={isListening ? 'Click to stop recording' : 'Dictate your idea with microphone'}
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>{t.listening}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.voiceDump}</span>
                    </>
                  )}
                </button>

                {input.trim() && (
                  <button
                    type="button"
                    onClick={() => setInput('')}
                    className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-200/60 transition-colors"
                    title="Clear text"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

                {micNotice && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 animate-fade-in">
                    {micNotice}
                  </span>
                )}
              </div>

              <div className="text-[11px] text-stone-400 font-medium">
                {input.length} {t.characters}
              </div>
            </div>
          </div>

          {/* Configuration Bar: Language & Incubation Depth */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Language Selector + Quick settings button */}
              <div className="flex items-center gap-1 bg-stone-50 px-2 py-1 rounded-xl border border-stone-200/80 text-xs">
                <Globe className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                <span className="text-stone-500 font-medium hidden sm:inline">AI:</span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer pr-1"
                >
                  <option value="auto">🌐 {t.autoDetect}</option>
                  <option value="vi">🇻🇳 Tiếng Việt</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="ja">🇯🇵 日本語</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>

                <button
                  type="button"
                  onClick={onOpenLanguageModal}
                  className="p-1 hover:bg-stone-200/60 text-stone-400 hover:text-emerald-700 rounded-lg transition-colors"
                  title={t.languageSettings}
                >
                  <Settings2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Intensity / Depth Selector */}
              <div className="flex items-center gap-1.5 bg-stone-50 px-2.5 py-1.5 rounded-xl border border-stone-200/80 text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-stone-500 font-medium hidden sm:inline">{t.depthLabel}</span>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                  className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="quick">{t.depthQuick}</option>
                  <option value="standard">{t.depthStandard}</option>
                  <option value="deep">{t.depthDeep}</option>
                </select>
              </div>
            </div>

            {/* Big Sprout Action Button */}
            <button
              type="submit"
              disabled={isLoading || (isAuthenticated && !input.trim())}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm sm:text-base shadow-md transition-all select-none cursor-pointer ${
                !isAuthenticated
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                  : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-600/25 disabled:opacity-40'
              }`}
            >
              {isLoading ? (
                <>
                  <Sprout className="w-5 h-5 animate-spin" />
                  <span>{t.sprouting}</span>
                </>
              ) : !isAuthenticated ? (
                <>
                  <Lock className="w-4 h-4 text-amber-200" />
                  <span>Log in with Google / FB to Sprout</span>
                </>
              ) : (
                <>
                  <Sprout className="w-5 h-5 text-emerald-100" />
                  <span>{t.sproutButton}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Seed Inspirations Pills */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-600 px-1">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>{t.seedInspiration}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SEED_TEMPLATES.map((seed, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplySeed(seed)}
              className="text-left p-3 rounded-2xl bg-white hover:bg-emerald-50/50 border border-stone-200/80 hover:border-emerald-300 transition-all group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-stone-850 group-hover:text-emerald-700">
                  {seed.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-500 font-semibold">
                  {seed.category}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                {seed.content}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
