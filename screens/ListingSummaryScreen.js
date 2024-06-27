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
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import axios from "axios";
import CustomButton from "../components/CustomButton";

const ListingSummaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId, validImages } = route.params;
  const [product, setProduct] = useState("");
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
      const res = await axios.get(
        `http://192.168.0.115:8000/products/${productId}`
      );
      setLoading(false);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleUploadSideImages = async () => {
    try {
      const formData = new FormData();
      validImages.forEach((image, index) => {
        formData.append("images", {
          uri: image,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });

      setLoading(true);

      // send a put request to the backend API
      const response = await axios.put(
        `http://192.168.0.115:8000/products/gallery-images/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

      Alert.alert(
        "Product Listed Successful",
        "You have listed your product successfully"
      );

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error uploading images:", error);
      Alert.alert(
        "Images Uploading Error",
        "An error occurred while uploading images"
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
                setSelectedImage(product.image);
                setModalVisible(true);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginTop: 20,
                  flex: 1,
                  width: 350,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{
                    uri: product.image,
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    width: 350,
                    height: 200,
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
                {validImages &&
                  validImages.length > 0 &&
                  validImages.map((image, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedImage(image);
                        setModalVisible(true);
                      }}
                    >
                      <View style={styles.morePhotosContainer}>
                        <Image
                          source={{ uri: image }}
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

            <View style={{ marginVertical: 30 }}>
              <CustomButton onPress={handleUploadSideImages} text="Publish" />
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

export default ListingSummaryScreen;
