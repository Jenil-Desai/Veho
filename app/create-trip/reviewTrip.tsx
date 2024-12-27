import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { Colors } from "@/Constant/Colors";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import moment from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const containerMargin = { marginTop: Platform.OS === "ios" ? -15 : 30 };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Review Trip Plan",
    });
  }, []);

  function handleCountinue() {
    router.push("/create-trip/generateTrip");
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.container, containerMargin]}>
        <Text style={styles.heading}>Your journey overview</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Review your intelligent travel plan</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataIcon}>📍</Text>
          <View style={styles.dataTxtContainer}>
            <Text style={styles.dataHeading}>Destination</Text>
            <Text style={styles.dataTxt}>{tripData.location.name}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataIcon}>🗓️</Text>
          <View style={styles.dataTxtContainer}>
            <Text style={styles.dataHeading}>Travel Dates</Text>
            <Text style={styles.dataTxt}>{`${moment(tripData.dates.startDate).format("DD MMM")} To ${moment(tripData.dates.endDate).format("DD MMM")} (${tripData.dates.totalNoOfDays})`}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataIcon}>🚌</Text>
          <View style={styles.dataTxtContainer}>
            <Text style={styles.dataHeading}>Who Is Traveling</Text>
            <Text style={styles.dataTxt}>{tripData.travelerCount.title}</Text>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataIcon}>💰</Text>
          <View style={styles.dataTxtContainer}>
            <Text style={styles.dataHeading}>Budget</Text>
            <Text style={styles.dataTxt}>{tripData.budgetOption.title}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleCountinue}>
          <Text style={styles.btnTxt}>Build My Trip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  container: {
    padding: 25,
  },
  heading: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  subHeadingContainer: {
    marginTop: 1,
  },
  subHeading: {
    fontFamily: "outfit-bold",
    fontSize: 15,
  },
  dataContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dataIcon: {
    fontSize: 30,
  },
  dataTxtContainer: {
    marginLeft: 10,
  },
  dataHeading: {
    fontFamily: "outfit",
    fontSize: 19,
    color: Colors.GRAY,
  },
  dataTxt: {
    fontFamily: "outfit-medium",
    fontSize: 15,
  },
  btn: {
    marginTop: 50,
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
