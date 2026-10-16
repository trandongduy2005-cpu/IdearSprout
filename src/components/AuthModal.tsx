import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  signInWithGoogle,
  logOutUser,
  getCurrentFirebaseConfig,
  saveRuntimeFirebaseConfig,
  parseAndSaveFirebaseSnippet,
  getFirebaseConfigStatus,
  isGoogleApiKeyFormat,
  FirebaseConfig,
} from '../firebase';
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Lock,
  LogOut,
  AlertCircle,
  Loader2,
  Settings,
  Key,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogout: () => Promise<void> | void;
  onLoginSuccess?: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onLoginSuccess,
}) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Firebase Config Drawer state
  const [showConfigDrawer, setShowConfigDrawer] = useState(false);
  const [configSnippet, setConfigSnippet] = useState('');
  const [manualApiKey, setManualApiKey] = useState(() => getCurrentFirebaseConfig().apiKey || '');
  const [manualProjectId, setManualProjectId] = useState(() => getCurrentFirebaseConfig().projectId || '');
  const [manualAuthDomain, setManualAuthDomain] = useState(() => getCurrentFirebaseConfig().authDomain || '');
  const [configSaveSuccess, setConfigSaveSuccess] = useState<string | null>(null);
  const [configSaveError, setConfigSaveError] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeConfig = getCurrentFirebaseConfig();
  const configStatus = getFirebaseConfigStatus(activeConfig);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const fbUser = await signInWithGoogle();
      const token = await fbUser.getIdToken();
      const profile: UserProfile = {
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Google User',
        email: fbUser.email || '',
        avatar:
          fbUser.photoURL ||
          'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        provider: 'google',
        isAuthenticated: true,
        isPro: true,
        authToken: token,
      };
      if (onLoginSuccess) {
        onLoginSuccess(profile);
      }
      onClose();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/api-key-not-valid' || err.code === 'auth/invalid-api-key') {
        setAuthError(
          'Lỗi API Key (auth/api-key-not-valid): Khóa Firebase API Key không hợp lệ hoặc chưa được thiết lập. Vui lòng mở mục "Cấu hình Firebase Console" bên dưới để cập nhật API Key chính xác từ dự án của bạn.'
        );
        setShowConfigDrawer(true);
      } else if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Cửa sổ đăng nhập đã được đóng lại trước khi hoàn tất.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setAuthError('Yêu cầu mở popup trước đó đã bị hủy.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setAuthError('Domain hiện tại chưa được cấp quyền (Authorized domain) trong Firebase Console.');
      } else {
        setAuthError(
          err.message || 'Không thể đăng nhập bằng Google. Vui lòng kiểm tra kết nối mạng và cấu hình Firebase.'
        );
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOutClick = async () => {
    setIsSigningOut(true);
    setAuthError(null);
    try {
      await logOutUser();
      await onLogout();
      onClose();
    } catch (err: any) {
      console.error('Sign Out Error:', err);
      setAuthError(err.message || 'Lỗi khi đăng xuất tài khoản.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleSaveSnippet = () => {
    setConfigSaveError(null);
    setConfigSaveSuccess(null);
    if (!configSnippet.trim()) {
      setConfigSaveError('Vui lòng dán mã cấu hình Firebase từ Firebase Console.');
      return;
    }
    const result = parseAndSaveFirebaseSnippet(configSnippet);
    if (!result.success) {
      setConfigSaveError(result.error || 'Lỗi xử lý cấu hình.');
    } else {
      setConfigSaveSuccess('Đã cập nhật cấu hình Firebase thành công!');
      if (result.config) {
        setManualApiKey(result.config.apiKey);
        setManualProjectId(result.config.projectId);
        setManualAuthDomain(result.config.authDomain);
      }
      setAuthError(null);
      setTimeout(() => setConfigSaveSuccess(null), 3000);
    }
  };

  const handleSaveManual = () => {
    setConfigSaveError(null);
    setConfigSaveSuccess(null);

    const result = saveRuntimeFirebaseConfig({
      apiKey: manualApiKey,
      projectId: manualProjectId,
      authDomain: manualAuthDomain,
    });

    if (!result.success) {
      setConfigSaveError(result.error || 'Cấu hình không hợp lệ.');
    } else {
      setConfigSaveSuccess('Đã lưu cấu hình Firebase thành công!');
      setAuthError(null);
      setTimeout(() => setConfigSaveSuccess(null), 3000);
    }
  };

  const isAuthenticated = Boolean(currentUser && currentUser.isAuthenticated);
  const isKeyFormatOk = isGoogleApiKeyFormat(manualApiKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/45 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 my-8">
        {/* Soft background glows */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-100/50 rounded-full blur-xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {isAuthenticated && currentUser ? (
          /* AUTHENTICATED STATE */
          <div className="text-center py-2">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <img
                src={
                  currentUser.avatar ||
                  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                }
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100 shadow-md"
              />
              <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full text-white text-xs shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tài khoản Google đã xác thực</span>
            </div>

            <h3 className="text-xl font-bold text-stone-800">{currentUser.name}</h3>
            <p className="text-sm text-stone-500 mb-3">{currentUser.email}</p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-6 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>IdeaSprout Verified Creator 🌱</span>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSignOutClick}
                disabled={isSigningOut}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 text-sm font-semibold transition-all shadow-2xs disabled:opacity-50"
              >
                {isSigningOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang đăng xuất và xóa dữ liệu...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Đăng xuất / Hủy liên kết tài khoản</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm"
              >
                Tiếp tục phát triển ý tưởng
              </button>
            </div>
          </div>
        ) : (
          /* UNAUTHENTICATED STATE */
          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                <Lock className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-2 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Yêu Cầu Xác Thực Tài Khoản Thực Tế</span>
              </div>
              <h3 className="text-xl font-black text-stone-900 tracking-tight">
                Đăng Nhập IdeaSprout
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                IdeaSprout chỉ xử lý ý tưởng cho tài khoản người dùng thực tế. Vui lòng đăng nhập bằng Google OAuth để bắt đầu gieo mầm ý tưởng.
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">Lỗi xác thực</p>
                  <p className="leading-relaxed">{authError}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {/* Official Google OAuth Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 border-stone-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 text-stone-800 font-bold text-sm transition-all shadow-xs disabled:opacity-50"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                    <span>Đang kết nối Google OAuth...</span>
                  </>
                ) : (
                  <>
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
                    <span>Đăng nhập bằng Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Firebase Config Accordion */}
            <div className="mt-5 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setShowConfigDrawer(!showConfigDrawer)}
                className="w-full flex items-center justify-between text-xs font-semibold text-stone-500 hover:text-emerald-700 py-1 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Settings className="w-3.5 h-3.5 text-stone-400" />
                  <span>Cấu hình dự án Firebase Console</span>
                  {configStatus.isValid ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3" /> Đã sẵn sàng
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                      Cần cấu hình
                    </span>
                  )}
                </span>
                {showConfigDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showConfigDrawer && (
                <div className="mt-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-left animate-fade-in text-xs">
                  <div className="flex items-center gap-1.5 text-stone-700 font-semibold">
                    <Key className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cập nhật mã API Key & Project ID thực tế</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Đảm bảo mã <code className="bg-stone-200 px-1 py-0.5 rounded text-stone-800 font-mono">apiKey</code> bắt đầu bằng <code className="text-emerald-700 font-mono font-bold">AIzaSy...</code> (39 ký tự), không thừa dấu cách, không nhầm lẫn với Project ID.
                  </p>

                  {configSaveSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{configSaveSuccess}</span>
                    </div>
                  )}

                  {configSaveError && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{configSaveError}</span>
                    </div>
                  )}

                  {/* Option A: Paste snippet */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-stone-600 block">
                      Cách 1: Dán đoạn mã cấu hình từ Firebase Console
                    </label>
                    <textarea
                      value={configSnippet}
                      onChange={(e) => setConfigSnippet(e.target.value)}
                      placeholder='const firebaseConfig = { apiKey: "AIzaSy...", projectId: "my-app", ... };'
                      className="w-full h-16 p-2 rounded-lg border border-stone-300 font-mono text-[10px] bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={handleSaveSnippet}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Tự động nhận diện & Lưu cấu hình</span>
                    </button>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="grow border-t border-stone-200"></div>
                    <span className="shrink mx-2 text-[10px] text-stone-400 uppercase">Hoặc nhập trực tiếp</span>
                    <div className="grow border-t border-stone-200"></div>
                  </div>

                  {/* Option B: Enter fields directly */}
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-center mb-0.5">
                        <label className="text-[11px] font-semibold text-stone-600">Firebase API Key:</label>
                        {manualApiKey && (
                          <span
                            className={`text-[10px] font-mono ${
                              isKeyFormatOk ? 'text-emerald-600' : 'text-amber-600'
                            }`}
                          >
                            {isKeyFormatOk ? '✓ Đúng định dạng AIza (39 ký tự)' : '⚠ Kiểm tra lại định dạng'}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={manualApiKey}
                        onChange={(e) => setManualApiKey(e.target.value.trim())}
                        placeholder="AIzaSy..."
                        className="w-full p-2 rounded-lg border border-stone-300 font-mono text-xs bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-stone-600 block mb-0.5">Firebase Project ID:</label>
                      <input
                        type="text"
                        value={manualProjectId}
                        onChange={(e) => setManualProjectId(e.target.value.trim())}
                        placeholder="ideasprout-app"
                        className="w-full p-2 rounded-lg border border-stone-300 font-mono text-xs bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveManual}
                      className="w-full py-2 rounded-lg bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs transition-colors"
                    >
                      Lưu và áp dụng cấu hình
                    </button>
                  </div>

                  <div className="pt-2 border-t border-stone-200 flex items-start gap-1.5 text-[10px] text-stone-500">
                    <HelpCircle className="w-3.5 h-3.5 shrink-0 text-stone-400 mt-0.5" />
                    <span>
                      Để lấy thông tin này: Mở <strong className="text-stone-700">Firebase Console</strong> &gt; Chọn Project &gt; <strong className="text-stone-700">Project Settings</strong> &gt; Cuộn xuống mục <strong className="text-stone-700">Your apps (Web)</strong> &gt; Copy đối tượng <strong className="text-stone-700">firebaseConfig</strong>.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-center text-[11px] text-stone-400">
              <span>Được bảo vệ bởi Firebase Authentication & OAuth 2.0 PKCE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
