import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/Constant/Colors";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { generatePrompt } from "@/utils/generatePrompt";
import { CreateTripContext } from "@/contexts/CreateTripContext";
import { chatSession } from "@/configs/geminiConfig";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/configs/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

export default function GenerateTrip() {
  const router = useRouter();
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const user = auth.currentUser;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    generateTrip();
  }, []);

  async function generateTrip() {
    const prompt = generatePrompt({
      location: tripData.location.name,
      totalDays: tripData.dates.totalNoOfDays,
      totalNights: tripData.dates.totalNoOfDays - 1,
      travelers: tripData.travelerCount.people,
      budget: tripData.budgetOption.title,
    });

    const result = await chatSession.sendMessage(prompt);
    const jsonResult = JSON.parse(result.response.text());
    const tripId = uuidv4();
    console.log("Above DB Storeing");
    try {
      await setDoc(doc(db, "trips", tripId), {
        userEmail: user?.email,
        tripPlan: jsonResult,
        tripData: JSON.stringify(tripData),
        docId: tripId,
      });
      console.log("Inside Try");
    } catch (error) {
      console.log(error);
    }
    console.log("Above Router");
    router.replace("/(tabs)/myTrip");
  }

  return (
    <View style={styles.wrapper}>
      <Image source={require("../../assets/images/loading-screen.gif")} style={styles.backgroundImage} resizeMode="cover" />
      <BlurView intensity={50} style={styles.glassmorphismContainer}>
        <Text style={styles.heading}>Crafting your journey</Text>
        <Text style={styles.subHeading}>Your AI companion is mapping out the perfect adventure</Text>
        <Text style={styles.wraning}>Do Not Go Back</Text>
      </BlurView>
    </View>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  glassmorphismContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "outfit-bold",
    color: "black",
    marginBottom: 10,
  },
  subHeading: {
    textAlign: "center",
    fontFamily: "outfit-regular",
    fontSize: 15,
    color: Colors.GRAY,
    marginBottom: 20,
  },
  wraning: {
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 15,
    color: Colors.GRAY,
    marginBottom: 20,
  },
});
