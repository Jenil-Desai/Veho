import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "@/Constant/Colors";
import moment from "moment";
import FlightDetailsBlock from "@/components/tripDetails/FlightDetailsBlock";
import HotelList from "@/components/tripDetails/HotelList";
import DayPlan from "@/components/tripDetails/DayPlan";
import { Trip, TripData } from "@/types/types";
import TransportationDetails from "@/components/tripDetails/TransportationDetails";

export default function TripDetails() {
  const { trip } = useLocalSearchParams<{ trip: string }>();
  const parsedTrip: Trip = JSON.parse(trip);
  const tripData: TripData = JSON.parse(parsedTrip.tripData as string);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: Platform.OS === "ios" ? parsedTrip.tripPlan.trip_name : "",
      headerBlurEffect: "regular",
      headerTransparent: true,
      headerBackTitle: "Back",
    });
  }, []);

  return (
    <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: parsedTrip.place_image }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.locationTxt}>{parsedTrip.tripPlan.trip_name}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateTxt}>
            {moment(tripData.dates.startDate).format("DD MMM yyyy")}
          </Text>
          <Text style={styles.dateTxt}>
            {" "}
            - {moment(tripData.dates.endDate).format("DD MMM yyyy")}
          </Text>
        </View>
        <Text style={styles.travelerTxt}>
          {tripData.travelerCount.icon} {tripData.travelerCount.title}
        </Text>
        <FlightDetailsBlock flightData={parsedTrip.tripPlan.flights} />
        <TransportationDetails
          transportationData={parsedTrip.tripPlan.transportation}
        />
        <HotelList hotelList={parsedTrip.tripPlan.hotels} />
        <DayPlan dayPlan={parsedTrip.tripPlan.day_plan} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 330,
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    justifyContent: "space-between",
  },
  locationTxt: {
    fontFamily: "outfit-bold",
    fontSize: 25,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
  },
  dateTxt: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.GRAY,
  },
  travelerTxt: {
    fontFamily: "outfit",
    fontSize: 17,
    color: Colors.GRAY,
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 15,
    color: Colors.SECONDARY,
  },
});
