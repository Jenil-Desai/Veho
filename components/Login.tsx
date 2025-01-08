import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Colors } from "@/Constant/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("./../assets/images/Login-Screen-Image.jpeg")}
        style={styles.image}
      />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.appName}>VEHO</Text>
          <Text style={styles.tagline}>
            Discover the future of travel planning
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/auth/sign-in")}
        >
          <Text style={styles.btnTxt}>Start Your Journey</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    backgroundColor: Colors.WHITE,
    height: 400,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 25,
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "100%",
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
