import { ReactionType } from "@/types/recording";
import { colors } from "@/theme";

export interface ReactionConfig {
  type: ReactionType;
  label: string;
  icon: string;
  color: string;
}

export const reactions: ReactionConfig[] = [
  { type: "love", label: "Love", icon: "heart", color: colors.love },
  { type: "agree", label: "Agree", icon: "thumbs-up", color: colors.agree },
  { type: "disagree", label: "Disagree", icon: "thumbs-down", color: colors.disagree },
  { type: "question", label: "Question", icon: "help-circle", color: colors.question },
  { type: "important", label: "Important", icon: "star", color: colors.important },
  { type: "funny", label: "Funny", icon: "smile", color: colors.funny },
];
