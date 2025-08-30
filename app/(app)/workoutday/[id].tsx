import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
export default function WorkoutDayScreen() {
  const { id } = useLocalSearchParams();
  const [exercises, setExercises] = useState<any[] | null>();
  const [showAddExercise, setShowAddExercise] = useState<boolean>(false);
  const [exerciseName, setExerciseName] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<number>();
  type WorkoutDay = {
    id: number;
    title: string;
    createdAt?: string;
    userId: number;
  };
  const [workoutDayInfo, setWorkoutDayInfo] = useState<WorkoutDay | null>();
  const baseUrl = "https://fittrackbackend-production-a141.up.railway.app/";
  const router = useRouter();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [currentSet, setCurrentSet] = useState<number>();
  const [currentReps, setCurrentReps] = useState<number>();
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
        baseUrl + `workoutday/${id}/exercise`,
        { title: exerciseName },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchExercises();
      toggleAddExercise();
    } catch (err) {
      console.log(err);
    }
  };
  function toggleAddExercise() {
    setShowAddExercise(!showAddExercise);
  }
  function handleExercisePress(itemId: number) {
    console.log(itemId);
    setSelectedItemId(itemId);
  }
  const renderItem = ({ item }: { item: any }) => {
    if (item.id !== selectedItemId) {
      return (
        <TouchableOpacity onPress={() => handleExercisePress(item.id)}>
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
    } else {
      return (
        <TouchableOpacity onPress={() => handleExercisePress(item.id)}>
          <View className="w-full">
            <View className="border rounded-3xl border-black p-5 bg-white">
              <Text className="text-lg">{item.title}</Text>
              <Text className="text-gray-500 text-sm pt-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <Text>Insert your sets below</Text>
              <View className="flex flex-row w-full mt-5">
                <Text className="p-3 pl-0">Weight :</Text>
                <TextInput
                  onChangeText={(text) => setCurrentWeight(Number(text))}
                  placeholder="lbs"
                  className="border border-black text-gray-500"
                />
                <Text className="p-3">Set #:</Text>
                <TextInput
                  onChangeText={(text) => setCurrentSet(Number(text))}
                  placeholder="ex 1"
                  className="border border-black text-gray-500"
                />
                <Text className="p-3"># of reps:</Text>
                <TextInput
                  onChangeText={(text) => setCurrentReps(Number(text))}
                  placeholder="ex 8"
                  className="border border-black text-gray-500"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View className="flex flex-col w-full h-full justify-center items-center gap-5 bg-[#1D2D44] ">
      <Text className="text-3xl text-white font-bold">
        {workoutDayInfo?.title}
      </Text>
      <View className="border rounded-3xl w-[80%] p-5 flex flex-row justify-around items-center bg-[#3E5C76]">
        <View className="flex flex-col gap-5 mr-[20px] border-r-black">
          <Text className="text-white text-xl"># of exercises</Text>
          <Text className="text-white text-md">{exercises?.length}</Text>
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
          <View className="w-[80%] h-[30%] bg-[#F0EBD8] border rounded-3xl flex flex-col justify-evenly items-center">
            <Text className="text-3xl font-semibold ">Add an Exercise</Text>
            <TextInput
              className="border rounded-xl w-[80%] "
              placeholder="Enter exercise title"
              onChangeText={setExerciseName}
            ></TextInput>
            <View className="flex flex-row justify-center items-center gap-10 w-full">
              <TouchableOpacity
                className="bg-[#0D1321] w-[35%] rounded-xl border p-3 border-black"
                onPress={() => toggleAddExercise()}
              >
                <Text className="text-[#F0EBD8] text-lg text-center ">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#748CAB] w-[35%] rounded-xl p-3 border border-black"
                onPress={() => attemptAddExercise()}
              >
                <Text className="text-[#F0EBD8] text-lg text-center ">
                  Create
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="grow-0 w-[80%] h-[40%] "
        contentContainerClassName="gap-3 "
      />
    </View>
  );
}
