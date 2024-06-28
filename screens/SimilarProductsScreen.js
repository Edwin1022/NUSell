import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { ProductComponent } from "../components/ProductComponent";
import { UserContext } from "../UserContext";
import { ProductContext } from "../ProductContext";

const SimilarProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemName, brand, condition } = route.params;
  const [similarProducts, setSimilarProducts] = useState();
  const { setSelectedItem } = useContext(ProductContext);
  const { setSelectedUser } = useContext(UserContext);

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => <Text style={styles.headerLeft}>Similar Products</Text>,
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.goBack()}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.post(
        "https://nusell.onrender.com/products/search",
        {
          itemName,
          brand,
          condition,
        }
      );

      setSimilarProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSimilarProducts();
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
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 10 }}></View>
        <KeyboardAvoidingView>
          <View>
            {similarProducts &&
              similarProducts.length > 0 &&
              similarProducts.map((product, index) => (
                <View key={index} style={{ marginVertical: 10 }}>
                  <ProductComponent
                    pfp={product.user.imageUrl}
                    username={product.user.name}
                    image={product.imageUrl}
                    name={product.name}
                    condition={product.condition}
                    price={product.price}
                    priceChangeType={product.priceChangeType}
                    priceChanged={product.priceChanged}
                    onUser={() => handleUserPressed(product.user)}
                    onItem={() => handleItemPressed(product.id)}
                  />
                </View>
              ))}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SimilarProductsScreen;

const styles = StyleSheet.create({
  headerLeft: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
});
