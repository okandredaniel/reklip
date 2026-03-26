import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AlertTriangle, Download, Check, X } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

export default function ProcessingErrorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Close button */}
      <FadeInView delay={0} className="px-4 pt-2">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full items-center justify-center"
        >
          <X size={24} color="white" />
        </Pressable>
      </FadeInView>

      {/* Center content */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Error icon */}
        <FadeInView delay={50}>
          <View
            className="w-24 h-24 rounded-full bg-red-500/10 items-center justify-center mb-8"
            style={{
              shadowColor: "#EF4444",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 15,
            }}
          >
            <AlertTriangle size={48} color="#EF4444" />
          </View>
        </FadeInView>

        {/* Message */}
        <FadeInView delay={100}>
          <Text className="text-white text-3xl font-bold tracking-tight text-center mb-4">
            Processing Failed
          </Text>
          <Text className="text-text-secondary text-base font-medium text-center leading-relaxed max-w-[280px]">
            We couldn't process your recording. Your audio and markers are safe.
          </Text>
        </FadeInView>

        {/* Error card */}
        <FadeInView delay={160} className="w-full mt-8">
          <View className="rounded-xl bg-card border border-white/5 p-5 relative overflow-hidden">
            <View className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
            <View className="flex-row items-start gap-4 pl-3">
              <AlertTriangle size={18} color="#EF4444" />
              <View className="flex-1">
                <Text className="text-white text-sm font-semibold mb-1">
                  Transcription Error
                </Text>
                <Text className="text-text-secondary text-sm leading-snug">
                  Error: Audio quality too low for accurate transcription. Please
                  check your microphone settings.
                </Text>
              </View>
            </View>
          </View>
        </FadeInView>
      </View>

      {/* Bottom actions */}
      <View className="px-6 pb-4">
        <FadeInView delay={250}>
          <Button
            title="Retry Processing"
            icon={<Download size={18} color="white" />}
            onPress={() => router.replace(`/record/${id}/processing`)}
          />

          <Pressable className="h-14 rounded-full border border-white/20 items-center justify-center mt-4">
            <Text className="text-white text-base font-semibold">
              Contact Support
            </Text>
          </Pressable>

          {/* Reassurance */}
          <View className="flex-row items-center justify-center gap-2 mt-6">
            <View className="w-5 h-5 rounded-full bg-success/20 items-center justify-center">
              <Check size={12} color="#22C55E" />
            </View>
            <Text className="text-text-secondary text-xs font-medium">
              Original recording saved locally
            </Text>
          </View>
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}
