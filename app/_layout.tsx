import { useAuthState } from "@/utils/authState";
import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {
  const { isLoggedIn } = useAuthState();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index"></Stack.Screen>
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login"></Stack.Screen>
        <Stack.Screen name="create-account"></Stack.Screen>
      </Stack.Protected>
    </Stack>
  );
}
