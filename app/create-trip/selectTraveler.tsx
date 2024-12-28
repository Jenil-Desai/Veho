import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import { useNavigation, useRouter } from "expo-router";
import travelerOptions from "@/components/selectTraveler/selectTravelerOptions";
import TravelerOptionCard from "@/components/selectTraveler/TravelerOptionCard";
import { Platform } from "expo-modules-core";
import { TravelerOption } from "@/types/types";

export default function SelectTraveler() {
  const [selectedTraveler, setSelectedTraveler] = useState<TravelerOption>(
    travelerOptions[0]
  );
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const containerMargin = { marginTop: Platform.OS === "ios" ? -15 : 30 };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Select Travelers",
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      travelerCount: selectedTraveler,
    });
  }, [selectedTraveler]);

  function handleCountinue() {
    if (!selectedTraveler) {
      Alert.alert(
        "Error",
        "Select Travelers",
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
    router.push("/create-trip/selectDate");
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={[styles.container, containerMargin]}>
        <Text style={styles.heading}>Who's joining?</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>
            Customize your journey companions
          </Text>
        </View>
        <View style={Platform.OS === "ios" ? null : styles.optionContainer}>
          <FlatList
            data={travelerOptions}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedTraveler(item)}>
                <TravelerOptionCard
                  travelerOption={item}
                  selected={selectedTraveler}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item: TravelerOption) => item.id}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleCountinue}>
          <Text style={styles.btnTxt}>Coutinue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
