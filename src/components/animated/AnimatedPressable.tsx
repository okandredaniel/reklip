import { Pressable, PressableProps } from "react-native";
import Animated from "react-native-reanimated";
import { useScalePress } from "@/hooks/animation/useScalePress";

interface AnimatedPressableProps extends PressableProps {
  scaleValue?: number;
  withHaptic?: boolean;
  flex?: boolean;
}

export function AnimatedPressable({
  scaleValue,
  withHaptic,
  flex,
  onPressIn,
  onPressOut,
  children,
  className,
  style,
  ...rest
}: AnimatedPressableProps) {
  const { animatedStyle, onPressIn: scaleIn, onPressOut: scaleOut } = useScalePress({
    scaleValue,
    withHaptic,
  });

  return (
    <Animated.View style={[animatedStyle, flex ? { flex: 1 } : undefined]}>
      <Pressable
        onPressIn={(e) => {
          scaleIn();
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          scaleOut();
          onPressOut?.(e);
        }}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
