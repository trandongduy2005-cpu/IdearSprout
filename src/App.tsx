import React, { useState, useEffect } from 'react';
import { SproutResult, UserProfile } from './types';
import { SAMPLE_SPROUT } from './data/sampleSprout';
import { Header } from './components/Header';
import { IncubatorInput } from './components/IncubatorInput';
import { SproutView } from './components/SproutView';
import { AuthModal } from './components/AuthModal';
import { GardenDrawer } from './components/GardenDrawer';
import { OnePagerModal } from './components/OnePagerModal';
import { LanguageModal } from './components/LanguageModal';
import { UILanguage, TRANSLATIONS } from './i18n/translations';
import {
  Sprout,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Layers,
  Globe2,
  Flame,
  AlertCircle,
  X,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'ideasprout_sprouts_v1';
const USER_STORAGE_KEY = 'ideasprout_user_v1';
const UI_LANG_KEY = 'ideasprout_ui_lang_v1';
const AI_LANG_KEY = 'ideasprout_ai_lang_v1';

export default function App() {
  const [uiLanguage, setUiLanguage] = useState<UILanguage>(() => {
    try {
      const saved = localStorage.getItem(UI_LANG_KEY) as UILanguage;
      if (saved && (saved === 'vi' || saved === 'en' || saved === 'ja' || saved === 'fr')) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'vi';
  });

  const [aiOutputLanguage, setAiOutputLanguage] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(AI_LANG_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return 'auto';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      id: 'usr_google_644053177555',
      name: 'Đông Duy',
      email: 'trandongduy2005@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      isAuthenticated: true,
      isPro: true,
      authToken: 'oauth_goog_live_session',
    };
  });

  const [sprouts, setSprouts] = useState<SproutResult[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [SAMPLE_SPROUT];
  });

  const [activeSprout, setActiveSprout] = useState<SproutResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isGardenOpen, setIsGardenOpen] = useState(false);
  const [isOnePagerOpen, setIsOnePagerOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sprouts));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [sprouts]);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(UI_LANG_KEY, uiLanguage);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [uiLanguage]);

  useEffect(() => {
    try {
      localStorage.setItem(AI_LANG_KEY, aiOutputLanguage);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [aiOutputLanguage]);

  const t = TRANSLATIONS[uiLanguage] || TRANSLATIONS.vi;

  const handleCreateSprout = async (
    rawInput: string,
    intensity: string,
    language: string
  ) => {
    // STRICT AUTHENTICATION GUARD: Real Users Only
    if (!currentUser.isAuthenticated || currentUser.provider === 'guest') {
      setIsAuthOpen(true);
      setErrorMessage(
        'Cảnh báo truy cập: Bạn cần đăng nhập bằng tài khoản Google hoặc Facebook thực tế để sử dụng IdeaSprout.'
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/sprout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawInput,
          intensity,
          preferredLanguage: language || aiOutputLanguage,
          user: currentUser,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthOpen(true);
        }
        throw new Error(data.error || 'Failed to incubate your idea.');
      }

      const newSprout: SproutResult = data.sprout;
      setSprouts((prev) => [newSprout, ...prev.filter((s) => s.id !== newSprout.id)]);
      setActiveSprout(newSprout);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Something went wrong with IdeaSprout AI. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setSprouts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isFavorite: !s.isFavorite } : s))
    );
    if (activeSprout && activeSprout.id === id) {
      setActiveSprout((prev) =>
        prev ? { ...prev, isFavorite: !prev.isFavorite } : null
      );
    }
  };

  const handleDeleteSprout = (id: string) => {
    setSprouts((prev) => prev.filter((s) => s.id !== id));
    if (activeSprout?.id === id) {
      setActiveSprout(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafcf9] text-stone-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-950 flex flex-col">
      {/* Header with Language Settings button */}
      <Header
        currentUser={currentUser}
        savedCount={sprouts.length}
        currentUiLanguage={uiLanguage}
        onOpenLanguage={() => setIsLanguageModalOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenGarden={() => setIsGardenOpen(true)}
        onNewSprout={() => {
          setActiveSprout(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Error notification banner if any */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto px-4 mt-4 w-full animate-shake">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-500 hover:text-rose-800 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeSprout ? (
          <SproutView
            sprout={activeSprout}
            uiLanguage={uiLanguage}
            currentUser={currentUser}
            onToggleFavorite={handleToggleFavorite}
            onOpenOnePager={() => setIsOnePagerOpen(true)}
            onNewSprout={() => {
              setActiveSprout(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.12]">
                {t.heroTitlePrefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
                  {t.heroTitleHighlight}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            {/* Incubator Input Soil */}
            <IncubatorInput
              onSubmit={handleCreateSprout}
              isLoading={isLoading}
              uiLanguage={uiLanguage}
              defaultAiLanguage={aiOutputLanguage}
              onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
              currentUser={currentUser}
              onOpenAuthModal={() => setIsAuthOpen(true)}
            />

            {/* Quick Explore Demo Card */}
            {sprouts.length > 0 && (
              <div className="max-w-4xl mx-auto pt-4">
                <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-stone-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                      🌿
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 uppercase tracking-wider">
                          {t.readyToInspect}
                        </span>
                        <span className="text-xs text-stone-400">{t.sampleConcept}</span>
                      </div>
                      <h4 className="text-base font-bold text-stone-900">
                        {sprouts[0].productName}
                      </h4>
                      <p className="text-xs text-stone-600 line-clamp-1">
                        {sprouts[0].tagline}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveSprout(sprouts[0]);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 font-bold text-xs sm:text-sm transition-all shadow-xs group shrink-0"
                  >
                    <span>{t.viewBlueprint}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* 4 Core Responsibilities Feature Matrix */}
            <div className="max-w-5xl mx-auto pt-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-stone-900">
                  {t.methodologyTitle}
                </h3>
                <p className="text-xs text-stone-500">
                  {t.methodologySubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{t.methodologyStep1Title}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.methodologyStep1Desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{t.methodologyStep2Title}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.methodologyStep2Desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{t.methodologyStep3Title}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.methodologyStep3Desc}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                    <span>{t.methodologyStep4Title}</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {t.methodologyStep4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-emerald-100 bg-white/70 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
              🌱
            </span>
            <span className="font-bold text-stone-800">IdeaSprout AI</span>
            <span>– Clean White & Pastel Green Design</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>•</span>
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="hover:text-emerald-700 font-medium underline cursor-pointer"
            >
              {t.languageSettings} ({uiLanguage.toUpperCase()})
            </button>
            <span>•</span>
            <span>Real-World Video Concepts</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentUiLanguage={uiLanguage}
        onSelectUiLanguage={(lang) => setUiLanguage(lang)}
        currentAiLanguage={aiOutputLanguage}
        onSelectAiLanguage={(lang) => setAiOutputLanguage(lang)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(usr) => setCurrentUser(usr)}
        onLogout={() =>
          setCurrentUser({
            id: 'usr_guest',
            name: 'Guest',
            email: '',
            avatar: '',
            provider: 'guest',
            isAuthenticated: false,
            isPro: false,
          })
        }
      />

      <GardenDrawer
        isOpen={isGardenOpen}
        onClose={() => setIsGardenOpen(false)}
        sprouts={sprouts}
        activeSproutId={activeSprout?.id}
        uiLanguage={uiLanguage}
        onSelectSprout={(s) => {
          setActiveSprout(s);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDeleteSprout={handleDeleteSprout}
        onToggleFavorite={handleToggleFavorite}
      />

      {activeSprout && (
        <OnePagerModal
          isOpen={isOnePagerOpen}
          onClose={() => setIsOnePagerOpen(false)}
          sprout={activeSprout}
        />
      )}
    </div>
  );
}
