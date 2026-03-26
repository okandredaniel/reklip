import {
  View, Text, ScrollView, Pressable, Alert,
  TextInput, KeyboardAvoidingView, Platform, Modal,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Camera,
  Video,
  Pencil,
  Pause,
  Play,
  Check,
  MapPin,
} from "lucide-react-native";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { Waveform } from "@/components/recording/Waveform";
import { MarkerItem } from "@/components/recording/MarkerItem";
import { useRecorder } from "@/hooks/useRecorder";
import { REACTIONS } from "@/constants/reactions";
import { formatTime } from "@/utils/formatTime";
import { colors } from "@/theme";
import type { ReactionType } from "@/types/recording";

const HOLD_DURATION = 2000;

export default function RecordingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    isRecording, isPaused, elapsedMs, metering, markers,
    start, stop, pause, resume, addReaction, addNote,
  } = useRecorder();

  const [noteVisible, setNoteVisible] = useState(false);
  const [noteText, setNoteText] = useState("");

  // Hold-to-stop state
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdProgress = useSharedValue(0);
  const [holdingStop, setHoldingStop] = useState(false);

  // Auto-start recording when screen mounts
  useEffect(() => {
    start().catch((err) => {
      Alert.alert("Recording Error", err.message);
      router.back();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doStop = useCallback(async () => {
    try {
      const recording = await stop();
      router.replace(`/record/${recording.id}/complete`);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  }, [stop, router]);

  const onStopPressIn = useCallback(() => {
    setHoldingStop(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    holdProgress.value = withTiming(1, { duration: HOLD_DURATION });
    holdTimer.current = setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      runOnJS(doStop)();
    }, HOLD_DURATION);
  }, [holdProgress, doStop]);

  const onStopPressOut = useCallback(() => {
    setHoldingStop(false);
    holdProgress.value = withTiming(0, { duration: 200 });
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }, [holdProgress]);

  const stopRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + holdProgress.value * 0.15 }],
    opacity: 0.2 + holdProgress.value * 0.6,
  }));

  const stopInnerStyle = useAnimatedStyle(() => ({
    borderRadius: 4 + holdProgress.value * 36,
  }));

  const handleReaction = (reaction: ReactionType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    addReaction(reaction);
  };

  const handlePauseResume = async () => {
    if (isPaused) await resume();
    else await pause();
  };

  const handleSaveNote = () => {
    if (noteText.trim()) {
      addNote(noteText.trim());
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setNoteText("");
    setNoteVisible(false);
  };

  const reversedMarkers = useMemo(() => [...markers].reverse(), [markers]);

  const bottomHeight = Math.max(insets.bottom, 12) + 120;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-2 pb-4">
        <LiveIndicator />
        <Text className="text-white text-2xl font-bold font-mono tabular-nums">
          {formatTime(elapsedMs)}
        </Text>
        <Pressable
          onPress={handlePauseResume}
          className="w-10 h-10 rounded-full bg-surface items-center justify-center"
        >
          {isPaused ? (
            <Play size={18} color="white" fill="white" />
          ) : (
            <Pause size={18} color="white" />
          )}
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: bottomHeight }}
      >
        {/* Waveform */}
        <Waveform metering={metering} isPaused={isPaused} />

        {/* Reactions */}
        <View className="px-6 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <SectionLabel>Reactions</SectionLabel>
            <Pressable
              onPress={() => setNoteVisible(true)}
              className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-card-border"
            >
              <Pencil size={14} color={colors.primary} />
              <Text className="text-white/80 text-xs font-semibold">
                Quick Note
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -24 }}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          >
            {REACTIONS.map((r) => (
              <Pressable
                key={r.type}
                onPress={() => handleReaction(r.type)}
                className="items-center gap-1 min-w-[56px]"
              >
                <View className="w-14 h-14 rounded-full bg-card border border-card-border items-center justify-center">
                  <r.icon size={28} color={r.color} />
                </View>
                <Text className="text-text-secondary text-[10px] font-medium">
                  {r.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Timeline Feed */}
        <View className="px-6">
          <View className="flex-row items-center justify-between mb-3">
            <SectionLabel>Timeline Feed</SectionLabel>
            {markers.length > 0 && (
              <Text className="text-text-secondary text-[10px] font-medium uppercase tracking-wider">
                {markers.length} marker{markers.length !== 1 ? "s" : ""}
              </Text>
            )}
          </View>

          {reversedMarkers.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-text-secondary text-sm">
                Tap a reaction to add your first marker
              </Text>
            </View>
          ) : (
            <View className="gap-3">
              {reversedMarkers.map((marker) => (
                <MarkerItem key={marker.id} marker={marker} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      <View
        className="absolute bottom-0 left-0 right-0 pt-6 px-6"
        style={{
          paddingBottom: Math.max(insets.bottom, 12) + 16,
          backgroundColor: colors.background,
        }}
      >
        {/* Hold hint */}
        {holdingStop && (
          <Text className="text-red-400/80 text-[10px] font-bold uppercase tracking-wider text-center mb-3">
            Hold to stop...
          </Text>
        )}

        <View className="flex-row items-center justify-center gap-8">
          <Pressable
            onPress={() => router.push("/modal/photo-capture")}
            className="w-12 h-12 rounded-full bg-surface border border-card-border items-center justify-center"
          >
            <Camera size={22} color={colors.textSecondary} />
          </Pressable>

          {/* Hold-to-stop button */}
          <View className="items-center justify-center w-20 h-20">
            {/* Animated glow ring */}
            <Animated.View
              className="absolute w-20 h-20 rounded-full bg-red-500"
              style={stopRingStyle}
            />
            <Pressable
              onPressIn={onStopPressIn}
              onPressOut={onStopPressOut}
              className="w-20 h-20 rounded-full bg-red-600 items-center justify-center border-4 border-red-900"
              style={{
                shadowColor: "#EF4444",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <Animated.View
                className="w-6 h-6 bg-white"
                style={stopInnerStyle}
              />
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push("/modal/video-capture")}
            className="w-12 h-12 rounded-full bg-surface border border-card-border items-center justify-center"
          >
            <Video size={22} color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      {/* Quick Note Modal */}
      <Modal
        visible={noteVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setNoteVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <Pressable
            className="flex-1"
            onPress={() => setNoteVisible(false)}
          />
          <View className="bg-card rounded-t-3xl border-t border-white/5">
            {/* Drag handle */}
            <View className="items-center pt-3 pb-4">
              <View className="w-12 h-1.5 rounded-full bg-white/20" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 mb-4">
              <View className="flex-row items-center gap-2">
                <MapPin size={14} color="#EF4444" />
                <Text className="text-white/80 text-xs font-mono">
                  {formatTime(elapsedMs)}
                </Text>
              </View>
              <Text className="text-text-secondary text-xs uppercase tracking-wider">
                Quick Note
              </Text>
            </View>

            {/* Input */}
            <TextInput
              className="px-6 py-2 text-white text-lg leading-relaxed min-h-[100px]"
              placeholder="What's happening now?"
              placeholderTextColor={colors.textSecondary}
              value={noteText}
              onChangeText={setNoteText}
              multiline
              autoFocus
              textAlignVertical="top"
            />

            {/* Action bar */}
            <SafeAreaView edges={["bottom"]}>
              <View className="flex-row items-center justify-between px-4 py-3 border-t border-white/5">
                <Pressable
                  onPress={() => { setNoteText(""); setNoteVisible(false); }}
                  className="px-4 py-2"
                >
                  <Text className="text-text-secondary text-[15px] font-medium">
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSaveNote}
                  className="flex-row items-center gap-2 px-6 py-2 rounded-full bg-primary"
                >
                  <Check size={16} color="white" />
                  <Text className="text-white text-[15px] font-semibold">
                    Save Note
                  </Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
