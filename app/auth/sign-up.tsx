import { View, KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OrDivider } from "@/components/auth/OrDivider";
import { SocialSignInButton } from "@/components/auth/SocialSignInButton";
import { AuthFooterLink } from "@/components/auth/AuthFooterLink";
import { BackButton } from "@/components/ui/BackButton";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { UserIcon, MailIcon, LockIcon, CheckIcon } from "@/components/ui/icons";
import { FadeInView } from "@/components/animated/FadeInView";
import { StaggerItem } from "@/components/animated/StaggerItem";
import { SPRING } from "@/constants/animations";

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordValid = password.length >= 8;

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/auth/verify");
    }, 1000);
  };

  const checkmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(passwordValid ? 1 : 0, SPRING.default) }],
    opacity: withSpring(passwordValid ? 1 : 0, SPRING.default),
  }));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-6 py-4"
          keyboardShouldPersistTaps="handled"
        >
          <FadeInView delay={0}>
            <BackButton />
          </FadeInView>

          <FadeInView delay={50} className="mb-8">
            <ScreenHeader
              title="Create Account"
              subtitle="Start capturing what matters"
            />
          </FadeInView>

          <View className="gap-5">
            <StaggerItem index={0} baseDelay={100}>
              <Input
                label="Full name"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                icon={<UserIcon size={20} />}
              />
            </StaggerItem>
            <StaggerItem index={1} baseDelay={100}>
              <Input
                label="Email address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon={<MailIcon size={20} />}
              />
            </StaggerItem>
            <StaggerItem index={2} baseDelay={100}>
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon={<LockIcon size={20} />}
              />
            </StaggerItem>
            <StaggerItem index={3} baseDelay={100}>
              <Input
                label="Confirm password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                icon={<LockIcon size={20} />}
              />
            </StaggerItem>
          </View>

          <FadeInView delay={280}>
            <View className="flex-row items-center mt-3 gap-2">
              <View
                className={`w-5 h-5 rounded-full items-center justify-center ${
                  passwordValid ? "bg-success" : "bg-card-border"
                }`}
              >
                <Animated.View style={checkmarkStyle}>
                  <CheckIcon size={12} />
                </Animated.View>
              </View>
              <Text className="text-text-secondary text-sm">
                Minimum 8 characters
              </Text>
            </View>
          </FadeInView>

          <FadeInView delay={320} className="mt-8">
            <Button
              title="Create Account"
              onPress={handleSignUp}
              loading={loading}
              disabled={!fullName || !email || !passwordValid || password !== confirmPassword}
            />
          </FadeInView>

          <FadeInView delay={370}>
            <OrDivider />
          </FadeInView>

          <FadeInView delay={410}>
            <View className="flex-row gap-3">
              <SocialSignInButton provider="google" iconOnly />
              <SocialSignInButton provider="apple" iconOnly />
            </View>
          </FadeInView>

          <FadeInView delay={450} className="mt-8 mb-4">
            <AuthFooterLink
              message="Already have an account?"
              linkText="Sign in"
              onPress={() => router.push("/auth/sign-in")}
            />
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
