import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Check,
  Lock,
  ArrowRight,
  HelpCircle,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

const METHODS = [
  { id: "card", label: "Card", icon: CreditCard },
  { id: "apple", label: "Apple Pay", icon: Smartphone },
  { id: "google", label: "Google Pay", icon: Smartphone },
] as const;

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const [method, setMethod] = useState("card");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <BackButton />
        <Text className="flex-1 text-white text-lg font-bold tracking-tight text-center pr-10">
          Checkout
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 120, gap: 20 }}>
        {/* Order Summary */}
        <FadeInView delay={0}>
          <View className="bg-surface rounded-xl border border-white/5 p-6">
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-white text-xl font-bold">Plus Plan - Monthly</Text>
                <Text className="text-text-secondary text-sm">Unlimited access to all features</Text>
              </View>
              <View className="items-end">
                <Text className="text-white text-xl font-bold">$9.99</Text>
                <Text className="text-text-secondary text-xs">/month</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-3 bg-success/10 border border-success/20 rounded-lg p-3 mb-4">
              <View className="w-6 h-6 rounded-full bg-success items-center justify-center">
                <Check size={14} color="black" />
              </View>
              <Text className="text-white text-sm font-semibold">
                7-day free trial included
              </Text>
            </View>

            <View className="border-t border-white/10 pt-3 gap-1">
              <View className="flex-row justify-between">
                <Text className="text-text-secondary text-xs">Today's charge:</Text>
                <Text className="text-text-secondary text-xs">$0.00</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-text-secondary text-xs">First charge:</Text>
                <Text className="text-text-secondary text-xs">Oct 24, 2023</Text>
              </View>
            </View>
          </View>
        </FadeInView>

        {/* Payment Method */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3">Payment Method</SectionLabel>
          <View className="flex-row gap-3 mb-4">
            {METHODS.map((m) => (
              <Pressable
                key={m.id}
                onPress={() => setMethod(m.id)}
                className={`flex-1 flex-row items-center justify-center gap-2 py-3 rounded-xl bg-surface ${
                  method === m.id ? "border-2 border-primary" : "border border-white/10"
                }`}
                style={method === m.id ? {
                  shadowColor: colors.primary,
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                } : undefined}
              >
                <m.icon size={18} color={method === m.id ? colors.primary : colors.textSecondary} />
                <Text className={`text-sm font-medium ${
                  method === m.id ? "text-white" : "text-text-secondary"
                }`}>
                  {m.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Card form */}
          {method === "card" && (
            <View className="bg-surface rounded-xl border border-white/5 p-5 gap-4">
              <View>
                <Text className="text-text-secondary text-xs font-medium mb-2">Card number</Text>
                <TextInput
                  className="bg-background/50 border border-white/10 rounded-lg px-3 py-3 text-white"
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="numeric"
                />
              </View>
              <View className="flex-row gap-4">
                <View className="flex-1">
                  <Text className="text-text-secondary text-xs font-medium mb-2">Expiry</Text>
                  <TextInput
                    className="bg-background/50 border border-white/10 rounded-lg px-3 py-3 text-white"
                    placeholder="MM / YY"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-text-secondary text-xs font-medium mb-2">CVC</Text>
                  <View className="flex-row items-center bg-background/50 border border-white/10 rounded-lg px-3">
                    <TextInput
                      className="flex-1 py-3 text-white"
                      placeholder="123"
                      placeholderTextColor={colors.textSecondary}
                      keyboardType="numeric"
                    />
                    <HelpCircle size={16} color={colors.textSecondary} />
                  </View>
                </View>
              </View>
              <View>
                <Text className="text-text-secondary text-xs font-medium mb-2">Name on card</Text>
                <TextInput
                  className="bg-background/50 border border-white/10 rounded-lg px-3 py-3 text-white"
                  placeholder="John Doe"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              <View className="flex-row items-center gap-1.5 opacity-60">
                <Lock size={12} color={colors.textSecondary} />
                <Text className="text-text-secondary text-xs">
                  Secure checkout powered by{" "}
                  <Text className="text-white font-bold">Stripe</Text>
                </Text>
              </View>
            </View>
          )}
        </FadeInView>
      </ScrollView>

      {/* Bottom CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pt-6 bg-background" style={{ paddingBottom: Math.max(insets.bottom, 12) + 16 }}>
        <Pressable
          className="h-14 rounded-full bg-primary flex-row items-center justify-center gap-2"
          style={{
            shadowColor: colors.primary,
            shadowOpacity: 0.4,
            shadowRadius: 20,
            elevation: 8,
          }}
        >
          <Text className="text-white text-lg font-bold">Start Free Trial</Text>
          <ArrowRight size={18} color="white" />
        </Pressable>
        <Text className="text-text-secondary text-xs text-center mt-4">
          No commitment. Cancel online anytime.
        </Text>
      </View>
    </SafeAreaView>
  );
}
