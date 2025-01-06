import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";
import { ProfileOptions } from "@/types/types";

interface ProfileOptionsBtnProps {
  optionTitle: string;
  selectedOption: ProfileOptions;
  onClick: () => void;
}

export default function ProfileOptionsBtn({
  optionTitle,
  selectedOption,
  onClick,
}: ProfileOptionsBtnProps) {
  return (
    <TouchableOpacity
      style={
        selectedOption.title === optionTitle ? styles.btn : styles.selectedBtn
      }
      onPress={onClick}
    >
      <Text
        style={
          selectedOption.title === optionTitle
            ? styles.btnTxt
            : styles.selectedBtnTxt
        }
      >
        {optionTitle}
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
