import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check, Wallet, Info, Sparkles } from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";
import { colors } from "@/theme";

function CreditPack({
  amount,
  name,
  perCredit,
  price,
  highlight,
  badge,
  index,
}: {
  amount: string;
  name: string;
  perCredit: string;
  price: string;
  highlight?: boolean;
  badge?: string;
  index: number;
}) {
  return (
    <StaggerItem index={index} baseDelay={200}>
      <Pressable
        className={`flex-row items-center p-4 rounded-xl bg-card border ${
          highlight ? "border-primary/50" : "border-card-border"
        }`}
        style={highlight ? {
          shadowColor: colors.primary,
          shadowOpacity: 0.15,
          shadowRadius: 20,
        } : undefined}
      >
        <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${
          highlight ? "bg-primary/20 border border-primary" : "bg-surface"
        }`}>
          <Text className={`text-lg font-bold ${highlight ? "text-primary" : "text-white"}`}>
            {amount}
          </Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-lg font-semibold">{name}</Text>
            {badge && (
              <View className="bg-primary px-2 py-0.5 rounded-full">
                <Text className="text-white text-[10px] font-bold tracking-wider">
                  {badge}
                </Text>
              </View>
            )}
          </View>
          <Text className={`text-sm ${highlight ? "text-primary font-medium" : "text-text-secondary"}`}>
            {perCredit}
          </Text>
        </View>
        <Pressable
          className={`px-5 py-2.5 rounded-full ${
            highlight ? "bg-primary" : "border border-primary"
          }`}
        >
          <Text className={`text-sm font-bold ${highlight ? "text-white" : "text-primary"}`}>
            {price}
          </Text>
        </Pressable>
      </Pressable>
    </StaggerItem>
  );
}

export default function BuyCreditsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <BackButton />
        <Text className="flex-1 text-white text-lg font-bold tracking-tight text-center pr-10">
          Buy Credits
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 20 }}>
        {/* Education Card */}
        <FadeInView delay={0}>
          <View className="bg-card rounded-xl border border-card-border p-5">
            <View className="flex-row items-start justify-between mb-3">
              <Text className="text-white text-[32px] font-bold leading-tight flex-1">
                Pay per{"\n"}recording
              </Text>
              <Sparkles size={22} color={colors.primary} />
            </View>
            <Text className="text-text-secondary text-sm mb-4">
              Perfect for occasional users. Credits never expire, so you can use
              them whenever you need.
            </Text>
            <View className="flex-row items-center gap-2 px-3 py-1.5 bg-surface rounded-lg border border-white/5">
              <Info size={16} color={colors.primary} />
              <Text className="text-white/90 text-xs">
                1 credit = 1 recording processed with AI
              </Text>
            </View>
          </View>
        </FadeInView>

        {/* Balance */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3">Your Balance</SectionLabel>
          <View className="bg-card rounded-xl border border-card-border border-l-4 border-l-primary p-5 flex-row items-center justify-between">
            <View>
              <Text className="text-text-secondary text-sm">Current Balance</Text>
              <Text className="text-white text-[32px] font-bold tracking-tight">
                3 Credits
              </Text>
            </View>
            <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
              <Wallet size={20} color={colors.primary} />
            </View>
          </View>
        </FadeInView>

        {/* Packs */}
        <View>
          <SectionLabel className="mb-3">Buy Credits</SectionLabel>
          <View className="gap-3">
            <CreditPack index={0} amount="5" name="Starter Pack" perCredit="$0.99 per credit" price="$4.99" />
            <CreditPack index={1} amount="15" name="Standard Pack" perCredit="$0.66 per credit" price="$9.99" highlight badge="Best Value" />
            <CreditPack index={2} amount="50" name="Pro Pack" perCredit="$0.60 per credit" price="$29.99" />
          </View>
        </View>

        {/* Credit Usage */}
        <View>
          <SectionLabel className="mb-3">Credit Usage</SectionLabel>
          <View className="bg-card rounded-xl border border-card-border p-5">
            <Text className="text-white text-sm font-medium mb-3">
              What's included in 1 credit?
            </Text>
            <View className="gap-3">
              {[
                "Full high-fidelity transcription",
                "Speaker identification (Diarization)",
                "AI-generated summary & key points",
                "Unlimited export formats (PDF, DOCX)",
              ].map((item) => (
                <View key={item} className="flex-row items-center gap-3">
                  <Check size={18} color={colors.primary} />
                  <Text className="text-text-secondary text-sm flex-1">{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Text className="text-text-secondary/60 text-xs text-center px-4">
          Purchased credits are linked to your Apple ID and do not expire as
          long as your account remains active.
        </Text>
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
