import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { AuthFooterLink } from "@/components/auth/AuthFooterLink";
import { useAuthStore } from "@/stores/authStore";
import { FadeInView } from "@/components/animated/FadeInView";
import { PaginationDots } from "@/components/ui/PaginationDots";
import { FeaturePill } from "@/components/ui/FeaturePill";
import { StaggerItem } from "@/components/animated/StaggerItem";
import Svg, { Rect, Path, Circle, Line, G } from "react-native-svg";

function HeroIllustration() {
  return (
    <View className="items-center justify-center w-72 h-72">
      <Svg width={280} height={280} viewBox="0 0 320 320" fill="none">
        <Rect x={80} y={40} width={160} height={260} rx={24} stroke="white" strokeWidth={2} opacity={0.9} />
        <Rect x={90} y={50} width={140} height={240} rx={16} fill="#1e293b" fillOpacity={0.5} />
        <Path
          d="M100 160 L105 150 L110 170 L115 140 L120 180 L125 130 L130 190 L135 120 L140 200 L145 150 L150 170 L155 140 L160 180 L165 150 L170 170 L175 160 L180 160 L185 155 L190 165 L195 160 L200 160 L205 150 L210 170 L215 160"
          stroke="#3B82F6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <G transform="translate(220, 60) rotate(15)">
          <Circle cx={20} cy={20} r={20} fill="rgba(59,130,246,0.2)" stroke="#3B82F6" strokeWidth={1.5} />
          <Path d="M18 12H22L23 14H27V26H13V14H17L18 12Z" stroke="white" strokeWidth={1.5} fill="none" />
        </G>
        <G transform="translate(40, 200) rotate(-10)">
          <Circle cx={18} cy={18} r={18} fill="#0B1120" stroke="#7B8BA3" strokeWidth={1} />
          <Path
            d="M18 24.35L16.55 23.03C11.4 18.36 8 15.28 8 11.5C8 8.42 10.42 6 13.5 6C15.24 6 16.91 6.81 18 8.09C19.09 6.81 20.76 6 22.5 6C25.58 6 28 8.42 28 11.5C28 15.28 24.6 18.36 19.45 23.03L18 24.35Z"
            fill="#EF4444"
            transform="scale(0.6) translate(10,10)"
          />
        </G>
        <G transform="translate(50, 60) rotate(-15)">
          <Path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#FBBF24"
            stroke="white"
            strokeWidth={1}
          />
        </G>
        <G transform="translate(200, 220) rotate(10)">
          <Rect x={0} y={0} width={30} height={40} rx={4} fill="#334155" stroke="white" strokeWidth={1.5} />
          <Line x1={6} y1={10} x2={24} y2={10} stroke="#7B8BA3" strokeWidth={2} strokeLinecap="round" />
          <Line x1={6} y1={18} x2={24} y2={18} stroke="#7B8BA3" strokeWidth={2} strokeLinecap="round" />
          <Line x1={6} y1={26} x2={16} y2={26} stroke="#3B82F6" strokeWidth={2} strokeLinecap="round" />
        </G>
        <Circle cx={160} cy={160} r={24} fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth={1} />
        <Path d="M155 148V172L173 160L155 148Z" fill="white" />
      </Svg>
    </View>
  );
}


export default function WelcomeScreen() {
  const router = useRouter();
  const setHasOnboarded = useAuthStore((s) => s.setHasOnboarded);

  const handleGetStarted = () => {
    router.replace("/onboarding/use-case");
  };

  const handleSignIn = () => {
    setHasOnboarded(true);
    router.replace("/auth/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      <FadeInView delay={0} className="flex-1 items-center justify-center">
        <HeroIllustration />
      </FadeInView>

      <View className="px-6 pb-4 items-center">
        <FadeInView delay={80}>
          <Text className="text-white text-[32px] font-bold text-center leading-tight mb-4">
            Capture. React.{"\n"}Create.
          </Text>
        </FadeInView>

        <FadeInView delay={140}>
          <Text className="text-text-secondary text-base text-center leading-relaxed mb-6 max-w-[340px]">
            Record sermons, lectures, and meetings. Mark the moments that matter.
            AI turns everything into notes, study guides, and social content.
          </Text>
        </FadeInView>

        <View className="flex-row flex-wrap justify-center gap-3 mb-8">
          <StaggerItem index={0} baseDelay={200}>
            <FeaturePill icon={<Text className="text-sm">🎙️</Text>} label="Live Recording" />
          </StaggerItem>
          <StaggerItem index={1} baseDelay={200}>
            <FeaturePill icon={<Text className="text-sm">📸</Text>} label="Photo & Video" />
          </StaggerItem>
          <StaggerItem index={2} baseDelay={200}>
            <FeaturePill icon={<Text className="text-sm">✨</Text>} label="AI-Powered" />
          </StaggerItem>
        </View>

        <FadeInView delay={300}>
          <View className="mb-6">
            <PaginationDots count={3} activeIndex={0} />
          </View>
        </FadeInView>

        <FadeInView delay={350} className="w-full mb-4">
          <Button title="Get Started" onPress={handleGetStarted} />
        </FadeInView>

        <FadeInView delay={400}>
          <AuthFooterLink
            message="Already have an account?"
            linkText="Sign in"
            onPress={handleSignIn}
          />
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}
