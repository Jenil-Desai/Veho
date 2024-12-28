import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";

interface DayPlanListProps {
  day: number;
  onClick: () => void;
  selectedDay: number;
}

export default function DayPlanButton({
  day,
  onClick,
  selectedDay,
}: DayPlanListProps) {
  return (
    <TouchableOpacity
      style={selectedDay === day - 1 ? styles.btn : styles.selectedBtn}
      onPress={onClick}
    >
      <Text
        style={selectedDay === day - 1 ? styles.btnTxt : styles.selectedBtnTxt}
      >
        Day {day}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
    backgroundColor: Colors.PRIMARY,
    padding: 5,
    borderRadius: 7,
    width: 100,
  },
  btnTxt: {
    textAlign: "center",
    color: Colors.WHITE,
  },
  selectedBtn: {
    marginRight: 10,
    backgroundColor: Colors.WHITE,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 7,
    width: 100,
  },
  selectedBtnTxt: {
    textAlign: "center",
    color: Colors.PRIMARY,
  },
});
