import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { HomeScreenComponent } from "../components/HomeScreenComponent";
import { ProductContext } from "../ProductContext";
import FilterModalScreen from "./FilterModalScreen";
import { DependentButtonContext } from "../DependentButtonContext";
import * as Location from "expo-location";

export const SearchNearbyScreen = () => {
  const navigation = useNavigation();
  const { setSelectedItem } = useContext(ProductContext);
  const { activeButton } = useContext(DependentButtonContext);
  const [userCoords, setUserCoords] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = coords2[1]; // Assuming coords2 is [longitude, latitude]
    const lon2 = coords2[0]; // Assuming coords2 is [longitude, latitude]

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km

    return distance.toFixed(2); // Return distance rounded to two decimal places
  };

  const fetchNearbyProducts = async () => {
    setLoading(true);
    const location = await getUserLocation();
    setUserCoords(location.coords);
    const res = await axios.post(
      "http://172.31.11.236:8000/products/search-nearby",
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    );
    const nearbyProducts = res.data.sort(
      (a, b) =>
        haversineDistance(userCoords, a.location.coordinates) -
        haversineDistance(userCoords, b.location.coordinates)
    );
    setAllProducts(nearbyProducts);
    setAllResults(nearbyProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchNearbyProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);

    if (activeButton === "Button1") {
      const results = filtered.sort((a, b) => a.price - b.price);
      setSearchResults(results);
      const results1 = allProducts.sort((a, b) => a.price - b.price);
      setAllResults(results1);
    } else if (activeButton === "Button2") {
      const results = filtered.sort((a, b) => b.price - a.price);
      setSearchResults(results);
      const results1 = allProducts.sort((a, b) => b.price - a.price);
      setAllResults(results1);
    } else if (activeButton === "Button4") {
      const results = filtered.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setSearchResults(results);
      const results1 = allProducts.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setAllResults(results1);
    } else {
      const results = filtered.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setSearchResults(results);
      const results1 = allProducts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setAllResults(results1);
    }
  };

  const handleSubmit = () => {
    if (!activeButton) {
      return;
    }

    if (activeButton === "Button1") {
      const results = filteredProducts.sort((a, b) => a.price - b.price);
      setSearchResults(results);
      const results1 = allProducts.sort((a, b) => a.price - b.price);
      setAllResults(results1);
    } else if (activeButton === "Button2") {
      const results = filteredProducts.sort((a, b) => b.price - a.price);
      setSearchResults(results);
      const results1 = allProducts.sort((a, b) => b.price - a.price);
      setAllResults(results1);
    } else if (activeButton === "Button4") {
      const results = filteredProducts.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setSearchResults(results);
      const results1 = allProducts.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setAllResults(results1);
    } else {
      const results = filteredProducts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setSearchResults(results);
      const results1 = allProducts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setAllResults(results1);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        paddingTop: 50,
      }}
    >
      <View style={styles.searchScreenContainer}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={styles.backIcon}
            >
              <Ionicons size={30} color="black" name="arrow-back-outline" />
            </Pressable>

            <View style={styles.searchBar}>
              <TouchableOpacity>
                <Ionicons
                  name="search"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="white"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.buttonRow}>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Items Near You
              </Text>
            </View>
            <View style={{ marginRight: 10 }}>
              <Icon.Button
                name="options-outline"
                borderRadius={30}
                style={styles.filterButton}
                iconStyle={styles.buttonIcon}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.buttonText}>Filter</Text>
              </Icon.Button>
            </View>
          </View>
        </View>

        <FilterModalScreen
          onSubmit={handleSubmit}
          onClose={() => setModalVisible(false)}
          isVisible={modalVisible}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.results}>
              {searchQuery.length <= 0 ? (
                allResults.map((product, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <HomeScreenComponent
                      pfp={product.user.imageUrl}
                      username={product.user.name}
                      image={product.imageUrl}
                      name={product.name}
                      condition={product.condition}
                      price={product.price}
                      dateCreated={product.dateCreated}
                      onPress={() => {
                        setSelectedItem(product.id);
                        navigation.navigate("ProductInfo");
                      }}
                    />
                    <View style={styles.itemLocation}>
                      <Ionicons name="location-sharp" size={24} color="red" />
                      <Text>
                        {haversineDistance(
                          userCoords,
                          product.location.coordinates
                        )}{" "}
                        km away
                      </Text>
                    </View>
                  </View>
                ))
              ) : searchResults.length > 0 ? (
                searchResults.map((product, index) => (
                  <View key={index} style={styles.itemContainer}>
                    <HomeScreenComponent
                      pfp={product.user.imageUrl}
                      username={product.user.name}
                      image={product.imageUrl}
                      name={product.name}
                      condition={product.condition}
                      price={product.price}
                      dateCreated={product.dateCreated}
                      onPress={() => {
                        setSelectedItem(product.id);
                        navigation.navigate("ProductInfo");
                      }}
                    />
                    <View style={styles.itemLocation}>
                      <Ionicons name="location-sharp" size={24} color="red" />
                      <Text>
                        {haversineDistance(
                          userCoords,
                          product.location.coordinates
                        )}{" "}
                        km away
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View></View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchItems: {
    backgroundColor: "pink",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
    marginHorizontal: 30,
  },

  button: {
    backgroundColor: "#dcdcdc",
    padding: 15,
    borderColor: "#dcdcdc",
  },

  filterButton: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 1,
  },

  filterButtonRow: {
    marginLeft: 250,
  },

  buttonIcon: {
    color: "black",
  },

  buttonText: {
    fontFamily: "Arial",
    fontSize: 16,
  },
  searchScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },

  main: {
    alignItems: "center",
  },

  searchBar: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D0D0D0",
    width: 300,
    flex: 1,
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#D0D0D0",
    alignItems: "center",
    alignContent: "center",
  },

  backIcon: {
    flex: 0.2,
    alignItems: "center",
  },

  headerContainer: {
    backgroundColor: "white",
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 18,
    color: "white",
  },

  icon: {
    padding: 10,
  },

  results: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "white",
  },

  itemContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    margin: 8,
    width: "44%",
    alignItems: "center",
  },

  itemLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
