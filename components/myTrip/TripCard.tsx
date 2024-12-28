import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "@/Constant/Colors";
import { router } from "expo-router";
import { Trip, TripData } from "@/types/types";

interface TripCardProps {
  trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
  const tripData: TripData = JSON.parse(trip.tripData as string);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/(trip-details)/tripDetails",
          params: { trip: JSON.stringify(trip) },
        })
      }
    >
      <Image source={{ uri: trip.place_image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.heading}>{trip.tripPlan.trip_name}</Text>
        <Text style={styles.subTxt}>
          {moment(tripData.dates.startDate).format("DD MMM yyyy")}
        </Text>
        <Text style={styles.subTxt}>{tripData.travelerCount.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "outfit-medium",
    fontSize: 18,
  },
  subTxt: {
    fontFamily: "outfit",
    fontSize: 14,
    color: Colors.GRAY,
  },
});
