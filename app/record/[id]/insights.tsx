import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Share2,
  MoreHorizontal,
  CheckCircle,
  Heart,
  Image,
  Lightbulb,
  Hand,
  Sparkles,
  BookOpen,
  Download,
  Pause,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";
import { colors } from "@/theme";

function TimelineEntry({
  time,
  icon: Icon,
  iconColor,
  iconBg,
  content,
  index,
}: {
  time: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  iconBg: string;
  content: React.ReactNode;
  index: number;
}) {
  return (
    <StaggerItem index={index} baseDelay={200}>
      <View className="flex-row gap-3">
        <View className="items-center w-12">
          <Text className="text-primary text-xs font-mono font-bold">{time}</Text>
          <View className="w-px flex-1 bg-primary/20 mt-1" />
        </View>
        <View
          className="w-8 h-8 rounded-full items-center justify-center mt-0.5"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={16} color={iconColor} />
        </View>
        <View className="flex-1 pb-5">{content}</View>
      </View>
    </StaggerItem>
  );
}

export default function RecordingInsightsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3 border-b border-card-border/30">
        <BackButton />
        <Text className="text-white text-lg font-bold">Sermon Insights</Text>
        <View className="flex-row gap-2">
          <Pressable className="w-9 h-9 rounded-full items-center justify-center">
            <Share2 size={18} color="white" />
          </Pressable>
          <Pressable className="w-9 h-9 rounded-full items-center justify-center">
            <MoreHorizontal size={18} color="white" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 140 }}>
        {/* Sermon Header */}
        <FadeInView delay={0}>
          <View className="bg-card rounded-xl border border-card-border p-4 flex-row gap-4 mb-6">
            <View className="w-20 h-20 rounded-lg bg-surface border border-card-border/50" />
            <View className="flex-1">
              <Text className="text-primary/80 text-xs font-semibold uppercase tracking-wider mb-1">
                Oct 12 · 45 Min
              </Text>
              <Text className="text-white text-lg font-bold">
                The Power of Grace
              </Text>
              <Text className="text-text-secondary text-sm">
                Pastor David Williams
              </Text>
            </View>
          </View>
        </FadeInView>

        {/* Key Takeaways */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3">Key Takeaways</SectionLabel>
          <View className="bg-surface/50 rounded-xl border border-card-border p-4 gap-3 mb-6">
            {[
              "Grace is freely given, not earned through works or merit.",
              "Historical context reveals the radical nature of this teaching.",
              "Practical application: extending grace in daily relationships.",
            ].map((item, i) => (
              <View key={i} className="flex-row gap-3">
                <CheckCircle size={18} color={colors.primary} />
                <Text className="text-white/90 text-sm leading-relaxed flex-1">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </FadeInView>

        {/* Timeline */}
        <FadeInView delay={120}>
          <View className="flex-row items-center justify-between mb-3">
            <SectionLabel>Timeline</SectionLabel>
            <Pressable>
              <Text className="text-primary text-xs font-bold">
                Transcript Live
              </Text>
            </Pressable>
          </View>
        </FadeInView>

        <View>
          <TimelineEntry
            index={0}
            time="02:15"
            icon={Heart}
            iconColor="#F87171"
            iconBg="rgba(239,68,68,0.2)"
            content={
              <Text className="text-white italic text-sm leading-relaxed">
                "For by grace you have been saved through faith, and this is not
                your own doing; it is the gift of God."
              </Text>
            }
          />
          <TimelineEntry
            index={1}
            time="05:40"
            icon={Image}
            iconColor="#60A5FA"
            iconBg="rgba(59,130,246,0.2)"
            content={
              <View className="h-24 rounded-lg bg-surface border border-card-border" />
            }
          />
          <TimelineEntry
            index={2}
            time="12:20"
            icon={Lightbulb}
            iconColor="#FBBF24"
            iconBg="rgba(245,158,11,0.2)"
            content={
              <Text className="text-white text-sm leading-relaxed">
                Key insight about the historical context of grace in the early
                church and its radical implications.
              </Text>
            }
          />
          <TimelineEntry
            index={3}
            time="18:45"
            icon={Hand}
            iconColor="#A78BFA"
            iconBg="rgba(139,92,246,0.2)"
            content={
              <Text className="text-white/80 text-sm leading-relaxed">
                Closing prayer and reflection on applying grace in daily life.
              </Text>
            }
          />
        </View>

        {/* Study Guide */}
        <View className="border-t border-card-border pt-5 mt-2">
          <View className="bg-surface rounded-xl border border-card-border p-4 mb-3">
            <View className="flex-row items-center gap-2 mb-2">
              <Sparkles size={18} color="#FBBF24" />
              <Text className="text-white text-sm font-semibold">
                Reflection Prompt
              </Text>
            </View>
            <Text className="text-white/80 text-sm leading-relaxed mb-3">
              How have you experienced grace in unexpected ways this week?
            </Text>
            <Pressable>
              <Text className="text-primary text-sm font-medium">
                Write Journal Entry
              </Text>
            </Pressable>
          </View>

          <View className="bg-surface rounded-xl border border-card-border p-4">
            <View className="flex-row items-center gap-2 mb-3">
              <BookOpen size={18} color={colors.textSecondary} />
              <Text className="text-white text-sm font-semibold">
                Scripture References
              </Text>
            </View>
            <Pressable className="mb-2">
              <Text className="text-primary text-sm">Ephesians 2:8-9</Text>
            </Pressable>
            <Pressable>
              <Text className="text-primary text-sm">Romans 3:23-24</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pt-3 bg-background/95 border-t border-card-border" style={{ paddingBottom: Math.max(insets.bottom, 12) + 16 }}>
        <Pressable className="h-12 rounded-xl bg-primary flex-row items-center justify-center gap-2 mb-3">
          <Download size={18} color="white" />
          <Text className="text-white text-base font-bold">Export</Text>
        </Pressable>

        {/* Mini Player */}
        <View className="flex-row items-center gap-3 bg-surface rounded-lg border border-card-border p-3">
          <Pressable className="w-8 h-8 rounded-full bg-white items-center justify-center">
            <Pause size={14} color="#0B1120" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-primary text-[10px] font-bold uppercase">
              Listening Now
            </Text>
            <Text className="text-text-secondary text-[10px] font-mono">
              12:20 / 24:00
            </Text>
          </View>
          <View className="flex-1 h-1 rounded-full bg-card-border overflow-hidden">
            <View className="h-full rounded-full bg-primary w-[51%]" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
