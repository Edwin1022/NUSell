import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Back from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { OrderComponent } from "../components/OrderComponent";
import { ProductContext } from "../ProductContext";
import { UserContext } from "../UserContext";
import axios from "axios";

const YourOrdersScreen = () => {
  const navigation = useNavigation();
  const { setSelectedItem } = useContext(ProductContext);
  const [orders, setOrders] = useState("");
  const { userId } = useContext(UserContext);
  const { setSelectedUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

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
          Your Orders
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

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://nusell.onrender.com/orders/byBuyers?users=${userId}`
      );
      setLoading(false);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUserPressed = (userId) => {
    setSelectedUser(userId);
    navigation.navigate("UserProfile");
  };

  const handleItemPressed = (productId) => {
    setSelectedItem(productId);
    navigation.navigate("ProductInfo");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems:"center"}}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}></View>
        <KeyboardAvoidingView>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <View>
              {orders &&
                orders.length > 0 &&
                orders.map((order, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <OrderComponent
                      pfp={order.orderedItem.user.imageUrl}
                      username={order.orderedItem.user.name}
                      image={order.orderedItem.imageUrl}
                      name={order.orderedItem.name}
                      status={order.status}
                      condition={order.orderedItem.condition}
                      price={order.totalPrice}
                      onUser={() => handleUserPressed(order.orderedItem.user)}
                      onItem={() => handleItemPressed(order.orderedItem.id)}
                    />
                  </View>
                ))}
            </View>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourOrdersScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
});
