import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import moment from "moment";
import { Colors } from "@/Constant/Colors";

interface TripCardProps {
  trip: DocumentData;
}

export default function TripCard({ trip }: TripCardProps) {
  const tripData = JSON.parse(trip.tripData);

  return (
    <View style={styles.card}>
      <Image source={require("../../assets/images/Login-Screen-Image.jpeg")} style={styles.image} />
      <View>
        <Text style={styles.heading}>{trip.tripPlan.tripDetails.location}</Text>
        <Text style={styles.subTxt}>{moment(tripData.dates.startDate).format("DD MMM yyyy")}</Text>
        <Text style={styles.subTxt}>{tripData.travelerCount.title}</Text>
      </View>
    </View>
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
