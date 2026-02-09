import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Check auth state and onboarding status
  // - Not onboarded → /onboarding/welcome
  // - Not signed in → /auth/sign-in
  // - Signed in → /(tabs)/library
  return <Redirect href="/(tabs)/library" />;
}
