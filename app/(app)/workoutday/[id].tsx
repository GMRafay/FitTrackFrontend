import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Text } from "react-native";
export default function WorkoutDayScreen() {
  const { id } = useLocalSearchParams();
  const [exercise, setExercises] = useState<any[] | null>();
  type WorkoutDay = {
    id: number;
    title: string;
    createdAt?: string;
    userId: number;
  };
  const [workoutDayInfo, setWorkoutDayInfo] = useState<WorkoutDay | null>();
  const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
  useEffect(() => {
    if (!id) return;

    const fetchInfo = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        if (!token) throw new Error("You have no access token");
        const response = await axios.get(baseUrl + `workoutday/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setWorkoutDayInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfo();
  }, [id]);

  const fetchExercises = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("you have no access_token");
      const response = await axios.get(baseUrl + `workoutday/${id}/exercise`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setExercises(data);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  return (
    <View className="flex flex-col w-full h-full justify-center items-center gap-5 bg-[#1D2D44] ">
      <Text className="text-3xl text-white font-bold">
        {workoutDayInfo?.title}
      </Text>
      <View className="border rounded-3xl w-[80%] p-5 flex flex-row justify-around items-center bg-[#3E5C76]">
        <View className="flex flex-col gap-5 mr-[20px] border-r-black">
          <Text># of exercises</Text>
          <Text>{exercise?.length}</Text>
        </View>
        <View className=" w-px h-12 bg-white/30"></View>
        <View className="flex flex-col gap-5 ml-[20px]">
          <Text>last exercise</Text>
          <Text>placeholder exercise</Text>
        </View>
      </View>
    </View>
  );
}
