import { View } from "react-native";

interface IconCircleProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { container: "w-8 h-8", icon: 16, rounded: "rounded-full" },
  md: { container: "w-10 h-10", icon: 20, rounded: "rounded-full" },
  lg: { container: "w-12 h-12", icon: 24, rounded: "rounded-full" },
} as const;

export function IconCircle({ icon: Icon, color, size = "md" }: IconCircleProps) {
  const s = sizes[size];

  return (
    <View
      className={`${s.container} ${s.rounded} items-center justify-center`}
      style={{ backgroundColor: color + "20" }}
    >
      <Icon size={s.icon} color={color} />
    </View>
  );
}
