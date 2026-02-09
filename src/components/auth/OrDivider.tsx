import { View, Text } from "react-native";

export function OrDivider() {
  return (
    <View className="flex-row items-center w-full my-6">
      <View className="flex-1 h-px bg-card-border" />
      <Text className="text-text-secondary text-sm mx-4">or</Text>
      <View className="flex-1 h-px bg-card-border" />
    </View>
  );
}
