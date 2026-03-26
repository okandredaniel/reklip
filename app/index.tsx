import { Redirect } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

export default function Index() {
  const { hasOnboarded, isAuthenticated, hasCompletedPermissions } = useAuthStore();

  if (!hasOnboarded) {
    return <Redirect href="/onboarding/welcome" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/sign-in" />;
  }

  if (!hasCompletedPermissions) {
    return <Redirect href="/permissions/microphone" />;
  }

  return <Redirect href="/(tabs)/library" />;
}
