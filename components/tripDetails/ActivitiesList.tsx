import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ActivityCard from "./ActivityCard";
import { Activities } from "@/types/types";

interface ActivitiesListProps {
  activities: Activities[];
}

export default function ActivitiesList({ activities }: ActivitiesListProps) {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={activities}
        renderItem={({ item }) => <ActivityCard activity={item} />}
        keyExtractor={(item) => item.details}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});
