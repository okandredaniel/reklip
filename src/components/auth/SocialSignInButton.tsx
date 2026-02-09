import { Text, View } from "react-native";
import { AnimatedPressable } from "@/components/animated/AnimatedPressable";
import { GoogleIcon, AppleIcon } from "@/components/ui/icons";

interface SocialSignInButtonProps {
  provider: "google" | "apple";
  iconOnly?: boolean;
  onPress?: () => void;
}

export function SocialSignInButton({ provider, iconOnly = false, onPress }: SocialSignInButtonProps) {
  const label = provider === "google" ? "Google" : "Apple";

  return (
    <AnimatedPressable
      onPress={onPress}
      flex
      className="flex-1 flex-row items-center justify-center h-14 rounded-xl border border-card-border bg-transparent"
    >
      <View className="flex-row items-center gap-2">
        {provider === "google" ? <GoogleIcon size={20} /> : <AppleIcon size={20} />}
        {!iconOnly && (
          <Text className="text-white text-[15px] font-medium">{label}</Text>
        )}
      </View>
    </AnimatedPressable>
  );
}
