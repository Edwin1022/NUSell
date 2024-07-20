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
import DashboardScreen from "../screens/DashboardScreen";
import SimilarProductsScreen from "../screens/SimilarProductsScreen";
import ListingSummary1Screen from "../screens/ListingSummary1Screen";
import ListingSummary2Screen from "../screens/ListingSummary2Screen";
import EbayDashboardScreen from "../screens/EbayDashboardScreen";
import EbaySimilarProductsScreen from "../screens/EbaySimilarProducts";
import CardPaymentScreen from "../screens/CardPaymentScreen";
import PrivacySettingScreen from "../screens/PrivacySettingScreen";

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
        <Stack.Screen name="ListingSummary1" component={ListingSummary1Screen} />
        <Stack.Screen name="ListingSummary2" component={ListingSummary2Screen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="SimilarProducts" component={SimilarProductsScreen} />
        <Stack.Screen name="EbayDashboard" component={EbayDashboardScreen} />
        <Stack.Screen name="EbaySimilarProducts" component={EbaySimilarProductsScreen} />
        <Stack.Screen name="CardPayment" component={CardPaymentScreen} />
        <Stack.Screen name="Privacy" component={PrivacySettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
