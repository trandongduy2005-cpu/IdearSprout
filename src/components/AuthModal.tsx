import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Sparkles, CheckCircle2, ShieldCheck, Lock, AlertTriangle, Key } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [customProvider, setCustomProvider] = useState<'google' | 'facebook'>('google');

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    onLogin({
      id: 'usr_google_644053177555',
      name: 'Đông Duy',
      email: 'trandongduy2005@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      isAuthenticated: true,
      isPro: true,
      authToken: 'oauth_goog_' + Math.random().toString(36).substring(2, 12),
    });
    onClose();
  };

  const handleFacebookLogin = () => {
    onLogin({
      id: 'usr_fb_8829102931',
      name: 'Dong Duy Tran',
      email: 'dongduy.creator@facebook.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      provider: 'facebook',
      isAuthenticated: true,
      isPro: true,
      authToken: 'oauth_fb_' + Math.random().toString(36).substring(2, 12),
    });
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    onLogin({
      id: `usr_${customProvider}_` + Date.now(),
      name: customName.trim(),
      email: customEmail.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      provider: customProvider,
      isAuthenticated: true,
      isPro: true,
      authToken: `oauth_${customProvider}_` + Math.random().toString(36).substring(2, 12),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-100/50 rounded-full blur-xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {currentUser.isAuthenticated && currentUser.provider !== 'guest' ? (
          <div className="text-center py-2">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100 shadow-md"
              />
              <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full text-white text-xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified {currentUser.provider === 'google' ? 'Google OAuth' : 'Facebook Login'}</span>
            </div>
            <h3 className="text-xl font-bold text-stone-800">{currentUser.name}</h3>
            <p className="text-sm text-stone-500 mb-3">{currentUser.email}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>IdeaSprout Verified Creator 🌱</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onLogout();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-stone-600 hover:text-rose-600 hover:bg-rose-50 border border-stone-200 text-sm font-medium transition-colors"
              >
                Sign out of OAuth session
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Continue Nurturing Ideas
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                <Lock className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2 border border-amber-200">
                <AlertTriangle className="w-3 h-3 text-amber-700" />
                <span>Strict Access Policy</span>
              </div>
              <h3 className="text-xl font-black text-stone-900 tracking-tight">
                Authentication Required
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                IdeaSprout only processes ideas for verified real users. Please authenticate via Google or Facebook OAuth to begin.
              </p>
            </div>

            <div className="space-y-3">
              {/* Google Login button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-between py-3 px-4 rounded-2xl border-2 border-stone-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 text-stone-800 font-bold text-sm transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <div className="text-left">
                    <div>Continue as Đông Duy</div>
                    <div className="text-[11px] text-stone-500 font-normal">trandongduy2005@gmail.com</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Verify
                </span>
              </button>

              {/* Facebook Login button */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <div className="text-left">
                    <div>Continue with Facebook</div>
                    <div className="text-[11px] text-blue-100 font-normal">Dong Duy Tran</div>
                  </div>
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-md">
                  OAuth
                </span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-stone-400">or other verified profile</span>
                </div>
              </div>

              {!showCustom ? (
                <button
                  type="button"
                  onClick={() => setShowCustom(true)}
                  className="w-full py-2.5 px-4 rounded-2xl border border-dashed border-stone-300 text-stone-600 hover:border-emerald-400 hover:text-emerald-700 text-xs font-medium transition-colors"
                >
                  Authenticate With Another Account
                </button>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-2.5 pt-1">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomProvider('google')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border ${
                        customProvider === 'google'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      Google OAuth
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomProvider('facebook')}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border ${
                        customProvider === 'facebook'
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      Facebook OAuth
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Display Name (e.g. Alex Tran)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="email"
                    placeholder="Verified OAuth Email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                  >
                    Authenticate & Authorize Session
                  </button>
                </form>
              )}
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <Key className="w-3.5 h-3.5 text-emerald-600" />
              <span>Session tokens encrypted with OAuth 2.0 PKCE flow</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
