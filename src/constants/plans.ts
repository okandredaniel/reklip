import { SubscriptionPlan } from "@/types/user";

export interface PlanConfig {
  plan: SubscriptionPlan;
  name: string;
  price: string;
  features: string[];
}

export const plans: PlanConfig[] = [
  {
    plan: "free",
    name: "Free",
    price: "$0",
    features: [
      "3 recordings per month",
      "Basic AI summaries",
      "Standard audio quality",
    ],
  },
  {
    plan: "plus",
    name: "Plus",
    price: "$9.99/mo",
    features: [
      "15 recordings per month",
      "Full AI insights & study guides",
      "HD audio quality",
      "Social media content",
    ],
  },
  {
    plan: "pro",
    name: "Pro",
    price: "$19.99/mo",
    features: [
      "Unlimited recordings",
      "Priority AI processing",
      "HD audio quality",
      "Social media content",
      "Collaborative sessions",
      "Export all formats",
    ],
  },
];
