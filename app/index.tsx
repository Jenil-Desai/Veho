import Login from "@/components/Login";
import { auth } from "@/configs/firebaseConfig";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/(tabs)/myTrip"} /> : <Login />}
    </View>
  );
}
