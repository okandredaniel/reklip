import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  X,
  FileText,
  Image,
  Share2,
  Wifi,
  MessageSquare,
  Mail,
  Phone,
  MoreHorizontal,
} from "lucide-react-native";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { colors } from "@/theme";

const FORMATS = [
  { id: "pdf", label: "PDF", icon: FileText, active: true },
  { id: "text", label: "Text", icon: FileText, active: false },
  { id: "md", label: "Markdown", icon: FileText, active: false },
  { id: "image", label: "Image", icon: Image, active: false },
] as const;

const SHARE_TARGETS = [
  { label: "AirDrop", icon: Wifi, color: undefined, bg: "bg-white/5" },
  { label: "Messages", icon: MessageSquare, color: "#34C759", bg: undefined },
  { label: "Mail", icon: Mail, color: "#3B82F6", bg: undefined },
  { label: "WhatsApp", icon: Phone, color: "#25D366", bg: undefined },
  { label: "More", icon: MoreHorizontal, color: undefined, bg: "bg-white/5" },
] as const;

export default function ShareExportScreen() {
  const router = useRouter();
  const [activeFormat, setActiveFormat] = useState("pdf");
  const [includes, setIncludes] = useState({
    summary: true,
    studyGuide: false,
    keyTerms: true,
  });

  return (
    <View className="flex-1 bg-black/50 justify-end">
      <View className="bg-card rounded-t-3xl border-t border-white/5">
        {/* Drag handle */}
        <View className="items-center pt-2 pb-4">
          <View className="w-12 h-1.5 rounded-full bg-white/20" />
        </View>

        {/* Header */}
        <View className="flex-row items-center justify-between px-6 mb-6">
          <Text className="text-white text-xl font-bold tracking-tight">
            Share Content
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="w-8 h-8 rounded-full bg-white/5 items-center justify-center"
          >
            <X size={18} color="#9CA3AF" />
          </Pressable>
        </View>

        <ScrollView className="px-6" contentContainerStyle={{ gap: 24, paddingBottom: 8 }}>
          {/* Export Format */}
          <View>
            <SectionLabel className="mb-3">Export Format</SectionLabel>
            <View className="flex-row gap-3">
              {FORMATS.map((f) => (
                <Pressable
                  key={f.id}
                  onPress={() => setActiveFormat(f.id)}
                  className={`flex-row items-center gap-2 px-5 py-2.5 rounded-full ${
                    activeFormat === f.id ? "bg-primary" : "bg-white/5"
                  }`}
                >
                  <f.icon size={18} color={activeFormat === f.id ? "white" : "#D1D5DB"} />
                  <Text className={`text-sm font-medium ${
                    activeFormat === f.id ? "text-white" : "text-white/70"
                  }`}>
                    {f.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Share To */}
          <View>
            <SectionLabel className="mb-3">Share To</SectionLabel>
            <View className="flex-row justify-between">
              {SHARE_TARGETS.map((t) => (
                <Pressable key={t.label} className="items-center gap-2">
                  <View
                    className={`w-14 h-14 rounded-full items-center justify-center ${t.bg ?? ""}`}
                    style={t.color ? { backgroundColor: t.color } : undefined}
                  >
                    <t.icon size={22} color="white" />
                  </View>
                  <Text className="text-text-secondary text-[10px] font-medium">
                    {t.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Include */}
          <View>
            <SectionLabel className="mb-1">Include</SectionLabel>
            {([
              { key: "summary" as const, label: "AI Summary", desc: "Generated overview of content" },
              { key: "studyGuide" as const, label: "Study Guide", desc: "Practice questions & notes" },
              { key: "keyTerms" as const, label: "Key Terms", desc: "Glossary of important words" },
            ]).map((item, i) => (
              <View
                key={item.key}
                className={`flex-row items-center justify-between py-4 ${
                  i < 2 ? "border-b border-white/5" : ""
                }`}
              >
                <View>
                  <Text className="text-white text-sm font-medium">{item.label}</Text>
                  <Text className="text-text-secondary text-xs">{item.desc}</Text>
                </View>
                <Switch
                  value={includes[item.key]}
                  onValueChange={(v) => setIncludes((p) => ({ ...p, [item.key]: v }))}
                  trackColor={{ false: "#374151", true: colors.primary }}
                  thumbColor="white"
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <SafeAreaView edges={["bottom"]}>
          <View className="px-6 pt-4 pb-2 border-t border-white/5">
            <Pressable
              className="h-14 rounded-full bg-primary flex-row items-center justify-center gap-2"
              style={{
                shadowColor: "#1E3A8A",
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 6,
              }}
            >
              <Share2 size={18} color="white" />
              <Text className="text-white text-lg font-semibold">Share File</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
