import { create } from "zustand";

interface AuthState {
  hasOnboarded: boolean;
  isAuthenticated: boolean;
  hasCompletedPermissions: boolean;
  setHasOnboarded: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setHasCompletedPermissions: (value: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  hasOnboarded: false,
  isAuthenticated: false,
  hasCompletedPermissions: false,
  setHasOnboarded: (value) => set({ hasOnboarded: value }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setHasCompletedPermissions: (value) => set({ hasCompletedPermissions: value }),
  signOut: () => set({ isAuthenticated: false }),
}));
