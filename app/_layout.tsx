import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
        <Stack.Screen name="record" options={{ animation: "fade" }} />
        <Stack.Screen name="auth" />
        <Stack.Screen name="onboarding" options={{ animation: "fade" }} />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="sessions" />
        <Stack.Screen name="search" />
        <Stack.Screen name="notifications" />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
