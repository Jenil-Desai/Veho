import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";
import { Hotel } from "@/types/types";
import InfoBtn from "../InfoBtn";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: hotel.image_url }} style={styles.image} />
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading} numberOfLines={1}>
            {hotel.hotel_name}
          </Text>
          {hotel.note && <InfoBtn placment="top" text={hotel.note} />}
        </View>
        <View>
          <Text style={styles.details}>{hotel.description}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTxt}>💰 {hotel.price}</Text>
          <Text style={styles.detailsTxt}>⭐️ {hotel.rating}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            Linking.openURL(
              `http://maps.google.co.uk/maps?q=${hotel.hotel_name}`
            )
          }
        >
          <Text style={styles.btnTxt}>View On Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondarybtn}
          onPress={() =>
            Linking.openURL(
              `http://maps.google.co.uk/maps?q=${hotel.geo_coordinates.latitude},${hotel.geo_coordinates.longitude}`
            )
          }
        >
          <Text style={styles.secondarybtnTxt}>Navigate Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginRight: 20,
    width: 300,
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
  details: {
    fontFamily: "outfit",
    color: Colors.GRAY,
    textAlign: "justify",
    marginBottom: 5,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  detailsTxt: {
    fontFamily: "outfit",
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 7,
    marginTop: 10,
    width: "100%",
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
