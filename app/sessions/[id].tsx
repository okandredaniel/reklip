import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  Users,
  Camera,
  Video,
  Heart,
  Star,
  Bookmark,
  Image,
} from "lucide-react-native";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { formatTime } from "@/utils/formatTime";
import { colors } from "@/theme";

function ReactionFeedItem({
  name,
  action,
  time,
  emoji,
  emojiBg,
  avatarBg,
  opacity,
}: {
  name: string;
  action: string;
  time: string;
  emoji: React.ReactNode;
  emojiBg: string;
  avatarBg: string;
  opacity: number;
}) {
  return (
    <View className="flex-row items-center gap-3 py-2" style={{ opacity }}>
      <View className="relative">
        <View
          className="w-10 h-10 rounded-full items-center justify-center"
          style={{ backgroundColor: avatarBg }}
        >
          <Text className="text-white text-sm font-bold">{name[0]}</Text>
        </View>
        <View
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
          style={{ backgroundColor: emojiBg }}
        >
          {emoji}
        </View>
      </View>
      <View className="flex-1">
        <Text className="text-white text-sm">
          <Text className="font-bold">{name}</Text> {action}
        </Text>
        <Text className="text-text-secondary text-xs">{time}</Text>
      </View>
    </View>
  );
}

export default function ActiveSessionScreen() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(1335); // 00:22:15

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);


  const waveHeights = [32, 48, 64, 96, 48, 64, 96, 48, 32, 64, 96, 48, 64, 32, 48, 96];

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Timer */}
      <View className="items-center pt-4 pb-2">
        <Text className="text-white text-[80px] font-bold tracking-tighter font-mono tabular-nums leading-none">
          {formatTime(seconds * 1000)}
        </Text>
        <Text className="text-text-secondary text-sm font-medium mt-1">
          Recording in progress...
        </Text>
      </View>

      {/* Status badges */}
      <View className="flex-row items-center justify-between px-6 mb-4">
        <LiveIndicator />
        <View className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/50 border border-white/5">
          <Users size={16} color={colors.textSecondary} />
          <Text className="text-white text-xs font-medium">4</Text>
        </View>
      </View>

      {/* Waveform */}
      <View className="flex-row items-center justify-center gap-1.5 h-32 px-6 mb-4">
        {waveHeights.map((h, i) => (
          <View
            key={i}
            className="w-1.5 rounded-full"
            style={{
              height: h,
              backgroundColor: colors.primary,
              opacity: 0.3 + (i % 3) * 0.25,
            }}
          />
        ))}
      </View>

      {/* Active status */}
      <View className="items-center mb-6">
        <View className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <View className="w-2.5 h-2.5 rounded-full bg-primary" />
          <Text className="text-primary text-sm font-semibold tracking-wide">
            4 people are recording this session
          </Text>
        </View>
      </View>

      {/* Reaction feed */}
      <View className="flex-1 px-6">
        <View className="flex-row items-center justify-between mb-3">
          <SectionLabel>Group Reactions</SectionLabel>
          <View className="bg-surface px-2 py-1 rounded-full border border-white/5">
            <Text className="text-text-secondary text-[10px]">Real-time</Text>
          </View>
        </View>

        <ScrollView className="flex-1">
          <ReactionFeedItem
            name="Maria"
            action="loved this moment"
            time="Just now"
            emoji={<Heart size={10} color="#F43F5E" />}
            emojiBg="rgba(244,63,94,0.2)"
            avatarBg="#6366F1"
            opacity={1}
          />
          <ReactionFeedItem
            name="João"
            action="marked as important"
            time="1m ago"
            emoji={<Star size={10} color="#FBBF24" />}
            emojiBg="rgba(251,191,36,0.2)"
            avatarBg="#8B5CF6"
            opacity={0.8}
          />
          <ReactionFeedItem
            name="Ana"
            action="captured a photo"
            time="2m ago"
            emoji={<Image size={10} color="#3B82F6" />}
            emojiBg="rgba(59,130,246,0.2)"
            avatarBg="#EC4899"
            opacity={0.5}
          />
        </ScrollView>

        {/* Reaction buttons */}
        <View className="flex-row items-center justify-center gap-4 py-4">
          {[
            { icon: Heart, color: "#EF4444" },
            { icon: Star, color: "#FBBF24" },
            { icon: Bookmark, color: "white" },
            { icon: Camera, color: "white" },
          ].map((r, i) => (
            <Pressable
              key={i}
              className="w-12 h-12 rounded-full bg-surface border border-white/5 items-center justify-center"
            >
              <r.icon size={22} color={r.color} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Bottom controls */}
      <SafeAreaView edges={["bottom"]}>
        <View className="flex-row items-end justify-center gap-8 px-6 pb-4 pt-4">
          <View className="items-center gap-1">
            <Pressable className="w-12 h-12 rounded-full bg-surface border border-white/10 items-center justify-center">
              <Camera size={22} color="white" />
            </Pressable>
            <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-wider">
              Photo
            </Text>
          </View>

          <View className="items-center gap-1">
            <Pressable
              onPress={() => router.back()}
              className="w-20 h-20 rounded-full bg-red-600 items-center justify-center"
              style={{
                shadowColor: "#DC2626",
                shadowOpacity: 0.4,
                shadowRadius: 20,
                elevation: 8,
              }}
            >
              <View className="w-8 h-8 rounded-sm bg-white" />
            </Pressable>
            <Text className="text-red-500/80 text-[10px] font-bold uppercase tracking-wider">
              Hold to Stop
            </Text>
          </View>

          <View className="items-center gap-1">
            <Pressable className="w-12 h-12 rounded-full bg-surface border border-white/10 items-center justify-center">
              <Video size={22} color="white" />
            </Pressable>
            <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-wider">
              Video
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}
