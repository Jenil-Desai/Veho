import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/Constant/Colors";
import MapboxPlacesAutocomplete from "@/components/react-native-mapbox-places-autocomplete";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import { LocationData } from "@/components/react-native-mapbox-places-autocomplete/types";

export default function searchPlace() {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search Place",
      headerBackTitle: "Back",
    });
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      <MapboxPlacesAutocomplete
        id="origin"
        placeholder="Search Place"
        accessToken={process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN}
        onPlaceSelect={(data: LocationData) => {
          console.dir(data);
          setTripData({
            location: {
              name: data.place_name,
              cordinates: {
                lat: data.geometry.coordinates[1],
                lng: data.geometry.coordinates[0],
              },
            },
          });
        }}
        countryId="IN"
        containerStyle={{
          marginBottom: 12,
        }}
        inputStyle={styles.input}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    height: "100%",
    padding: 50,
  },
  input: {},
});
