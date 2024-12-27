import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import { useNavigation, useRouter } from "expo-router";
import budgetOptions, { BudgetOption } from "@/components/selectBudget/selectBudgetOptions";
import BudgetOptionCard from "@/components/selectBudget/BudgetOptionCard";

export default function SelectBudget() {
  const [selectedBudget, setSelectedBudget] = useState<BudgetOption>(budgetOptions[0]);
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const containerMargin = { marginTop: Platform.OS === "ios" ? -15 : 30 };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Select Budget",
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      budgetOption: selectedBudget,
    });
  }, [selectedBudget]);

  function handleCountinue() {
    if (!selectedBudget) {
      Alert.alert(
        "Error",
        "Select The Budget",
        [
          {
            text: "Ok",
            style: "default",
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }
    router.push("/create-trip/reviewTrip");
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.container, containerMargin]}>
        <Text style={styles.heading}>Set your scope</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Plan your journey's investment</Text>
        </View>
        <View style={Platform.OS === "ios" ? null : styles.optionContainer}>
          <FlatList
            data={budgetOptions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedBudget(item)}>
                <BudgetOptionCard BudgetOption={item} selected={selectedBudget} />
              </TouchableOpacity>
            )}
            keyExtractor={(item: BudgetOption) => item.id}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleCountinue}>
          <Text style={styles.btnTxt}>Coutinue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  container: {
    padding: 25,
  },
  heading: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  subHeadingContainer: {
    marginTop: 1,
  },
  subHeading: {
    fontFamily: "outfit-bold",
    fontSize: 15,
  },
  optionContainer: {
    height: "80%",
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 15,
    color: Colors.SECONDARY,
  },
});
