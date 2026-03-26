import { create } from "zustand";
import type { Marker, ReactionType } from "@/types/recording";

interface RecordingSessionState {
  // Session state
  isRecording: boolean;
  isPaused: boolean;
  elapsedMs: number;
  markers: Marker[];
  metering: number; // Current audio level (-160 to 0 dB)
  recordingId: string | null;

  // Actions
  startSession: (id: string) => void;
  stopSession: () => void;
  setPaused: (paused: boolean) => void;
  setElapsedMs: (ms: number) => void;
  setMetering: (db: number) => void;
  addMarker: (marker: Marker) => void;
  addReaction: (reaction: ReactionType) => void;
  addNote: (text: string) => void;
  addPhoto: (uri: string) => void;
  reset: () => void;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const useRecordingStore = create<RecordingSessionState>((set, get) => ({
  isRecording: false,
  isPaused: false,
  elapsedMs: 0,
  markers: [],
  metering: -160,
  recordingId: null,

  startSession: (id) =>
    set({
      isRecording: true,
      isPaused: false,
      elapsedMs: 0,
      markers: [],
      metering: -160,
      recordingId: id,
    }),

  stopSession: () =>
    set({ isRecording: false, isPaused: false }),

  setPaused: (paused) => set({ isPaused: paused }),

  setElapsedMs: (ms) => set({ elapsedMs: ms }),

  setMetering: (db) => set({ metering: db }),

  addMarker: (marker) =>
    set((state) => ({ markers: [...state.markers, marker] })),

  addReaction: (reaction) => {
    const { elapsedMs, recordingId } = get();
    if (!recordingId) return;

    const marker: Marker = {
      id: generateId(),
      recordingId,
      timestamp: elapsedMs,
      type: "reaction",
      reaction,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ markers: [...state.markers, marker] }));
  },

  addNote: (text) => {
    const { elapsedMs, recordingId } = get();
    if (!recordingId) return;

    const marker: Marker = {
      id: generateId(),
      recordingId,
      timestamp: elapsedMs,
      type: "note",
      noteText: text,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ markers: [...state.markers, marker] }));
  },

  addPhoto: (uri) => {
    const { elapsedMs, recordingId } = get();
    if (!recordingId) return;

    const marker: Marker = {
      id: generateId(),
      recordingId,
      timestamp: elapsedMs,
      type: "photo",
      photoUri: uri,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ markers: [...state.markers, marker] }));
  },

  reset: () =>
    set({
      isRecording: false,
      isPaused: false,
      elapsedMs: 0,
      markers: [],
      metering: -160,
      recordingId: null,
    }),
}));
