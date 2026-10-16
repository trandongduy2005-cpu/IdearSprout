import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth,
} from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const STORAGE_CONFIG_KEY = 'ideasprout_firebase_config_v2';

/**
 * ĐOẠN MÃ CẤU HÌNH FIREBASE CHÍNH THỨC (FIREBASE CONFIG OBJECT)
 * Bạn có thể:
 * 1. Dán trực tiếp thông tin dự án thực tế từ Firebase Console vào đối tượng bên dưới
 * 2. Hoặc thiết lập qua file .env (VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID, ...)
 * 3. Hoặc dán trực tiếp trên giao diện ứng dụng (Modal Đăng nhập > Cấu hình Firebase)
 */
export const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

/**
 * Thoroughly sanitizes a configuration string:
 * - Trims leading, trailing, and invisible whitespace characters
 * - Strips accidental wrapping double or single quotes
 * - Normalizes empty values
 */
export const sanitizeConfigValue = (val?: string | null): string => {
  if (!val || typeof val !== 'string') return '';
  return val
    .trim()
    .replace(/^["']|["']$/g, '')
    .trim();
};

/**
 * Checks if a string looks like a standard Google API key:
 * Standard Google Cloud / Firebase API keys start with "AIza" and are 39 characters long.
 */
export const isGoogleApiKeyFormat = (key: string): boolean => {
  const cleaned = sanitizeConfigValue(key);
  return /^AIza[0-9A-Za-z_-]{35}$/.test(cleaned);
};

/**
 * Checks if a string looks like a Firebase Project ID:
 * Usually 6-30 chars, lowercase letters, numbers, and hyphens.
 */
export const isProjectIdFormat = (id: string): boolean => {
  const cleaned = sanitizeConfigValue(id);
  return /^[a-z0-9][a-z0-9-]{4,28}[a-z0-9]$/.test(cleaned);
};

/**
 * Inspects and automatically corrects accidental swaps between apiKey, projectId, or appId
 */
export const correctAndSanitizeConfig = (raw: Partial<FirebaseConfig>): FirebaseConfig => {
  let apiKey = sanitizeConfigValue(raw.apiKey);
  let authDomain = sanitizeConfigValue(raw.authDomain);
  let projectId = sanitizeConfigValue(raw.projectId);
  let storageBucket = sanitizeConfigValue(raw.storageBucket);
  let messagingSenderId = sanitizeConfigValue(raw.messagingSenderId);
  let appId = sanitizeConfigValue(raw.appId);

  // Check 1: Did user swap apiKey and projectId?
  // (e.g. apiKey="ideasprout-app", projectId="AIzaSy...")
  if (!apiKey.startsWith('AIza') && projectId.startsWith('AIza')) {
    const temp = apiKey;
    apiKey = projectId;
    projectId = temp;
  }

  // Check 2: Did user put authDomain or appId into apiKey?
  if (apiKey.includes('.firebaseapp.com')) {
    if (!authDomain) authDomain = apiKey;
    apiKey = '';
  }

  // Check 3: Auto-compute authDomain if missing or incomplete
  if (!authDomain && projectId) {
    authDomain = `${projectId}.firebaseapp.com`;
  }

  // Check 4: Auto-compute storageBucket if missing
  if (!storageBucket && projectId) {
    storageBucket = `${projectId}.appspot.com`;
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  };
};

/**
 * Loads the effective Firebase configuration:
 * 1. Checks user-saved runtime config from localStorage
 * 2. Checks direct static firebaseConfig (if hardcoded by developer)
 * 3. Falls back to Vite environment variables (VITE_FIREBASE_*)
 */
export const loadEffectiveFirebaseConfig = (): FirebaseConfig => {
  // 1. Try reading user custom config from localStorage (saved via UI)
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          const sanitized = correctAndSanitizeConfig(parsed);
          if (sanitized.apiKey && sanitized.projectId) {
            return sanitized;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored Firebase config:', e);
    }
  }

  // 2. Try static firebaseConfig if populated directly in source code
  const directConfig = correctAndSanitizeConfig(firebaseConfig);
  if (directConfig.apiKey && directConfig.projectId) {
    return directConfig;
  }

  // 3. Read from environment variables
  const envConfig: Partial<FirebaseConfig> = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  };

  const sanitizedEnv = correctAndSanitizeConfig(envConfig);

  // Return sanitized env config (or fallback project identification)
  return {
    apiKey: sanitizedEnv.apiKey,
    authDomain: sanitizedEnv.authDomain || (sanitizedEnv.projectId ? `${sanitizedEnv.projectId}.firebaseapp.com` : ''),
    projectId: sanitizedEnv.projectId,
    storageBucket: sanitizedEnv.storageBucket,
    messagingSenderId: sanitizedEnv.messagingSenderId,
    appId: sanitizedEnv.appId,
  };
};

/**
 * Validates the current Firebase configuration status
 */
export const getFirebaseConfigStatus = (
  config: FirebaseConfig
): {
  isValid: boolean;
  hasApiKey: boolean;
  hasProjectId: boolean;
  hasValidKeyFormat: boolean;
  errorMessage?: string;
} => {
  const hasApiKey = Boolean(config.apiKey && config.apiKey.length > 0);
  const hasProjectId = Boolean(config.projectId && config.projectId.length > 0);
  const hasValidKeyFormat = isGoogleApiKeyFormat(config.apiKey);

  if (!hasApiKey) {
    return {
      isValid: false,
      hasApiKey: false,
      hasProjectId,
      hasValidKeyFormat: false,
      errorMessage: 'Chưa có Firebase API Key. Vui lòng cấu hình VITE_FIREBASE_API_KEY hoặc cập nhật trong Cài đặt Firebase.',
    };
  }

  if (config.apiKey.includes(' ') || config.apiKey.includes('\t') || config.apiKey.includes('\n')) {
    return {
      isValid: false,
      hasApiKey: true,
      hasProjectId,
      hasValidKeyFormat: false,
      errorMessage: 'Mã API Key chứa khoảng trắng không hợp lệ. Vui lòng xóa khoảng trắng thừa.',
    };
  }

  if (config.apiKey.length < 30) {
    return {
      isValid: false,
      hasApiKey: true,
      hasProjectId,
      hasValidKeyFormat: false,
      errorMessage: 'Mã API Key bị thiếu ký tự (độ dài tiêu chuẩn của Google API Key là 39 ký tự).',
    };
  }

  if (!config.apiKey.startsWith('AIza')) {
    return {
      isValid: false,
      hasApiKey: true,
      hasProjectId,
      hasValidKeyFormat: false,
      errorMessage: 'Mã API Key không đúng định dạng Google Identity Platform (phải bắt đầu bằng AIza...). Có thể bạn đã nhầm với Project ID.',
    };
  }

  if (!hasProjectId) {
    return {
      isValid: false,
      hasApiKey: true,
      hasProjectId: false,
      hasValidKeyFormat,
      errorMessage: 'Chưa cấu hình Project ID. Vui lòng bổ sung Project ID từ Firebase Console.',
    };
  }

  return {
    isValid: true,
    hasApiKey: true,
    hasProjectId: true,
    hasValidKeyFormat: true,
  };
};

const initFirebaseInstances = (config: FirebaseConfig): { app: FirebaseApp; auth: Auth } => {
  // If no apiKey is set, provide a placeholder object to avoid crashing initializeApp on initial load
  const safeConfig = {
    apiKey: config.apiKey || 'AIzaSyNotConfiguredPleaseProvideValidKey39',
    authDomain: config.authDomain || 'ideasprout-app.firebaseapp.com',
    projectId: config.projectId || 'ideasprout-app',
    storageBucket: config.storageBucket || 'ideasprout-app.appspot.com',
    messagingSenderId: config.messagingSenderId || '123456789012',
    appId: config.appId || '1:123456789012:web:placeholderapp123456',
  };

  const existingApps = getApps();
  const appInstance = existingApps.length > 0 ? existingApps[0] : initializeApp(safeConfig);
  const authInstance = getAuth(appInstance);
  return { app: appInstance, auth: authInstance };
};

// Initial setup
let currentConfig = loadEffectiveFirebaseConfig();
const initialInstances = initFirebaseInstances(currentConfig);

export const auth: Auth = initialInstances.auth;
export const app: FirebaseApp = initialInstances.app;

// Google Auth Provider setup with forced account selection prompt
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Saves a new Firebase configuration into browser runtime and re-initializes
 */
export const saveRuntimeFirebaseConfig = (rawConfig: Partial<FirebaseConfig>): { success: boolean; error?: string } => {
  try {
    const sanitized = correctAndSanitizeConfig(rawConfig);
    const status = getFirebaseConfigStatus(sanitized);

    if (!status.isValid) {
      return { success: false, error: status.errorMessage };
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_CONFIG_KEY, JSON.stringify(sanitized));
    }

    currentConfig = sanitized;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Không thể lưu cấu hình Firebase' };
  }
};

/**
 * Parses raw Firebase Console snippet (JSON or JS object) and updates config
 */
export const parseAndSaveFirebaseSnippet = (snippet: string): { success: boolean; config?: FirebaseConfig; error?: string } => {
  try {
    const cleaned = snippet.trim();
    if (!cleaned) {
      return { success: false, error: 'Vui lòng dán đoạn mã cấu hình Firebase.' };
    }

    // Try extracting JSON or key-value pairs
    let parsedObj: any = null;

    // 1. Try standard JSON parse
    try {
      parsedObj = JSON.parse(cleaned);
    } catch {
      // 2. Extract properties using regex from JS object literal
      const apiKeyMatch = cleaned.match(/apiKey\s*:\s*["']([^"']+)["']/i);
      const authDomainMatch = cleaned.match(/authDomain\s*:\s*["']([^"']+)["']/i);
      const projectIdMatch = cleaned.match(/projectId\s*:\s*["']([^"']+)["']/i);
      const storageBucketMatch = cleaned.match(/storageBucket\s*:\s*["']([^"']+)["']/i);
      const messagingSenderIdMatch = cleaned.match(/messagingSenderId\s*:\s*["']([^"']+)["']/i);
      const appIdMatch = cleaned.match(/appId\s*:\s*["']([^"']+)["']/i);

      if (apiKeyMatch || projectIdMatch) {
        parsedObj = {
          apiKey: apiKeyMatch ? apiKeyMatch[1] : '',
          authDomain: authDomainMatch ? authDomainMatch[1] : '',
          projectId: projectIdMatch ? projectIdMatch[1] : '',
          storageBucket: storageBucketMatch ? storageBucketMatch[1] : '',
          messagingSenderId: messagingSenderIdMatch ? messagingSenderIdMatch[1] : '',
          appId: appIdMatch ? appIdMatch[1] : '',
        };
      }
    }

    if (!parsedObj || typeof parsedObj !== 'object') {
      return { success: false, error: 'Không thể nhận diện định dạng cấu hình Firebase. Vui lòng kiểm tra lại.' };
    }

    const sanitized = correctAndSanitizeConfig(parsedObj);
    const saveResult = saveRuntimeFirebaseConfig(sanitized);

    if (!saveResult.success) {
      return { success: false, error: saveResult.error };
    }

    return { success: true, config: sanitized };
  } catch (e: any) {
    return { success: false, error: e.message || 'Lỗi khi xử lý cấu hình Firebase.' };
  }
};

/**
 * Retrieves the currently active Firebase config
 */
export const getCurrentFirebaseConfig = (): FirebaseConfig => {
  return { ...currentConfig };
};

/**
 * Sweeps and purges all keys related to Firebase Auth, user sessions,
 * and auth tokens from both localStorage and sessionStorage.
 */
export const clearAuthStorage = (): void => {
  try {
    const localKeysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        key !== STORAGE_CONFIG_KEY &&
        (key.includes('firebase') ||
          key.includes('authUser') ||
          key.includes('user') ||
          key.includes('token') ||
          key.includes('auth') ||
          key.includes('ideasprout_user'))
      ) {
        localKeysToRemove.push(key);
      }
    }
    localKeysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch (err) {
    console.warn('Error clearing localStorage:', err);
  }

  try {
    const sessionKeysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (
        key &&
        (key.includes('firebase') ||
          key.includes('authUser') ||
          key.includes('user') ||
          key.includes('token') ||
          key.includes('auth') ||
          key.includes('ideasprout_user'))
      ) {
        sessionKeysToRemove.push(key);
      }
    }
    sessionKeysToRemove.forEach((key) => sessionStorage.removeItem(key));
  } catch (err) {
    console.warn('Error clearing sessionStorage:', err);
  }
};

/**
 * Sign in strictly using Google OAuth Popup with pre-validation and clear error reporting
 */
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  // 1. Pre-validate configuration to prevent unhelpful raw browser errors
  const config = getCurrentFirebaseConfig();
  const status = getFirebaseConfigStatus(config);

  if (!status.isValid) {
    const err = new Error(status.errorMessage || 'Cấu hình Firebase API Key không hợp lệ.');
    (err as any).code = 'auth/api-key-not-valid';
    throw err;
  }

  // 2. Always enforce account picker
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });

  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  } catch (firebaseErr: any) {
    // Enrich error message if it's api-key-not-valid
    if (firebaseErr.code === 'auth/api-key-not-valid' || firebaseErr.code === 'auth/invalid-api-key') {
      const friendlyErr = new Error(
        'Lỗi khóa API (auth/api-key-not-valid): Khóa API Firebase của bạn không hợp lệ hoặc chưa được kích hoạt cho Identity Platform trong Google Cloud / Firebase Console. Vui lòng kiểm tra lại biến VITE_FIREBASE_API_KEY hoặc cấu hình Firebase của dự án.'
      );
      (friendlyErr as any).code = 'auth/api-key-not-valid';
      (friendlyErr as any).original = firebaseErr;
      throw friendlyErr;
    }
    throw firebaseErr;
  }
};

/**
 * Comprehensive sign-out: signs out from Firebase, purges storage,
 * and reconfigures provider to force account selection.
 */
export const logOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Firebase signOut error:', error);
  } finally {
    clearAuthStorage();
    googleProvider.setCustomParameters({
      prompt: 'select_account',
    });
  }
};

export { onAuthStateChanged };
export type { FirebaseUser };
