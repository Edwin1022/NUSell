import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "./BottomTabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import YourAccountScreen from "../screens/YourAccountScreen";
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
import DashboardScreen from "../screens/DashboardScreen";
import SimilarProductsScreen from "../screens/SimilarProductsScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
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
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="SimilarProducts" component={SimilarProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
