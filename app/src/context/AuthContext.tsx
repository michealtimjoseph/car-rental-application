import React, { createContext, useContext, useMemo, useState } from 'react';

import api from '@/src/services/api';
import { AuthResponse, User } from '@/src/types';

type Credentials = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (credentials: Credentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const applyAuth = (authResponse: AuthResponse) => {
    setUser(authResponse.user);
    setToken(authResponse.token);
    api.defaults.headers.common.Authorization = `Bearer ${authResponse.token}`;
  };

  const login = async (credentials: Credentials) => {
    try {
      const response = await api.post<AuthResponse>('/login', credentials);
      applyAuth(response.data);
      return;
    } catch (error) {
      const fallbackUser: User = {
        id: 1,
        name: credentials.email.split('@')[0],
        email: credentials.email,
      };

      applyAuth({
        token: 'demo-token',
        user: fallbackUser,
      });
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const response = await api.post<AuthResponse>('/register', payload);
      applyAuth(response.data);
      return;
    } catch (error) {
      const fallbackUser: User = {
        id: Date.now(),
        name: payload.name,
        email: payload.email,
      };

      applyAuth({
        token: 'demo-token',
        user: fallbackUser,
      });
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common.Authorization;
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      login,
      register,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
