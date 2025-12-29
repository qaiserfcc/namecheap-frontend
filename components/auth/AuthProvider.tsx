'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { LoginCredentials, RegisterData, User } from '@/types/auth';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const bootstrap = useCallback(async () => {
    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      try {
        const profileResponse = await authService.getCurrentUser();
        setUser(profileResponse.data as unknown as User);
      } catch (error) {
        // Invalid token; wipe state
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      }
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (!isLoading && !user && pathname && pathname.startsWith('/admin')) {
      router.replace('/auth/login');
    }
  }, [isLoading, user, pathname, router]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);

    if (response.success && response.data.token) {
      setUser(response.data.user);
      setToken(response.data.token);
      return;
    }

    throw new Error(response.message || 'Unable to login');
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const response = await authService.register(data);

    if (response.success && response.data.token) {
      setUser(response.data.user);
      setToken(response.data.token);
      return;
    }

    throw new Error(response.message || 'Unable to register');
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/');
  }, [router]);

  const refreshProfile = useCallback(async () => {
    const response = await authService.getCurrentUser();
    setUser(response.data as unknown as User);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      isLoading,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, token, isLoading, login, register, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return ctx;
}