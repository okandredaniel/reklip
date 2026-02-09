import { View, Text } from "react-native";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function ScreenHeader({ title, subtitle, centered = false }: ScreenHeaderProps) {
  const align = centered ? "text-center" : "";

  return (
    <View className={centered ? "items-center" : ""}>
      <Text className={`text-white text-[28px] font-bold ${align} mb-2`}>
        {title}
      </Text>
      {subtitle && (
        <Text className={`text-text-secondary text-base ${align} leading-relaxed`}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}
