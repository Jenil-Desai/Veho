import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { PasswordChecker } from "@/utils/checkPassword";
import { Colors } from "@/Constant/Colors";
import { updatePassword } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";

export default function ChangePasswordSection() {
  const passwordInputRef = useRef<TextInput | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passwordChecker, setPasswordChecker] = useState<PasswordChecker>();
  const [loading, setLoading] = useState<boolean | undefined>();
  const currentUser = auth.currentUser;

  async function handleClick() {
    setLoading(true);

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

    if (password != confirmPassword) {
      Alert.alert(
        "Error",
        "Both Password Should Match",
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

    try {
      if (currentUser) {
        await updatePassword(currentUser, password);
        Alert.alert(
          "Success",
          "Successfully Changed Password",
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
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed To Change Password",
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
      setLoading(false);
      return;
    }

    setPassword("");
    setconfirmPassword("");
    setLoading(false);
  }

  function handlePasswordChange(value: React.SetStateAction<string>) {
    setPassword(value);
    setPasswordChecker(new PasswordChecker(password));
  }

  return (
    <View>
      <View>
        <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>Password</Text>
        <TextInput
          editable={!loading}
          selectTextOnFocus={!loading}
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          placeholder="Enter Your Password"
          onChangeText={handlePasswordChange}
          value={password}
          ref={passwordInputRef}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit", marginLeft: 15 }}>
          Confirm Password
        </Text>
        <TextInput
          editable={!loading}
          selectTextOnFocus={!loading}
          style={styles.input}
          secureTextEntry={true}
          textContentType="password"
          placeholder="Confirm Your Password"
          onChangeText={(value) => setconfirmPassword(value)}
          value={confirmPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={handleClick}
        disabled={loading}
      >
        <Text style={styles.btnTxt}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={loading}
        style={styles.btnSecndary}
        onPress={() => {
          setPassword("");
          setconfirmPassword("");
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
