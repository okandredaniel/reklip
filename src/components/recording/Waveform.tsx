import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect, useRef, memo } from "react";

const BAR_COUNT = 20;
const MAX_HEIGHT = 80;
const MIN_HEIGHT = 4;
const UPDATE_MS = 120;

function dbToAmplitude(db: number): number {
  // dB range is roughly -60 (silence) to 0 (max)
  const clamped = Math.max(-50, Math.min(0, db));
  return (clamped + 50) / 50;
}

const WaveformBar = memo(function WaveformBar({
  index,
  targetHeight,
  isPaused,
}: {
  index: number;
  targetHeight: number;
  isPaused: boolean;
}) {
  const height = useSharedValue(MIN_HEIGHT);

  useEffect(() => {
    const h = isPaused ? MIN_HEIGHT : targetHeight;
    height.value = withTiming(h, {
      duration: UPDATE_MS,
      easing: Easing.out(Easing.quad),
    });
  }, [targetHeight, isPaused, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: isPaused ? 0.25 : 0.35 + (height.value / MAX_HEIGHT) * 0.65,
  }));

  return (
    <Animated.View
      className="w-1.5 rounded-full bg-primary"
      style={animatedStyle}
    />
  );
});

interface WaveformProps {
  metering: number;
  isPaused: boolean;
}

export function Waveform({ metering, isPaused }: WaveformProps) {
  // Keep a rolling buffer of heights per bar to create natural variation
  const barHeights = useRef<number[]>(Array(BAR_COUNT).fill(MIN_HEIGHT));
  const prevAmplitude = useRef(0);

  const amplitude = dbToAmplitude(metering);

  // Smooth amplitude changes and generate per-bar heights
  const smoothed = prevAmplitude.current * 0.3 + amplitude * 0.7;
  prevAmplitude.current = smoothed;

  // Generate heights: center bars are taller, edges shorter, with random variation
  for (let i = 0; i < BAR_COUNT; i++) {
    const centeredness = 1 - Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2);
    const envelope = 0.3 + centeredness * 0.7;

    // Per-bar random factor that changes each frame
    const randomFactor = 0.5 + Math.random() * 0.5;

    const target = smoothed * envelope * randomFactor * MAX_HEIGHT;

    // Smooth each bar individually (keep 40% of previous, 60% of new)
    barHeights.current[i] = barHeights.current[i] * 0.4 + Math.max(MIN_HEIGHT, target) * 0.6;
  }

  return (
    <View className="items-end justify-center h-32 flex-row gap-[3px] px-6 my-4">
      {barHeights.current.map((h, i) => (
        <WaveformBar
          key={i}
          index={i}
          targetHeight={h}
          isPaused={isPaused}
        />
      ))}
    </View>
  );
}
