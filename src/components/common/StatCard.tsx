import { View, Text } from "react-native";

export function StatCard({
  icon,
  iconColor,
  label,
  value,
  change,
}: {
  icon?: React.ReactNode;
  iconColor?: string;
  label: string;
  value: string;
  change?: string;
}) {
  // When icon is provided, render the insights-style card with icon header
  if (icon) {
    return (
      <View className="flex-1 bg-card rounded-xl border border-white/5 p-5">
        <View className="flex-row items-center gap-2 mb-3">
          {icon}
          <Text className="text-text-secondary text-xs">{label}</Text>
        </View>
        <Text className="text-white text-2xl font-bold">{value}</Text>
        {change && (
          <Text className="text-emerald-400 text-xs mt-1">{change}</Text>
        )}
      </View>
    );
  }

  // Without icon, render the compact profile-style stat box
  return (
    <View className="flex-1 bg-card rounded-2xl border border-card-border p-4 items-center">
      <Text className="text-white text-2xl font-bold">{value}</Text>
      <Text className="text-text-secondary text-[11px] font-medium mt-1">
        {label}
      </Text>
    </View>
  );
}
