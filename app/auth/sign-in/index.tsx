import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/Constant/Colors";
import { auth } from "@/configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean | undefined>();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  function onLogin() {
    setLoading(true);
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
      setLoading(false);
      return;
    }

    if (password.length <= 0 || password.length < 8) {
      Alert.alert(
        "Error",
        "Password Must Be Atleast 8 Characters",
        [
          {
            text: "Ok",
            style: "default",
          },
        ],
        {
          onDismiss: () => passwordInputRef?.current?.focus(),
          cancelable: true,
        }
      );
      setLoading(false);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace("/(tabs)/myTrip");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error Invalid Details", errorMessage, [
          {
            text: "Ok",
            style: "default",
          },
        ]);
      });
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ padding: 10, marginTop: 40 }}>
        <Text style={styles.heading}>Welcome back, explorer</Text>
        <Text style={styles.subHeading}>
          Your intelligent journey continues
        </Text>
        <View style={{ marginTop: 45 }}>
          <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>Email</Text>
          <TextInput
            editable={!loading}
            selectTextOnFocus={!loading}
            style={styles.input}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Enter Your Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            ref={emailInputRef}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.passwordContainer}>
            <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>
              Password
            </Text>
            <Text
              style={styles.resetPassword}
              onPress={() => router.replace("/auth/reset-password")}
            >
              Reset Password
            </Text>
          </View>

          <TextInput
            editable={!loading}
            selectTextOnFocus={!loading}
            style={styles.input}
            secureTextEntry={true}
            textContentType="password"
            placeholder="Enter Your Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            ref={passwordInputRef}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={onLogin}
          disabled={loading}
        >
          <Text style={styles.btnTxt}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          style={styles.btnSecndary}
          onPress={() => router.replace("/auth/sign-up")}
        >
          <Text style={styles.btnTxtSecondary}>Create Account</Text>
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
  passwordContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  resetPassword: {
    marginRight: 15,
    fontSize: 12,
    fontFamily: "outfit",
    color: Colors.SECONDARY,
    textDecorationStyle: "solid",
    textDecorationColor: Colors.SECONDARY,
    textDecorationLine: "underline",
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
