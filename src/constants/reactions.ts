import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  AlertTriangle,
  Smile,
} from "lucide-react-native";
import type { ReactionType } from "@/types/recording";

export interface ReactionConfig {
  type: ReactionType;
  label: string;
  description: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
}

export const REACTIONS: ReactionConfig[] = [
  { type: "love", label: "Love", description: "Loved this moment", icon: Heart, color: "#EF4444" },
  { type: "agree", label: "Agree", description: "Agreed with statement", icon: ThumbsUp, color: "#3B82F6" },
  { type: "disagree", label: "Disagree", description: "Disagreed", icon: ThumbsDown, color: "#F97316" },
  { type: "question", label: "Ask", description: "Question raised", icon: HelpCircle, color: "#8B5CF6" },
  { type: "important", label: "Impt", description: "Marked as important", icon: AlertTriangle, color: "#F59E0B" },
  { type: "funny", label: "Funny", description: "Found this funny", icon: Smile, color: "#22C55E" },
];

// Lookup maps for quick access by type
export const REACTION_MAP = Object.fromEntries(
  REACTIONS.map((r) => [r.type, r]),
) as Record<ReactionType, ReactionConfig>;
