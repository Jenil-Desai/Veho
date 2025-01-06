import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { signOut, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { auth, db } from "@/configs/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function ChangeEmailSection() {
  const [loading, setLoading] = useState<boolean | undefined>();
  const emailInputRef = useRef<TextInput | null>(null);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const currentUser = auth.currentUser;

  async function handleClick() {
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

    if (email.toLowerCase() != confirmEmail.toLowerCase()) {
      Alert.alert(
        "Error",
        "Both Email Should Match",
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

    if (currentUser) {
      await verifyBeforeUpdateEmail(currentUser, email.toLowerCase());
      await updateDoc(doc(db, "users", currentUser.uid), {
        email: email.toLowerCase(),
      });
      Alert.alert(
        "Success",
        "Successfully Changed Email",
        [
          {
            text: "Ok",
            style: "default",
          },
        ],
        {
          cancelable: true,
        }
      );
      currentUser.reload();
    }
    setEmail("");
    setConfirmEmail("");
    setLoading(false);
  }

  return (
    <View>
      <View>
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
        <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>
          Confirm Email
        </Text>
        <TextInput
          editable={!loading}
          selectTextOnFocus={!loading}
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="Confirm Your Email"
          value={confirmEmail}
          onChangeText={(value) => setConfirmEmail(value)}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={handleClick}
        disabled={loading}
      >
        <Text style={styles.btnTxt}>Change Email</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={loading}
        style={styles.btnSecndary}
        onPress={() => {
          setEmail("");
          setConfirmEmail("");
        }}
      >
        <Text style={styles.btnTxtSecondary}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "transparent",
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
