import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { SearchNearbyScreen } from "../screens/SearchNearbyScreen";
import { SearchByUserScreen } from "../screens/SearchByUserScreen";
import UserStoreScreen from "../screens/UserStoreScreen";

const Stack = createNativeStackNavigator();

const HomeSearchStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchNearby"
        component={SearchNearbyScreen}
        options={{ title: "Search Nearby", headerShown: false }}
      />
      <Stack.Screen
        name="SearchByUser"
        component={SearchByUserScreen}
        options={{ title: "Search by User", headerShown: false }}
      />
      <Stack.Screen
        name="UserStore"
        component={UserStoreScreen}
        options={{ title: "User Store" }}
      />
    </Stack.Navigator>
  );
};

export default HomeSearchStackNav;
