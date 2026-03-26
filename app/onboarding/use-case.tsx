import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Check } from "lucide-react-native";
import { Button } from "@/components/ui/Button";
import { PaginationDots } from "@/components/ui/PaginationDots";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";

const USE_CASES = [
  { id: "church", emoji: "🙏", title: "Church & Sermons", description: "Sermons, Bible studies, worship" },
  { id: "education", emoji: "📚", title: "Education", description: "Lectures, classes, workshops" },
  { id: "events", emoji: "🎤", title: "Events", description: "Conferences, talks, panels" },
  { id: "work", emoji: "💼", title: "Work", description: "Meetings, standups, brainstorms" },
] as const;

export default function UseCaseScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("church");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Header */}
      <FadeInView delay={0} className="flex-row items-center justify-end px-6 py-2">
        <Pressable onPress={() => router.replace("/onboarding/content-prefs")}>
          <Text className="text-text-secondary text-sm font-medium">Skip</Text>
        </Pressable>
      </FadeInView>

      {/* Content */}
      <View className="flex-1 px-6 pt-4">
        <FadeInView delay={50}>
          <Text className="text-white text-3xl font-bold tracking-tight mb-3">
            What will you{"\n"}record most?
          </Text>
          <Text className="text-text-secondary text-base leading-relaxed mb-8">
            We'll optimize your experience. You can always add more later.
          </Text>
        </FadeInView>

        {/* Selection Cards */}
        <View className="gap-4">
          {USE_CASES.map((item, index) => {
            const isSelected = selected === item.id;
            return (
              <StaggerItem key={item.id} index={index} baseDelay={100}>
                <Pressable
                  onPress={() => setSelected(item.id)}
                  className={`flex-row items-center p-5 rounded-2xl ${
                    isSelected
                      ? "border-2 border-primary bg-card"
                      : "border border-card-border bg-card"
                  }`}
                  style={isSelected ? {
                    shadowColor: "#3B82F6",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 15,
                    elevation: 5,
                  } : undefined}
                >
                  {/* Emoji */}
                  <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                    isSelected ? "bg-primary/10" : "bg-white/5"
                  }`}>
                    <Text className="text-3xl">{item.emoji}</Text>
                  </View>

                  {/* Text */}
                  <View className="flex-1">
                    <Text className="text-white text-lg font-bold mb-1">
                      {item.title}
                    </Text>
                    <Text className="text-text-secondary text-sm font-medium">
                      {item.description}
                    </Text>
                  </View>

                  {/* Checkmark */}
                  {isSelected ? (
                    <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
                      <Check size={14} color="white" strokeWidth={3} />
                    </View>
                  ) : (
                    <View className="w-6 h-6 rounded-full border-2 border-card-border" />
                  )}
                </Pressable>
              </StaggerItem>
            );
          })}
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 pb-4">
        <FadeInView delay={350}>
          <View className="mb-6">
            <PaginationDots count={3} activeIndex={1} />
          </View>

          <Button
            title="Continue"
            onPress={() => router.replace("/onboarding/content-prefs")}
          />
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}
