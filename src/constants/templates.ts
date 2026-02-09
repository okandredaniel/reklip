import { TemplateType } from "@/types/recording";

export interface TemplateConfig {
  type: TemplateType;
  label: string;
  description: string;
}

export const templates: TemplateConfig[] = [
  { type: "sermon", label: "Sermon", description: "Church sermons and messages" },
  { type: "lecture", label: "Lecture", description: "Academic lectures and classes" },
  { type: "conference", label: "Conference", description: "Conference talks and panels" },
  { type: "general", label: "General", description: "Meetings, notes, and other recordings" },
];
