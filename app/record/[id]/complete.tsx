import { View, Text, ScrollView, Pressable, TextInput, Switch } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Check,
  Sparkles,
  FileText,
  BookOpen,
  Video,
  Quote,
  Church,
  GraduationCap,
  Users,
  Zap,
} from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeInView } from "@/components/animated/FadeInView";
import { useLibraryStore } from "@/stores/libraryStore";
import { colors } from "@/theme";
import { formatDuration } from "@/utils/formatDuration";
import type { TemplateType } from "@/types/recording";

const TEMPLATES = [
  { id: "sermon" as TemplateType, label: "Sermon", icon: Church },
  { id: "lecture" as TemplateType, label: "Lecture", icon: GraduationCap },
  { id: "conference" as TemplateType, label: "Conference", icon: Users },
  { id: "general" as TemplateType, label: "Quick Note", icon: Zap },
] as const;

const OUTPUTS = [
  { id: "summary", label: "Summary & Key Points", desc: "Condensed overview with bullets", icon: FileText, color: "#3B82F6" },
  { id: "study", label: "Study Guide", desc: "Questions & discussion topics", icon: BookOpen, color: "#22C55E" },
  { id: "clips", label: "Social Media Clips", desc: "Stories, Reels, Shorts ready", icon: Video, color: "#8B5CF6" },
  { id: "quotes", label: "Quote Cards", desc: "Shareable image posts", icon: Quote, color: "#F59E0B" },
] as const;

export default function RecordingCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const recording = useLibraryStore((s) => s.getRecording(id));
  const updateRecording = useLibraryStore((s) => s.updateRecording);

  const [title, setTitle] = useState(recording?.title ?? "");
  const [speaker, setSpeaker] = useState(recording?.speakerName ?? "");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(
    recording?.template ?? "general",
  );
  const [outputs, setOutputs] = useState<Record<string, boolean>>({
    summary: true,
    study: true,
    clips: true,
    quotes: true,
  });

  const handleProcess = () => {
    updateRecording(id, {
      title: title || "Untitled Recording",
      speakerName: speaker || undefined,
      template: selectedTemplate,
    });
    router.push(`/record/${id}/processing`);
  };

  const handleSaveDraft = () => {
    updateRecording(id, {
      title: title || "Untitled Recording",
      speakerName: speaker || undefined,
      template: selectedTemplate,
    });
    router.replace("/(tabs)/library");
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <BackButton />
        <View className="flex-1 flex-row items-center justify-center gap-2 -ml-10">
          <Check size={18} color={colors.success} />
          <Text className="text-white text-base font-bold tracking-tight">
            Recording Complete
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Recording Details */}
        <FadeInView delay={0}>
          <View className="bg-card rounded-xl border border-card-border p-5 mb-6">
            <TextInput
              className="text-white text-xl font-bold mb-2"
              value={title}
              onChangeText={setTitle}
              placeholder="Recording title"
              placeholderTextColor={colors.textSecondary}
            />
            <TextInput
              className="text-text-secondary text-base font-medium mb-4"
              value={speaker}
              onChangeText={setSpeaker}
              placeholder="Speaker name"
              placeholderTextColor={colors.textSecondary}
            />

            {/* Stats */}
            <View className="flex-row flex-wrap gap-4 mb-4">
              <Text className="text-text-secondary text-xs font-medium">
                {formatDuration(recording?.duration ?? 0)}
              </Text>
              <Text className="text-text-secondary text-xs font-medium">
                {recording?.markers.length ?? 0} Markers
              </Text>
              <Text className="text-text-secondary text-xs font-medium">
                {recording?.photos.length ?? 0} Photos
              </Text>
              <Text className="text-text-secondary text-xs font-medium">
                {recording?.videos.length ?? 0} Videos
              </Text>
            </View>

            {/* Timeline bar */}
            <View className="h-1 rounded-full bg-card-border overflow-hidden">
              <View className="h-full rounded-full bg-primary/40 w-full" />
            </View>
          </View>
        </FadeInView>

        {/* Templates */}
        <FadeInView delay={80}>
          <SectionLabel className="mb-3 ml-1">Select Template</SectionLabel>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: -20 }}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingBottom: 8 }}
            className="mb-6"
          >
            {TEMPLATES.map((t) => {
              const active = selectedTemplate === t.id;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => setSelectedTemplate(t.id)}
                  className={`w-32 h-24 rounded-xl items-center justify-center gap-2 ${
                    active
                      ? "border-2 border-primary bg-primary/5"
                      : "border border-card-border bg-card opacity-70"
                  }`}
                  style={active ? {
                    shadowColor: "#3B82F6",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 15,
                  } : undefined}
                >
                  <t.icon
                    size={28}
                    color={active ? colors.primary : colors.textSecondary}
                  />
                  <Text className={`text-sm font-semibold ${
                    active ? "text-primary" : "text-text-secondary"
                  }`}>
                    {t.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </FadeInView>

        {/* Content Outputs */}
        <FadeInView delay={160}>
          <SectionLabel className="mb-3 ml-1">Content Outputs</SectionLabel>
          <View className="gap-3">
            {OUTPUTS.map((output) => (
              <View
                key={output.id}
                className="flex-row items-center justify-between p-4 rounded-xl bg-card border border-card-border"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <View
                    className="w-10 h-10 rounded-lg items-center justify-center"
                    style={{ backgroundColor: output.color + "15" }}
                  >
                    <output.icon size={20} color={output.color} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-sm font-medium">
                      {output.label}
                    </Text>
                    <Text className="text-text-secondary text-xs mt-0.5">
                      {output.desc}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={outputs[output.id]}
                  onValueChange={(v) =>
                    setOutputs((prev) => ({ ...prev, [output.id]: v }))
                  }
                  trackColor={{ false: "#374151", true: colors.primary }}
                  thumbColor="white"
                />
              </View>
            ))}
          </View>
        </FadeInView>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 px-5 pt-6 bg-background/90" style={{ paddingBottom: Math.max(insets.bottom, 12) + 16 }}>
        <Pressable
          onPress={handleProcess}
          className="h-14 rounded-2xl bg-primary flex-row items-center justify-center gap-2"
          style={{
            shadowColor: "#3B82F6",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 8,
          }}
        >
          <Sparkles size={20} color="white" />
          <Text className="text-white text-lg font-bold">Process with AI</Text>
        </Pressable>
        <Pressable onPress={handleSaveDraft} className="items-center mt-3 py-2">
          <Text className="text-text-secondary text-sm font-medium">
            Save draft for later
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
