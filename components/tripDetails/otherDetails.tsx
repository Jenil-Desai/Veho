import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";

interface OtherDetailsBlockProps {
  otherData: any;
}

export default function OtherDetailsBlock({
  otherData,
}: OtherDetailsBlockProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🚖 transportation</Text>
      </View>
      <Text style={styles.priceTxt}>
        Local : {otherData.transportation.local}
      </Text>
      <Text style={styles.priceTxt}>
        From Airport : {otherData.transportation.from_airport}
      </Text>
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
    fontSize: 16,
    marginTop: 7,
  },
});
