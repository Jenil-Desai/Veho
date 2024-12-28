import { StyleSheet, Pressable, View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function MyTripSkeleton() {
  return (
    <SafeAreaView style={styles.container}>
      <MotiView transition={{ type: "timing" }} style={styles.padded}>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>MyTrip</Text>
            <TouchableOpacity onPress={() => router.push("/create-trip/searchPlace")} disabled>
              <Ionicons name="add-circle" size={40} color={Colors.PRIMARY} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Skeleton colorMode="light" width={"100%"} height={240} show={true} />
        </View>
        <View style={{ marginTop: 15 }}>
          <Skeleton colorMode="light" width={200} show={true} />
          <View
            style={{
              marginTop: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton colorMode="light" width={100} height={15} show={true} />
            <Skeleton colorMode="light" width={100} height={15} show={true} />
          </View>
          <View style={{ marginTop: 10 }}>
            <Skeleton colorMode="light" width={"100%"} show={true} />
          </View>
        </View>
        <View style={{ marginTop: 20, display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Skeleton colorMode="light" width={100} height={100} />
          <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
            <Skeleton colorMode="light" width={200} height={15} />
            <Skeleton colorMode="light" width={200} height={15} />
            <Skeleton colorMode="light" width={200} height={15} />
          </View>
        </View>
        <View style={{ marginTop: 20, display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Skeleton colorMode="light" width={100} height={100} />
          <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
            <Skeleton colorMode="light" width={200} height={15} />
            <Skeleton colorMode="light" width={200} height={15} />
            <Skeleton colorMode="light" width={200} height={15} />
          </View>
        </View>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  padded: {
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
