import { Text, View, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FileText,
  Quote,
  Music,
  Image,
  Video,
  Plus,
} from "lucide-react-native";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FilterChips } from "@/components/ui/FilterChips";
import { colors } from "@/theme";

const FILTERS = [
  { label: "All" },
  { label: "Quotes", icon: Quote },
  { label: "Audio", icon: Music },
  { label: "Images", icon: Image },
  { label: "Video", icon: Video },
] as const;

function DraftCard({
  type,
  title,
  subtitle,
  color,
}: {
  type: "quote" | "audio" | "document";
  title: string;
  subtitle: string;
  color: string;
}) {
  const icons = {
    quote: Quote,
    audio: Music,
    document: FileText,
  };
  const Icon = icons[type];

  const isQuote = type === "quote";

  return (
    <View
      className="rounded-3xl overflow-hidden border border-white/5"
      style={isQuote ? { backgroundColor: color } : undefined}
    >
      {isQuote ? (
        <View className="p-5 min-h-[180px] justify-end">
          <Text className="text-white/80 text-base italic font-serif leading-relaxed mb-3">
            "{title}"
          </Text>
          <Text className="text-white/60 text-xs">{subtitle}</Text>
        </View>
      ) : (
        <View className="bg-card p-4">
          <View
            className="w-10 h-10 rounded-full items-center justify-center mb-3"
            style={{ backgroundColor: color + "20" }}
          >
            <Icon size={20} color={color} />
          </View>
          <Text className="text-white text-sm font-bold mb-1" numberOfLines={2}>
            {title}
          </Text>
          <Text className="text-text-secondary text-xs">{subtitle}</Text>
        </View>
      )}
    </View>
  );
}

export default function DraftsScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const hasDrafts = true;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-4 border-b border-card-border">
        <Text className="text-white text-[30px] font-bold">Drafts</Text>
        <Pressable className="px-3 py-1.5">
          <Text className="text-primary text-base font-medium">Select</Text>
        </Pressable>
      </View>

      {/* Filter Chips */}
      <View className="py-3">
        <FilterChips
          filters={FILTERS}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
        />
      </View>

      {hasDrafts ? (
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Ready to Share */}
          <SectionLabel className="mb-3">Ready to Share</SectionLabel>

          {/* Masonry-style grid (2 columns) */}
          <View className="flex-row gap-4">
            {/* Left column */}
            <View className="flex-1 gap-4">
              <DraftCard
                type="quote"
                title="Faith is not about everything turning out okay. Faith is about being okay no matter how things turn out."
                subtitle="Sunday Sermon · Story"
                color="#4338CA"
              />
              <DraftCard
                type="document"
                title="Meeting Notes: Q4 Planning"
                subtitle="Edited 2h ago"
                color="#3B82F6"
              />
            </View>
            {/* Right column */}
            <View className="flex-1 gap-4">
              <DraftCard
                type="audio"
                title="Worship Night Highlights"
                subtitle="3:24 · Audio Snippet"
                color="#6366F1"
              />
              <DraftCard
                type="quote"
                title="The measure of a life is not its duration, but its donation."
                subtitle="Conference Talk · Quote Card"
                color="#0F766E"
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-16 h-16 rounded-2xl bg-surface items-center justify-center mb-4">
            <FileText size={32} color={colors.textSecondary} />
          </View>
          <Text className="text-white text-xl font-bold mb-2">
            No drafts yet
          </Text>
          <Text className="text-text-secondary text-base text-center leading-relaxed max-w-[280px]">
            Unpublished content from your recordings will show up here.
          </Text>
        </View>
      )}

      {/* FAB */}
      <Pressable
        className="absolute bottom-24 right-5 w-14 h-14 rounded-full bg-primary items-center justify-center"
        style={{
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <Plus size={28} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
