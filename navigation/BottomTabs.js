import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import ItemListingScreen from "../screens/ItemListingScreen";
import HomeSearchStackNav from "./HomeSearchStackNav";

export const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeSearchStackNav}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "#007FFF" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="#007FFF" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Sell"
        component={ItemListingScreen}
        options={{
          tabBarLabel: "Sell",
          tabBarLabelStyle: { color: "#007FFF" },
          //headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="add-circle" size={24} color="#007FFF" />
            ) : (
              <Ionicons name="add-circle" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "#007FFF" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#007FFF" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  
  );
}