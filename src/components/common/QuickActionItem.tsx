import { View, Text, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "@/theme";

export function QuickAction({
  icon: Icon,
  iconBg,
  iconColor,
  label,
  isLast,
  onPress,
}: {
  icon: React.ComponentType<{ size: number; color: string }>;
  iconBg: string;
  iconColor: string;
  label: string;
  isLast?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center gap-4 p-4 ${
        isLast ? "" : "border-b border-card-border"
      }`}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={20} color={iconColor} />
      </View>
      <Text className="flex-1 text-white text-sm font-medium">{label}</Text>
      <ChevronRight size={18} color={colors.textSecondary} />
    </Pressable>
  );
}
