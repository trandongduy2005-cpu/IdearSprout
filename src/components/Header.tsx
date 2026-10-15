import React from 'react';
import { UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../i18n/translations';
import { Sprout, BookMarked, Sparkles, User, PlusCircle, Globe } from 'lucide-react';

interface HeaderProps {
  currentUser: UserProfile | null;
  savedCount: number;
  currentUiLanguage: UILanguage;
  onOpenLanguage: () => void;
  onOpenAuth: () => void;
  onOpenGarden: () => void;
  onNewSprout: () => void;
}

const FLAG_MAP: Record<UILanguage, { flag: string; label: string }> = {
  vi: { flag: '🇻🇳', label: 'Tiếng Việt' },
  en: { flag: '🇺🇸', label: 'English' },
  ja: { flag: '🇯🇵', label: '日本語' },
  fr: { flag: '🇫🇷', label: 'Français' },
};

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  savedCount,
  currentUiLanguage,
  onOpenLanguage,
  onOpenAuth,
  onOpenGarden,
  onNewSprout,
}) => {
  const t = TRANSLATIONS[currentUiLanguage] || TRANSLATIONS.vi;
  const currentFlagInfo = FLAG_MAP[currentUiLanguage] || FLAG_MAP.vi;

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-emerald-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand */}
        <div
          onClick={onNewSprout}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/15 group-hover:scale-105 transition-transform duration-200">
            <Sprout className="w-6 h-6 text-emerald-50" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Idea<span className="text-emerald-600">Sprout</span>
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-100/80 text-emerald-800 text-[10px] font-bold tracking-wider uppercase">
                AI
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block font-medium">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* New Sprout Button */}
          <button
            onClick={onNewSprout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-stone-700 hover:text-emerald-700 hover:bg-emerald-50/70 text-xs sm:text-sm font-semibold transition-colors"
            title={t.newIdea}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">{t.newIdea}</span>
          </button>

          {/* Sprout Garden / Library */}
          <button
            onClick={onOpenGarden}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-xl border border-stone-200 hover:border-emerald-300 bg-stone-50/60 hover:bg-emerald-50/50 text-stone-700 text-xs sm:text-sm font-medium transition-all"
            title={t.garden}
          >
            <BookMarked className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">{t.garden}</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Nút Cài Đặt Ngôn Ngữ (Language Settings Button) */}
          <button
            onClick={onOpenLanguage}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border border-emerald-200 hover:border-emerald-400 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-900 text-xs sm:text-sm font-bold transition-all shadow-2xs group"
            title={t.languageSettings}
            aria-label={t.languageSettings}
          >
            <Globe className="w-4 h-4 text-emerald-700 group-hover:rotate-12 transition-transform duration-200" />
            <span className="text-sm">{currentFlagInfo.flag}</span>
            <span className="hidden lg:inline text-xs font-bold text-emerald-800">
              {currentFlagInfo.label}
            </span>
          </button>

          {/* Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-emerald-100 hover:border-emerald-300 bg-white hover:bg-emerald-50/30 transition-all shadow-2xs"
          >
            {currentUser && currentUser.isAuthenticated ? (
              <>
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                  alt={currentUser.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-emerald-300"
                />
                <div className="text-left hidden xl:block">
                  <div className="text-xs font-bold text-stone-800 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Verified Seedling</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-stone-700 hidden sm:inline">
                  {t.login}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
