import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { UserProvider } from "./UserContext";
import { ProductProvider } from "./ProductContext";
import { ListingProvider } from "./ListingContext";
import { ButtonProvider } from "./ButtonContext";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51Pd6exHdICOCnNReDkJ5x6xFbJCtWOq2l2ULNN0ha5OVAjclUmFaxkvLXkCdPhBfCMHFhW0sMgd6iOQLTlHjfqH3006X9i62Mp">
      <UserProvider>
        <ProductProvider>
          <ListingProvider>
            <ButtonProvider>
              <StackNavigator />
            </ButtonProvider>
          </ListingProvider>
        </ProductProvider>
      </UserProvider>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
