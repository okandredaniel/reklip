import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { PaginationDots } from "@/components/ui/PaginationDots";
import { FeaturePill } from "@/components/ui/FeaturePill";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

interface PermissionScreenProps {
  icon: React.ComponentType<{ size: number; color: string }>;
  title: string;
  description: string;
  buttonLabel: string;
  pills: { icon: React.ReactNode; label: string }[];
  stepIndex: number;
  totalSteps: number;
  onAllow: () => void;
  onSkip: () => void;
}

export function PermissionScreenLayout({
  icon: Icon,
  title,
  description,
  buttonLabel,
  pills,
  stepIndex,
  totalSteps,
  onAllow,
  onSkip,
}: PermissionScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="absolute top-0 left-0 right-0 h-1/2 bg-primary/5" />

      <View className="flex-1 items-center justify-center px-6">
        <FadeInView delay={0}>
          <View
            className="w-24 h-24 rounded-full bg-surface items-center justify-center mb-10"
            style={{
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 4,
            }}
          >
            <Icon size={40} color={colors.primary} />
          </View>
        </FadeInView>

        <FadeInView delay={80}>
          <Text className="text-white text-3xl font-bold tracking-tight text-center mb-4">
            {title}
          </Text>
          <Text className="text-text-secondary text-base text-center leading-relaxed max-w-[320px]">
            {description}
          </Text>
        </FadeInView>

        <FadeInView delay={160} className="flex-row flex-wrap justify-center gap-3 mt-8">
          {pills.map((pill) => (
            <FeaturePill key={pill.label} icon={pill.icon} label={pill.label} />
          ))}
        </FadeInView>
      </View>

      <View className="px-6 pb-4">
        <FadeInView delay={250}>
          <Button title={buttonLabel} onPress={onAllow} />
          <Pressable onPress={onSkip} className="items-center mt-4 py-2">
            <Text className="text-text-secondary text-sm font-medium">
              Not now
            </Text>
          </Pressable>
          <View className="mt-6">
            <PaginationDots count={totalSteps} activeIndex={stepIndex} />
          </View>
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}
