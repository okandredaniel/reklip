import { Text, View, TextInput, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, SlidersHorizontal, Mic, MicOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState, useMemo } from "react";
import { colors } from "@/theme";
import { Button } from "@/components/ui/Button";
import { FilterChips } from "@/components/ui/FilterChips";
import { RecordingCard } from "@/components/library/RecordingCard";
import { useLibraryStore } from "@/stores/libraryStore";
import type { TemplateType } from "@/types/recording";

const FILTERS = [
  { label: "All" },
  { label: "Sermons" },
  { label: "Lectures" },
  { label: "Meetings" },
] as const;

const TEMPLATE_FILTER_MAP: Record<string, TemplateType | undefined> = {
  All: undefined,
  Sermons: "sermon",
  Lectures: "lecture",
  Meetings: "conference",
};

export default function LibraryScreen() {
  const router = useRouter();
  const recordings = useLibraryStore((s) => s.recordings);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filteredRecordings = useMemo(() => {
    let result = recordings;

    const templateFilter = TEMPLATE_FILTER_MAP[activeFilter];
    if (templateFilter) {
      result = result.filter((r) => r.template === templateFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          (r.title?.toLowerCase().includes(q)) ||
          (r.speakerName?.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [recordings, activeFilter, search]);

  const hasRecordings = recordings.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
        <Text className="text-white text-[30px] font-extrabold">
          My Recordings
        </Text>
        <View className="flex-row gap-2">
          <Pressable className="w-10 h-10 rounded-full bg-surface items-center justify-center">
            <SlidersHorizontal size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-5 mb-3">
        <View className="flex-row items-center h-12 rounded-xl bg-surface px-3">
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            className="flex-1 ml-3 text-white text-base"
            placeholder="Search titles, tags, or content..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter Chips */}
      <View className="mb-4">
        <FilterChips
          filters={FILTERS}
          activeFilter={activeFilter}
          onSelect={setActiveFilter}
        />
      </View>

      {/* Content */}
      {hasRecordings ? (
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 100 }}>
          {filteredRecordings.map((recording) => (
            <RecordingCard
              key={recording.id}
              recording={recording}
              onPress={() => router.push(`/record/${recording.id}/playback`)}
            />
          ))}
          {filteredRecordings.length === 0 && (
            <View className="items-center py-12">
              <Text className="text-text-secondary text-sm">
                No recordings match this filter
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center px-6 -mt-10">
          <View className="w-48 h-48 items-center justify-center mb-6">
            <View className="absolute w-48 h-48 rounded-full border-2 border-dashed border-primary/20" />
            <View className="absolute w-36 h-36 rounded-full border border-primary/10" />
            <View className="w-24 h-24 rounded-full bg-surface items-center justify-center">
              <MicOff size={48} color={colors.primary} />
            </View>
          </View>

          <Text className="text-white text-xl font-bold mb-2">
            No recordings yet
          </Text>
          <Text className="text-text-secondary text-base text-center leading-relaxed mb-8 max-w-[300px]">
            Tap the button below to capture your first sermon, lecture, or
            meeting.
          </Text>

          <Button
            title="Start Recording"
            icon={<Mic size={20} color="white" />}
            onPress={() => router.push("/record")}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
