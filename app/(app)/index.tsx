import { useAuthState } from "@/utils/authState";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isLoggedIn, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return isLoggedIn ? (
    <Redirect href="/(app)/home" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
