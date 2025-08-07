import { useAuthState } from "@/utils/authState";
import { Stack } from "expo-router";
import "../global.css";
export default function RootLayout() {
  const { isLoggedIn } = useAuthState();

  if (isLoggedIn) {
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
