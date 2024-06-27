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
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import ModalScreen from "./ModalScreen";
import axios from "axios";
import { ProductContext } from "../ProductContext";

const ManageListingScreen = () => {
  const navigation = useNavigation();
  const { selectedItem } = useContext(ProductContext);
  const [product, setProduct] = useState("");
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
        `https://nusell.onrender.com/products/${selectedItem}`
      );
      setLoading(false);
      setProduct(res.data);
      setValue(res.data.category.id);
      setCondition(res.data.condition);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductData();
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

  //handle Next logic
  const handleNext = async () => {
    const updatedProduct = {
      name: itemName || product.name,
      description: itemDescription || product.description,
      image: image || product.image,
      brand: brand || product.brand,
      price: price || product.price,
      category: value,
      condition: condition,
      user: product.user,
    };

    try {
      const formData = new FormData();
      formData.append("product", JSON.stringify(updatedProduct));
      formData.append("image", {
        uri: image || product.image,
        type: "image/jpeg",
        name: "product.jpg",
      });

      setLoading(true);

      // send a post request to the backend API
      const response = await axios.put(
        `https://nusell.onrender.com/products/${selectedItem}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoading(false);

      navigation.navigate("EditOtherPhotos");
    } catch (error) {
      console.log("listing updated failed", error);
      Alert.alert(
        "Update Listing Error",
        "An error occurred while updating listing"
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
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                }}
              >
                Edit Product Information
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
                    width: "95%",
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
                      height: 200,
                      
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 20,
                    flex: 1,
                    width: "95%",
                    borderWidth: 1,
                    borderRadius: 10,
                    overflow: "hidden"
                  }}
                >
                  <Image
                    source={{
                      uri: product.image,
                    }}
                    style={{
                      borderWidth: 1,
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 20 }}>
              <ScrollView
                horizontal
                style={{ paddingLeft: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {product.images &&
                  product.images.length > 0 &&
                  product.images.map((image, index) => (
                    <TouchableOpacity key={index}>
                      <View style={styles.morePhotosContainer}>
                        <Image
                          source={{ uri: image }}
                          style={styles.sidePhotos}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text style={styles.Title}>
                Item Name{"\n"}
                <Text
                  style={{
                    fontWeight: "normal",
                    fontSize: 15,
                    color: "#007FFF",
                  }}
                >
                  (keep your item name short and clear)
                </Text>
              </Text>
              <TextInput
                value={itemName}
                onChangeText={setItemName}
                style={styles.itemNameInput}
                editable
                multiline={true}
                maxLength={100}
                placeholder={product.name}
              />
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
                placeholder={product.description}
              />
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
                placeholder={product.brand}
              />
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
            </View>

            <View>
              <Text style={styles.Title}>Condition</Text>
              <View style={styles.conditionButtonContainer}>
                <Pressable
                  onPress={() => setCondition("Used")}
                  style={[
                    {
                      backgroundColor:
                        condition === "Used" ? "#007FFF" : "white",
                    },
                    styles.usedButton,
                  ]}
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
                  onPress={() => setCondition("Brand New")}
                  style={[
                    {
                      backgroundColor:
                        condition === "Brand New" ? "#007FFF" : "white",
                    },
                    styles.brandNewButton,
                  ]}
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
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.Title}> Price </Text>
              <View style={styles.priceInputRow}>
                <View style={styles.priceInputColumn}>
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
                      placeholder={`${product.price}`}
                    />
                  </View>
                </View>
                <Pressable
                  style={styles.priceDataButton}
                  onPress={() =>
                    navigation.navigate("Dashboard", {
                      itemName: itemName || product.name,
                      brand: brand || product.brand,
                      condition: condition || product.condition,
                    })
                  }
                >
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      styles.priceDataButtonText,
                    ]}
                  >
                    Recommend
                  </Text>
                  <Text style={[
                      {
                        color: "white",
                      },
                      styles.priceDataButtonText,
                    ]}>
                      Listing Price
                  </Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.nextButton}>
              <CustomButton onPress={handleNext} type="PRIMARY" text={"Next"} />
            </View>
          </KeyboardAvoidingView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  sidePhotosUpload: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#D0D0D0",
    flex: 1,
    width: "95%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
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
    width: "99%",
  },

  priceDataButtonText: {
    fontWeight: "bold",
    flexWrap: "wrap",
    fontSize: 16
  },

  priceDataButton: {
    marginLeft: 60,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007FFF",
    borderRadius: 75,
    width: 150,
    alignItems: "center"
  },

  nextButton: {
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

  priceInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  priceInputColumn: {
    flexDirection: "column",
    alignItems: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "95%",
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
    width: "95%",
  },

  itemNameInput: {
    borderRadius: 5,
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    height: 50,
    textAlignVertical: "top",
    padding: 10,
    width: "95%",
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

export default ManageListingScreen;
