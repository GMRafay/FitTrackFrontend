import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import axios from "axios";
import { useAuthState } from "@/utils/authState";
export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { login } = useAuthState();
  const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
  const loginAttempt = async () => {
    try {
      const response = await axios.post(baseUrl + "auth/signin", {
        email: email,
        password: password,
      });
      const access_token = response.data.access_token;
      const result = JSON.stringify(response.data);
      console.log(result);

      await login(access_token, response.data);

      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex flex-col items-center justify-center h-full -full">
      <Text>Login</Text>
      <Button title="Login" onPress={loginAttempt} />
      <LinearGradient
        colors={["#3F72AF", "#FFFFFF"]} // indigo to hite
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
        <Link href="/create-account" push asChild>
          <Button title="Create Account" />
        </Link>
      </LinearGradient>
    </View>
  );
}
