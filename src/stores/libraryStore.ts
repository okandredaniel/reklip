import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { readJson, writeJson } from "@/services/storage/jsonStorage";
import type { Recording } from "@/types/recording";

const STORAGE_KEY = "livecapture_library";

interface LibraryState {
  recordings: Recording[];
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addRecording: (recording: Recording) => void;
  updateRecording: (id: string, updates: Partial<Recording>) => void;
  deleteRecording: (id: string) => void;
  getRecording: (id: string) => Recording | undefined;
}

export const useLibraryStore = create<LibraryState>()(
  subscribeWithSelector((set, get) => ({
    recordings: [],
    hydrated: false,

    hydrate: async () => {
      const recordings = await readJson<Recording[]>(STORAGE_KEY, []);
      set({ recordings, hydrated: true });
    },

    addRecording: (recording) =>
      set((state) => ({
        recordings: [recording, ...state.recordings],
      })),

    updateRecording: (id, updates) =>
      set((state) => ({
        recordings: state.recordings.map((r) =>
          r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r,
        ),
      })),

    deleteRecording: (id) =>
      set((state) => ({
        recordings: state.recordings.filter((r) => r.id !== id),
      })),

    getRecording: (id) => get().recordings.find((r) => r.id === id),
  })),
);

// Auto-save to disk whenever recordings change
useLibraryStore.subscribe(
  (state) => state.recordings,
  (recordings) => {
    if (useLibraryStore.getState().hydrated) {
      writeJson(STORAGE_KEY, recordings);
    }
  },
);
