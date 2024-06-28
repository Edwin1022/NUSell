import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import axios from "axios";
import { ProductContext } from "../ProductContext";
import { UserContext } from "../UserContext";

const ProductInfoScreen = () => {
  const navigation = useNavigation();
  const { setSelectedUser } = useContext(UserContext);
  const { selectedItem } = useContext(ProductContext);
  const { userId } = useContext(UserContext);
  const [product, setProduct] = useState("");
  const [seller, setSeller] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => <Text style={styles.headerLeft}>NUSell</Text>,
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

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `https://nusell.onrender.com/products/${selectedItem}`
      );
      setLoading(false);
      setProduct(res.data);
      setSeller(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleUserPressed = () => {
    setSelectedUser(seller);
    navigation.navigate("UserProfile");
  };

  const handleAddToCart = () => {
    if (seller.id === userId) {
      Alert.alert("Error", "Failed to add item to cart");
    } else {
      axios
        .post("https://nusell.onrender.com/order-items", {
          productId: selectedItem,
          userId,
        })
        .then((response) => {
          Alert.alert("Success", "Item added to cart successfully");
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to add item to cart");
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginLeft: 10 }}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <KeyboardAvoidingView>
            <View style={styles.usernameBox}>
              <Pressable onPress={handleUserPressed}>
                <Image
                  style={styles.userProfile}
                  source={{
                    uri: seller.imageUrl,
                  }}
                />
              </Pressable>
              <Pressable onPress={handleUserPressed}>
                <Text style={styles.username}>{seller.name}</Text>
              </Pressable>
            </View>

            <TouchableOpacity
              onPress={() => {
                setSelectedImage(product.imageUrl);
                setModalVisible(true);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  flex: 1,
                  width: "95%",
                  borderWidth: 1,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{
                    uri: product.imageUrl,
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 350,
                    height: 200,
                    objectFit: "cover",
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <ScrollView
                horizontal
                style={{ paddingLeft: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {product.imagesUrls &&
                  product.imagesUrls.length > 0 &&
                  product.imagesUrls.map((imageUrl, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedImage(imageUrl);
                        setModalVisible(true);
                      }}
                    >
                      <View style={styles.morePhotosContainer}>
                        <Image
                          source={{ uri: imageUrl }}
                          style={styles.sidePhotos}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>

              <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.modalBackground}>
                  <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => setModalVisible(false)}
                  >
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.fullSizeImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>

            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text style={styles.Title}>Item Name</Text>
              <Text style={styles.text}>{product.name}</Text>
            </View>

            <View>
              <Text style={styles.Title}>Item Description</Text>
              <Text style={styles.text}>{product.description}</Text>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}>Brand</Text>
              <Text style={styles.text}>{product.brand}</Text>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}>Condition</Text>
              <Text style={styles.text}>{product.condition}</Text>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}> Price </Text>
              <Text style={styles.text}>$ {product.price}</Text>
            </View>

            <View>
              <View style={styles.buttonContainer}>
                <Pressable
                  onPress={() =>
                    seller.id === userId
                      ? Alert.alert("Error", "Failed to purchase item")
                      : navigation.navigate("Purchase")
                  }
                  style={styles.buyNowButton}
                >
                  <Text style={styles.buttonText}>Buy Now</Text>
                </Pressable>

                <Pressable
                  onPress={handleAddToCart}
                  style={styles.addToCartButton}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginRight: 10,
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
  },

  usernameBox: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    marginTop: 10,
    height: 50,
  },

  photoItem: {
    height: 40,
    width: 40,
    resizeMode: "contain",
    tintColor: "black",
    opacity: 0.5,
  },

  morePhotosContainer: {
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },

  sidePhotos: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  fullSizeImage: {
    width: "90%",
    height: "90%",
  },

  Title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  text: {
    textAlignVertical: "top",
    marginLeft: 10,
    marginRight: 30,
    fontSize: 18,
    fontWeight: "500",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  addToCartButton: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "#007FFF",
  },

  buyNowButton: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    padding: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: "#007FFF",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "95%",
    paddingLeft: 0,
    paddingRight: 10,
    alignItems: "center",
    marginVertical: 40,
  },

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

export default ProductInfoScreen;
