import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Zap, SwitchCamera, X } from "lucide-react-native";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { useRecordingStore } from "@/stores/recordingStore";
import * as Haptics from "expo-haptics";

export default function PhotoCaptureScreen() {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [taking, setTaking] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const elapsedMs = useRecordingStore((s) => s.elapsedMs);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const takePhoto = async () => {
    if (!cameraRef.current || taking) return;
    setTaking(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (photo?.uri) {
        useRecordingStore.getState().addPhoto(photo.uri);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
      router.back();
    } catch (e: any) {
      Alert.alert("Error", e.message);
      setTaking(false);
    }
  };

  if (!permission) return <View className="flex-1 bg-background" />;

  if (!permission.granted) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-6">
        <Text className="text-white text-lg font-bold mb-2">Camera Access Required</Text>
        <Text className="text-text-secondary text-sm text-center mb-6">
          Allow camera access to capture photos during recordings.
        </Text>
        <Pressable
          onPress={requestPermission}
          className="px-6 py-3 rounded-full bg-primary"
        >
          <Text className="text-white font-semibold">Grant Access</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} className="mt-4 py-2">
          <Text className="text-text-secondary">Cancel</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView edges={["top"]} className="z-10">
        <View className="flex-row items-center justify-between px-6 pt-2 pb-3">
          <LiveIndicator />
          <Text className="text-white text-xl font-bold font-mono tabular-nums">
            {formatTime(elapsedMs)}
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
          >
            <X size={20} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Camera */}
      <View className="flex-1 mx-4 rounded-3xl overflow-hidden">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          flash={flash}
        >
          {/* Grid overlay */}
          <View className="absolute inset-0">
            <View className="absolute left-[33%] top-0 bottom-0 w-px bg-white/10" />
            <View className="absolute left-[66%] top-0 bottom-0 w-px bg-white/10" />
            <View className="absolute top-[33%] left-0 right-0 h-px bg-white/10" />
            <View className="absolute top-[66%] left-0 right-0 h-px bg-white/10" />
          </View>

          {/* Label */}
          <View className="absolute bottom-4 self-center px-3 py-1.5 rounded-full bg-black/40">
            <Text className="text-white/80 text-[10px] font-semibold uppercase tracking-wider">
              Slide Capture
            </Text>
          </View>
        </CameraView>
      </View>

      <SafeAreaView edges={["bottom"]}>
        <View className="items-center py-6 gap-5">
          <View className="flex-row items-center gap-12">
            {/* Flash */}
            <Pressable
              onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
              className={`w-12 h-12 rounded-full items-center justify-center border border-white/10 ${
                flash === "on" ? "bg-yellow-500/30" : "bg-white/5"
              }`}
            >
              <Zap size={22} color={flash === "on" ? "#FBBF24" : "white"} />
            </Pressable>

            {/* Shutter */}
            <Pressable
              onPress={takePhoto}
              disabled={taking}
              className="w-[72px] h-[72px] rounded-full bg-white items-center justify-center border-2 border-black/10"
              style={{ opacity: taking ? 0.5 : 1 }}
            >
              <View className="w-[60px] h-[60px] rounded-full border-2 border-gray-300" />
            </Pressable>

            {/* Flip */}
            <Pressable
              onPress={() => setFacing((f) => (f === "back" ? "front" : "back"))}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center"
            >
              <SwitchCamera size={22} color="white" />
            </Pressable>
          </View>

          <Text className="text-text-secondary text-sm">
            Recording continues while you capture
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
