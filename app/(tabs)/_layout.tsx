import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { BookOpen, BarChart3, FileText, User, Mic } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { colors } from "@/theme";

function RecordButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/record")}
      className="w-14 h-14 rounded-full bg-primary items-center justify-center -mt-5"
      style={{
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <Mic size={26} color="white" />
    </Pressable>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "android"
    ? Math.max(insets.bottom, 12) + 8
    : insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0F1623",
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
      }}
    >
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <BookOpen size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color }) => (
            <BarChart3 size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "",
          tabBarIcon: () => <RecordButton />,
          tabBarLabel: () => null,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent navigating to a "record" tab — it pushes a screen instead
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="drafts"
        options={{
          title: "Drafts",
          tabBarIcon: ({ color }) => (
            <FileText size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <User size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
