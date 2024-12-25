import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/Constant/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      <Image source={require("./../assets/images/Login-Screen-Image.jpeg")} style={styles.image} />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.appName}>VEHO</Text>
          <Text style={styles.tagline}>Discover the future of travel planning</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => router.push("/auth/sign-in")}>
          <Text style={styles.btnTxt}>Start Your Journey</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 500,
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
    justifyContent: "space-between",
  },
  textContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appName: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.PRIMARY,
  },
  tagline: {
    textAlign: "center",
    fontFamily: "outfit",
    marginTop: 5,
    fontSize: 17,
    color: "black",
  },
  btn: {
    padding: 15,
    borderRadius: 99,
    borderColor: Colors.SECONDARY,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 17,
  },
});
