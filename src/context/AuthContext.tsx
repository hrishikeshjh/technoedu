import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  User,
  UserLearningProfile,
  CourseEnrollment,
  switchActiveCourseApi,
  changePrimaryCourseApi,
  enrollCourseApi,
  unenrollCourseApi,
  updateLearningPreferencesApi,
} from '../lib/personalization/userLearningProfile';
import { getApiUrl, parseJsonResponse } from '../lib/apiClient';

export interface EnrichedUser extends User {
  learningProfile?: UserLearningProfile | null;
  enrollments?: CourseEnrollment[];
}

export interface SignUpResult {
  needsOnboarding: boolean;
  requiresEmailVerification?: boolean;
  email?: string;
}

export interface SignInResult {
  needsOnboarding: boolean;
}

export class EmailNotVerifiedError extends Error {
  email: string;
  constructor(message: string, email: string) {
    super(message);
    this.name = 'EmailNotVerifiedError';
    this.email = email;
  }
}

interface AuthContextType {
  user: EnrichedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionExpired: boolean;
  activeCourseId: string | null;
  primaryCourseId: string | null;
  enrollments: CourseEnrollment[];
  getCurrentUser: () => EnrichedUser | null;
  getSession: () => { user: EnrichedUser | null; token: string | null; isAuthenticated: boolean };
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<SignInResult>;
  signIn: (email: string, pass: string, rememberMe?: boolean) => Promise<SignInResult>;
  signup: (name: string, email: string, pass: string) => Promise<SignUpResult>;
  signUp: (name: string, email: string, pass: string) => Promise<SignUpResult>;
  verifyEmail: (email: string, code: string) => Promise<SignInResult>;
  resendVerification: (email: string) => Promise<string>;
  loginWithGoogle: (googleData?: { credential?: string; accessToken?: string }) => Promise<SignInResult>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  refreshUser: () => Promise<void>;
  submitOnboarding: (onboardingData: any) => Promise<void>;
  switchActiveCourse: (courseId: string) => Promise<void>;
  changePrimaryCourse: (newCourseId: string) => Promise<void>;
  enrollCourse: (courseId: string, selectedSubjects?: string[]) => Promise<void>;
  unenrollCourse: (courseId: string) => Promise<void>;
  updateLearningPreferences: (data: Partial<UserLearningProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'technoedu_token';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function persistToken(token: string, rememberMe = true) {
  try {
    if (rememberMe) {
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  } catch {
    // Ignore storage quota errors; HttpOnly cookie remains active
  }
}

function clearStoredAuthData() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // Ignore
  }
}

function buildHeaders(authToken?: string | null): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const t = authToken || getStoredToken();
  if (t) {
    headers['Authorization'] = `Bearer ${t}`;
  }
  return headers;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<EnrichedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  const fetchCurrentUser = useCallback(async (authToken?: string | null) => {
    try {
      const res = await fetch(getApiUrl('/api/auth/me'), {
        credentials: 'include',
        headers: buildHeaders(authToken),
      });

      if (res.ok) {
        const data = await parseJsonResponse(res);
        setUser(data.user || null);
        setSessionExpired(false);
        if (!authToken && data.user) {
          // Cookie-backed session without local token
          setToken('cookie-session');
        }
        return true;
      }

      const errData = await parseJsonResponse(res).catch(() => ({}));
      if (authToken || errData?.code === 'SESSION_EXPIRED') {
        setSessionExpired(true);
      }
      clearStoredAuthData();
      setToken(null);
      setUser(null);
      return false;
    } catch (err) {
      console.error('Error validating session:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser(getStoredToken());
  }, [fetchCurrentUser]);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const res = await fetch(getApiUrl('/api/auth/refresh'), {
        method: 'POST',
        credentials: 'include',
        headers: buildHeaders(token),
      });
      if (!res.ok) {
        clearStoredAuthData();
        setToken(null);
        setUser(null);
        setSessionExpired(true);
        return false;
      }
      const data = await parseJsonResponse(res);
      if (data.token) {
        const rememberMe = Boolean(localStorage.getItem(TOKEN_KEY));
        persistToken(data.token, rememberMe);
        setToken(data.token);
      }
      if (data.user) {
        setUser(data.user);
      }
      setSessionExpired(false);
      return true;
    } catch {
      return false;
    }
  }, [token]);

  // Periodically refresh active session when window regains focus
  useEffect(() => {
    if (!user) return;
    const onFocus = () => {
      refreshSession();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [user, refreshSession]);

  const login = async (email: string, pass: string, rememberMe = true): Promise<SignInResult> => {
    const res = await fetch(getApiUrl('/api/auth/login'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass, rememberMe }),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      if (res.status === 403 && data.code === 'EMAIL_NOT_VERIFIED') {
        throw new EmailNotVerifiedError(data.error || 'Please verify your email address.', data.email || email);
      }
      throw new Error(data.error || 'Invalid email or password.');
    }
    persistToken(data.token, rememberMe);
    setToken(data.token);
    setUser(data.user);
    setSessionExpired(false);
    return { needsOnboarding: Boolean(data.needsOnboarding) };
  };

  const signup = async (name: string, email: string, pass: string): Promise<SignUpResult> => {
    const res = await fetch(getApiUrl('/api/auth/signup'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password: pass }),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.error || 'Could not create account.');
    }

    if (data.requiresEmailVerification) {
      return {
        needsOnboarding: true,
        requiresEmailVerification: true,
        email: data.email || email,
      };
    }

    persistToken(data.token, true);
    setToken(data.token);
    setUser(data.user);
    setSessionExpired(false);
    return { needsOnboarding: Boolean(data.needsOnboarding ?? true) };
  };

  const verifyEmail = async (email: string, code: string): Promise<SignInResult> => {
    const res = await fetch(getApiUrl('/api/auth/verify-email'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.error || 'Email verification failed.');
    }
    if (data.token) {
      persistToken(data.token, true);
      setToken(data.token);
    }
    if (data.user) {
      setUser(data.user);
    }
    setSessionExpired(false);
    return { needsOnboarding: Boolean(data.needsOnboarding) };
  };

  const resendVerification = async (email: string): Promise<string> => {
    const res = await fetch(getApiUrl('/api/auth/resend-verification'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.error || 'Could not resend verification code.');
    }
    return data.message || 'Verification code sent.';
  };

  const loginWithGoogle = async (googleData?: { credential?: string; accessToken?: string }): Promise<SignInResult> => {
    const res = await fetch(getApiUrl('/api/auth/google'), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(googleData || {}),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.error || 'Google authentication failed.');
    }
    persistToken(data.token, true);
    setToken(data.token);
    setUser(data.user);
    setSessionExpired(false);
    return { needsOnboarding: Boolean(data.needsOnboarding) };
  };

  const logout = async () => {
    try {
      await fetch(getApiUrl('/api/auth/logout'), {
        method: 'POST',
        credentials: 'include',
        headers: buildHeaders(token),
      }).catch(() => {});
    } finally {
      clearStoredAuthData();
      setToken(null);
      setUser(null);
      setSessionExpired(false);
    }
  };

  const submitOnboarding = async (onboardingData: any) => {
    const activeToken = getStoredToken() || token;
    if (!activeToken && !user) throw new Error('Authentication required');
    const res = await fetch(getApiUrl('/api/onboarding'), {
      method: 'POST',
      credentials: 'include',
      headers: buildHeaders(activeToken),
      body: JSON.stringify(onboardingData),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit onboarding');
    }
    setUser(data.user);
  };

  const switchActiveCourse = async (courseId: string) => {
    const activeToken = getStoredToken() || token;
    if (!activeToken && !user) return;
    await switchActiveCourseApi(courseId, activeToken);
    await fetchCurrentUser(activeToken);
  };

  const changePrimaryCourse = async (newCourseId: string) => {
    const activeToken = getStoredToken() || token;
    if (!activeToken && !user) return;
    await changePrimaryCourseApi(newCourseId, activeToken);
    await fetchCurrentUser(activeToken);
  };

  const enrollCourse = async (courseId: string, selectedSubjects: string[] = []) => {
    const activeToken = getStoredToken() || token;
    if (!activeToken && !user) return;
    await enrollCourseApi(courseId, selectedSubjects, activeToken);
    await fetchCurrentUser(activeToken);
  };

  const unenrollCourse = async (courseId: string) => {
    const activeToken = getStoredToken() || token;
    if (!activeToken && !user) return;
    await unenrollCourseApi(courseId, activeToken);
    await fetchCurrentUser(activeToken);
  };

  const updateLearningPreferences = async (data: Partial<UserLearningProfile>) => {
    const activeToken = getStoredToken() || token;
    if (!activeToken && !user) return;
    await updateLearningPreferencesApi(data, activeToken);
    await fetchCurrentUser(activeToken);
  };

  const refreshUser = async () => {
    await fetchCurrentUser(getStoredToken() || token);
  };

  const isAuthenticated = Boolean(user);
  const activeCourseId = user?.learningProfile?.activeCourseId || user?.learningProfile?.primaryCourseId || null;
  const primaryCourseId = user?.learningProfile?.primaryCourseId || null;
  const enrollments = user?.enrollments || [];

  const getCurrentUser = useCallback(() => user, [user]);
  const getSession = useCallback(
    () => ({ user, token, isAuthenticated }),
    [user, token, isAuthenticated]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        sessionExpired,
        activeCourseId,
        primaryCourseId,
        enrollments,
        getCurrentUser,
        getSession,
        login,
        signIn: login,
        signup,
        signUp: signup,
        verifyEmail,
        resendVerification,
        loginWithGoogle,
        logout,
        signOut: logout,
        refreshSession,
        refreshUser,
        submitOnboarding,
        switchActiveCourse,
        changePrimaryCourse,
        enrollCourse,
        unenrollCourse,
        updateLearningPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
