import { Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  Mic,
  Clock,
  Star,
  Share2,
  Heart,
  Lightbulb,
  HelpCircle,
} from "lucide-react-native";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCard } from "@/components/common/StatCard";
import { colors } from "@/theme";

function ReactionBar({
  color,
  label,
  count,
  percentage,
}: {
  color: string;
  label: string;
  count: number;
  percentage: number;
}) {
  return (
    <View className="flex-row items-center gap-3">
      <View
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      <Text className="text-text-secondary text-xs w-16">{label}</Text>
      <View className="flex-1 h-3 rounded-full bg-surface overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ backgroundColor: color, width: `${percentage}%` }}
        />
      </View>
      <Text className="text-white text-xs font-medium w-6 text-right">
        {count}
      </Text>
    </View>
  );
}

export default function InsightsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
        <Text className="text-white text-[30px] font-bold">Insights</Text>
        <Pressable className="w-10 h-10 rounded-full bg-surface items-center justify-center">
          <Calendar size={20} color="white" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 16 }}>
        {/* This Month */}
        <View className="flex-row items-center justify-between mb-1">
          <SectionLabel>This Month</SectionLabel>
          <View className="bg-emerald-400/10 px-2 py-1 rounded-full">
            <Text className="text-emerald-400 text-xs font-medium">
              +15% Overall
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3">
          <StatCard
            icon={<Mic size={18} color="#3B82F6" />}
            iconColor="#3B82F6"
            label="Recordings"
            value="24"
            change="+3 this week"
          />
          <StatCard
            icon={<Clock size={18} color="#A78BFA" />}
            iconColor="#A78BFA"
            label="Hours"
            value="18.5"
            change="+4.2h"
          />
        </View>
        <View className="flex-row gap-3">
          <StatCard
            icon={<Star size={18} color="#FBBF24" />}
            iconColor="#FBBF24"
            label="Markers"
            value="156"
          />
          <StatCard
            icon={<Share2 size={18} color="#22C55E" />}
            iconColor="#22C55E"
            label="Shared"
            value="12"
          />
        </View>

        {/* Reaction Breakdown */}
        <View className="bg-card rounded-xl border border-white/5 p-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-base font-semibold">
              Reaction Breakdown
            </Text>
            <Text className="text-white text-[30px] font-bold">48</Text>
          </View>
          <View className="gap-3">
            <ReactionBar
              color="#FBBF24"
              label="Important"
              count={24}
              percentage={50}
            />
            <ReactionBar
              color="#EF4444"
              label="Love"
              count={14}
              percentage={30}
            />
            <ReactionBar
              color="#8B5CF6"
              label="Question"
              count={10}
              percentage={20}
            />
          </View>
        </View>

        {/* Content Created */}
        <SectionLabel>Content Created</SectionLabel>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -20 }}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {[
            { label: "Audio Notes", value: "12", icon: Mic, color: "#22D3EE" },
            { label: "Transcripts", value: "8", icon: Lightbulb, color: "#D946EF" },
            { label: "Shares", value: "3", icon: Share2, color: "#22C55E" },
          ].map((item) => (
            <View
              key={item.label}
              className="w-36 h-32 bg-card rounded-xl border border-white/5 p-4 justify-between"
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{ backgroundColor: item.color + "20" }}
              >
                <item.icon size={20} color={item.color} />
              </View>
              <View>
                <Text className="text-white text-2xl font-bold">
                  {item.value}
                </Text>
                <Text className="text-text-secondary text-xs">
                  {item.label}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom spacer */}
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
