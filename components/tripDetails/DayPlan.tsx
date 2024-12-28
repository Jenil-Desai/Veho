import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ActivitiesList from "./ActivitiesList";
import DayPlanButton from "./DayPlanButton";

export interface Activities {
  details: string;
  geo_coordinates: {
    latitude: string;
    longitude: string;
  };
  image_url: string;
  place_name: string;
  note: string;
  time: string;
  travel_time: string;
  ticket_pricing: {
    approx_adult: string;
    approx_child: string;
  };
}

interface DayPlan {
  activities: Activities[];
  day: number;
}

interface DayPlanListProps {
  dayPlan: DayPlan[];
}

export default function DayPlanList({ dayPlan }: DayPlanListProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>🏕️ Your journey chapters</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={dayPlan}
        renderItem={({ item }) => (
          <DayPlanButton
            day={item.day}
            onClick={() => setSelectedDay(item.day - 1)}
            selectedDay={selectedDay}
          />
        )}
        keyExtractor={(item) => (item.day - 1).toString()}
      />
      <ActivitiesList activities={dayPlan[selectedDay].activities} />
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
