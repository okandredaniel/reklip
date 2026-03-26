import { Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Settings,
  BarChart3,
  LayoutTemplate,
  Download,
  Link2,
  Star,
  MessageSquare,
} from "lucide-react-native";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { StatCard } from "@/components/common/StatCard";
import { QuickAction } from "@/components/common/QuickActionItem";
import { colors } from "@/theme";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
        <Text className="text-white text-[30px] font-bold">Profile</Text>
        <Pressable
          onPress={() => router.push("/profile/settings")}
          className="w-10 h-10 rounded-full items-center justify-center"
        >
          <Settings size={22} color={colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingTop: 0, gap: 20 }}>
        {/* Profile Card */}
        <View className="bg-card rounded-3xl border border-card-border p-6 items-center">
          {/* Avatar */}
          <View className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-3">
            <Text className="text-white text-2xl font-bold">AS</Text>
            <View className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-success border-2 border-card" />
          </View>
          <Text className="text-white text-xl font-bold">André Silva</Text>
          <Text className="text-text-secondary text-sm mt-1">
            andre.silva@example.com
          </Text>
          <Pressable
            onPress={() => router.push("/profile/edit")}
            className="mt-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
          >
            <Text className="text-primary text-sm font-medium">
              Edit Profile
            </Text>
          </Pressable>
        </View>

        {/* Stats */}
        <SectionLabel>Stats</SectionLabel>
        <View className="flex-row gap-3">
          <StatCard value="24" label="Recordings" />
          <StatCard value="18.5h" label="Total Hours" />
          <StatCard value="156" label="Markers" />
        </View>

        {/* Your Plan */}
        <SectionLabel>Your Plan</SectionLabel>
        <View className="bg-card rounded-3xl border border-card-border p-6">
          <View className="flex-row">
            <View className="w-1.5 rounded-full bg-primary mr-4" />
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-white text-lg font-bold">Plus Plan</Text>
                <Pressable onPress={() => router.push("/profile/plans")}>
                  <Text className="text-primary text-sm font-semibold">
                    Manage
                  </Text>
                </Pressable>
              </View>
              <Text className="text-text-secondary text-sm mt-0.5">
                Monthly Billing
              </Text>
              <View className="mt-4">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-text-secondary text-xs">Usage</Text>
                  <Text className="text-text-secondary text-xs">
                    14 days remaining
                  </Text>
                </View>
                <View className="h-2 rounded-full bg-surface overflow-hidden">
                  <View className="h-full rounded-full bg-primary w-[65%]" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <SectionLabel>Quick Actions</SectionLabel>
        <View className="bg-card rounded-3xl border border-card-border overflow-hidden">
          <QuickAction
            icon={BarChart3}
            iconBg="#6366F120"
            iconColor="#818CF8"
            label="Recording Analytics"
          />
          <QuickAction
            icon={LayoutTemplate}
            iconBg="#7C3AED20"
            iconColor="#A78BFA"
            label="Content Templates"
          />
          <QuickAction
            icon={Download}
            iconBg="#10B98120"
            iconColor="#34D399"
            label="Export History"
          />
          <QuickAction
            icon={Link2}
            iconBg="#3B82F620"
            iconColor="#60A5FA"
            label="Connected Accounts"
          />
          <QuickAction
            icon={Star}
            iconBg="#F59E0B20"
            iconColor="#FBBF24"
            label="Rate LiveCapture"
          />
          <QuickAction
            icon={MessageSquare}
            iconBg="#F4364420"
            iconColor="#FB7185"
            label="Send Feedback"
            isLast
          />
        </View>

        {/* Bottom spacer */}
        <View className="h-4" />
      </ScrollView>
    </SafeAreaView>
  );
}
