import { View, Text, Pressable, Image as RNImage } from "react-native";
import { Pencil, Image as ImageIcon } from "lucide-react-native";
import { REACTION_MAP } from "@/constants/reactions";
import { formatTimestamp } from "@/utils/formatTime";
import type { Marker } from "@/types/recording";

function getMarkerDisplay(marker: Marker) {
  if (marker.type === "photo") {
    return { icon: ImageIcon, color: "#818CF8", label: "Photo Capture" };
  }
  if (marker.type === "reaction" && marker.reaction) {
    const config = REACTION_MAP[marker.reaction];
    return { icon: config.icon, color: config.color, label: config.description };
  }
  return { icon: Pencil, color: "#D1D5DB", label: "Note" };
}

interface MarkerItemProps {
  marker: Marker;
  onPress?: () => void;
}

export function MarkerItem({ marker, onPress }: MarkerItemProps) {
  const { icon: Icon, color, label } = getMarkerDisplay(marker);
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      className="flex-row gap-3 p-4 rounded-2xl bg-surface border border-card-border"
    >
      <View className="items-center gap-1">
        <Text className="text-xs font-mono text-text-secondary">
          {formatTimestamp(marker.timestamp)}
        </Text>
        <View className="w-px flex-1 bg-card-border" />
      </View>
      <View
        className="w-7 h-7 rounded-full items-center justify-center mt-0.5"
        style={{ backgroundColor: color + "20" }}
      >
        <Icon size={14} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-white text-sm font-semibold">{label}</Text>
        {marker.noteText && (
          <Text className="text-text-secondary text-xs mt-1">
            {marker.noteText}
          </Text>
        )}
        {marker.photoUri && (
          <View className="mt-2 w-24 h-16 rounded-lg bg-card-border overflow-hidden">
            <RNImage
              source={{ uri: marker.photoUri }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    </Wrapper>
  );
}
