import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import HotelCard from "./HotelCard";
import { Hotel } from "@/types/types";

interface HotelListProps {
  hotelList: Hotel[];
}

export default function HotelList({ hotelList }: HotelListProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>🏩 Your comfort havens</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={hotelList}
        renderItem={({ item }) => <HotelCard hotel={item} />}
        keyExtractor={(item) => item.image_url}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginBottom: 10,
  },
});
