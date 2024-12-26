import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TravelerOption } from "./selectTravelerOptions";
import { Colors } from "@/Constant/Colors";

interface TravelerOptionCardProps {
  travelerOption: TravelerOption;
  selected: TravelerOption;
}

export default function TravelerOptionCard({ travelerOption, selected }: TravelerOptionCardProps) {
  return (
    <View style={[styles.wrapper, selected.id === travelerOption.id ? { borderWidth: 3 } : null]}>
      <View style={styles.textConatianer}>
        <Text style={styles.title}>{travelerOption.title}</Text>
        <Text style={styles.description}>{travelerOption.description}</Text>
      </View>
      <Text style={styles.icon}>{travelerOption.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GRAY,
    margin: 10,
    borderRadius: 15,
  },
  textConatianer: {
    width: "85%",
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  description: {
    fontSize: 17,
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
  },
  icon: {
    fontSize: 30,
  },
});
