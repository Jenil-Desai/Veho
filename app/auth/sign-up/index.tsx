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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/configs/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { PasswordChecker } from "@/utils/checkPassword";

export default function SignUp() {
  const nameInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState<PasswordChecker>();
  const [loading, setLoading] = useState<boolean | undefined>();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  async function onCreateAccount() {
    setLoading(true);
    if (name.length <= 0) {
      Alert.alert(
        "Error",
        "Name Is Required",
        [
          {
            text: "Ok",
            style: "default",
          },
        ],
        {
          onDismiss: () => nameInputRef?.current?.focus(),
          cancelable: true,
        }
      );
      setLoading(false);
      return;
    }

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

    if (passwordChecker?.isValidPassword()) {
      Alert.alert(
        "Error",
        "Password Must Follow All Constarits",
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

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: name,
            email: user.email,
            registerOn: user.metadata.creationTime,
          });
        } catch (error) {
          console.log(error);
        }
        router.replace("/(tabs)/myTrip");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error In Creating Account", errorMessage, [
          {
            text: "Ok",
            style: "default",
          },
        ]);
      });
    setLoading(false);
  }

  function handlePasswordChange(value: React.SetStateAction<string>) {
    setPassword(value);
    setPasswordChecker(new PasswordChecker(password));
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ padding: 10, marginTop: 40 }}>
        <Text style={styles.heading}>Begin your intelligent journey</Text>
        <Text style={styles.subHeading}>Where AI meets adventure</Text>
        <View style={{ marginTop: 45 }}>
          <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>
            Full Name
          </Text>
          <TextInput
            editable={!loading}
            selectTextOnFocus={!loading}
            style={styles.input}
            keyboardType="default"
            textContentType="name"
            placeholder="Enter Your Name"
            onChangeText={(value) => setName(value)}
            ref={nameInputRef}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>Email</Text>
          <TextInput
            editable={!loading}
            selectTextOnFocus={!loading}
            style={styles.input}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder="Enter Your Email"
            onChangeText={(value) => setEmail(value)}
            ref={emailInputRef}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>Password</Text>
          <TextInput
            editable={!loading}
            selectTextOnFocus={!loading}
            style={styles.input}
            secureTextEntry={true}
            textContentType="password"
            placeholder="Enter Your Password"
            onChangeText={handlePasswordChange}
            ref={passwordInputRef}
          />
        </View>
        <View style={styles.passwordReqContainer}>
          <Text style={styles.passwordReqTxt}>
            {passwordChecker?.isContainsUpperCase() ? "✅" : "❌"} Atleast 1
            Uppercase Character
          </Text>
          <Text style={styles.passwordReqTxt}>
            {passwordChecker?.isContainsLowerCase() ? "✅" : "❌"} Atleast 1
            lowercase Character
          </Text>
          <Text style={styles.passwordReqTxt}>
            {passwordChecker?.isContainsNumeric() ? "✅" : "❌"} Atleast 1
            Numeric Character
          </Text>
          <Text style={styles.passwordReqTxt}>
            {passwordChecker?.isContainsSpecial() ? "✅" : "❌"} Atleast 1
            Special Character
          </Text>
          <Text style={styles.passwordReqTxt}>
            {passwordChecker?.isValidLength() ? "✅" : "❌"} Atleast 8
            Characeter Long
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={onCreateAccount}
          disabled={loading}
        >
          <Text style={styles.btnTxt}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          style={styles.btnSecndary}
          onPress={() => router.replace("/auth/sign-in")}
        >
          <Text style={styles.btnTxtSecondary}>Already Have Account</Text>
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
  passwordReqContainer: {
    marginTop: 7,
    marginLeft: 15,
    rowGap: 2,
  },
  passwordReqTxt: {
    fontFamily: "outfit",
    fontSize: 12,
    color: Colors.GRAY,
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
