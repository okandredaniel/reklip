import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Share2,
  MoreHorizontal,
  Quote,
  Video,
  Image,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

function ContentCard({
  type,
  title,
  subtitle,
  color,
}: {
  type: "quote" | "video" | "story";
  title: string;
  subtitle: string;
  color: string;
}) {
  const icons = { quote: Quote, video: Video, story: Image };
  const Icon = icons[type];

  return (
    <Pressable className="bg-card rounded-2xl border border-card-border overflow-hidden">
      <View className="h-40 items-center justify-center" style={{ backgroundColor: color + "15" }}>
        <Icon size={32} color={color} />
      </View>
      <View className="p-4">
        <Text className="text-white text-sm font-bold mb-1">{title}</Text>
        <Text className="text-text-secondary text-xs">{subtitle}</Text>
      </View>
    </Pressable>
  );
}

export default function ContentStudioScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3 border-b border-card-border/30">
        <BackButton />
        <Text className="text-white text-lg font-bold">Content Studio</Text>
        <View className="flex-row gap-2">
          <Pressable className="w-9 h-9 items-center justify-center">
            <Share2 size={18} color="white" />
          </Pressable>
          <Pressable className="w-9 h-9 items-center justify-center">
            <MoreHorizontal size={18} color="white" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 20 }}>
        {/* Platforms */}
        <FadeInView delay={0}>
          <SectionLabel className="mb-3">Share To</SectionLabel>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -20 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}
          >
            {[
              { name: "Instagram", icon: Instagram, color: "#E1306C" },
              { name: "YouTube", icon: Youtube, color: "#FF0000" },
              { name: "TikTok", icon: Music2, color: "#00F2EA" },
            ].map((p) => (
              <Pressable key={p.name} className="items-center gap-2">
                <View
                  className="w-14 h-14 rounded-full items-center justify-center"
                  style={{ backgroundColor: p.color + "20" }}
                >
                  <p.icon size={24} color={p.color} />
                </View>
                <Text className="text-text-secondary text-[10px] font-medium">
                  {p.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </FadeInView>

        {/* Quote Cards */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3">Quote Cards</SectionLabel>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <ContentCard
                type="quote"
                title='"For by grace you have been saved..."'
                subtitle="Quote Card · Ready"
                color="#8B5CF6"
              />
            </View>
            <View className="flex-1">
              <ContentCard
                type="quote"
                title='"Faith is not about everything turning out okay."'
                subtitle="Quote Card · Ready"
                color="#3B82F6"
              />
            </View>
          </View>
        </FadeInView>

        {/* Video Clips */}
        <FadeInView delay={160}>
          <SectionLabel className="mb-3">Video Clips</SectionLabel>
          <View className="gap-3">
            <ContentCard
              type="video"
              title="Key Moment: The Power of Grace"
              subtitle="0:45 · Reel Ready"
              color="#EF4444"
            />
            <ContentCard
              type="video"
              title="Scripture Reference Breakdown"
              subtitle="1:20 · Short Ready"
              color="#F59E0B"
            />
          </View>
        </FadeInView>

        {/* Stories */}
        <FadeInView delay={240}>
          <SectionLabel className="mb-3">Story Slides</SectionLabel>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -20 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {["Slide 1", "Slide 2", "Slide 3"].map((s) => (
              <Pressable
                key={s}
                className="w-28 h-48 rounded-2xl bg-card border border-card-border items-center justify-center"
              >
                <Image size={24} color={colors.textSecondary} />
                <Text className="text-text-secondary text-xs mt-2">{s}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </FadeInView>

        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
