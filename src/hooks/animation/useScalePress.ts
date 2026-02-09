import { useCallback } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { SPRING, SCALE } from "@/constants/animations";

interface ScalePressOptions {
  scaleValue?: number;
  withHaptic?: boolean;
}

export function useScalePress(options?: ScalePressOptions) {
  const { scaleValue = SCALE.press, withHaptic = false } = options ?? {};
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(scaleValue, SPRING.snappy);
    if (withHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [scale, scaleValue, withHaptic]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING.default);
  }, [scale]);

  return { animatedStyle, onPressIn, onPressOut };
}
