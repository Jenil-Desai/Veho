import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import { auth, db } from "@/configs/firebaseConfig";
import { useRouter } from "expo-router";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import ProfileHeader from "@/components/profile/profileHeader";
import { profileOptions } from "@/components/profile/profileOptions";
import ProfileOptionsBtn from "@/components/profile/ProfileOptionsBtn";
import { ProfileOptions } from "@/types/types";
import ChangeEmailSection from "@/components/profile/changeEmailSection";

export default function Profile() {
  const [userData, setUserData] = useState<DocumentData>({});
  const [selectedOption, setSelectedOption] = useState<ProfileOptions>({
    title: "Email",
    component: <ChangeEmailSection />,
  });
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
        <View style={styles.optionsContainer}>
          <FlatList
            horizontal={true}
            data={profileOptions}
            renderItem={({ item }) => (
              <ProfileOptionsBtn
                optionTitle={item.title}
                onClick={() => setSelectedOption(item)}
                selectedOption={selectedOption}
              />
            )}
            keyExtractor={(item) => item.title}
          />
        </View>
        <View style={styles.optionFormContainer}>
          {selectedOption.component}
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
  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  optionFormContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
});
