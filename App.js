import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigation/StackNavigator";
import { UserProvider } from "./UserContext";
import { ProductProvider } from "./ProductContext";
import store from "./store";
import { Provider } from "react-redux";
import { ListingProvider } from "./ListingContext";

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <ProductProvider>
          <ListingProvider>
            <StackNavigator />
          </ListingProvider>
        </ProductProvider>
      </UserProvider>
    </Provider>
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
