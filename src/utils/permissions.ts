import { Platform } from "react-native";

export type PermissionType = "microphone" | "camera" | "notifications";

export function getPermissionDescription(type: PermissionType): string {
  switch (type) {
    case "microphone":
      return "LiveCapture needs your microphone to record audio.";
    case "camera":
      return "LiveCapture needs your camera to capture photos and videos during recordings.";
    case "notifications":
      return Platform.select({
        ios: "Get notified when your recordings are processed and ready.",
        default:
          "Get notified when your recordings are processed. On Android, this also enables background recording.",
      });
  }
}
