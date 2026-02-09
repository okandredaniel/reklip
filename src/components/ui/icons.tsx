import Svg, { Path, Circle, Rect } from "react-native-svg";

const ICON_COLOR = "#7B8BA3";

interface IconProps {
  size?: number;
  color?: string;
}

export function MailIcon({ size = 20, color = ICON_COLOR }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={4} width={20} height={16} rx={3} stroke={color} strokeWidth={1.8} />
      <Path d="M2 7L12 13L22 7" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function LockIcon({ size = 20, color = ICON_COLOR }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={5} y={11} width={14} height={11} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M8 11V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V11" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function UserIcon({ size = 20, color = ICON_COLOR }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
      <Path d="M4 21C4 17.13 7.58 14 12 14C16.42 14 20 17.13 20 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function EyeIcon({ size = 20, color = ICON_COLOR }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 20, color = ICON_COLOR }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M17.94 17.94C16.23 19.24 14.18 20 12 20C5 20 1 12 1 12C2.24 9.68 3.97 7.65 6.06 6.06M9.9 4.24C10.59 4.08 11.29 4 12 4C19 4 23 12 23 12C22.39 13.13 21.66 14.18 20.83 15.11" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14.12 14.12C13.56 14.68 12.8 15 12 15C10.34 15 9 13.66 9 12C9 11.2 9.32 10.44 9.88 9.88" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1 1L23 23" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 16, color = "white" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function HelpIcon({ size = 20, color = "white" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.8} />
      <Path d="M9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9C15 10.31 14.17 11.42 13 11.83V13" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={12} cy={17} r={1} fill={color} />
    </Svg>
  );
}

export function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
      <Path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.69 5.84 14.09H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <Path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.09Z" fill="#FBBC05" />
      <Path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.06L5.84 9.91C6.72 7.31 9.13 5.38 12 5.38Z" fill="#EA4335" />
    </Svg>
  );
}

export function ArrowRightIcon({ size = 20, color = "white" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ArrowLeftIcon({ size = 20, color = "white" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function MicIcon({ size = 20, color = "#3B82F6" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x={9} y={2} width={6} height={12} rx={3} stroke={color} strokeWidth={1.8} />
      <Path d="M5 10V11C5 14.87 8.13 18 12 18C15.87 18 19 14.87 19 11V10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M12 18V22M8 22H16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function AppleIcon({ size = 20, color = "white" }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M17.05 20.28C15.98 21.36 14.82 21.17 13.7 20.68C12.51 20.18 11.43 20.15 10.18 20.68C8.6 21.36 7.76 21.17 6.82 20.28C1.39 14.65 2.16 5.96 8.43 5.64C9.91 5.72 10.95 6.44 11.83 6.5C13.12 6.24 14.36 5.5 15.74 5.61C17.39 5.75 18.63 6.42 19.44 7.63C15.97 9.7 16.82 14.27 20 15.66C19.38 17.31 18.57 18.94 17.05 20.29V20.28ZM11.72 5.57C11.55 3.37 13.32 1.56 15.39 1.38C15.69 3.92 13.09 5.84 11.72 5.57Z" fill={color} />
    </Svg>
  );
}
