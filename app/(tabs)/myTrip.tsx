import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, SectionList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "@/components/myTrip/StartNewTripCard";
import { collection, DocumentData, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/configs/firebaseConfig";
import TripList from "@/components/myTrip/TripList";
import { router } from "expo-router";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState<DocumentData[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    getTrips();
  }, []);

  async function getTrips() {
    setUserTrips([]);
    try {
      const qry = query(collection(db, "trips"), where("userEmail", "==", user?.email), orderBy("generatedOn", "desc"));
      const querySnapshot = await getDocs(qry);
      const trips: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userTrips);

  return (
    <SafeAreaView style={styles.warpper}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>MyTrip</Text>
            <TouchableOpacity onPress={() => router.push("/create-trip/searchPlace")}>
              <Ionicons name="add-circle" size={40} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>{userTrips.length === 0 ? <StartNewTripCard /> : <TripList trips={userTrips} />}</ScrollView>
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
