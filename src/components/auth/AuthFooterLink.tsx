import { Text, Pressable } from "react-native";

interface AuthFooterLinkProps {
  message: string;
  linkText: string;
  onPress?: () => void;
}

export function AuthFooterLink({ message, linkText, onPress }: AuthFooterLinkProps) {
  return (
    <Pressable onPress={onPress} className="items-center">
      <Text className="text-text-secondary text-sm">
        {message}{" "}
        <Text className="text-primary font-medium">{linkText}</Text>
      </Text>
    </Pressable>
  );
}
