import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function CreateAccountPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const router = useRouter();
  return (
    <View className="flex flex-col items-center justify-center h-full w-full shadow-xl ">
      <LinearGradient
        colors={["#3F72AF", "#FFFFFF"]} // indigo to white
        className="rounded-2xl w-[70%] h-[50%] flex flex-col items-center justify-center gap-5 border border-black overflow-hidden"
      >
        <Text className="text-center text-xl text-[#F9F7F7]">
          Create an account
        </Text>
        <Text className="text-center text-[#F9F7F7]">
          And start a better fitness journey today!
        </Text>
        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            className="text-start text-black w-full bg-transparent"
            placeholder="First Name"
            onChangeText={setFirstName}
          />
        </View>
        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            className="text-start  text-black bg-transparen w-full"
            placeholder="LastName"
            onChangeText={setLastName}
          />
        </View>

        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            className="text-start text-black w-full bg-transparent"
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>
        <View className="flex flex-row w-[80%] border border-black rounded-2xl bg-[#DBE2EF]">
          <TextInput
            className="w-full"
            placeholder="Password"
            onChangeText={setPassword}
          />
        </View>
        <Text>already have an account?</Text>
        <Button title="login" onPress={() => router.replace("/login")}></Button>
      </LinearGradient>
    </View>
  );
}
