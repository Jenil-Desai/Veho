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
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/configs/firebaseConfig";

export default function ChangeNameSection() {
  const [loading, setLoading] = useState<boolean | undefined>();
  const nameInputRef = useRef<TextInput | null>(null);
  const [name, setName] = useState("");
  const [confirmName, setconfirmName] = useState("");
  const currentUser = auth.currentUser;

  async function handleClick() {
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

    if (name === confirmName) {
      if (name.length <= 0) {
        Alert.alert(
          "Error",
          "Both Name Should Match",
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
    }

    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), {
          displayName: name,
        });
        Alert.alert(
          "Success",
          "Successfully Changed Name",
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
      if (name.length <= 0) {
        Alert.alert(
          "Error",
          "Failed To Change Name",
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
    }
    setName("");
    setconfirmName("");
    setLoading(false);
  }

  return (
    <View>
      <View>
        <Text style={{ fontFamily: "outfit", marginLeft: 10 }}>Full Name</Text>
        <TextInput
          editable={!loading}
          selectTextOnFocus={!loading}
          style={styles.input}
          keyboardType="default"
          textContentType="name"
          placeholder="Enter Your Name"
          onChangeText={(value) => setName(value)}
          value={name}
          ref={nameInputRef}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "outfit", marginLeft: 10 }}>
          Confirn Full Name
        </Text>
        <TextInput
          editable={!loading}
          selectTextOnFocus={!loading}
          style={styles.input}
          keyboardType="default"
          textContentType="name"
          placeholder="Confirm Your Name"
          onChangeText={(value) => setconfirmName(value)}
          value={confirmName}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={handleClick}
        disabled={loading}
      >
        <Text style={styles.btnTxt}>Change Name</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={loading}
        style={styles.btnSecndary}
        onPress={() => {
          setName("");
          setconfirmName("");
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
