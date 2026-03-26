import { View, Text } from "react-native";

interface FeaturePillProps {
  icon?: React.ReactNode;
  label: string;
}

export function FeaturePill({ icon, label }: FeaturePillProps) {
  return (
    <View className="flex-row items-center gap-2 px-4 py-2.5 rounded-full border border-white/10">
      {icon}
      <Text className="text-white text-sm font-medium">{label}</Text>
    </View>
  );
}
