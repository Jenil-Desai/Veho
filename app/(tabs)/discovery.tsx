import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Discovery() {
  return (
    <SafeAreaView style={styles.warpper}>
      <View style={styles.container}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Discovery</Text>
            <TouchableOpacity
              onPress={() => router.push("/create-trip/searchPlace")}
            >
              <Ionicons name="add-circle" size={40} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
          <Text>Coming Soon</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  warpper: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  container: {
    padding: 25,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    color: Colors.PRIMARY,
  },
});
