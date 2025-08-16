import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Text } from "react-native";
export default function WorkoutDayScreen() {
  const { id } = useLocalSearchParams();

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

  return (
    <View className="flex flex-col w-full h-full justify-center items-center gap-5 bg-[#1D2D44] ">
      <Text className="text-3xl text-white font-bold">
        {workoutDayInfo?.title}
      </Text>
    </View>
  );
}
