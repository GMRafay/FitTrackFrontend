import { useAuthState } from "@/utils/authState";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
export default function CreateAccountPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const [firstName, setFirstName] = useState<string>("");
  //   const [lastName, setLastName] = useState<string>("");
  const [data, setData] = useState("");
  const router = useRouter();
  const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
  const { login } = useAuthState();
  const attemptAccountCreation = async () => {
    try {
      const response = await axios.post(baseUrl + "auth/signup", {
        email: email,
        password: password,
      });
      const access_token = response.data.access_token;
      const result = JSON.stringify(response.data);
      setData(result);
      console.log(result);

      await login(access_token, response.data);

      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex flex-col items-center justify-center h-full w-full shadow-xl ">
      <LinearGradient
        colors={["#3F72AF", "#FFFFFF"]} // indigo to white
        className="rounded-2xl w-[70%] h-[50%] flex flex-col items-center justify-center gap-5 border border-black overflow-hidden"
      >
        <Button title="create" onPress={attemptAccountCreation}></Button>
        <Text className="text-center text-xl text-[#F9F7F7]">
          Create an account
        </Text>
        <Text className="text-center text-[#F9F7F7]">
          And start a better fitness journey today!
        </Text>
        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            className="text-start text-black w-full bg-transparent"
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            secureTextEntry={true}
            className="w-full password"
            placeholder="Password"
            onChangeText={setPassword}
          />
        </View>
        <Text>already have an account?</Text>
        <Button title="login" onPress={() => router.dismiss()}></Button>
      </LinearGradient>
    </View>
  );
}
