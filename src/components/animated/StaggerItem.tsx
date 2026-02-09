import { ReactNode } from "react";
import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";
import { useFadeSlideIn } from "@/hooks/animation/useFadeSlideIn";
import { STAGGER_DELAY } from "@/constants/animations";

interface StaggerItemProps {
  children: ReactNode;
  index: number;
  baseDelay?: number;
  style?: ViewStyle;
  className?: string;
}

export function StaggerItem({
  children,
  index,
  baseDelay = 0,
  style,
  className,
}: StaggerItemProps) {
  const delay = baseDelay + index * STAGGER_DELAY;
  const animatedStyle = useFadeSlideIn(delay);

  return (
    <Animated.View style={[animatedStyle, style]} className={className}>
      {children}
    </Animated.View>
  );
}
