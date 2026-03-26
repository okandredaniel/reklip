import { View, Text, Switch, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "@/theme";

export function SettingToggle({
  label,
  description,
  value,
  onValueChange,
  isLast,
}: {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  isLast?: boolean;
}) {
  return (
    <View className={`flex-row items-center justify-between py-4 px-4 ${isLast ? "" : "border-b border-white/5"}`}>
      <View className="flex-1 mr-4">
        <Text className="text-white text-sm font-medium">{label}</Text>
        {description && (
          <Text className="text-text-secondary text-xs mt-0.5">
            {description}
          </Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#374151", true: colors.primary }}
        thumbColor="white"
      />
    </View>
  );
}

export function SettingNav({
  label,
  value,
  isLast,
  onPress,
}: {
  label: string;
  value: string;
  isLast?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between py-4 px-4 ${isLast ? "" : "border-b border-white/5"}`}
    >
      <Text className="text-white text-sm font-medium">{label}</Text>
      <View className="flex-row items-center gap-1">
        <Text className="text-text-secondary text-sm">{value}</Text>
        <ChevronRight size={16} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
}
