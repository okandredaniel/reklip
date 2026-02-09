import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { SPRING, ENTRANCE_OFFSET } from "@/constants/animations";

export function useFadeSlideIn(delay = 0) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(ENTRANCE_OFFSET);

  useEffect(() => {
    opacity.value = withDelay(delay, withSpring(1, SPRING.gentle));
    translateY.value = withDelay(delay, withSpring(0, SPRING.gentle));
  }, [delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
}
