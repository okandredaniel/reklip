import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState, useCallback, useRef, useEffect } from "react";
import { Audio } from "expo-av";
import type { AVPlaybackStatus } from "expo-av";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilterChips } from "@/components/ui/FilterChips";
import { MarkerItem } from "@/components/recording/MarkerItem";
import { useLibraryStore } from "@/stores/libraryStore";
import { formatDuration } from "@/utils/formatDuration";
import { formatTimestamp } from "@/utils/formatTime";
import { colors } from "@/theme";

const FILTERS = [
  { label: "All" },
  { label: "Reactions" },
  { label: "Photos" },
  { label: "Notes" },
] as const;

export default function PlaybackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recording = useLibraryStore((s) => s.getRecording(id));
  const [activeFilter, setActiveFilter] = useState("All");

  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  // Load sound on mount
  useEffect(() => {
    if (!recording?.audioLocalUri) return;

    let mounted = true;
    const load = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: recording.audioLocalUri! },
        { shouldPlay: false },
        (status: AVPlaybackStatus) => {
          if (!mounted || !status.isLoaded) return;
          setPositionMs(status.positionMillis);
          setDurationMs(status.durationMillis ?? 0);
          setIsPlaying(status.isPlaying);
        },
      );
      soundRef.current = sound;
    };
    load();

    return () => {
      mounted = false;
      soundRef.current?.unloadAsync();
      soundRef.current = null;
    };
  }, [recording?.audioLocalUri]);

  const togglePlay = useCallback(async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  }, [isPlaying]);

  const skipBack = useCallback(async () => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(Math.max(0, positionMs - 10000));
  }, [positionMs]);

  const skipForward = useCallback(async () => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(positionMs + 10000);
  }, [positionMs]);

  const seekToMarker = useCallback(async (timestampMs: number) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(timestampMs);
    await soundRef.current.playAsync();
  }, []);

  if (!recording) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-text-secondary">Recording not found</Text>
      </SafeAreaView>
    );
  }

  const filteredMarkers = recording.markers.filter((m) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Reactions") return m.type === "reaction";
    if (activeFilter === "Photos") return m.type === "photo";
    if (activeFilter === "Notes") return m.type === "note";
    return true;
  });

  const progress = durationMs > 0 ? (positionMs / durationMs) * 100 : 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
        <BackButton />
        <Text className="text-white text-base font-bold flex-1 text-center" numberOfLines={1}>
          {recording.title || "Untitled Recording"}
        </Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Audio Player */}
        <View className="mx-5 mb-5">
          <View className="bg-card rounded-3xl border border-primary/40 p-5">
            {/* Progress bar */}
            <View className="h-1.5 rounded-full bg-card-border mb-4 overflow-hidden">
              <View
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </View>

            {/* Time */}
            <View className="flex-row justify-between mb-5">
              <Text className="text-white font-mono text-sm">
                {formatTimestamp(positionMs)}
              </Text>
              <Text className="text-text-secondary font-mono text-sm">
                {formatTimestamp(durationMs)}
              </Text>
            </View>

            {/* Controls */}
            <View className="flex-row items-center justify-center gap-8">
              <Pressable onPress={skipBack}>
                <SkipBack size={24} color="white" />
              </Pressable>
              <Pressable
                onPress={togglePlay}
                className="w-16 h-16 rounded-full bg-primary items-center justify-center"
                style={{
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  elevation: 6,
                }}
              >
                {isPlaying ? (
                  <Pause size={28} color="white" />
                ) : (
                  <Play size={28} color="white" fill="white" style={{ marginLeft: 3 }} />
                )}
              </Pressable>
              <Pressable onPress={skipForward}>
                <SkipForward size={24} color="white" />
              </Pressable>
            </View>

            {/* Info */}
            {recording.speakerName && (
              <Text className="text-text-secondary text-xs text-center mt-4">
                {recording.speakerName} · {formatDuration(recording.duration)}
              </Text>
            )}
          </View>
        </View>

        {/* Markers */}
        <View className="px-5">
          <SectionLabel className="mb-3">
            {`Markers (${recording.markers.length})`}
          </SectionLabel>

          {recording.markers.length > 0 && (
            <View className="mb-4" style={{ marginHorizontal: -20 }}>
              <FilterChips
                filters={FILTERS}
                activeFilter={activeFilter}
                onSelect={setActiveFilter}
              />
            </View>
          )}

          {filteredMarkers.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-text-secondary text-sm">
                {recording.markers.length === 0
                  ? "No markers were added during this recording"
                  : "No markers match this filter"}
              </Text>
            </View>
          ) : (
            <View className="gap-3">
              {filteredMarkers.map((marker) => (
                <MarkerItem
                  key={marker.id}
                  marker={marker}
                  onPress={() => seekToMarker(marker.timestamp)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
