import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import Back from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { OrderComponent } from "../components/OrderComponent";

const YourOrdersScreen = () => {
  const navigation = useNavigation();

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text
          style={{
            fontFamily: "CustomFont",
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            marginLeft: 20,
          }}
        >
          Your Orders (ongoing)
        </Text>
      ),
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  return (
    <OrderComponent/>
  );
};

export default YourOrdersScreen;
