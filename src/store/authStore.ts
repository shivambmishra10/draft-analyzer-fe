import { create } from 'zustand';

type AuthState = {
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, email: string, name?: string, avatarUrl?: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  email: null,
  name: null,
  avatarUrl: null,
  token: null,
  isAuthenticated: false,
  login: (token, email, name, avatarUrl) =>
    set({
      token,
      email,
      name,
      avatarUrl,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      email: null,
      name: null,
      avatarUrl: null,
      token: null,
      isAuthenticated: false,
    }),
}));
