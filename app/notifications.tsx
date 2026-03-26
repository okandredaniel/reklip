import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Sparkles,
  Video,
  BarChart3,
  Lightbulb,
  Cloud,
  HandMetal,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

function NotificationCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
  time,
  unread,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
}) {
  return (
    <Pressable
      className={`flex-row items-start gap-4 rounded-xl border border-card-border bg-card p-4 ${
        unread ? "" : "opacity-80"
      }`}
    >
      <View
        className="w-10 h-10 rounded-lg items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-0.5">
          <Text className={`text-sm leading-tight ${unread ? "text-white font-semibold" : "text-white/80 font-medium"}`}>
            {title}
          </Text>
          <Text className="text-text-secondary text-xs">{time}</Text>
        </View>
        <Text className={`text-xs leading-relaxed ${unread ? "text-text-secondary" : "text-text-secondary/70"}`}>
          {description}
        </Text>
      </View>
      {unread && (
        <View
          className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 mt-1.5"
          style={{
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 4,
          }}
        />
      )}
    </Pressable>
  );
}

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
        <BackButton />
        <Text className="text-white text-2xl font-bold tracking-tight">
          Notifications
        </Text>
        <Pressable>
          <Text className="text-primary text-sm font-semibold">
            Mark all read
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 80, gap: 16 }}>
        {/* Today */}
        <FadeInView delay={0}>
          <SectionLabel className="mb-3 px-1">Today</SectionLabel>
          <View className="gap-3">
            <NotificationCard
              icon={Sparkles}
              iconColor={colors.primary}
              iconBg="rgba(59,130,246,0.1)"
              title="Sunday Sermon processed"
              description="AI analysis complete. 12 clips generated from your latest upload."
              time="2h ago"
              unread
            />
            <NotificationCard
              icon={Video}
              iconColor="#22C55E"
              iconBg="rgba(34,197,94,0.1)"
              title="Video clips ready"
              description="Your export is ready for download. Tap to view your library."
              time="5h ago"
              unread
            />
          </View>
        </FadeInView>

        {/* Yesterday */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3 px-1">Yesterday</SectionLabel>
          <View className="gap-3">
            <NotificationCard
              icon={BarChart3}
              iconColor="#818CF8"
              iconBg="rgba(99,102,241,0.1)"
              title="Weekly Summary"
              description="View your engagement stats and see how your content performed."
              time="1d ago"
            />
            <NotificationCard
              icon={Lightbulb}
              iconColor="#F59E0B"
              iconBg="rgba(245,158,11,0.1)"
              title="Pro Tip"
              description="How to improve audio capture in echo-prone environments."
              time="1d ago"
            />
          </View>
        </FadeInView>

        {/* Earlier */}
        <FadeInView delay={160}>
          <SectionLabel className="mb-3 px-1">Earlier</SectionLabel>
          <View className="gap-3">
            <NotificationCard
              icon={Cloud}
              iconColor="#64748B"
              iconBg="rgba(100,116,139,0.1)"
              title="Upload complete"
              description="File 2023-10-22.mp4 was successfully uploaded to the cloud."
              time="Oct 22"
            />
            <NotificationCard
              icon={HandMetal}
              iconColor="#EC4899"
              iconBg="rgba(236,72,153,0.1)"
              title="Welcome to LiveCapture!"
              description="We're glad you're here. Start capturing your first moment."
              time="Oct 20"
            />
          </View>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}
