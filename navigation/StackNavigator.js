import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import YourAccountScreen from "../screens/YourAccountScreen";
import ItemListingScreen from "../screens/ItemListingScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import PurchaseScreen from "../screens/PurchaseScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import CartScreen from "../screens/CartScreen";
import MorePhotosScreen from "../screens/MorePhotosScreen";
import YourOrdersScreen from "../screens/YourOrdersScreen";
import YourListingsScreen from "../screens/YourListingsScreen";
import ManageListingScreen from "../screens/ManageListingScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import EditOtherPhotosScreen from "../screens/EditOtherPhotosScreen";
import ListingSummaryScreen from "../screens/ListingSummaryScreen";
import UpdateListingScreen from "../screens/UpdateListingScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="YourAccount" component={YourAccountScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="Purchase" component={PurchaseScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="MorePhotos" component={MorePhotosScreen} />
        <Stack.Screen name="YourOrders" component={YourOrdersScreen} />
        <Stack.Screen name="YourListings" component={YourListingsScreen} />
        <Stack.Screen name="ManageListing" component={ManageListingScreen} />
        <Stack.Screen name="ProductInfo" component={ProductInfoScreen} />
        <Stack.Screen
          name="EditOtherPhotos"
          component={EditOtherPhotosScreen}
        />
        <Stack.Screen name="ListingSummary" component={ListingSummaryScreen} />
        <Stack.Screen name="UpdateListing" component={UpdateListingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
