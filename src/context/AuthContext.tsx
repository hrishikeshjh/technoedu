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

interface EnrichedUser extends User {
  learningProfile?: UserLearningProfile | null;
  enrollments?: CourseEnrollment[];
}

interface AuthContextType {
  user: EnrichedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeCourseId: string | null;
  primaryCourseId: string | null;
  enrollments: CourseEnrollment[];
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ needsOnboarding: boolean }>;
  signup: (name: string, email: string, pass: string) => Promise<{ needsOnboarding: boolean }>;
  loginWithGoogle: (googleData?: { name?: string; email?: string; avatarUrl?: string; credential?: string; accessToken?: string }) => Promise<{ needsOnboarding: boolean }>;
  logout: () => Promise<void>;
  submitOnboarding: (onboardingData: any) => Promise<void>;
  switchActiveCourse: (courseId: string) => Promise<void>;
  changePrimaryCourse: (newCourseId: string) => Promise<void>;
  enrollCourse: (courseId: string, selectedSubjects?: string[]) => Promise<void>;
  unenrollCourse: (courseId: string) => Promise<void>;
  updateLearningPreferences: (data: Partial<UserLearningProfile>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'technoedu_token';

function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
}

function persistToken(token: string, rememberMe = true) {
  if (rememberMe) {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<EnrichedUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = useCallback(async (authToken: string) => {
    try {
      const res = await fetch(getApiUrl('/api/auth/me'), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      if (res.ok) {
        const data = await parseJsonResponse(res);
        setUser(data.user);
      } else {
        // Token invalid or expired
        clearStoredToken();
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching current user:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setIsLoading(false);
    }
  }, [token, fetchCurrentUser]);

  const login = async (email: string, pass: string, rememberMe = true) => {
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, rememberMe }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      persistToken(data.token, rememberMe);
      setToken(data.token);
      setUser(data.user);
      return { needsOnboarding: Boolean(data.needsOnboarding) };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass }),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      persistToken(data.token, true);
      setToken(data.token);
      setUser(data.user);
      return { needsOnboarding: Boolean(data.needsOnboarding ?? true) };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleData?: { name?: string; email?: string; avatarUrl?: string; credential?: string; accessToken?: string }) => {
    setIsLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/auth/google'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleData || {}),
      });
      const data = await parseJsonResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Google authentication failed');
      }
      persistToken(data.token, true);
      setToken(data.token);
      setUser(data.user);
      return { needsOnboarding: Boolean(data.needsOnboarding) };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(getApiUrl('/api/auth/logout'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {});
      }
    } finally {
      clearStoredToken();
      setToken(null);
      setUser(null);
    }
  };

  const submitOnboarding = async (onboardingData: any) => {
    if (!token) throw new Error('Authentication required');
    const res = await fetch(getApiUrl('/api/onboarding'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(onboardingData),
    });
    const data = await parseJsonResponse(res);
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit onboarding');
    }
    setUser(data.user);
  };

  const switchActiveCourse = async (courseId: string) => {
    if (!token) return;
    await switchActiveCourseApi(courseId, token);
    await fetchCurrentUser(token);
  };

  const changePrimaryCourse = async (newCourseId: string) => {
    if (!token) return;
    await changePrimaryCourseApi(newCourseId, token);
    await fetchCurrentUser(token);
  };

  const enrollCourse = async (courseId: string, selectedSubjects: string[] = []) => {
    if (!token) return;
    await enrollCourseApi(courseId, selectedSubjects, token);
    await fetchCurrentUser(token);
  };

  const unenrollCourse = async (courseId: string) => {
    if (!token) return;
    await unenrollCourseApi(courseId, token);
    await fetchCurrentUser(token);
  };

  const updateLearningPreferences = async (data: Partial<UserLearningProfile>) => {
    if (!token) return;
    await updateLearningPreferencesApi(data, token);
    await fetchCurrentUser(token);
  };

  const refreshUser = async () => {
    if (token) {
      await fetchCurrentUser(token);
    }
  };

  const activeCourseId = user?.learningProfile?.activeCourseId || user?.learningProfile?.primaryCourseId || null;
  const primaryCourseId = user?.learningProfile?.primaryCourseId || null;
  const enrollments = user?.enrollments || [];

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isLoading,
        activeCourseId,
        primaryCourseId,
        enrollments,
        login,
        signup,
        loginWithGoogle,
        logout,
        submitOnboarding,
        switchActiveCourse,
        changePrimaryCourse,
        enrollCourse,
        unenrollCourse,
        updateLearningPreferences,
        refreshUser,
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
