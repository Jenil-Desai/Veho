import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import moment from "moment";
import { TripData } from "@/contexts/CreateTripContext";
import { Colors } from "@/Constant/Colors";
import TripCard from "./TripCard";

interface TripListProps {
  trips: DocumentData[];
}

export default function TripList({ trips }: TripListProps) {
  const latestTrip: TripData = JSON.parse(trips[0].tripData);

  return (
    <View>
      <View style={styles.container}>
        <Image source={require("../../assets/images/Login-Screen-Image.jpeg")} style={styles.image} />
      </View>
      <View style={styles.txtContainer}>
        <Text style={styles.locationTxt}>{trips[0].tripPlan.tripDetails.location}</Text>
        <View style={styles.subTxtContainer}>
          <Text style={styles.subTxt}>{moment(latestTrip.dates.startDate).format("DD MMM yyyy")}</Text>
          <Text style={styles.subTxt}>
            {latestTrip.travelerCount.icon} {latestTrip.travelerCount.title}
          </Text>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>See Your Plan</Text>
        </TouchableOpacity>
      </View>
      <FlatList nestedScrollEnabled={true} data={trips} renderItem={({ item }) => <TripCard trip={item} />} keyExtractor={(item) => item.docId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 240,
    objectFit: "cover",
    borderRadius: 15,
  },
  txtContainer: {
    marginTop: 10,
  },
  locationTxt: {
    fontFamily: "outfit-medium",
    fontSize: 20,
  },
  subTxt: {
    fontFamily: "outfit",
    fontSize: 17,
    color: Colors.GRAY,
  },
  subTxtContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 1,
  },
  btn: {
    marginTop: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.PRIMARY,
  },
  btnTxt: {
    color: Colors.SECONDARY,
    fontFamily: "outfit-medium",
    fontSize: 15,
    textAlign: "center",
  },
});
