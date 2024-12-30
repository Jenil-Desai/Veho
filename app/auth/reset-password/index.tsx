import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { useRouter } from "expo-router";

export default function ResetPassword() {
  const emailInputRef = useRef<TextInput | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");

  function onSubmit() {
    if (email.length <= 0) {
      Alert.alert(
        "Error",
        "Email Is Required",
        [
          {
            text: "Ok",
            style: "default",
          },
        ],
        {
          onDismiss: () => emailInputRef?.current?.focus(),
          cancelable: true,
        }
      );
      return;
    }
    sendPasswordResetEmail(auth, email).then(() => {
      Alert.alert(
        "Success",
        "Reset Password Email Sent Sucessfully",
        [
          {
            text: "Ok",
            style: "default",
          },
        ],
        {
          onDismiss: () => router.replace("/auth/sign-in"),
          cancelable: true,
        }
      );
      Platform.OS === "ios" ? router.replace("/auth/sign-in") : null;
    });
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ padding: 10, marginTop: 40 }}>
        <Text style={styles.heading}>Rediscover Your Path</Text>
        <Text style={styles.subHeading}>
          Let's secure your journey together
        </Text>
        <View style={{ marginTop: 45 }}>
          <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            ref={emailInputRef}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={onSubmit}>
          <Text style={styles.btnTxt}>Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSecndary}
          onPress={() => router.replace("/auth/sign-up")}
        >
          <Text style={styles.btnTxtSecondary}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    color: "#0A2342",
  },
  subHeading: {
    fontSize: 20,
    color: Colors.GRAY,
    marginTop: 1,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 30,
  },
  btnTxt: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 15,
    color: Colors.SECONDARY,
  },
  btnSecndary: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.SECONDARY,
    borderRadius: 99,
    marginTop: 12,
  },
  btnTxtSecondary: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 15,
    color: Colors.PRIMARY,
  },
});
