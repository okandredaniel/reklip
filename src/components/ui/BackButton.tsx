import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      hitSlop={12}
      className="w-10 h-10 items-center justify-center"
    >
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 12H5M5 12L12 19M5 12L12 5"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}
