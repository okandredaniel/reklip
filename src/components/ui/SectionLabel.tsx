import { Text } from "react-native";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <Text
      className={`text-text-secondary text-xs font-semibold uppercase tracking-widest ${className}`}
    >
      {children}
    </Text>
  );
}
