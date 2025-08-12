import { useAuthState } from "@/utils/authState";
import { Text } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
export default function HomePage() {
  const { user, logout } = useAuthState();
  const stringer = JSON.stringify(user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      logout();
      router.replace("/");
    }
  });

  return (
    <Text>
      {stringer} You have reached the home page welcome {user?.email}
    </Text>
  );
}
