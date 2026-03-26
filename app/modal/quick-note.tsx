import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Check, MapPin } from "lucide-react-native";
import { colors } from "@/theme";

export default function QuickNoteScreen() {
  const router = useRouter();
  const [note, setNote] = useState("");

  return (
    <View className="flex-1 bg-black/60">
      {/* Dimmed background recording context */}
      <View className="flex-1 items-center justify-center opacity-40">
        <View className="w-2 h-2 rounded-full bg-red-500 mb-2" />
        <Text className="text-white text-6xl font-thin font-mono">00:15:32</Text>
        <Text className="text-text-secondary text-sm mt-1">Recording</Text>
      </View>

      {/* Bottom Sheet */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="bg-card rounded-t-3xl border-t border-white/5">
          {/* Drag handle */}
          <View className="items-center pt-3 pb-4">
            <View className="w-12 h-1.5 rounded-full bg-white/20" />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-6 mb-4">
            <View className="flex-row items-center gap-2">
              <MapPin size={14} color="#EF4444" />
              <Text className="text-white/80 text-xs font-mono">00:15:32</Text>
            </View>
            <Text className="text-text-secondary text-xs uppercase tracking-wider">
              Quick Note
            </Text>
          </View>

          {/* Input */}
          <TextInput
            className="px-6 py-2 text-white text-lg leading-relaxed min-h-[100px]"
            placeholder="What's happening now?"
            placeholderTextColor={colors.textSecondary}
            value={note}
            onChangeText={setNote}
            multiline
            autoFocus
            textAlignVertical="top"
          />

          {/* Action bar */}
          <SafeAreaView edges={["bottom"]}>
            <View className="flex-row items-center justify-between px-4 py-3 border-t border-white/5">
              <Pressable onPress={() => router.back()} className="px-4 py-2">
                <Text className="text-text-secondary text-[15px] font-medium">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.back()}
                className="flex-row items-center gap-2 px-6 py-2 rounded-full bg-primary"
              >
                <Check size={16} color="white" />
                <Text className="text-white text-[15px] font-semibold">
                  Save Note
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
