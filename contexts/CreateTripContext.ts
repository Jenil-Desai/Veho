import { TravelerOption } from "@/components/selectTraveler/selectTravelerOptions";
import moment from "moment";
import { createContext } from "react";

interface TripData {
  location: {
    name: string;
    cordinates: {
      lat: number;
      lng: number;
    };
  };
  travelerCount: TravelerOption;
  dates: {
    startDate: moment.Moment;
    endDate: moment.Moment;
    totalNoOfDays: number;
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
  },
  setTripData: () => {},
});
