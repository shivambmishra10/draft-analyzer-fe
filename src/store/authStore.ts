import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

//update once auth integration is complete
export const useAuthStore = create<AuthState>((set) => ({
  user: { id: 'Admin', name: 'Admin User', email: 'admin@example.com' } as User,
  isAuthenticated: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
