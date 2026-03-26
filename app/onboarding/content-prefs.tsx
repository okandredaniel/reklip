import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  FileText,
  BookOpen,
  Video,
  Quote,
  ScrollText,
  Mail,
  Mic,
} from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { PaginationDots } from "@/components/ui/PaginationDots";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";
import { useAuthStore } from "@/stores/authStore";
import { colors } from "@/theme";

const CONTENT_OPTIONS = [
  { id: "summaries", icon: FileText, label: "Summaries & Key Points" },
  { id: "study", icon: BookOpen, label: "Study Guides" },
  { id: "video", icon: Video, label: "Short Video Clips" },
  { id: "quotes", icon: Quote, label: "Quote Cards" },
  { id: "transcript", icon: ScrollText, label: "Full Transcript" },
  { id: "newsletter", icon: Mail, label: "Newsletter Content" },
] as const;

export default function ContentPreferencesScreen() {
  const router = useRouter();
  const setHasOnboarded = useAuthStore((s) => s.setHasOnboarded);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["summaries", "study", "video"])
  );

  const toggleOption = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleFinish = () => {
    setHasOnboarded(true);
    router.replace("/auth/sign-up");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <View className="h-2" />

      {/* Content */}
      <View className="flex-1 px-6 pt-4">
        <FadeInView delay={50}>
          <Text className="text-white text-[32px] font-bold leading-tight tracking-tight mb-3">
            What content do you want to create?
          </Text>
          <Text className="text-text-secondary text-base leading-relaxed mb-6">
            Select all that apply. AI will generate these after each recording.
          </Text>
        </FadeInView>

        {/* Options */}
        <View className="gap-3">
          {CONTENT_OPTIONS.map((option, index) => {
            const isSelected = selected.has(option.id);
            return (
              <StaggerItem key={option.id} index={index} baseDelay={100}>
                <Pressable
                  onPress={() => toggleOption(option.id)}
                  className={`flex-row items-center justify-between p-4 rounded-xl ${
                    isSelected
                      ? "border border-primary bg-card"
                      : "border border-card-border bg-card"
                  }`}
                  style={isSelected ? {
                    shadowColor: "#3B82F6",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                  } : undefined}
                >
                  <View className="flex-row items-center gap-3">
                    <View className={`w-10 h-10 rounded-lg items-center justify-center ${
                      isSelected ? "bg-primary/20" : "bg-white/5"
                    }`}>
                      <option.icon
                        size={22}
                        color={isSelected ? colors.primary : colors.textSecondary}
                      />
                    </View>
                    <Text className={`text-base font-medium ${
                      isSelected ? "text-white" : "text-text-secondary"
                    }`}>
                      {option.label}
                    </Text>
                  </View>

                  {/* Checkbox */}
                  <View className={`w-6 h-6 rounded items-center justify-center ${
                    isSelected
                      ? "bg-primary border border-primary"
                      : "border border-card-border"
                  }`}>
                    {isSelected && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                </Pressable>
              </StaggerItem>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 pb-4">
        <FadeInView delay={400}>
          <View className="mb-6">
            <PaginationDots count={3} activeIndex={2} />
          </View>

          <Button
            title="Start Recording"
            icon={<Mic size={20} color="white" />}
            onPress={handleFinish}
          />
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}
