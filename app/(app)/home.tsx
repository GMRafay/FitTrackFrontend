import { useAuthState } from "@/utils/authState";
import { Button, Text, TextInput, View } from "react-native";
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
      const response = await axios.get(baseUrl + "/workoutday", {
        headers: { Authorization: `bearer ${access_token}` },
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
      await axios.post(baseUrl + "/workoutday", {
        headers: { Authorization: `bearer ${jwtToken}` },
      });
      fetchWorkoutDays();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex flex-col w-full h-full justify-center items-center">
      <Text>
        {stringer} You have reached the home page welcome {user?.email}
      </Text>
      {workoutDays?.length ? (
        <Text> you have workoutdays </Text>
      ) : (
        <Button title="CreateWorkoutDay " onPress={toggleCreate} />
      )}
      {showCreate && (
        <View>
          <TextInput placeholder="enter workoutday title" />
          <Button title="create" onPress={createWorkoutday} />
        </View>
      )}
    </View>
  );
}
