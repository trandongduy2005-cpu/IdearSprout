import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

// Firebase Client Configuration
// Uses VITE_FIREBASE_* environment variables if configured, with resilient defaults for development
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoIdeaSproutAppKey2026',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ideasprout-app.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ideasprout-app',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ideasprout-app.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '644053177555',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:644053177555:web:abcd1234efgh5678',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google Auth Provider setup with forced account selection prompt
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

/**
 * Sweeps and purges all keys related to Firebase Auth, user sessions,
 * and auth tokens from both localStorage and sessionStorage.
 */
export const clearAuthStorage = (): void => {
  try {
    // 1. Scan and remove from localStorage
    const localKeysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
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
    // 2. Scan and remove from sessionStorage
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
 * Sign in strictly using Google OAuth Popup
 */
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  // Always enforce account picker
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
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
