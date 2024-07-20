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
import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { HomeScreenComponent } from "../components/HomeScreenComponent";
import { ProductContext } from "../ProductContext";
import FilterModalScreen from "./FilterModalScreen";
import { DependentButtonContext } from "../DependentButtonContext";

export const SearchScreen = () => {
  const navigation = useNavigation();
  const { setSelectedItem } = useContext(ProductContext);
  const { activeButton} = useContext(DependentButtonContext);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // (default) sort items by date created in descending order (latest to oldest)
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`https://nusell.onrender.com/products`);

      setAllProducts(res.data.filter((product) => product.status !== "ordered"));

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
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
    } else if (activeButton === "Button2") {
      const results = filtered.sort((a, b) => b.price - a.price);
      setSearchResults(results);
    } else if (activeButton === "Button4") {
      const results = filtered.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setSearchResults(results);
    } else {
      const results = filtered.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setSearchResults(results);
    }
  };

  const handleSubmit = () => {
    if (!activeButton) {
      return;
    }

    if (activeButton === "Button1") {
      const results = filteredProducts.sort((a, b) => a.price - b.price);
      setSearchResults(results);
    } else if (activeButton === "Button2") {
      const results = filteredProducts.sort((a, b) => b.price - a.price);
      setSearchResults(results);
    } else if (activeButton === "Button4") {
      const results = filteredProducts.sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
      setSearchResults(results);
    } else {
      const results = filteredProducts.sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
      setSearchResults(results);
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
              onPress={() => navigation.navigate("Home")}
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
            <View>
              <Icon.Button
                name="location-outline"
                borderRadius={30}
                style={styles.button}
                iconStyle={styles.buttonIcon}
                onPress={() => navigation.navigate("SearchNearby")}
              >
                <Text style={styles.buttonText}>Search Nearby</Text>
              </Icon.Button>
            </View>
            <View>
              <Icon.Button
                name="person-outline"
                borderRadius={30}
                style={styles.button}
                iconStyle={styles.buttonIcon}
                onPress={() => navigation.navigate("SearchByUser")}
              >
                <Text style={styles.buttonText}>Search by User</Text>
              </Icon.Button>
            </View>
          </View>
          {searchQuery.length > 0 && filteredProducts.length > 0 && (
            <View style={styles.filterButtonRow}>
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
          )}
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
              {searchResults &&
                searchResults.length > 0 &&
                searchQuery.length > 0 &&
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
                  </View>
                ))}
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
    padding: 10,
    width: "100%",
    backgroundColor: "white",
    marginTop: 10,
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
