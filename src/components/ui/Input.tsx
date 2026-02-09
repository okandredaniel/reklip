import { View, TextInput, Pressable, Text } from "react-native";
import { useState, useCallback, ReactNode } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";
import { colors } from "@/theme";
import { SPRING } from "@/constants/animations";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  icon?: ReactNode;
  label?: string;
  error?: string;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  icon,
  label,
  error,
}: InputProps) {
  const [hidden, setHidden] = useState(secureTextEntry);
  const focusProgress = useSharedValue(0);

  const onFocus = useCallback(() => {
    focusProgress.value = withSpring(1, SPRING.snappy);
  }, [focusProgress]);

  const onBlur = useCallback(() => {
    focusProgress.value = withSpring(0, SPRING.gentle);
  }, [focusProgress]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = error
      ? colors.recording
      : interpolateColor(
          focusProgress.value,
          [0, 1],
          [colors.divider, colors.primary],
        );

    const backgroundColor = interpolateColor(
      focusProgress.value,
      [0, 1],
      [colors.card, colors.surface],
    );

    return {
      borderColor,
      backgroundColor,
      borderWidth: 1,
      borderRadius: 12,
      height: 56,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      paddingHorizontal: 16,
    };
  });

  return (
    <View className="w-full">
      {label && (
        <Text className="text-white text-sm font-medium mb-2">{label}</Text>
      )}
      <Animated.View style={animatedContainerStyle}>
        {icon && <View style={{ marginRight: 12 }}>{icon}</View>}
        <TextInput
          style={{ flex: 1, color: "white", fontSize: 16 }}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setHidden(!hidden)} hitSlop={8} style={{ marginLeft: 8, padding: 4 }}>
            {hidden ? (
              <EyeOffIcon size={20} color={colors.textSecondary} />
            ) : (
              <EyeIcon size={20} color={colors.textSecondary} />
            )}
          </Pressable>
        )}
      </Animated.View>
      {error && (
        <Text className="text-recording text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
