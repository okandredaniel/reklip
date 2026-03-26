import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Trash2 } from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { SettingToggle, SettingNav } from "@/components/settings/SettingRow";
import { colors } from "@/theme";

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    backgroundRecording: true,
    autoSave: true,
    countdown: false,
    hapticFeedback: true,
    autoProcess: false,
    generateSocial: true,
    autoDelete: false,
    pushNotifications: true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4 border-b border-white/5">
        <BackButton />
        <Text className="text-white text-xl font-bold ml-2">Settings</Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, gap: 24 }}>
        {/* Recording */}
        <View>
          <SectionLabel className="mb-3 ml-2">Recording</SectionLabel>
          <View className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
            <SettingNav label="Audio Quality" value="High" />
            <SettingToggle label="Background Recording" value={settings.backgroundRecording} onValueChange={() => toggle("backgroundRecording")} />
            <SettingToggle label="Auto-save" value={settings.autoSave} onValueChange={() => toggle("autoSave")} />
            <SettingToggle label="Countdown" value={settings.countdown} onValueChange={() => toggle("countdown")} />
            <SettingToggle label="Haptic Feedback" value={settings.hapticFeedback} onValueChange={() => toggle("hapticFeedback")} isLast />
          </View>
        </View>

        {/* AI Processing */}
        <View>
          <SectionLabel className="mb-3 ml-2">AI Processing</SectionLabel>
          <View className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
            <SettingToggle label="Auto-process Recordings" description="Start AI analysis immediately after capture" value={settings.autoProcess} onValueChange={() => toggle("autoProcess")} />
            <SettingNav label="Default Template" value="Meeting Notes" />
            <SettingNav label="Language" value="English (US)" />
            <SettingToggle label="Generate Social Content" value={settings.generateSocial} onValueChange={() => toggle("generateSocial")} isLast />
          </View>
        </View>

        {/* Storage */}
        <View>
          <SectionLabel className="mb-3 ml-2">Storage</SectionLabel>
          <View className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
            {/* Storage meter */}
            <View className="px-4 pt-4 pb-2">
              <View className="flex-row justify-between mb-2">
                <Text className="text-white text-sm font-medium">
                  Local Storage
                </Text>
                <Text className="text-text-secondary text-sm">48%</Text>
              </View>
              <View className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <View className="h-full rounded-full bg-primary w-[48%]" />
              </View>
              <View className="flex-row justify-between mt-2">
                <Text className="text-text-secondary text-xs">2.4 GB used</Text>
                <Text className="text-text-secondary text-xs">5 GB total</Text>
              </View>
            </View>
            <SettingToggle label="Auto-delete" description="Delete local files after 30 days" value={settings.autoDelete} onValueChange={() => toggle("autoDelete")} />
            <SettingNav label="Download Quality" value="Original" />
            <Pressable className="flex-row items-center justify-between py-4 px-4">
              <Text className="text-red-400 text-sm font-medium">
                Clear Cache
              </Text>
              <Trash2 size={18} color="#F87171" />
            </Pressable>
          </View>
        </View>

        {/* Notifications */}
        <View>
          <SectionLabel className="mb-3 ml-2">Notifications</SectionLabel>
          <View className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
            <SettingToggle label="Push Notifications" value={settings.pushNotifications} onValueChange={() => toggle("pushNotifications")} isLast />
          </View>
        </View>

        {/* About */}
        <View>
          <SectionLabel className="mb-3 ml-2">About</SectionLabel>
          <View className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
            <SettingNav label="Privacy Policy" value="" />
            <SettingNav label="Terms of Service" value="" isLast />
          </View>
        </View>

        {/* Sign Out */}
        <Pressable className="bg-surface rounded-2xl border border-white/5 py-4 items-center">
          <Text className="text-red-500 text-base font-semibold">
            Sign Out
          </Text>
        </Pressable>

        <Text className="text-text-secondary text-xs font-medium text-center">
          LiveCapture v2.4.0 (Build 390)
        </Text>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
