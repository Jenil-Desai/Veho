import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/Constant/Colors";
import React from "react";
import moment from "moment";
import { DocumentData } from "firebase/firestore";

export default function ProfileHeader({
  userData,
}: {
  userData: DocumentData;
}) {
  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: "https://avatar.iran.liara.run/public" }}
        style={styles.image}
      />
      <View>
        <View style={styles.txtContainer}>
          <Text style={styles.txtLabel}>Name :</Text>
          <Text style={styles.txtValue}>{userData.displayName}</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txtLabel}>Email :</Text>
          <Text style={styles.txtValue}>{userData.email}</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txtLabel}>Registered On :</Text>
          <Text style={styles.txtValue}>
            {moment(userData.registerOn).format("DD MMM yyy")}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.SECONDARY,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    columnGap: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  txtContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  txtLabel: {
    fontFamily: "outfit",
    textAlign: "right",
  },
  txtValue: {
    fontFamily: "outfit-bold",
  },
});
