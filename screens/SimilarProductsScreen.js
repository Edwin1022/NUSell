import {
  KeyboardAvoidingView,
  Linking,
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
import CustomButton from "../components/CustomButton";

const SimilarProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { itemName, brand, accessToken } = route.params;
  const [ebayItems, setEbayItems] = useState("");
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

  useEffect(() => {
    searchItems(itemName, {
      aspect_filter: `Brand:${brand}`,
    });
  }, []);

  /*const fetchSimilarProducts = async () => {
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
  };*/

  const API_BASE_URL = "https://api.ebay.com";

  const searchItems = async (query, aspectFilter) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/buy/browse/v1/item_summary/search`,
        {
          params: {
            q: query,
            aspect_filter: aspectFilter,
            limit: 50,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            "X-EBAY-C-MARKETPLACE-ID": "EBAY_SG",
            "X-EBAY-C-ENDUSERCTX":
              "affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>",
          },
        }
      );
      const items = response.data.itemSummaries;
      setEbayItems(items);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

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
        <View style={{ marginTop: 10 }}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <View>
              {ebayItems &&
                ebayItems.length > 0 &&
                ebayItems.map((product, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <ProductComponent
                      image={product.image.imageUrl}
                      name={product.title}
                      price={product.price.value}
                      onItem={() => Linking.openURL(product.itemWebUrl)}
                    />
                  </View>
                ))}
            </View>
          </KeyboardAvoidingView>
        </View>
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
