import { useAuthState } from "@/utils/authState";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
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
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
  const [workoutDayTitle, SetWorkoutDayTitle] = useState<string>();
  const [jwtToken, setJwtToken] = useState<string | null>();
  const [exerciseTitle, setExerciseTitle] = useState<string>();

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
  function handleWorkoutDayPress(workoutDayId: number) {
    router.push({
      pathname: "/workoutday/[id]",
      params: { id: workoutDayId },
    });
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
      toggleCreate();
    } catch (error) {
      console.log(error);
      console.log(jwtToken);
      console.log(workoutDayTitle);
    }
  };
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleWorkoutDayPress(item.id)}>
      <View className="w-full">
        <View className="border rounded-3xl border-black p-5 bg-white">
          <Text className="text-lg">{item.title}</Text>
          <Text className="text-gray-500 text-sm pt-1">
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View className="flex flex-col w-full h-full justify-center items-center gap-5 bg-[#1D2D44] ">
      <Text className="text-center text-white text-5xl m-10">
        Welcome Back!
      </Text>
      {workoutDays?.length ? (
        <View className="border rounded-3xl w-[80%] p-5 flex flex-row justify-around items-center bg-[#3E5C76]">
          <View className="flex flex-col gap-5 mr-[20px] border-r-black">
            <Text className="text-[#DBE2EF]"> # of workouts </Text>
            <Text className="text-white text-3xl">{workoutDays.length}</Text>
          </View>
          <View className="w-px h-12 bg-white/30" />
          <View className="flex flex-col gap-5 ml-[20px]">
            <Text className="text-[#DBE2EF]">Last workout</Text>
            <Text className="text-white text-2xl overflow-clip">
              {workoutDays.at(0)?.title}
            </Text>
          </View>
        </View>
      ) : (
        <Text className="text-white mb-5 text-lg ">
          Add some workouts to begin your tracking journey!
        </Text>
      )}
      <TouchableOpacity
        className="w-[80%] p-5 bg-[#748CAB] border rounded-3xl"
        onPress={toggleCreate}
      >
        <Text className=" text-center text-white text-xl">
          {!showCreate ? "🦾 Add a workout day" : "Hide"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showCreate}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreate(false)}
      >
        <View className="flex-1 justify-center items-center  bg-[#1D2D44]">
          <View className="bg-[#F0EBD8] w-[80%] h-[30%] shadow-xl border border-black rounded-xl m-8 items-center justify-evenly">
            <Text className="text-3xl font-semibold ">Create workout day</Text>
            <TextInput
              placeholder="Enter Title"
              className="border rounded-xl  w-[80%]"
              onChangeText={SetWorkoutDayTitle}
            />
            <View className="flex flex-row justify-center gap-10 w-full">
              <TouchableOpacity
                className="border rounded-xl p-3  w-[35%]"
                onPress={() => setShowCreate(false)}
              >
                <Text className="text-center text-lg font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border p-3 rounded-xl  w-[35%] bg-[#748CAB]"
                onPress={createWorkoutday}
              >
                <Text className="text-center font-semibold text-lg">
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Text className="pl-[45px] text-2xl text-white self-start">
        Your workouts
      </Text>
      <FlatList
        data={workoutDays}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="grow-0 w-[80%] h-[40%] "
        contentContainerClassName="gap-3 "
      />
    </View>
  );
}
