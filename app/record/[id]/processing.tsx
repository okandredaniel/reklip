import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Check,
  Loader2,
  Bell,
  X,
  MoreHorizontal,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";
import Svg, { Circle } from "react-native-svg";

const STEPS: { label: string; done: boolean; active?: boolean }[] = [
  { label: "Audio uploaded", done: true },
  { label: "Transcription complete", done: true },
  { label: "Photos & video analyzed", done: true },
  { label: "Generating content outputs", done: false, active: true },
  { label: "Creating social media clips", done: false },
  { label: "Building study guide", done: false },
];

export default function ProcessingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [progress, setProgress] = useState(67);
  const [showNotif, setShowNotif] = useState(true);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => router.replace(`/record/${id}/insights`), 500);
          return 100;
        }
        return p + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [id, router]);

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Top Bar */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
        <BackButton />
        <Pressable className="w-10 h-10 rounded-full bg-white/5 items-center justify-center">
          <MoreHorizontal size={22} color="white" />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        {/* Progress Circle */}
        <FadeInView delay={0} className="items-center mb-6">
          <View className="w-48 h-48 items-center justify-center">
            <Svg width={192} height={192} viewBox="0 0 100 100">
              {/* Track */}
              <Circle
                cx={50}
                cy={50}
                r={42}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={8}
                fill="transparent"
              />
              {/* Progress */}
              <Circle
                cx={50}
                cy={50}
                r={42}
                stroke={colors.primary}
                strokeWidth={8}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                rotation={-90}
                origin="50,50"
              />
            </Svg>
            <View className="absolute items-center">
              <Text className="text-white text-5xl font-bold tracking-tighter">
                {progress}%
              </Text>
            </View>
          </View>
        </FadeInView>

        {/* Header Text */}
        <FadeInView delay={80} className="items-center mb-10">
          <Text className="text-white text-xl font-bold mb-2">
            Processing your sermon...
          </Text>
          <Text className="text-text-secondary text-sm font-medium">
            ~3 minutes remaining
          </Text>
        </FadeInView>

        {/* Steps */}
        <FadeInView delay={160} className="w-full max-w-[280px]">
          <View className="gap-6 relative">
            {/* Connector line */}
            <View className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-white/5" />

            {STEPS.map((step, i) => (
              <View key={i} className="flex-row items-center gap-4">
                {step.done ? (
                  <View className="w-10 h-10 rounded-full bg-success/10 items-center justify-center">
                    <Check size={18} color="#22C55E" />
                  </View>
                ) : step.active ? (
                  <View
                    className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center"
                    style={{
                      shadowColor: colors.primary,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.3,
                      shadowRadius: 15,
                    }}
                  >
                    <Loader2 size={18} color={colors.primary} />
                  </View>
                ) : (
                  <View className="w-10 h-10 rounded-full bg-white/5 items-center justify-center opacity-50">
                    <View className="w-2 h-2 rounded-full bg-white/20" />
                  </View>
                )}
                <Text
                  className={`text-base font-medium ${
                    step.done
                      ? "text-white/60"
                      : step.active
                        ? "text-white font-bold tracking-wide"
                        : "text-white/40"
                  }`}
                >
                  {step.label}
                </Text>
              </View>
            ))}
          </View>
        </FadeInView>
      </View>

      {/* Bottom Notification */}
      {showNotif && (
        <FadeInView delay={300} className="px-6 pb-6">
          <View className="flex-row items-start gap-4 rounded-xl border border-card-border bg-card p-4">
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
              <Bell size={18} color={colors.primary} />
            </View>
            <Text className="flex-1 text-white/90 text-sm font-medium leading-relaxed pt-0.5">
              You'll get a notification when it's ready. Feel free to close the
              app.
            </Text>
            <Pressable
              onPress={() => setShowNotif(false)}
              className="shrink-0"
            >
              <X size={18} color="rgba(255,255,255,0.4)" />
            </Pressable>
          </View>
        </FadeInView>
      )}
    </SafeAreaView>
  );
}
