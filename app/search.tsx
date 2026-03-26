import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  Search as SearchIcon,
  X,
  Star,
  ChevronRight,
  Image,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight) return <Text className="text-white/80 text-sm leading-relaxed font-medium">{text}</Text>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <Text className="text-white/80 text-sm leading-relaxed font-medium">
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <Text key={i} className="text-primary font-bold">{part}</Text>
        ) : (
          <Text key={i}>{part}</Text>
        )
      )}
    </Text>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState("grace");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Search Header */}
      <View className="flex-row items-center gap-3 px-4 py-2">
        <BackButton />
        <View className="flex-1 flex-row items-center h-11 bg-card border border-card-border rounded-xl px-3">
          <SearchIcon size={18} color={colors.textSecondary} />
          <TextInput
            className="flex-1 ml-2 text-white text-base"
            value={query}
            onChangeText={setQuery}
            placeholder="Search titles, tags, or content..."
            placeholderTextColor={colors.textSecondary}
            autoFocus
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <X size={18} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 80 }}>
        <SectionLabel className="py-4">Results (12 found)</SectionLabel>

        {/* In Transcripts */}
        <FadeInView delay={0}>
          <SectionLabel className="mb-3">In Transcripts</SectionLabel>
          <View className="gap-3 mb-6">
            <Pressable className="p-4 bg-card border border-card-border rounded-xl">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="bg-primary/20 px-2 py-0.5 rounded">
                  <Text className="text-primary text-xs font-semibold">02:14</Text>
                </View>
                <Text className="text-text-secondary text-xs">Sunday Service</Text>
              </View>
              <HighlightedText
                text='...we have been saved by grace through faith, and this is not your own doing; it is the gift of God...'
                highlight={query}
              />
            </Pressable>

            <Pressable className="p-4 bg-card border border-card-border rounded-xl">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="bg-primary/20 px-2 py-0.5 rounded">
                  <Text className="text-primary text-xs font-semibold">15:30</Text>
                </View>
                <Text className="text-text-secondary text-xs">Bible Study Group</Text>
              </View>
              <HighlightedText
                text='...but to each one of us grace has been given as Christ apportioned it. This is why it says...'
                highlight={query}
              />
            </Pressable>
          </View>
        </FadeInView>

        {/* In Markers */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3">In Markers</SectionLabel>
          <Pressable className="flex-row items-center gap-4 p-4 bg-card border border-card-border rounded-xl mb-6">
            <View className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 items-center justify-center">
              <Star size={20} color="#EAB308" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-sm font-semibold" numberOfLines={1}>
                Important definition of Grace
              </Text>
              <Text className="text-text-secondary text-xs mt-0.5">
                Marked at 18:45 · Youth Camp
              </Text>
            </View>
            <ChevronRight size={18} color={colors.textSecondary} />
          </Pressable>
        </FadeInView>

        {/* In Photos */}
        <FadeInView delay={160}>
          <SectionLabel className="mb-3">In Photos</SectionLabel>
          <Pressable className="flex-row gap-4 p-3 bg-card border border-card-border rounded-xl">
            <View className="w-24 h-16 rounded-lg bg-surface items-center justify-center shrink-0">
              <Image size={20} color={colors.textSecondary} />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-text-secondary text-xs mb-1">
                Slide Capture · 22:10
              </Text>
              <HighlightedText
                text="Ephesians 2:8 For by grace you have been saved through faith..."
                highlight={query}
              />
            </View>
          </Pressable>
        </FadeInView>
      </ScrollView>
    </SafeAreaView>
  );
}
