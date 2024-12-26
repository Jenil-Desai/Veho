import "react-native-get-random-values";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { CreateTripContext } from "@/contexts/CreateTripContext"; // Import the context
import { useState } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });

  const [tripData, setTripData] = useState<CreateTripContext["tripData"]>({
    location: {
      name: "",
      cordinates: {
        lat: 0,
        lng: 0,
      },
    },
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </CreateTripContext.Provider>
  );
}
