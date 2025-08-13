import { useAuthState } from "@/utils/authState";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import * as SecureStore from "expo-secure-store";
export default function HomePage() {
  const { user, logout } = useAuthState();
  const stringer = JSON.stringify(user);
  const router = useRouter();
  const [workoutDays, setWorkoutDays] = useState<any[] | null>([]);
  const [showCreate, setShowCreate] = useState<boolean>();
  const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
  const [workoutDayTitle, SetWorkoutDayTitle] = useState<string>();
  const [jwtToken, setJwtToken] = useState<string | null>();

  useEffect(() => {
    if (!user) {
      logout();
      router.replace("/");
    }
  }, [logout, router, user]);
  const fetchWorkoutDays = useCallback(async () => {
    try {
      const access_token = await SecureStore.getItemAsync("access_token");
      setJwtToken(access_token);
      const response = await axios.get(baseUrl + "workoutday", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const data = response.data;
      if (!data) {
        setWorkoutDays(null);
      } else {
        setWorkoutDays(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchWorkoutDays();
  }, [fetchWorkoutDays]);

  function toggleCreate() {
    setShowCreate(!showCreate);
  }
  const createWorkoutday = async () => {
    try {
      await axios.post(
        baseUrl + "workoutday",
        { title: workoutDayTitle },
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        },
      );
      fetchWorkoutDays();
    } catch (error) {
      console.log(error);
      console.log(jwtToken);
      console.log(workoutDayTitle);
    }
  };
  const renderItem = ({ item }: { item: any }) => (
    <View className="border rounded-xl border-black p-5 m-5 w-[80%]">
      <Text>{item?.title}</Text>
    </View>
  );
  return (
    <View className="flex flex-col w-full h-full justify-center items-center gap-5 bg-[#1D2D44] ">
      <Text className="text-center text-white text-5xl">
        Welcome Back, {user?.email}
      </Text>
      {workoutDays?.length ? (
        <View className="border rounded-3xl w-[80%] p-5 flex flex-row justify-around items-center bg-[#3E5C76]">
          <View className="flex flex-col gap-5 mr-[20px]">
            <Text className="text-[#DBE2EF]"> # of workoutdays </Text>
            <Text className="text-white">{workoutDays.length}</Text>
          </View>
          <View className="flex flex-col gap-5 ml-[20px]">
            <Text className="text-[#DBE2EF]">Last workout</Text>
            <Text>{workoutDays.at(0)?.title}</Text>
          </View>
        </View>
      ) : null}
      <TouchableOpacity className="w-[80%] p-5 bg-[#748CAB] border rounded-3xl">
        <Text className=" text-center text-white text-xl">
          {!showCreate ? "🦾 Add a workout day" : "Hide"}
        </Text>
      </TouchableOpacity>
      {showCreate && (
        <View>
          <TextInput
            placeholder="enter workoutday title"
            onChangeText={SetWorkoutDayTitle}
          />
          <Button title="create" onPress={createWorkoutday} />
        </View>
      )}
      <FlatList
        data={workoutDays}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="grow-0 w-full h-[30%]"
        contentContainerClassName="grow-0 items-center justify-center"
      />
    </View>
  );
}
