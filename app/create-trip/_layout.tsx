import { CreateTripContext } from "@/contexts/CreateTripContext";
import { Slot, Stack } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { ScreenStackHeaderSearchBarView } from "react-native-screens";

export default function CreateTripLayout() {
  const [tripData, setTripData] = useState<CreateTripContext["tripData"]>({
    location: {
      name: "",
      cordinates: {
        lat: 0,
        lng: 0,
      },
      bbox: [],
    },
    travelerCount: {
      id: "",
      title: "",
      description: "",
      icon: "",
      people: "",
    },
    dates: {
      startDate: moment(new Date()),
      endDate: moment(new Date()),
      totalNoOfDays: 0,
    },
    budgetOption: {
      id: "",
      title: "",
      description: "",
      icon: "",
    },
  });

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerBackTitle: "Back",
        }}
      />
    </CreateTripContext.Provider>
  );
}
