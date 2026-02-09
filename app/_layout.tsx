import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="record" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="sessions" />
        <Stack.Screen name="search" />
        <Stack.Screen name="notifications" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal" }}
        />
      </Stack>
    </>
  );
}
