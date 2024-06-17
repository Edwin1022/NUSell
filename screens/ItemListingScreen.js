import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import ModalScreen from "./ModalScreen";
import axios from "axios";
import { ProductContext } from "../ProductContext";

const ItemListingScreen = () => {
  const navigation = useNavigation();
  const { setProductId } = useContext(ProductContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  //category states
  const [value, setValue] = useState(null);
  const data = [
    {
      label: "Computers and Tech",
      value: "666bffdbadffbb04e4c808b5",
    },
    {
      label: "Women's Fashion",
      value: "666c0060adffbb04e4c808b7",
    },
    {
      label: "Men's Fashion",
      value: "666c0070adffbb04e4c808b9",
    },
    { label: "Sneakers", value: "666c07c8eec38cf6815cfc8c" },
    { label: "Luxury", value: "666c0090adffbb04e4c808bb" },
    {
      label: "Mobile Phones & Gadgets",
      value: "666c00dbadffbb04e4c808bd",
    },
    {
      label: "Video Gaming",
      value: "666c0120adffbb04e4c808bf",
    },
    { label: "Books", value: "666c01a0adffbb04e4c808c1" },
    {
      label: "Collectibles",
      value: "666c01b6adffbb04e4c808c3",
    },
    {
      label: "Electronics & Home Appliances",
      value: "666c01d9adffbb04e4c808c5",
    },
    {
      label: "Furnitures",
      value: "666c0826eec38cf6815cfc8e",
    },
    {
      label: "Household Goods",
      value: "666c083ceec38cf6815cfc90",
    },
    {
      label: "Skincare products",
      value: "666c0858eec38cf6815cfc92",
    },
    { label: "Snacks", value: "666c086ceec38cf6815cfc94" },
    {
      label: "Sports Equipments",
      value: "666c01f7adffbb04e4c808c7",
    },
    {
      label: "Concert Tickets",
      value: "666c0238adffbb04e4c808c9",
    },
    { label: "Others", value: "666c025badffbb04e4c808cb" },
  ];

  //text input states
  const [image, setImage] = useState();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState(0);

  const [errorImage, setErrorImage] = useState();
  const [errorItemName, setErrorItemName] = useState("");
  const [errorItemDescription, setErrorItemDescription] = useState("");
  const [errorBrand, setErrorBrand] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errorCondition, setErrorCondition] = useState("");
  const [errorPrice, setErrorPrice] = useState("");

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
          onPress={() => navigation.navigate("Home")}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  // allow users to upload their profile pictures
  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode == "gallery") {
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
        // save image
        setImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      Alert.alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  // allow users to delete their profile pictures
  const removeImage = async () => {
    try {
      setImage(null);
      setModalVisible(false);
    } catch ({ message }) {
      Alert.alert(message);
      setModalVisible(false);
    }
  };

  //handle Continue logic
  const handleContinue = async () => {
    setErrorImage(null);
    setErrorItemName(null);
    setErrorItemDescription(null);
    setErrorBrand(null);
    setErrorCategory(null);
    setErrorCondition(null);
    setErrorPrice(null);

    let isValid = true;

    if (!image) {
      setErrorImage("Please provide an item image");
      isValid = false;
    }

    if (!itemName.trim()) {
      setErrorItemName("Please provide an item name");
      isValid = false;
    }

    if (!itemDescription.trim()) {
      setErrorItemDescription("Please give a brief description of this item");
      isValid = false;
    }

    if (!brand.trim()) {
      setErrorBrand("Please provide the item brand");
      isValid = false;
    }

    if (!value) {
      setErrorCategory("Please select a category");
      isValid = false;
    }

    if (!condition) {
      setErrorCondition("Please select a condition");
      isValid = false;
    }

    if (!price.trim()) {
      setErrorPrice("Please indicate a price");
      isValid = false;
    }

    if (isValid) {
      Alert.alert("Now add more photos of your product!");
    } else {
      return;
    }

    const product = {
      name: itemName,
      description: itemDescription,
      image: image,
      brand: brand,
      price: price,
      category: value,
      condition: condition,
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
        "http://192.168.0.110:8000/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                }}
              >
                List your item
              </Text>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ModalScreen
                image={image}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCameraPress={uploadImage}
                onImagePress={() => uploadImage("gallery")}
                onDeletePress={removeImage}
              />

              {image ? (
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
                      uri: image,
                    }}
                    style={{
                      borderWidth: 1,
                      borderRadius: 10,
                      width: 350,
                      height: 200,
                    }}
                  />
                </View>
              ) : (
                <View style={styles.photoUpload}>
                  <View>
                    <Image
                      source={{
                        uri: "https://static-00.iconduck.com/assets.00/camera-icon-512x417-vgmhgbfy.png",
                      }}
                      style={styles.itemPhoto}
                    />
                  </View>

                  <Text style={{ fontSize: 20 }}>
                    Add photo to start a listing
                  </Text>
                </View>
              )}

              {!!errorCondition && (
                <Text style={styles.error}>{errorImage}</Text>
              )}
            </TouchableOpacity>

            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text style={styles.Title}>Item Name</Text>
              <TextInput
                value={itemName}
                onChangeText={setItemName}
                style={styles.itemNameInput}
                editable
                multiline={true}
                maxLength={100}
                placeholder="What is this item?"
              />
              {!!errorItemName && (
                <Text style={styles.error}>{errorItemName}</Text>
              )}
            </View>

            <View>
              <Text style={styles.Title}>Item Description</Text>
              <TextInput
                value={itemDescription}
                onChangeText={setItemDescription}
                style={styles.itemDescriptionInput}
                editable
                multiline={true}
                maxLength={300}
                placeholder="Give a brief description of your item"
              />
              {!!errorItemDescription && (
                <Text style={styles.error}>{errorItemDescription}</Text>
              )}
            </View>

            <View style={{ marginBottom: 10, marginTop: 20 }}>
              <Text style={styles.Title}>Brand</Text>
              <TextInput
                value={brand}
                onChangeText={setBrand}
                style={styles.itemNameInput}
                editable
                multiline={true}
                maxLength={100}
                placeholder="What is the brand of this item?"
              />
              {!!errorBrand && <Text style={styles.error}>{errorBrand}</Text>}
            </View>

            <View style={styles.container}>
              <Text style={styles.Title}>Category </Text>
              <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select a category"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
              />
              {!!errorCategory && (
                <Text style={styles.error}>{errorCategory}</Text>
              )}
            </View>

            <View>
              <Text style={styles.Title}>Condition</Text>
              <View style={styles.conditionButtonContainer}>
                <Pressable
                  style={[
                    {
                      backgroundColor:
                        condition === "Used" ? "#007FFF" : "white",
                    },
                    styles.usedButton,
                  ]}
                  onPress={() => setCondition("Used")}
                >
                  <Text
                    style={[
                      { color: condition === "Used" ? "white" : "#007FFF" },
                      styles.usedButtonText,
                    ]}
                  >
                    USED
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    {
                      backgroundColor:
                        condition === "Brand New" ? "#007FFF" : "white",
                    },
                    styles.brandNewButton,
                  ]}
                  onPress={() => setCondition("Brand New")}
                >
                  <Text
                    style={[
                      {
                        color: condition === "Brand New" ? "white" : "#007FFF",
                      },
                      styles.brandNewButtonText,
                    ]}
                  >
                    BRAND NEW
                  </Text>
                </Pressable>
              </View>
              {!!errorCondition && (
                <Text style={styles.error}>{errorCondition}</Text>
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={styles.Title}> Price </Text>
              <View style={styles.priceInputContainer}>
                <Text>$ </Text>
                <TextInput
                  value={price}
                  onChangeText={setPrice}
                  style={styles.priceInput}
                  editable
                  multiline={true}
                  maxLength={200}
                  keyboardType="numeric"
                  placeholder="Price"
                />
                {!!errorPrice && <Text style={styles.error}>{errorPrice}</Text>}
              </View>
            </View>

            <View style={styles.continueButton}>
              <CustomButton
                onPress={handleContinue}
                type="PRIMARY"
                text={"Continue"}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemPhoto: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },

  photoUpload: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#D0D0D0",
    flex: 1,
    flexDirection: "column",
    padding: 50,
    width: 350,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
  },

  error: {
    color: "red",
    marginBottom: 5,
    marginTop: 5,
  },

  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
    justifyContent: "center",
    marginBottom: 10,
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  continueButton: {
    marginTop: 30,
    marginBottom: 50,
    alignContent: "center",
    flex: 1,
    flexDirection: "row",
    height: 50,
  },

  priceInput: {
    width: 100,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    padding: 5,
    marginLeft: 10,
  },

  priceInputContainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  Title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },

  brandNewButtonText: {
    fontWeight: "bold",
  },

  brandNewButton: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    padding: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderColor: "#007FFF",
    borderWidth: 1,
  },

  usedButton: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    padding: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    borderColor: "#007FFF",
    borderWidth: 1,
  },

  usedButtonText: {
    fontWeight: "bold",
  },

  conditionButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: 360,
    paddingLeft: 0,
    paddingRight: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  itemDescriptionInput: {
    borderRadius: 5,
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    height: 100,
    textAlignVertical: "top",
    padding: 10,
    width: 350,
  },

  itemNameInput: {
    borderRadius: 5,
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    height: 50,
    textAlignVertical: "top",
    padding: 10,
    width: 350,
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

export default ItemListingScreen;
