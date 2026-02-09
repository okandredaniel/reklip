import { Tabs } from "expo-router";
import { colors } from "@/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.divider,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="library"
        options={{ title: "Library" }}
      />
      <Tabs.Screen
        name="insights"
        options={{ title: "Insights" }}
      />
      <Tabs.Screen
        name="drafts"
        options={{ title: "Drafts" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile" }}
      />
    </Tabs>
  );
}
