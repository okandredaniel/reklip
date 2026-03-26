import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { Camera, Clock, Video } from "lucide-react-native";
import { PermissionScreenLayout } from "@/components/common/PermissionScreen";
import { colors } from "@/theme";

export default function CameraPermissionScreen() {
  const router = useRouter();
  const [, requestPermission] = useCameraPermissions();

  const handleAllow = async () => {
    const result = await requestPermission();
    if (!result?.granted) {
      Alert.alert(
        "Permission Needed",
        "You can enable camera access in your device settings.",
      );
    }
    router.replace("/permissions/notifications");
  };

  return (
    <PermissionScreenLayout
      icon={Camera}
      title="Camera Access"
      description="Capture slides, whiteboards, and key moments during recordings."
      buttonLabel="Allow Camera"
      pills={[
        { icon: <Clock size={16} color={colors.textSecondary} />, label: "Timestamped photos" },
        { icon: <Video size={16} color={colors.textSecondary} />, label: "Video clips" },
      ]}
      stepIndex={1}
      totalSteps={3}
      onAllow={handleAllow}
      onSkip={() => router.replace("/permissions/notifications")}
    />
  );
}
