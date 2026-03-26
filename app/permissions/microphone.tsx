import { Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { requestRecordingPermissionsAsync } from "expo-audio";
import { Mic } from "lucide-react-native";
import { PermissionScreenLayout } from "@/components/common/PermissionScreen";

export default function MicrophonePermissionScreen() {
  const router = useRouter();

  const handleAllow = async () => {
    const { granted } = await requestRecordingPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Needed",
        "You can enable microphone access in your device settings.",
      );
    }
    router.replace("/permissions/camera");
  };

  return (
    <PermissionScreenLayout
      icon={Mic}
      title="Microphone Access"
      description="LiveCapture needs your microphone to record meeting audio and voice notes. Audio never leaves your device until you choose to process it."
      buttonLabel="Allow Microphone"
      pills={[
        { icon: <Text className="text-sm">🎙️</Text>, label: "Background recording" },
        { icon: <Text className="text-sm">🔒</Text>, label: "Private by default" },
      ]}
      stepIndex={0}
      totalSteps={3}
      onAllow={handleAllow}
      onSkip={() => router.replace("/permissions/camera")}
    />
  );
}
