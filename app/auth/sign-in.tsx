import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OrDivider } from "@/components/auth/OrDivider";
import { SocialSignInButton } from "@/components/auth/SocialSignInButton";
import { AuthFooterLink } from "@/components/auth/AuthFooterLink";
import { MailIcon, LockIcon } from "@/components/ui/icons";
import { useAuthStore } from "@/stores/authStore";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";
import Svg, { Path, Circle } from "react-native-svg";

function AppLogo() {
  return (
    <View className="items-center mb-6">
      <View className="w-24 h-24 rounded-2xl bg-surface items-center justify-center mb-4">
        <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
          <Path
            d="M24 8C24 8 20 12 20 20V32"
            stroke="#3B82F6"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d="M24 8C24 8 28 12 28 20V32"
            stroke="#3B82F6"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Circle cx={24} cy={8} r={4} fill="#3B82F6" />
          <Path
            d="M16 36V38M20 36V40M24 36V42M28 36V40M32 36V38"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Text className="text-white text-3xl font-bold">LiveCapture</Text>
      <Text className="text-text-secondary text-base mt-1">
        Capture. React. Create.
      </Text>
    </View>
  );
}

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
      router.replace("/permissions/microphone");
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <FadeInView delay={0}>
            <AppLogo />
          </FadeInView>

          <View className="mt-8 gap-4">
            <StaggerItem index={0} baseDelay={100}>
              <Input
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon={<MailIcon size={20} />}
              />
            </StaggerItem>
            <StaggerItem index={1} baseDelay={100}>
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon={<LockIcon size={20} />}
              />
            </StaggerItem>
          </View>

          <FadeInView delay={200}>
            <Text
              onPress={() => router.push("/auth/forgot-password")}
              className="text-primary text-sm font-medium text-right mt-3"
            >
              Forgot password?
            </Text>
          </FadeInView>

          <FadeInView delay={250} className="mt-6">
            <Button
              title="Sign In"
              onPress={handleSignIn}
              loading={loading}
            />
          </FadeInView>

          <FadeInView delay={300}>
            <OrDivider />
          </FadeInView>

          <FadeInView delay={350}>
            <View className="flex-row gap-3">
              <SocialSignInButton provider="google" />
              <SocialSignInButton provider="apple" />
            </View>
          </FadeInView>

          <FadeInView delay={400} className="mt-8">
            <AuthFooterLink
              message="Don't have an account?"
              linkText="Sign up"
              onPress={() => router.replace("/auth/sign-up")}
            />
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
