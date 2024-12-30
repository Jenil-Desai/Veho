import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, db } from "@/configs/firebaseConfig";
import { useRouter } from "expo-router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import moment from "moment";

export default function Profile() {
  const [userData, setUserData] = useState<DocumentData>({});
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    getProfileData();
  }, []);

  async function getProfileData() {
    const docRef = doc(db, "users", user?.uid as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  function onSignOut() {
    signOut(auth);
    router.replace("/auth/sign-in");
  }

  return (
    <SafeAreaView style={styles.warpper}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <TouchableOpacity onPress={onSignOut}>
            <Ionicons name="log-out" size={40} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
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
              <Text style={styles.txtLabel}>Register On :</Text>
              <Text style={styles.txtValue}>
                {moment(userData.registerOn).format("DD MMM yyy")}
              </Text>
            </View>
          </View>
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
