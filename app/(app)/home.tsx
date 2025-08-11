import { useAuthState } from "@/utils/authState";
import { Text } from "react-native";

export default function HomePage() {
  const { user } = useAuthState();
  const stringer = JSON.stringify(user);
  return (
    <Text>
      {stringer} You have reached the home page welcome {user?.email}
    </Text>
  );
}
