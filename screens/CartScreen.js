import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { CartComponent } from "../components/CartComponent";
import { ProductContext } from "../ProductContext";
import { UserContext } from "../UserContext";
import axios from "axios";

const CartScreen = () => {
  const navigation = useNavigation();
  const { setSelectedItem } = useContext(ProductContext);
  const [cartItems, setCartItems] = useState("");
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
          Your Cart
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

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://nusell.onrender.com/order-items/byBuyers?users=${userId}`
      );
      setLoading(false);
      setCartItems(res.data.filter((cartItem) => cartItem.product.status !== "ordered"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUserPressed = (userId) => {
    setSelectedUser(userId);
    navigation.navigate("UserProfile");
  };

  const handleItemPressed = (productId) => {
    setSelectedItem(productId);
    navigation.navigate("ProductInfo");
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`https://nusell.onrender.com/order-items/${itemId}`)
      .then((response) => {
        fetchCartItems();
        Alert.alert("Success", "Item removed from cart successfully");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to remove item from cart");
        console.log(error);
      });
  };

  const handleCheckout = (productId) => {
    setSelectedItem(productId);
    navigation.navigate("Purchase");
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
              {cartItems &&
                cartItems.length > 0 &&
                cartItems.map((item, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <CartComponent
                      pfp={item.product.user.imageUrl}
                      username={item.product.user.name}
                      image={item.product.imageUrl}
                      name={item.product.name}
                      condition={item.product.condition}
                      price={item.product.price}
                      onUser={() => handleUserPressed(item.product.user)}
                      onItem={() => handleItemPressed(item.product.id)}
                      onDelete={() => handleDelete(item.id)}
                      onCheckout={() => handleCheckout(item.product.id)}
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

export default CartScreen;

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
