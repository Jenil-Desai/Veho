import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "@/components/myTrip/StartNewTripCard";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/configs/firebaseConfig";
import TripList from "@/components/myTrip/TripList";
import { router } from "expo-router";
import MyTripSkeleton from "@/components/myTrip/skeleton";
import { Trip } from "@/types/types";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    getTrips();
  }, []);

  async function getTrips() {
    setLoading(true);
    setUserTrips([]);
    try {
      const qry = query(
        collection(db, "trips"),
        where("userEmail", "==", user?.email),
        orderBy("generatedOn", "desc")
      );
      const querySnapshot = await getDocs(qry);
      const trips: Trip[] = querySnapshot.docs.map((doc) => doc.data() as Trip);
      setUserTrips(trips);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <MyTripSkeleton />;

  return (
    <SafeAreaView style={styles.warpper}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>MyTrip</Text>
            <TouchableOpacity
              onPress={() => router.push("/create-trip/searchPlace")}
            >
              <Ionicons name="add-circle" size={40} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {userTrips.length === 0 ? (
            <StartNewTripCard />
          ) : (
            <TripList trips={userTrips} />
          )}
        </ScrollView>
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
