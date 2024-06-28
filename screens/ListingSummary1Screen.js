import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import { UserContext } from "../UserContext";
import { ProductContext } from "../ProductContext";
import { ListingContext } from "../ListingContext";

const ListingSummary1Screen = () => {
  const navigation = useNavigation();
  const {
    image,
    setImage,
    itemName,
    setItemName,
    itemDescription,
    setItemDescription,
    brand,
    setBrand,
    value,
    setValue,
    condition,
    setCondition,
    price,
    setPrice,
  } = useContext(ListingContext);
  const { userId } = useContext(UserContext);
  const { setProductId } = useContext(ProductContext);
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

  const handlePublish = async () => {
    const product = {
      name: itemName.trim(),
      description: itemDescription.trim(),
      image: image,
      brand: brand.trim(),
      price: price,
      category: value,
      condition: condition,
      user: userId,
    };

    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(product));
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "product.jpg",
      });

      setLoading(true);

      // send a post request to the backend API
      const response = await axios.post(
        "https://nusell.onrender.com/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

      setImage(null);
      setItemName("");
      setItemDescription("");
      setBrand("");
      setValue("");
      setCondition("");
      setPrice(0);

      setProductId(response.data.productId);

      navigation.navigate("MorePhotos");
    } catch (error) {
      console.log("product listed failed", error);
      Alert.alert(
        "Product Listing Error",
        "An error occurred while listing product"
      );
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
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(image);
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
                    uri: image,
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 200,
                    width: 350,
                    objectFit: "cover",
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 20 }}>
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
              <Text style={styles.text}>{itemName}</Text>
            </View>

            <View>
              <Text style={styles.Title}>Item Description</Text>
              <Text style={styles.text}>{itemDescription}</Text>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}>Brand</Text>
              <Text style={styles.text}>{brand}</Text>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}>Condition</Text>
              <Text style={styles.text}>{condition}</Text>
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}> Price </Text>
              <Text style={styles.text}>$ {price}</Text>
            </View>

            <View style={{ marginVertical: 30 }}>
              <CustomButton onPress={handlePublish} text="Publish" />
            </View>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default ListingSummary1Screen;
