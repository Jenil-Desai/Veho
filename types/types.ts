export interface GeoCoordinates {
  latitude: string;
  longitude: string;
}

export interface Activities {
  details: string;
  geo_coordinates: GeoCoordinates;
  image_url: string;
  place_name: string;
  note: string;
  time: string;
  travel_time: string;
  ticket_pricing: {
    approx_adult: string;
    approx_child: string;
  };
}

export interface DayPlan {
  activities: Activities[];
  day: number;
}

export interface Flight {
  approx_price: string;
  booking_url: string;
  destination: string;
  note: string;
  origin: string;
}

export interface Hotel {
  address: string;
  description: string;
  geo_coordinates: GeoCoordinates;
  hotel_name: string;
  image_url: string;
  note: string;
  price: string;
  rating: string;
}

export interface Transportation {
  from_airport: string;
  local: string;
}

export interface TripPlan {
  best_time_to_visit: string;
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  trip_name: string;
  day_plan: DayPlan[];
  flights: Flight[];
  hotels: Hotel[];
  transportation: Transportation;
}

export interface TravelerOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  people: string;
}

export interface BudgetOption {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TripData {
  location: {
    name: string;
    cordinates: {
      lat: number;
      lng: number;
    };
    bbox: number[];
  };
  travelerCount: TravelerOption;
  dates: {
    startDate: moment.Moment;
    endDate: moment.Moment;
    totalNoOfDays: number;
  };
  budgetOption: BudgetOption;
}

export interface Trip {
  docId: string;
  generatedOn: string;
  place_image: string;
  tripData: string | TripData;
  tripPlan: TripPlan;
  userEmail: string;
}
