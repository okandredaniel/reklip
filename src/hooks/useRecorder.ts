import { useCallback, useEffect, useRef } from "react";
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  setAudioModeAsync,
  requestRecordingPermissionsAsync,
} from "expo-audio";
import type { RecordingStatus } from "expo-audio";
import { useRecordingStore } from "@/stores/recordingStore";
import { useLibraryStore } from "@/stores/libraryStore";
import type { Recording } from "@/types/recording";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Extend the preset to enable metering
const RECORDING_OPTIONS = {
  ...RecordingPresets.HIGH_QUALITY,
  isMeteringEnabled: true,
  numberOfChannels: 1, // mono is fine for voice recording
};

export function useRecorder() {
  const isSessionActive = useRecordingStore((s) => s.isRecording);
  const isPaused = useRecordingStore((s) => s.isPaused);
  const elapsedMs = useRecordingStore((s) => s.elapsedMs);
  const metering = useRecordingStore((s) => s.metering);
  const markers = useRecordingStore((s) => s.markers);
  const recordingId = useRecordingStore((s) => s.recordingId);
  const addReaction = useRecordingStore((s) => s.addReaction);
  const addNote = useRecordingStore((s) => s.addNote);

  const recorder = useAudioRecorder(RECORDING_OPTIONS, (status: RecordingStatus) => {
    // This fires on recording events (start, stop, error)
    if (status.hasError) {
      console.warn("Recording error:", status.error);
    }
  });

  const recorderState = useAudioRecorderState(recorder, 100);

  // Sync metering + duration from recorder state into our store
  useEffect(() => {
    if (recorderState.isRecording) {
      const store = useRecordingStore.getState();
      store.setElapsedMs(recorderState.durationMillis);
      if (recorderState.metering != null) {
        store.setMetering(recorderState.metering);
      }
    }
  }, [recorderState.durationMillis, recorderState.metering, recorderState.isRecording]);

  // Store the latest duration in a ref so stop() doesn't need it as a dep
  const durationRef = useRef(0);
  useEffect(() => {
    durationRef.current = recorderState.durationMillis;
  }, [recorderState.durationMillis]);

  const start = useCallback(async () => {
    const { granted } = await requestRecordingPermissionsAsync();
    if (!granted) {
      throw new Error("Microphone permission not granted");
    }

    await setAudioModeAsync({
      playsInSilentMode: true,
      interruptionMode: "doNotMix",
    });

    const id = generateId();
    useRecordingStore.getState().startSession(id);

    await recorder.prepareToRecordAsync();
    recorder.record();
  }, [recorder]);

  const stop = useCallback(async () => {
    await recorder.stop();

    const state = useRecordingStore.getState();
    const uri = recorder.uri;
    const duration = durationRef.current;

    const recording: Recording = {
      id: state.recordingId!,
      userId: "local",
      status: "stopped",
      template: "general",
      audioLocalUri: uri ?? undefined,
      duration: Math.max(1, Math.round(duration / 1000)),
      markers: state.markers,
      photos: [],
      videos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    useLibraryStore.getState().addRecording(recording);
    useRecordingStore.getState().reset();

    return recording;
  }, [recorder]);

  const pause = useCallback(() => {
    recorder.pause();
    useRecordingStore.getState().setPaused(true);
  }, [recorder]);

  const resume = useCallback(async () => {
    await recorder.prepareToRecordAsync();
    recorder.record();
    useRecordingStore.getState().setPaused(false);
  }, [recorder]);

  return {
    isRecording: isSessionActive,
    isPaused,
    elapsedMs,
    metering,
    markers,
    recordingId,
    addReaction,
    addNote,
    start,
    stop,
    pause,
    resume,
  };
}
