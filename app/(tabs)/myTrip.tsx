import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "@/components/myTrip/StartNewTripCard";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);

  return (
    <SafeAreaView style={styles.warpper}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>MyTrip</Text>
          <Ionicons name="add-circle" size={40} color={Colors.PRIMARY} />
        </View>
        {userTrips.length === 0 ? <StartNewTripCard /> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warpper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  container: {
    padding: 25,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    color: Colors.PRIMARY,
  },
});
