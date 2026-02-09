import { WithSpringConfig } from "react-native-reanimated";

export const SPRING: Record<string, WithSpringConfig> = {
  default: { damping: 20, stiffness: 300 },
  gentle: { damping: 24, stiffness: 200 },
  snappy: { damping: 22, stiffness: 400 },
};

export const SCALE = {
  press: 0.98,
} as const;

export const STAGGER_DELAY = 40;

export const ENTRANCE_OFFSET = 8;
