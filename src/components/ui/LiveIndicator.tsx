import { View, Text } from "react-native";

export function LiveIndicator() {
  return (
    <View className="flex-row items-center gap-2 px-3 py-1.5 rounded-full bg-red-900/30 border border-red-500/20">
      <View className="w-2 h-2 rounded-full bg-red-500" />
      <Text className="text-red-400 text-xs font-bold tracking-wider">
        LIVE
      </Text>
    </View>
  );
}
