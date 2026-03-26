import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Zap, SwitchCamera } from "lucide-react-native";
import { colors } from "@/theme";

export default function VideoCaptureScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView edges={["top"]}>
        <View className="flex-row items-center justify-between px-6 pt-2 pb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <Text className="text-white text-sm font-bold tracking-wide">LIVE</Text>
          </View>
          <Text className="text-white text-lg font-bold tabular-nums font-mono">00:15:32</Text>
          <View className="flex-row items-end gap-[2px] h-4">
            {[8, 14, 10, 16, 12].map((h, i) => (
              <View key={i} className="w-[2px] rounded-full bg-primary" style={{ height: h }} />
            ))}
          </View>
        </View>
      </SafeAreaView>

      {/* Viewfinder (9:16 portrait) */}
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-[85%] aspect-[9/16] rounded-2xl bg-black border border-white/10 overflow-hidden items-center justify-center">
          {/* HUD overlays */}
          <View className="absolute top-3 left-3 flex-row items-center gap-1.5 px-2 py-1 rounded-full bg-black/40">
            <View className="w-2 h-2 rounded-full bg-red-500" />
            <Text className="text-white text-xs font-mono">00:00:12</Text>
          </View>
          <View className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40">
            <Text className="text-white text-[10px] font-bold tracking-wider">720P</Text>
          </View>
          {/* Focus reticle */}
          <View className="w-16 h-16 border border-white/30 rounded-lg opacity-50" />
        </View>
      </View>

      <SafeAreaView edges={["bottom"]}>
        <View className="items-center gap-4 py-4">
          <Text className="text-text-secondary text-xs text-center px-8">
            Audio recording continues. Video will be timestamped and synced.
          </Text>
          <View className="flex-row items-center gap-12">
            <Pressable className="w-12 h-12 rounded-full bg-white/5 items-center justify-center">
              <Zap size={22} color="white" />
            </Pressable>
            <Pressable
              className="w-[72px] h-[72px] rounded-full border-4 border-white/20 items-center justify-center"
              style={{
                shadowColor: "#FF3B30",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 15,
              }}
            >
              <View className="w-full h-full rounded-full bg-red-500 items-center justify-center">
                <View className="w-6 h-6 rounded-sm bg-white" />
              </View>
            </Pressable>
            <Pressable className="w-12 h-12 rounded-full bg-white/5 items-center justify-center">
              <SwitchCamera size={22} color="white" />
            </Pressable>
          </View>
          <Pressable
            onPress={() => router.back()}
            className="px-10 py-3 rounded-full bg-primary"
            style={{ shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 }}
          >
            <Text className="text-white text-base font-bold">Done</Text>
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Text className="text-text-secondary text-sm">Cancel</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
