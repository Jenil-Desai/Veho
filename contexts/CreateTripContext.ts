import { createContext } from "react";

interface TripData {
  location: {
    name: string;
    cordinates: {
      lat: number;
      lng: number;
    };
  };
}

export interface CreateTripContext {
  tripData: TripData;
  setTripData: React.Dispatch<React.SetStateAction<TripData>>;
}

export const CreateTripContext = createContext<CreateTripContext>({
  tripData: {
    location: {
      name: "",
      cordinates: {
        lat: 0,
        lng: 0,
      },
    },
  },
  setTripData: () => {},
});
