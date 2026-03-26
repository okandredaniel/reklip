import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check } from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";

function PlanCard({
  name,
  price,
  features,
  accentColor,
  badge,
  buttonLabel,
  buttonStyle,
  index,
}: {
  name: string;
  price: string;
  features: string[];
  accentColor: string;
  badge?: string;
  buttonLabel: string;
  buttonStyle: "filled" | "outline" | "disabled";
  index: number;
}) {
  return (
    <StaggerItem index={index} baseDelay={150}>
      <View
        className="rounded-2xl bg-card p-6 relative"
        style={{
          borderWidth: badge ? 2 : 1,
          borderColor: badge ? accentColor : "#1E2D45",
          ...(badge
            ? {
                shadowColor: accentColor,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 15,
                elevation: 5,
              }
            : {}),
        }}
      >
        {badge && (
          <View
            className="absolute -top-3 right-6 px-3 py-1 rounded-full"
            style={{ backgroundColor: accentColor }}
          >
            <Text className={`text-[10px] font-bold tracking-wider uppercase ${
              accentColor === "#F59E0B" ? "text-black" : "text-white"
            }`}>
              {badge}
            </Text>
          </View>
        )}

        {/* Header */}
        <View className="flex-row items-end justify-between mb-4">
          <Text className="text-white text-lg font-bold">{name}</Text>
          <View className="flex-row items-end">
            <Text className="text-white text-3xl font-black">{price}</Text>
            <Text className="text-text-secondary font-medium mb-1">/mo</Text>
          </View>
        </View>

        <View className="h-px bg-card-border mb-4" />

        {/* Features */}
        <View className="gap-3 mb-5">
          {features.map((f) => (
            <View key={f} className="flex-row items-start gap-3">
              <Check
                size={18}
                color={buttonStyle === "disabled" ? "#64748B" : accentColor}
              />
              <Text className={`text-sm font-medium flex-1 ${
                buttonStyle === "disabled" ? "text-white/70" : "text-white"
              }`}>
                {f}
              </Text>
            </View>
          ))}
        </View>

        {/* Button */}
        <Pressable
          className={`w-full py-3.5 rounded-full items-center justify-center ${
            buttonStyle === "filled"
              ? ""
              : buttonStyle === "outline"
                ? "bg-transparent"
                : "bg-white/5"
          }`}
          style={
            buttonStyle === "filled"
              ? { backgroundColor: accentColor }
              : buttonStyle === "outline"
                ? { borderWidth: 2, borderColor: accentColor }
                : undefined
          }
        >
          <Text
            className={`text-sm font-bold ${
              buttonStyle === "filled"
                ? "text-white"
                : buttonStyle === "outline"
                  ? ""
                  : "text-text-secondary"
            }`}
            style={
              buttonStyle === "outline"
                ? { color: accentColor }
                : undefined
            }
          >
            {buttonLabel}
          </Text>
        </Pressable>
      </View>
    </StaggerItem>
  );
}

export default function SubscriptionPlansScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <BackButton />
        <Text className="flex-1 text-white text-lg font-bold text-center pr-10">
          Choose Your Plan
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 20 }}>
        {/* Hero */}
        <FadeInView delay={0} className="items-center mb-4">
          <Text className="text-white text-[28px] font-extrabold tracking-tight text-center leading-tight mb-3">
            Unlock unlimited{"\n"}potential
          </Text>
          <Text className="text-text-secondary text-base font-medium text-center leading-relaxed">
            Unlock unlimited recordings and AI-powered content creation
          </Text>
        </FadeInView>

        {/* Plans */}
        <PlanCard
          index={0}
          name="Free"
          price="$0"
          accentColor="#64748B"
          features={[
            "Basic recording (30 mins limit)",
            "Local storage only",
            "Standard audio quality",
          ]}
          buttonLabel="Current Plan"
          buttonStyle="disabled"
        />

        <PlanCard
          index={1}
          name="Plus"
          price="$9.99"
          accentColor="#3B82F6"
          badge="Popular"
          features={[
            "Unlimited recordings",
            "Cloud sync across devices",
            "AI Noise reduction",
            "HD Audio Export",
          ]}
          buttonLabel="Upgrade to Plus"
          buttonStyle="filled"
        />

        <PlanCard
          index={2}
          name="Pro"
          price="$19.99"
          accentColor="#F59E0B"
          badge="Best Value"
          features={[
            "Everything in Plus",
            "AI Summaries & Insights",
            "Transcription export (TXT, PDF)",
            "Priority 24/7 support",
          ]}
          buttonLabel="Upgrade to Pro"
          buttonStyle="outline"
        />

        {/* Disclaimer */}
        <Text className="text-text-secondary text-xs text-center leading-normal mt-4">
          All plans include a 7-day free trial. Cancel anytime.
        </Text>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
