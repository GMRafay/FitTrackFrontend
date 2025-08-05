import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  return (
    <View className="flex flex-col items-center justify-center h-full w-full">
      <Text>Login</Text>
      <LinearGradient
        colors={["#3F72AF", "#FFFFFF"]} // indigo to white
        className="rounded-2xl w-[70%] h-[50%] flex flex-col items-center justify-center gap-5 border border-black overflow-hidden"
      >
        <Text className="text-center text-xl text-[#F9F7F7]">
          Sign in with email
        </Text>
        <Text className="text-center text-[#F9F7F7]">
          Make your fitness journey real by tracking your progress.
        </Text>

        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            className="text-start text-black bg-transparent"
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput placeholder="Password" onChangeText={setPassword} />
        </View>
        <Text>Dont have an account?</Text>
        <Button
          title="Create Account"
          onPress={() => router.replace("/create-account")}
        ></Button>
      </LinearGradient>
    </View>
  );
}
