import { View } from "react-native";

interface PaginationDotsProps {
  count: number;
  activeIndex: number;
}

export function PaginationDots({ count, activeIndex }: PaginationDotsProps) {
  return (
    <View className="flex-row items-center justify-center gap-3">
      {Array.from({ length: count }, (_, i) => (
        <View
          key={i}
          className={`h-2 rounded-full ${
            i === activeIndex ? "w-6 bg-primary" : "w-2 bg-card-border"
          }`}
        />
      ))}
    </View>
  );
}
