import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Mic,
  Link2,
  Copy,
  MessageSquare,
  Mail,
  QrCode,
  Calendar,
  ChevronDown,
  Plus,
  ArrowRight,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { colors } from "@/theme";

export default function CreateSessionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [sessionName, setSessionName] = useState("Sunday Bible Study");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <BackButton />
        <Text className="flex-1 text-white text-lg font-bold tracking-tight text-center pr-10">
          Create Session
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 120, gap: 20 }}>
        {/* Hero */}
        <FadeInView delay={0} className="items-center mb-4">
          <View className="w-32 h-32 rounded-full bg-primary/10 border border-white/5 items-center justify-center mb-6">
            <View className="flex-row items-center">
              <Mic size={28} color={colors.primary} />
              <Mic size={28} color="rgba(255,255,255,0.6)" style={{ marginLeft: -8 }} />
            </View>
          </View>
          <Text className="text-white text-2xl font-bold text-center mb-2">
            Record Together
          </Text>
          <Text className="text-text-secondary text-sm text-center leading-relaxed max-w-[300px]">
            Create a shared session so everyone captures the same event from
            different angles.
          </Text>
        </FadeInView>

        {/* Form */}
        <FadeInView delay={100}>
          <Text className="text-text-secondary text-sm mb-2">Session Name</Text>
          <TextInput
            className="bg-surface rounded-2xl px-5 py-4 text-white text-base"
            value={sessionName}
            onChangeText={setSessionName}
            placeholder="e.g. Sunday Bible Study"
            placeholderTextColor={colors.textSecondary}
          />
        </FadeInView>

        <FadeInView delay={140}>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-text-secondary text-sm mb-2">Event Type</Text>
              <Pressable className="flex-row items-center justify-between bg-surface rounded-2xl px-5 py-4">
                <Text className="text-white text-base">Sermon</Text>
                <ChevronDown size={18} color={colors.textSecondary} />
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="text-text-secondary text-sm mb-2">Date & Time</Text>
              <Pressable className="flex-row items-center justify-between bg-surface rounded-2xl px-5 py-4">
                <Text className="text-white text-sm">Today, 10:00 AM</Text>
                <Calendar size={16} color={colors.textSecondary} />
              </Pressable>
            </View>
          </View>
        </FadeInView>

        <View className="h-px bg-white/5 my-2" />

        {/* Invite Participants */}
        <FadeInView delay={180}>
          <SectionLabel className="mb-3">Invite Participants</SectionLabel>

          <Pressable className="flex-row items-center justify-between bg-surface rounded-2xl border border-white/5 p-4 mb-4">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                <Link2 size={18} color={colors.primary} />
              </View>
              <View>
                <Text className="text-white text-sm font-medium">Share invite link</Text>
                <Text className="text-text-secondary text-xs">livecapture.app/j/8392...</Text>
              </View>
            </View>
            <Pressable className="w-8 h-8 rounded-full items-center justify-center">
              <Copy size={18} color="rgba(255,255,255,0.7)" />
            </Pressable>
          </Pressable>

          <View className="flex-row gap-4 mb-4 justify-center">
            {[
              { label: "WhatsApp", icon: MessageSquare, color: "#34D399" },
              { label: "Email", icon: Mail, color: "#60A5FA" },
              { label: "QR Code", icon: QrCode, color: "white" },
            ].map((t) => (
              <View key={t.label} className="items-center gap-2">
                <Pressable className="w-14 h-14 rounded-full bg-surface border border-card-border items-center justify-center">
                  <t.icon size={22} color={t.color} />
                </Pressable>
                <Text className="text-text-secondary text-[10px]">{t.label}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center bg-surface rounded-2xl px-4">
            <TextInput
              className="flex-1 py-4 text-white text-base"
              placeholder="Or enter emails..."
              placeholderTextColor={colors.textSecondary}
            />
            <Pressable className="w-10 h-10 rounded-xl bg-primary items-center justify-center">
              <Plus size={18} color="white" />
            </Pressable>
          </View>

          {/* Participant avatars */}
          <View className="flex-row items-center mt-4 gap-2">
            <View className="flex-row -space-x-3">
              {["bg-indigo-500", "bg-purple-500", "bg-pink-500"].map((bg, i) => (
                <View key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-background`} />
              ))}
              <View className="w-8 h-8 rounded-full bg-surface border-2 border-background items-center justify-center">
                <Text className="text-text-secondary text-[10px]">+2</Text>
              </View>
            </View>
            <Text className="text-text-secondary text-sm">invited</Text>
          </View>
        </FadeInView>
      </ScrollView>

      {/* Bottom */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pt-6 bg-background" style={{ paddingBottom: Math.max(insets.bottom, 12) + 16 }}>
        <Pressable
          onPress={() => router.push("/sessions/demo")}
          className="h-14 rounded-full bg-primary flex-row items-center justify-center gap-2"
          style={{
            shadowColor: colors.primary,
            shadowOpacity: 0.3,
            shadowRadius: 20,
            elevation: 8,
          }}
        >
          <Text className="text-white text-base font-bold">Start Session</Text>
          <ArrowRight size={18} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
