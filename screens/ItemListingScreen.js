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
import * as FileSystem from "expo-file-system";
import ModalScreen from "./ModalScreen";
import axios from "axios";
import { UserContext } from "../UserContext";
import { ProductContext } from "../ProductContext";

const ItemListingScreen = () => {
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const { setProductId } = useContext(ProductContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [identifying, setIdentifying] = useState(false);

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
  const [estimatedPrices, setEstimatedPrices] = useState([]);

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

  /*useEffect(() => {
    if (itemName) {
      fetchPricingData(itemName).then((prices) => setEstimatedPrices(prices));
    }
  }, [itemName]);

  const fetchPricingData = async (itemName) => {
    const endpoint =
      "https://svcs.sandbox.ebay.com/services/search/FindingService/v1";
    const appId = "EdwinWon-NUSell-SBX-8345aa0ff-dda4a11b"; // Replace with your App ID
  
    const params = {
      "OPERATION-NAME": "findCompletedItems",
      "SERVICE-VERSION": "1.0.0",
      "SECURITY-APPNAME": appId,
      "RESPONSE-DATA-FORMAT": "JSON", // Change this to XML if you prefer XML response
      "REST-PAYLOAD": "",
      keywords: itemName, // No need to encodeURIComponent here, axios handles it
      "itemFilter(0).name": "Condition",
      "itemFilter(0).value": "Used", // Assuming you want used items, change as necessary
      "itemFilter(1).name": "SoldItemsOnly",
      "itemFilter(1).value": "true",
      "paginationInput.entriesPerPage": "10", // Adjust as necessary
      "paginationInput.pageNumber": "1", // Adjust as necessary
      "sortOrder": "EndTimeSoonest" // Example sort order
    };
  
    try {
      const response = await axios.get(endpoint, { params });
      const findCompletedItemsResponse = response.data.findCompletedItemsResponse;
  
      if (!findCompletedItemsResponse || findCompletedItemsResponse.length === 0) {
        console.warn("No response from API.");
        return [];
      }
  
      const searchResult = findCompletedItemsResponse[0].searchResult;
  
      if (!searchResult || searchResult.length === 0 || !searchResult[0].item) {
        console.warn("No search results found.");
        return [];
      }
  
      const items = searchResult[0].item;
  
      return items.map((item) => ({
        title: item.title ? item.title[0] : "N/A",
        price:
          item.sellingStatus && item.sellingStatus[0].currentPrice
            ? item.sellingStatus[0].currentPrice[0].__value__
            : "N/A",
        currency:
          item.sellingStatus && item.sellingStatus[0].currentPrice
            ? item.sellingStatus[0].currentPrice[0]["@currencyId"]
            : "N/A",
        listingUrl: item.viewItemURL ? item.viewItemURL[0] : "N/A" // Adding URL
      }));
    } catch (error) {
      console.error(
        "Error fetching data from eBay API:",
        error.response ? error.response.data : error.message
      );
      return [];
    }
  };*/

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

      setItemName(result.responses[0].labelAnnotations[0].description);
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
    setErrorCondition(null);

    let isValid = true;

    if (!itemName.trim()) {
      setErrorItemName("Please provide an item name");
      isValid = false;
    }

    if (!brand.trim()) {
      setErrorBrand("Please provide the item brand");
      isValid = false;
    }

    if (!condition) {
      setErrorCondition("Please select a condition");
      isValid = false;
    }

    if (isValid) {
      navigation.navigate("Dashboard", { itemName, brand, condition });
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
            </TouchableOpacity>

            <View style={{ marginBottom: 20, marginTop: 20 }}>
              <Text style={styles.Title}>
                Item Name{"\n"}
                <Text style={{ fontWeight: "normal", fontSize: 15, color: "#007FFF" }}>
                  (keep your item name short and clear)
                </Text>
              </Text>
              <TextInput
                value={itemName.trim()}
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
                  </View>
                  {!!errorPrice && (
                    <Text style={styles.error}>{errorPrice}</Text>
                  )}
                </View>
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
    width: "99%"
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
    paddingLeft: 0,
    paddingRight: 10,
    marginBottom: 10,
    alignItems: "center",
    width: "95%"
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
