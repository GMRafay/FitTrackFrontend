import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
export default function WorkoutDayScreen() {
  const { id } = useLocalSearchParams();
  const [exercise, setExercises] = useState<any[] | null>();
  const [showAddExercise, setShowAddExercise] = useState<boolean>(false);
  const [exerciseName, setExerciseName] = useState<string>("");
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

  const attemptAddExercise = async () => {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      await axios.post(
        baseUrl + "workoutday/${id}/exercise",
        { title: exerciseName },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchExercises();
    } catch (err) {
      console.log(err);
    }
  };
  function toggleAddExercise() {
    setShowAddExercise(!showAddExercise);
  }
  return (
    <View className="flex flex-col w-full h-full justify-center items-center gap-5 bg-[#1D2D44] ">
      <Text className="text-3xl text-white font-bold">
        {workoutDayInfo?.title}
      </Text>
      <View className="border rounded-3xl w-[80%] p-5 flex flex-row justify-around items-center bg-[#3E5C76]">
        <View className="flex flex-col gap-5 mr-[20px] border-r-black">
          <Text className="text-white text-xl"># of exercises</Text>
          <Text className="text-white text-md">{exercise?.length}</Text>
        </View>
        <View className=" w-px h-12 bg-white/30"></View>
        <View className="flex flex-col gap-5 ml-[20px]">
          <Text className="text-white text-lg">last exercise</Text>
          <Text className="text-white text-md">placeholder exercise</Text>
        </View>
      </View>
      <TouchableOpacity
        className="w-[80%]   bg-[#748CAB] border rounded-3xl p-5"
        onPress={() => toggleAddExercise()}
      >
        <View>
          <Text className="text-white text-center text-xl">Add Exercise</Text>
        </View>
      </TouchableOpacity>
      <Modal
        onRequestClose={() => toggleAddExercise()}
        visible={showAddExercise}
        animationType="slide"
      >
        <View className="bg-[#1D2D44] flex-1 flex-col justify-center items-center">
          <View className="w-[80%] h-[30%] bg-white border rounded-3xl flex flex-col items-center justify-center ">
            <Text>Enter Exercise Name</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}
