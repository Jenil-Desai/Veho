import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, db } from "@/configs/firebaseConfig";
import { useRouter } from "expo-router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import ProfileHeader from "@/components/profile/profileHeader";

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
        <ProfileHeader userData={userData} />
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
});
