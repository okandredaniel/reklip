import { Text, ActivityIndicator, View } from "react-native";
import { ReactNode } from "react";
import { colors } from "@/theme";
import { AnimatedPressable } from "@/components/animated/AnimatedPressable";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "lg",
  loading = false,
  disabled = false,
  icon,
  iconRight,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClasses = "flex-row items-center justify-center rounded-full";
  const sizeClasses = size === "lg" ? "h-14 px-6" : "h-12 px-5";

  const variantClasses = {
    primary: "bg-primary",
    outline: "border border-card-border bg-transparent",
    ghost: "bg-transparent",
  }[variant];

  const textColor = {
    primary: "text-white",
    outline: "text-white",
    ghost: "text-primary",
  }[variant];

  const textSize = size === "lg" ? "text-[17px]" : "text-[15px]";

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={isDisabled}
      withHaptic
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${isDisabled ? "opacity-50" : ""}`}
    >
      {loading ? (
        <ActivityIndicator color={colors.textPrimary} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className={`${textColor} ${textSize} font-semibold`}>
            {title}
          </Text>
          {iconRight}
        </View>
      )}
    </AnimatedPressable>
  );
}
