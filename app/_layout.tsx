import { Stack } from "expo-router";
import {useAuthState} from '@/utils/authState'
import "../global.css";
export default function RootLayout() {
  const {isLoggedin} = useAuthState();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedin}>
      <Stack.Screen name="index"></Stack.Screen>
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedin}>
        <Stack.Screen name='login'></Stack.Screen>
      </Stack.Protected>
    </Stack>
  );
}
