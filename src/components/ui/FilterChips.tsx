import { Text, ScrollView, Pressable } from "react-native";
import { colors } from "@/theme";

interface FilterChipsProps {
  filters: readonly { label: string; icon?: React.ComponentType<{ size: number; color: string }> }[];
  activeFilter: string;
  onSelect: (label: string) => void;
}

export function FilterChips({ filters, activeFilter, onSelect }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
    >
      {filters.map((filter) => {
        const active = activeFilter === filter.label;
        return (
          <Pressable
            key={filter.label}
            onPress={() => onSelect(filter.label)}
            className={`flex-row items-center gap-2 h-10 px-4 rounded-full ${
              active
                ? "bg-primary"
                : "bg-surface border border-card-border"
            }`}
          >
            {filter.icon && (
              <filter.icon
                size={16}
                color={active ? "white" : colors.textSecondary}
              />
            )}
            <Text
              className={`text-sm font-medium ${
                active ? "text-white" : "text-text-secondary"
              }`}
            >
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
