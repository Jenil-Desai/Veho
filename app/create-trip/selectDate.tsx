import { Text, SafeAreaView, StyleSheet, View, Platform, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import CalenderPicker, { ChangedDate } from "react-native-calendar-picker";
import moment from "moment";

export default function SelectDate(this: any) {
  const [startDate, setStartDate] = useState<moment.Moment>(moment());
  const [endDate, setEndDate] = useState<moment.Moment>(moment());
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const containerMargin = { marginTop: Platform.OS === "ios" ? -15 : 30 };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Search Travelers",
    });
  }, []);

  function handleDateChange(date: Date, type: ChangedDate) {
    if (type === "START_DATE") setStartDate(moment(date));
    if (type === "END_DATE") setEndDate(moment(date));
  }

  function handleCountinue() {
    if (!startDate && !endDate) {
      Alert.alert(
        "Error",
        "Select The Start & End Date",
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
    const totalNoDays = endDate.diff(startDate, "days");
    setTripData({
      ...tripData,
      dates: {
        startDate,
        endDate,
        totalNoOfDays: totalNoDays + 1,
      },
    });
    console.log("Button Selected Date --- ", tripData);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.container, containerMargin]}>
        <Text style={styles.heading}>When's your adventure?</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Choose your exploration window</Text>
        </View>
        <View style={styles.calenderContainer}>
          <CalenderPicker allowRangeSelection={true} onDateChange={handleDateChange} minDate={new Date()} maxRangeDuration={15} selectedRangeStyle={styles.selectedRange} selectedDayTextStyle={styles.selectedDayText} />
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
  calenderContainer: {
    marginTop: 30,
  },
  selectedRange: {
    backgroundColor: Colors.PRIMARY,
  },
  selectedDayText: {
    color: Colors.SECONDARY,
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
