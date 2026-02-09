import { ReactNode } from "react";
import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";
import { useFadeSlideIn } from "@/hooks/animation/useFadeSlideIn";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  style?: ViewStyle;
  className?: string;
}

export function FadeInView({ children, delay = 0, style, className }: FadeInViewProps) {
  const animatedStyle = useFadeSlideIn(delay);

  return (
    <Animated.View style={[animatedStyle, style]} className={className}>
      {children}
    </Animated.View>
  );
}
