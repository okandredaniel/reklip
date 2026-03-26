import { View, Text, Pressable } from "react-native";
import { Flag } from "lucide-react-native";
import { formatDuration } from "@/utils/formatDuration";
import { formatRelativeDate } from "@/utils/formatDate";
import { colors } from "@/theme";
import type { Recording } from "@/types/recording";

const STATUS_COLORS: Record<string, string> = {
  stopped: "#F59E0B",
  processing: "#3B82F6",
  completed: "#22C55E",
  failed: "#EF4444",
};

const STATUS_LABELS: Record<string, string> = {
  stopped: "Draft",
  recording: "Recording",
  uploading: "Uploading",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

export function RecordingCard({ recording, onPress }: { recording: Recording; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-card rounded-2xl border border-card-border p-4 mb-3"
    >
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-3">
          <Text className="text-white text-lg font-bold" numberOfLines={1}>
            {recording.title || "Untitled Recording"}
          </Text>
          {recording.speakerName && (
            <Text className="text-text-secondary text-sm" numberOfLines={1}>
              {recording.speakerName}
            </Text>
          )}
        </View>
        <View
          className="px-2.5 py-1 rounded-full"
          style={{ backgroundColor: (STATUS_COLORS[recording.status] ?? "#7B8BA3") + "20" }}
        >
          <Text
            className="text-xs font-semibold"
            style={{ color: STATUS_COLORS[recording.status] ?? "#7B8BA3" }}
          >
            {STATUS_LABELS[recording.status] ?? recording.status}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <Text className="text-text-secondary text-xs">
          {formatRelativeDate(recording.createdAt)}
        </Text>
        <Text className="text-text-secondary text-xs">
          {formatDuration(recording.duration)}
        </Text>
        {recording.markers.length > 0 && (
          <View className="flex-row items-center gap-1">
            <Flag size={10} color={colors.textSecondary} />
            <Text className="text-text-secondary text-xs">
              {recording.markers.length}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
