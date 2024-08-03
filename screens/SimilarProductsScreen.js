import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { UserContext } from "../UserContext";
import { ProductContext } from "../ProductContext";
import { ProductComponent } from "../components/ProductComponent";

const SimilarProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { similarProducts } = route.params;
  const { setSelectedItem } = useContext(ProductContext);
  const { setSelectedUser } = useContext(UserContext);

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => <Text style={styles.headerLeft}>Similar Products on NUSell</Text>,
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

  const handleUserPressed = (user) => {
    setSelectedUser(user);
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
    marginLeft: 15,
    marginRight: 5
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
