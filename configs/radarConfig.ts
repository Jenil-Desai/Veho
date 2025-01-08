import Radar from "react-native-radar";

export const radar = Radar.initialize(
  process.env.EXPO_PUBLIC_RADAR_PUBLISHABLE_KEY as string
);
