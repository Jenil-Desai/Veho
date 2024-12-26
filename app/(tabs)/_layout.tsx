import { Colors } from "@/Constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY, tabBarInactiveTintColor: Colors.SECONDARY }}>
      <Tabs.Screen
        name="myTrip"
        options={{
          tabBarLabel: "My Trips",
          tabBarIcon: ({ color }) => <Ionicons name="location-sharp" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="discovery"
        options={{
          tabBarLabel: "Discovery",
          tabBarIcon: ({ color }) => <Ionicons name="compass-sharp" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
