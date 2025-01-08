import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/Constant/Colors";
import React from "react";
import { Activities } from "@/types/types";
import InfoBtn from "../InfoBtn";

interface ActivityCardProps {
  activity: Activities;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <View style={styles.card}>
      <Image
        loadingIndicatorSource={{ uri: "https://placehold.co/120" }}
        source={{ uri: activity.image_url }}
        style={styles.image}
      />
      <View style={styles.txtContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{activity.place_name}</Text>
          {activity.note && <InfoBtn text={activity.note} placment="top" />}
        </View>
        <Text style={styles.details}>{activity.details}</Text>
        <Text style={styles.otherDetails}>⏱️ Time : {activity.time}</Text>
        <Text style={styles.otherDetails}>
          {activity.travel_time && `🚌 Travel Time : ${activity.travel_time}`}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              Linking.openURL(
                `http://maps.google.co.uk/maps?q=${activity.place_name}`
              )
            }
          >
            <Text style={styles.btnTxt}>Get Directions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondarybtn}
            onPress={() =>
              Linking.openURL(
                `http://maps.google.co.uk/maps?q=${activity.geo_coordinates.latitude},${activity.geo_coordinates.longitude}`
              )
            }
          >
            <Text style={styles.secondarybtnTxt}>View Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  txtContainer: {
    marginTop: 5,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  details: {
    fontFamily: "outfit",
    fontSize: 17,
    color: Colors.GRAY,
    textAlign: "justify",
    marginBottom: 5,
  },
  otherDetails: {
    fontFamily: "outfit",
    fontSize: 15,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 7,
    marginTop: 15,
  },
  btnTxt: {
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.WHITE,
  },
  secondarybtn: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    marginTop: 15,
  },
  secondarybtnTxt: {
    fontFamily: "outfit",
    textAlign: "center",
    color: Colors.PRIMARY,
  },
});
