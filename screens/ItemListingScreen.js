import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
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
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import ModalScreen from "./ModalScreen";
import { ListingContext } from "../ListingContext";
import axios from "axios";
import { ProductContext } from "../ProductContext";
import * as Location from "expo-location";
import { UserContext } from "../UserContext";

const ItemListingScreen = () => {
  const navigation = useNavigation();
  const { setProductId } = useContext(ProductContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [identifying, setIdentifying] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState("");

  const { user, setUser } = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      const res = await axios.put(
        `https://nusell.onrender.com/users/getUserData?email=${user.email}`
      );
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // retrieve user data from the backend
  useEffect(() => {
    fetchUserData();
  }, []);

  //category states
  const data = [
    {
      label: "Computers and Tech",
      value: "66ad0f8251bf5acfd167bef4",
    },
    {
      label: "Women's Fashion",
      value: "66ad0fc151bf5acfd167bef6",
    },
    {
      label: "Men's Fashion",
      value: "66ad0fd851bf5acfd167bef8",
    },
    { label: "Sneakers", value: "66ad0ff151bf5acfd167befa" },
    { label: "Luxury", value: "66ad100751bf5acfd167befc" },
    {
      label: "Mobile Phones & Gadgets",
      value: "66ad101c51bf5acfd167befe",
    },
    {
      label: "Video Gaming",
      value: "66ad103551bf5acfd167bf00",
    },
    { label: "Books", value: "66ad104951bf5acfd167bf02" },
    {
      label: "Collectibles",
      value: "66ad107251bf5acfd167bf04",
    },
    {
      label: "Electronics & Home Appliances",
      value: "66ad108651bf5acfd167bf06",
    },
    {
      label: "Furnitures",
      value: "66ad10a051bf5acfd167bf08",
    },
    {
      label: "Household Goods",
      value: "66ad10b251bf5acfd167bf0a",
    },
    {
      label: "Skincare products",
      value: "66ad10c551bf5acfd167bf0c",
    },
    { label: "Snacks", value: "66ad10e351bf5acfd167bf0e" },
    {
      label: "Sports Equipments",
      value: "66ad10f851bf5acfd167bf10",
    },
    {
      label: "Concert Tickets",
      value: "66ad110e51bf5acfd167bf12",
    },
    { label: "Others", value: "66ad112251bf5acfd167bf14" },
  ];

  //text input states
  const {
    image,
    setImage,
    identifyResult,
    setIdentifyResult,
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
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  } = useContext(ListingContext);

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
          onPress={() => {
            setImage(null);
            setIdentifyResult("");
            setItemName("");
            setItemDescription("");
            setBrand("");
            setValue("");
            setCondition("");
            setPrice(0);
            navigation.navigate("Home");
          }}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  const getOAuth2Token = async () => {
    try {
      const response = await axios.get(
        "https://nusell.onrender.com/products/getAccessToken"
      );
      const token = response.data.token;
      setAccessToken(token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return null;
      }

      let location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error getting location. Please try again.");
      return null;
    }
  };

  useEffect(() => {
    getOAuth2Token();
  }, []);

  // Function to convert image to base64
  const convertImageToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: "base64",
    });
    return base64;
  };

  const identifyImage = async (imageBase64) => {
    const apiKey = "AIzaSyAqBqreiW6HBvrw5rlznRmBmYopfGXgCY0";
    const body = {
      requests: [
        {
          image: {
            content: imageBase64,
          },
          features: [
            {
              type: "LABEL_DETECTION",
              maxResults: 5,
            },
          ],
        },
      ],
    };

    try {
      setIdentifying(true);
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      setIdentifyResult(result.responses[0].labelAnnotations[0].description);
    } catch (error) {
      console.error(error);
      setErrorImage("Failed to identify image");
    } finally {
      setIdentifying(false);
    }
  };

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
        const base64 = await convertImageToBase64(result.assets[0].uri);
        identifyImage(base64);
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

  //handle View Price Data logic
  const handleViewPriceData = () => {
    setErrorItemName(null);
    setErrorBrand(null);

    let isValid = true;

    if (!itemName.trim()) {
      setErrorItemName("Please provide an item name");
      isValid = false;
    }

    if (!brand.trim()) {
      setErrorBrand("Please provide the item brand");
      isValid = false;
    }

    if (isValid) {
      navigation.navigate("Dashboard", { itemName, brand });
    } else {
      return;
    }
  };

  //handle View Price Data logic
  const handleViewEbayPriceData = () => {
    setErrorItemName(null);
    setErrorBrand(null);

    let isValid = true;

    if (!itemName.trim()) {
      setErrorItemName("Please provide an item name");
      isValid = false;
    }

    if (!brand.trim()) {
      setErrorBrand("Please provide the item brand");
      isValid = false;
    }

    if (isValid) {
      navigation.navigate("EbayDashboard", { itemName, brand, accessToken });
    } else {
      return;
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

    if (!price) {
      setErrorPrice("Please indicate a price");
      isValid = false;
    } else if (price < 0) {
      isValid = false;
      Alert.alert("Invalid input", "Please give your items a valid price");
    }

    if (!latitude || !longitude) {
      setLoading(true);
      const loc = await getLocation();
      setLoading(false);
      if (!loc) {
        return; // Location retrieval failed, exit function
      }
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
    }

    if (isValid) {
      console.log(latitude);
      console.log(longitude);
      navigation.navigate("ListingSummary1", {
        image,
        itemName,
        itemDescription,
        brand,
        value,
        condition,
        price,
        latitude,
        longitude,
      });
    } else {
      return;
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
                List Your Item
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
              {identifying ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#007AFF" />
                  <Text style={styles.loadingText}>Identifying Item...</Text>
                </View>
              ) : image ? (
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
              {!!errorImage && <Text style={styles.error}>{errorImage}</Text>}
              {identifyResult && (
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  Identify Result: {identifyResult}
                </Text>
              )}
            </TouchableOpacity>

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
                placeholder="What is this item?  Eg. Portable Aircon"
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
                placeholder="What is the brand of this item?  Eg. Midea"
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

            <View style={{ marginTop: 30 }}>
              <Text style={styles.Title}> Price </Text>
              <View style={styles.priceInputRow}>
                <View style={styles.priceInputColumn}>
                  <View style={styles.priceInputContainer}>
                    <Text>SGD $ </Text>
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
                  </View>
                  {!!errorPrice && (
                    <Text style={styles.error}>{errorPrice}</Text>
                  )}
                </View>
              </View>
              <View style={styles.compareButtonRow}>
                <Pressable
                  style={styles.priceDataButton}
                  onPress={handleViewPriceData}
                >
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      styles.priceDataButtonText,
                    ]}
                  >
                    Compare Items
                  </Text>
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      styles.priceDataButtonText,
                    ]}
                  >
                    on NUSell
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.priceDataButton}
                  onPress={handleViewEbayPriceData}
                >
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      styles.priceDataButtonText,
                    ]}
                  >
                    Compare Items
                  </Text>
                  <Text
                    style={[
                      {
                        color: "white",
                      },
                      styles.priceDataButtonText,
                    ]}
                  >
                    on Ebay
                  </Text>
                </Pressable>
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
  compareButtonRow: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

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
    width: "95%",
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
    width: "99%",
  },

  priceDataButtonText: {
    fontWeight: "bold",
    flexWrap: "wrap",
    fontSize: 16,
  },

  priceDataButton: {
    backgroundColor: "#007FFF",
    borderRadius: 75,
    width: 150,
    alignItems: "center",
    padding: 10,
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
    marginBottom: 20,
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
    paddingLeft: 0,
    paddingRight: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "95%",
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

export default ItemListingScreen;
