import React from 'react';
import { UILanguage, TRANSLATIONS } from '../i18n/translations';
import { X, Globe, Check, Sparkles, MessageSquare } from 'lucide-react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUiLanguage: UILanguage;
  onSelectUiLanguage: (lang: UILanguage) => void;
  currentAiLanguage: string;
  onSelectAiLanguage: (lang: string) => void;
}

const UI_LANGUAGES = [
  { code: 'vi' as UILanguage, name: 'Tiếng Việt', flag: '🇻🇳', subtitle: 'Ngôn ngữ giao diện tiếng Việt' },
  { code: 'en' as UILanguage, name: 'English', flag: '🇺🇸', subtitle: 'English interface' },
  { code: 'ja' as UILanguage, name: '日本語', flag: '🇯🇵', subtitle: '日本語インターフェース' },
  { code: 'fr' as UILanguage, name: 'Français', flag: '🇫🇷', subtitle: 'Interface en français' },
];

const AI_LANGUAGES = [
  { code: 'auto', name: 'Tự động phát hiện (Auto-Detect)', flag: '🌐', desc: 'AI tự nhận diện ngôn ngữ của ý tưởng và phản hồi cùng ngôn ngữ' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', desc: 'Luôn xuất bản phác thảo bằng tiếng Việt chuẩn' },
  { code: 'en', name: 'English', flag: '🇺🇸', desc: 'Always generate product blueprint in English' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', desc: '常に日本語でプロダクト構想を生成' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', desc: 'Toujours générer le plan en français' },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentUiLanguage,
  onSelectUiLanguage,
  currentAiLanguage,
  onSelectAiLanguage,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentUiLanguage] || TRANSLATIONS.vi;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-100/40 rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              {t.languageSettings}
            </h3>
            <p className="text-xs text-stone-500">
              {t.languageSettingsDesc}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Section 1: UI Language */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              {t.uiLanguageLabel}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {UI_LANGUAGES.map((lang) => {
                const isSelected = currentUiLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => onSelectUiLanguage(lang.code)}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{lang.flag}</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                          {lang.name}
                        </div>
                        <div className="text-[10px] text-stone-500 leading-tight">
                          {lang.subtitle}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: AI Output Default Language */}
          <div className="space-y-2.5 pt-2 border-t border-stone-100">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.aiOutputLanguageLabel}</span>
            </label>
            <div className="space-y-2">
              {AI_LANGUAGES.map((aiLang) => {
                const isSelected = currentAiLanguage === aiLang.code;
                return (
                  <button
                    key={aiLang.code}
                    type="button"
                    onClick={() => onSelectAiLanguage(aiLang.code)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all text-left ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{aiLang.flag}</span>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                          {aiLang.name}
                        </div>
                        <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                          {aiLang.desc}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confirmation button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20"
          >
            {t.saveSettings}
          </button>
        </div>
      </div>
    </div>
  );
};
