import { CreateTripContext } from "@/contexts/CreateTripContext";
import { Slot } from "expo-router";
import { useState } from "react";

export default function CreateTripLayout() {
  const [tripData, setTripData] = useState<CreateTripContext["tripData"]>({
    location: {
      name: "",
      cordinates: {
        lat: 0,
        lng: 0,
      },
    },
    travelerCount: {
      id: "",
      title: "",
      description: "",
      icon: "",
      people: "",
    },
  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Slot
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerBackTitle: "Back",
        }}
      />
    </CreateTripContext.Provider>
  );
}
