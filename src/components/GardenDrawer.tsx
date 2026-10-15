import React, { useState } from 'react';
import { SproutResult } from '../types';
import {
  X,
  BookMarked,
  Search,
  Star,
  Trash2,
  Calendar,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

import { UILanguage, TRANSLATIONS } from '../i18n/translations';

interface GardenDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sprouts: SproutResult[];
  activeSproutId?: string;
  uiLanguage?: UILanguage;
  onSelectSprout: (sprout: SproutResult) => void;
  onDeleteSprout: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export const GardenDrawer: React.FC<GardenDrawerProps> = ({
  isOpen,
  onClose,
  sprouts,
  activeSproutId,
  uiLanguage = 'vi',
  onSelectSprout,
  onDeleteSprout,
  onToggleFavorite,
}) => {
  const t = TRANSLATIONS[uiLanguage] || TRANSLATIONS.vi;
  const [search, setSearch] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  if (!isOpen) return null;

  const filtered = sprouts.filter((s) => {
    const matchesSearch =
      s.productName.toLowerCase().includes(search.toLowerCase()) ||
      s.rawInput.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesFav = onlyFavorites ? !!s.isFavorite : true;
    return matchesSearch && matchesFav;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-emerald-950/30 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-emerald-100">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">Sprout Garden</h3>
              <p className="text-xs text-stone-500">
                {sprouts.length} nurtured product {sprouts.length === 1 ? 'concept' : 'concepts'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search */}
        <div className="p-4 border-b border-stone-100 space-y-2 bg-stone-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-500 bg-white"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                onlyFavorites
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>Favorites only</span>
            </button>
            <span className="text-[11px] text-stone-400">
              Showing {filtered.length}
            </span>
          </div>
        </div>

        {/* Sprouts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-stone-400">
              <span className="text-3xl block mb-2">🌱</span>
              <p className="text-sm font-medium text-stone-600">No sprouts found</p>
              <p className="text-xs text-stone-400 mt-1">
                {sprouts.length === 0
                  ? 'Start by entering an idea in the incubator!'
                  : 'Try clearing your search filters'}
              </p>
            </div>
          ) : (
            filtered.map((s) => {
              const isActive = s.id === activeSproutId;
              return (
                <div
                  key={s.id}
                  className={`rounded-2xl p-4 border transition-all text-left relative group ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                      : 'border-stone-200 hover:border-emerald-300 bg-white hover:bg-stone-50/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4
                      onClick={() => {
                        onSelectSprout(s);
                        onClose();
                      }}
                      className="text-sm font-bold text-stone-900 group-hover:text-emerald-700 cursor-pointer flex-1 line-clamp-1"
                    >
                      {s.productName}
                    </h4>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onToggleFavorite(s.id)}
                        className="p-1 text-stone-300 hover:text-amber-500 transition-colors"
                        title="Star favorite"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            s.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => onDeleteSprout(s.id)}
                        className="p-1 text-stone-300 hover:text-rose-500 transition-colors"
                        title="Delete sprout"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p
                    onClick={() => {
                      onSelectSprout(s);
                      onClose();
                    }}
                    className="text-xs text-stone-600 cursor-pointer line-clamp-2 mb-2 leading-relaxed"
                  >
                    {s.overview?.originalIdeaSummary || s.rawInput}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => {
                        onSelectSprout(s);
                        onClose();
                      }}
                      className="text-emerald-600 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>Open Blueprint</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
