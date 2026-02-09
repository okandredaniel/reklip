import { create } from "zustand";

interface AuthState {
  hasOnboarded: boolean;
  isAuthenticated: boolean;
  setHasOnboarded: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasOnboarded: false,
  isAuthenticated: false,
  setHasOnboarded: (value) => set({ hasOnboarded: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  signOut: () => set({ isAuthenticated: false }),
}));
