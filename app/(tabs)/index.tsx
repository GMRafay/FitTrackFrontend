import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
export default function Index() {
  const router = useRouter();
  return (
    <View>
      <Text> This is the new index</Text>
      <Button title=" buttoner" onPress={() => router.navigate("/homePage")} />
    </View>
  );
}
