import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/Constant/Colors";
import MapboxPlacesAutocomplete from "@/components/react-native-mapbox-places-autocomplete";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import { LocationData } from "@/components/react-native-mapbox-places-autocomplete/types";

export default function searchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Search Place",
    });
  }, []);

  function handlePlaceSelected(data: LocationData) {
    setTripData({
      ...tripData,
      location: {
        name: data.place_name,
        cordinates: {
          lat: data.geometry.coordinates[1],
          lng: data.geometry.coordinates[0],
        },
      },
    });
    router.push("/create-trip/selectTraveler");
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.heading}>Where to explore?</Text>
        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>Let AI discover your perfect destination</Text>
        </View>
        <MapboxPlacesAutocomplete id="origin" placeholder="Search Place" accessToken={process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN} onPlaceSelect={handlePlaceSelected} countryId="IN" containerStyle={undefined} inputStyle={styles.input} />
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
    marginTop: 30,
    padding: 25,
  },
  heading: {
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  subHeadingContainer: {
    marginTop: 1,
    marginBottom: 25,
  },
  subHeading: {
    fontFamily: "outfit-bold",
    fontSize: 15,
  },
  input: {
    height: 50,
    borderRadius: 99,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
});
