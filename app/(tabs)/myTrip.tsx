import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "@/components/myTrip/StartNewTripCard";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "@/configs/firebaseConfig";
import TripList from "@/components/myTrip/TripList";
import { router } from "expo-router";
import MyTripSkeleton from "@/components/myTrip/skeleton";
import { Trip } from "@/types/types";
import { useIsFocused } from "@react-navigation/native";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const user = auth.currentUser;

  useEffect(() => {
    if (isFocused) getTrips();
  }, [isFocused]);

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
        {userTrips.length === 0 ? (
          <StartNewTripCard />
        ) : (
          <View style={{ flex: 1 }}>
            <TripList trips={userTrips} />
          </View>
        )}
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
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
    flex: 1,
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
