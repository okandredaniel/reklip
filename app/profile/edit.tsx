import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Camera } from "lucide-react-native";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";
import { FadeInView } from "@/components/animated/FadeInView";
import { UserIcon, MailIcon } from "@/components/ui/icons";
import { colors } from "@/theme";

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState("André Silva");
  const [email, setEmail] = useState("andre.silva@example.com");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4 border-b border-white/5">
        <BackButton />
        <Text className="text-white text-xl font-bold ml-2">Edit Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6" contentContainerStyle={{ paddingTop: 24, gap: 20 }}>
        {/* Avatar */}
        <FadeInView delay={0} className="items-center mb-4">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-primary items-center justify-center">
              <Text className="text-white text-3xl font-bold">AS</Text>
            </View>
            <Pressable className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-surface border border-card-border items-center justify-center">
              <Camera size={16} color="white" />
            </Pressable>
          </View>
        </FadeInView>

        <FadeInView delay={80}>
          <Input
            label="Full name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
            icon={<UserIcon size={20} />}
          />
        </FadeInView>

        <FadeInView delay={140}>
          <Input
            label="Email address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={<MailIcon size={20} />}
          />
        </FadeInView>
      </ScrollView>

      <FadeInView delay={200} className="px-6 pb-6">
        <Button title="Save Changes" onPress={() => {}} />
      </FadeInView>
    </SafeAreaView>
  );
}
