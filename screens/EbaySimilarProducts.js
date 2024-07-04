import {
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { EbayComparisonComponent } from "../components/EbayComparisonComponent";

const EbaySimilarProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { similarProducts } = route.params;

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text style={styles.headerLeft}>
          Similar Products on <Text style={{ color: "#E53238" }}>e</Text>
          <Text style={{ color: "#0D64D2" }}>b</Text>
          <Text style={{ color: "#F5AF02" }}>a</Text>
          <Text style={{ color: "#66B817" }}>y</Text>
        </Text>
      ),
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
                    <EbayComparisonComponent
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

export default EbaySimilarProductsScreen;

const styles = StyleSheet.create({
  headerLeft: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 15,
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
