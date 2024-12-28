import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";
import { Flight } from "@/types/types";

interface FlightDetailsBlockProps {
  flightData: Flight[];
}

export default function FlightDetailsBlock({
  flightData,
}: FlightDetailsBlockProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>✈️ Flights</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>Book Here</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.priceTxt}>Price : {flightData[0].approx_price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontFamily: "outfit",
    fontSize: 20,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 5,
    width: 100,
    borderRadius: 7,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "outfit",
    color: Colors.SECONDARY,
  },
  priceTxt: {
    fontFamily: "outfit",
    fontSize: 17,
    marginTop: 7,
  },
});
