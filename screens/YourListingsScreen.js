import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Back from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ListingComponent } from "../components/ListingComponent";
import axios from "axios";
import { ProductContext } from "../ProductContext";
import { UserContext } from "../UserContext";

const YourListingsScreen = () => {
  const navigation = useNavigation();
  const { setSelectedItem } = useContext(ProductContext);
  const [products, setProducts] = useState("");
  const { user } = useContext(UserContext);
  const { userId } = useContext(UserContext);
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
          Your Listings
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

  const fetchListedItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://192.168.0.115:8000/products/bySellers?users=${userId}`
      );
      setLoading(false);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchListedItems();
  }, []);

  const handleEdit = (itemId) => {
    setSelectedItem(itemId);
    navigation.navigate("ManageListing");
  };

  const handleDelete = (itemId) => {
    axios
      .delete(`http://192.168.0.115:8000/products/${itemId}`)
      .then((response) => {
        fetchListedItems();
        Alert.alert("Success", "Product deleted successfully");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to delete product");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: 10 }}></View>
        <KeyboardAvoidingView>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <View>
              {products &&
                products.length > 0 &&
                products.map((item, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <ListingComponent
                      pfp={user.image}
                      username={user.name}
                      image={item.image}
                      name={item.name}
                      condition={item.condition}
                      onEdit={() => handleEdit(item.id)}
                      onDelete={() => handleDelete(item.id)}
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

export default YourListingsScreen;

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
