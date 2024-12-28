import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";
import { BudgetOption } from "./selectBudgetOptions";

interface BudgetOptionCardProps {
  BudgetOption: BudgetOption;
  selected: BudgetOption;
}

export default function BudgetOptionCard({
  BudgetOption,
  selected,
}: BudgetOptionCardProps) {
  return (
    <View
      style={[
        styles.wrapper,
        selected.id === BudgetOption.id ? { borderWidth: 3 } : null,
      ]}
    >
      <View style={styles.textConatianer}>
        <Text style={styles.title}>{BudgetOption.title}</Text>
        <Text style={styles.description}>{BudgetOption.description}</Text>
      </View>
      <Text style={styles.icon}>{BudgetOption.icon}</Text>
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
