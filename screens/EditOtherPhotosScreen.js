import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import Back from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import ModalScreen from "./ModalScreen";
import axios from "axios";
import { ProductContext } from "../ProductContext";

const EditOtherPhotosScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [images, setImages] = useState(Array(8).fill(null));
  const [loading, setLoading] = useState(false);
  const { selectedItem } = useContext(ProductContext);

  // Header
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
  }, [navigation]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://192.168.1.100:8000/products/${selectedItem}`
      );
      setLoading(false);
      const fetchedImages = res.data.images;
      const updatedImages = Array(8).fill(null);
      for (let i = 0; i < fetchedImages.length; i++) {
        updatedImages[i] = fetchedImages[i];
      }
      setImages(updatedImages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  // Allow users to upload their profile pictures
  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        const updatedImages = [...images];
        updatedImages[selectedSlot] = result.assets[0].uri;
        setImages(updatedImages);
        setModalVisible(false);
      }
    } catch (error) {
      Alert.alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  // Allow users to delete their profile pictures
  const removeImage = () => {
    const updatedImages = [...images];
    updatedImages[selectedSlot] = null;
    setImages(updatedImages);
    setModalVisible(false);
  };

  /*const handleUpdate = async () => {
    try {
      const formData = new FormData();
      const validImages = images.filter((image) => image != null);
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
        `http://192.168.1.100:8000/products/gallery-images/${selectedItem}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

      Alert.alert(
        "Listing Updated Successful",
        "You have updated your listing successfully"
      );

      navigation.navigate("YourListings");
    } catch (error) {
      console.error("Error uploading images:", error);
      Alert.alert(
        "Images Uploading Error",
        "An error occurred while uploading images"
      );
    }
  };*/

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView style={styles.addPhotoScreen}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Updating Listing...</Text>
          </View>
        ) : (
          <View>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={styles.headerText}>Edit Other Photos?</Text>
            </View>

            <View style={styles.morePhotosContainer}>
              {images &&
                images.length > 0 &&
                images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedSlot(index);
                      setModalVisible(true);
                    }}
                    style={styles.addPhoto}
                  >
                    {image ? (
                      <Image source={{ uri: image }} style={styles.photo} />
                    ) : (
                      <Ionicons
                        name="add-circle-outline"
                        size={120}
                        style={styles.icon}
                      />
                    )}
                  </TouchableOpacity>
                ))}

              <View style={{ marginTop: 40 }}>
                <CustomButton onPress={() => {
                  const validImages = images.filter((image) => image != null);
                  navigation.navigate("ListingSummary", {productId: selectedItem, validImages})
                }} text="Update" />
              </View>

              <View style={{ marginTop: 20 }}>
                <CustomButton onPress={() => navigation.navigate("ListingSummar")} text="Save" />
              </View>
            </View>

            <ModalScreen
              image={images[selectedSlot]}
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              onCameraPress={() => uploadImage("camera")}
              onImagePress={() => uploadImage("gallery")}
              onDeletePress={removeImage}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addPhotoScreen: {
    flex: 1,
  },
  morePhotosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  },

  addPhoto: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    borderRadius: 15,
    margin: 20,
  },
  icon: {
    color: "gray",
  },
  headerLeft: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 15,
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

export default EditOtherPhotosScreen;
