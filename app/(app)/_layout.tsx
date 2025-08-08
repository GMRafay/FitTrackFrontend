import { useAuthState } from "@/utils/authState";
import { Redirect, Stack } from "expo-router";
import { Text } from "react-native";
import "../../global.css";
export default function AppLayout() {
  const { isLoggedIn, isLoading } = useAuthState();

  if (isLoading) {
    return <Text>Loading .....</Text>;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }
  return <Stack></Stack>;
}
