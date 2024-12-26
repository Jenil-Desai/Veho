import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/Constant/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {
  const router = useRouter();

  return (
    <View style={styles.warpper}>
      <Ionicons name="location-sharp" size={30} color={Colors.PRIMARY} />
      <Text style={styles.title}>Your next discovery awaits</Text>
      <Text style={styles.subTitle}>Let’s come together to map out your future adventures! We can explore all the exciting possibilities that lie ahead.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.push("/create-trip/searchPlace")}>
        <Text style={styles.btnTxt}>Plan Your Journey</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  warpper: {
    padding: 20,
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "outfit-medium",
    fontSize: 25,
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  btn: {
    padding: 15,
    borderRadius: 99,
    paddingHorizontal: 30,
    backgroundColor: Colors.SECONDARY,
  },
  btnTxt: {
    fontFamily: "outfit-medium",
    color: Colors.PRIMARY,
    fontSize: 15,
  },
});
