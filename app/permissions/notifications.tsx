import { Text, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { PermissionScreenLayout } from "@/components/common/PermissionScreen";
import { useAuthStore } from "@/stores/authStore";

export default function NotificationPermissionScreen() {
  const router = useRouter();
  const setHasCompletedPermissions = useAuthStore((s) => s.setHasCompletedPermissions);

  const finishPermissions = () => {
    setHasCompletedPermissions(true);
    router.replace("/(tabs)/library");
  };

  const handleAllow = async () => {
    // Notification permissions are handled natively when push is configured.
    // For now, mark as complete and proceed.
    finishPermissions();
  };

  return (
    <PermissionScreenLayout
      icon={Bell}
      title="Stay Updated"
      description="Get notified when your recordings are processed and your content is ready to share."
      buttonLabel="Allow Notifications"
      pills={[
        { icon: <Text className="text-sm">✅</Text>, label: "Processing complete" },
        { icon: <Text className="text-sm">🔕</Text>, label: "No spam, ever" },
      ]}
      stepIndex={2}
      totalSteps={3}
      onAllow={handleAllow}
      onSkip={finishPermissions}
    />
  );
}
