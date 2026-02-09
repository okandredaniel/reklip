import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from "react-native-reanimated";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { MailIcon, CheckIcon, HelpIcon } from "@/components/ui/icons";
import { useAuthStore } from "@/stores/authStore";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";
import { SPRING } from "@/constants/animations";
import Svg, { Circle } from "react-native-svg";

function EmailIconHero() {
  return (
    <View className="items-center mb-8">
      <View className="w-28 h-28 items-center justify-center">
        <Svg width={112} height={112} viewBox="0 0 112 112" fill="none">
          <Circle cx={56} cy={56} r={40} fill="#182336" />
        </Svg>
        <View className="absolute items-center justify-center">
          <MailIcon size={40} color="#3B82F6" />
        </View>
        <View className="absolute bottom-2 right-3 w-8 h-8 rounded-full bg-success items-center justify-center border-2 border-background">
          <CheckIcon size={14} color="white" />
        </View>
      </View>
    </View>
  );
}

function OtpBox({
  digit,
  focused,
  index,
  inputRef,
  onChangeText,
  onKeyPress,
  onFocus,
  baseDelay,
}: {
  digit: string;
  focused: boolean;
  index: number;
  inputRef: (ref: TextInput | null) => void;
  onChangeText: (text: string) => void;
  onKeyPress: (key: string) => void;
  onFocus: () => void;
  baseDelay: number;
}) {
  const enterProgress = useSharedValue(0);

  useEffect(() => {
    enterProgress.value = withDelay(
      baseDelay + index * 40,
      withSpring(1, SPRING.gentle),
    );
  }, [baseDelay, enterProgress, index]);

  const enterStyle = useAnimatedStyle(() => ({
    opacity: enterProgress.value,
    transform: [{ translateY: (1 - enterProgress.value) * 8 }],
  }));

  const isActive = focused || !!digit;

  return (
    <Animated.View style={enterStyle}>
      <TextInput
        ref={inputRef}
        className={`w-[72px] h-[72px] rounded-2xl text-center text-white text-2xl font-semibold ${
          isActive
            ? "border-2 border-primary bg-surface"
            : "border border-card-border bg-card"
        }`}
        value={digit}
        onChangeText={onChangeText}
        onKeyPress={({ nativeEvent }) => onKeyPress(nativeEvent.key)}
        onFocus={onFocus}
        keyboardType="number-pad"
        maxLength={1}
        placeholderTextColor={colors.textSecondary}
        placeholder="–"
      />
    </Animated.View>
  );
}

export default function EmailVerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(42);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const setIsAuthenticated = useAuthStore((s) => s.setIsAuthenticated);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
      router.replace("/(tabs)/library");
    }, 1000);
  };

  const formattedTime = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <FadeInView delay={0} className="flex-row justify-between items-center px-6 py-2">
        <BackButton />
        <Pressable
          onPress={() => {}}
          className="w-9 h-9 rounded-full border border-card-border items-center justify-center"
        >
          <HelpIcon size={18} color="white" />
        </Pressable>
      </FadeInView>

      <View className="flex-1 px-6 justify-center items-center">
        <FadeInView delay={50}>
          <EmailIconHero />
        </FadeInView>

        <FadeInView delay={120}>
          <ScreenHeader title="Check Your Email" centered />
        </FadeInView>

        <FadeInView delay={170} className="mt-3">
          <Text className="text-text-secondary text-base text-center mb-1">
            We sent a verification link to
          </Text>
          <Text className="text-white text-base font-semibold mb-10 text-center">
            andre@email.com
          </Text>
        </FadeInView>

        <View className="flex-row gap-4 mb-8">
          {code.map((digit, index) => (
            <OtpBox
              key={index}
              digit={digit}
              focused={focusedIndex === index}
              index={index}
              baseDelay={220}
              inputRef={(ref) => { inputs.current[index] = ref; }}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(key) => handleKeyPress(key, index)}
              onFocus={() => setFocusedIndex(index)}
            />
          ))}
        </View>

        <FadeInView delay={380}>
          <Text className="text-text-secondary text-sm mb-1 text-center">
            Didn't receive it?
          </Text>
          <Text className="text-text-secondary text-sm text-center">
            Resend code in{" "}
            <Text className="text-primary font-semibold">{formattedTime}</Text>
          </Text>
        </FadeInView>
      </View>

      <FadeInView delay={420} className="px-6 pb-6">
        <Button
          title="Verify"
          onPress={handleVerify}
          loading={loading}
          disabled={code.some((d) => !d)}
        />
        <Pressable className="items-center mt-4">
          <Text className="text-text-secondary text-sm">
            Change email address
          </Text>
        </Pressable>
      </FadeInView>
    </SafeAreaView>
  );
}
