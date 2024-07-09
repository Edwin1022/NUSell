import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { UserProvider } from "./UserContext";
import { ProductProvider } from "./ProductContext";
import { ListingProvider } from "./ListingContext";
import { ButtonProvider } from "./ButtonContext";

export default function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <ListingProvider>
          <ButtonProvider>
            <StackNavigator />
          </ButtonProvider>
        </ListingProvider>
      </ProductProvider>
    </UserProvider>
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
