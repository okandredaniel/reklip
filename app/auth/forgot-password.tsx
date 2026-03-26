import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { BackButton } from "@/components/ui/BackButton";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { MailIcon, ArrowRightIcon, ArrowLeftIcon, CheckIcon } from "@/components/ui/icons";
import { FadeInView } from "@/components/animated/FadeInView";
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from "react-native-svg";

function LockIconHero() {
  return (
    <View className="items-center mb-8">
      <View className="w-32 h-32 items-center justify-center">
        <Svg width={128} height={128} viewBox="0 0 128 128" fill="none">
          <Defs>
            <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
              <Stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={64} cy={64} r={64} fill="url(#glow)" />
          <Circle cx={64} cy={64} r={44} stroke="#1E2D45" strokeWidth={1} />
          <Circle cx={64} cy={64} r={36} fill="#182336" />
          <Path
            d="M72 58V54C72 49.58 68.42 46 64 46C59.58 46 56 49.58 56 54V58"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Path
            d="M52 58H76V74H52V58Z"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Circle cx={64} cy={66} r={2} fill="#3B82F6" />
          <Path
            d="M78 50C78 50 76 46 72 44"
            stroke="#3B82F6"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <Path d="M78 44V50H72" stroke="#3B82F6" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>
    </View>
  );
}

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <FadeInView delay={0} className="px-6 py-2">
        <BackButton />
      </FadeInView>

      <View className="flex-1 px-6 justify-center">
        <FadeInView delay={50}>
          <LockIconHero />
        </FadeInView>

        <FadeInView delay={100}>
          <ScreenHeader
            title="Reset Password"
            subtitle="Enter your email and we'll send you a link to reset your password."
            centered
          />
        </FadeInView>

        {sent ? (
          <FadeInView delay={0} className="mt-10">
            <View className="items-center p-6 rounded-2xl bg-surface border border-card-border">
              <View className="w-12 h-12 rounded-full bg-success items-center justify-center mb-3">
                <CheckIcon size={20} />
              </View>
              <Text className="text-white text-lg font-semibold mb-2">
                Email Sent
              </Text>
              <Text className="text-text-secondary text-sm text-center">
                Check your inbox for a password reset link.
              </Text>
            </View>
          </FadeInView>
        ) : (
          <>
            <FadeInView delay={200} className="mt-10">
              <Input
                label="Email Address"
                placeholder="user@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon={<MailIcon size={20} />}
              />
            </FadeInView>
            <FadeInView delay={280} className="mt-8">
              <Button
                title="Send Reset Link"
                onPress={handleSend}
                loading={loading}
                disabled={!email}
                iconRight={<ArrowRightIcon size={18} />}
              />
            </FadeInView>
          </>
        )}
      </View>

      <FadeInView delay={350} className="items-center pb-8">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-1"
        >
          <ArrowLeftIcon size={14} color="#3B82F6" />
          <Text className="text-primary text-sm font-medium">
            Back to Sign In
          </Text>
        </Pressable>
      </FadeInView>
    </SafeAreaView>
  );
}
