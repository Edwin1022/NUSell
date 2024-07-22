import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Drawer } from "react-native-drawer-layout";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HomeScreenComponent } from "../components/HomeScreenComponent";
import axios from "axios";
import { ProductContext } from "../ProductContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const { setUserId } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const { setSelectedItem } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchUser = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setUserId(userId);
    return userId;
  };

  const fetchUserData = async () => {
    const userId = await fetchUser();
    try {
      const response = await axios.get(
        `https://nusell.onrender.com/users/profile/${userId}`
      );
      const { user } = response.data;
      setUser(user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`https://nusell.onrender.com/categories`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.put(`https://nusell.onrender.com/products`);
      setProducts(res.data.filter((product) => product.status !== "ordered"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserData();
    fetchCategories();
    fetchProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  const browseByCategories = async (category) => {
    try {
      const res = await axios.get(
        `https://nusell.onrender.com/products/ByCategories?categories=${category.id}`
      );
      setProducts(res.data.filter((product) => product.status !== "ordered"));
    } catch (err) {
      console.log(err);
    }
  };

  const browseOtherCategories = async () => {
    try {
      const res = await axios.get(
        `https://nusell.onrender.com/products/ByCategories?categories=666c025badffbb04e4c808cb`
      );
      setProducts(res.data.filter((product) => product.status !== "ordered"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <SafeAreaView>
            <ScrollView
              style={styles.drawer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={[styles.category, { marginLeft: 15, marginTop: 20 }]}>
                Browse by Categories
              </Text>
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      browseByCategories(category);
                      setOpen(false);
                    }}
                    style={styles.categoryBox}
                  >
                    <Text style={styles.category}>{category.name}</Text>

                    <Ionicons
                      name="chevron-forward-outline"
                      size={24}
                      color="gray"
                      style={styles.arrowIcon}
                    />
                  </TouchableOpacity>
                ))}

              <TouchableOpacity
                onPress={() => {
                  browseOtherCategories();
                  setOpen(false);
                }}
                style={styles.categoryBox}
              >
                <Text style={styles.category}>Others</Text>

                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="gray"
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  fetchProducts();
                  setOpen(false);
                }}
                style={styles.categoryBox}
              >
                <Text
                  style={[
                    styles.category,
                    { fontWeight: "bold", color: "#007FFF" },
                  ]}
                >
                  ALL ITEMS
                </Text>

                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color="#007FFF"
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        );
      }}
    >
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => setOpen((prevOpen) => !prevOpen)}
          style={styles.menuIcon}
        >
          <Ionicons size={30} color="black" name="menu-outline" />
        </Pressable>

        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={styles.searchbox}
          >
            <Text style={styles.input}>Search</Text>
          </TouchableOpacity>         
        </View>
      </View>

      <ScrollView>
        <SafeAreaView>
          <View style={styles.main}>
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
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
        </SafeAreaView>
      </ScrollView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  usernameBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 0,
    height: 40,
  },
  userProfile: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  username: {
    fontSize: 16,
  },

  itemInfo: {
    paddingLeft: 5,
  },

  itemName: {
    fontSize: 18,
    flexWrap: "wrap",
    fontWeight: "bold",
  },

  priceCondition: {
    fontSize: 16,
  },

  picContainer: {
    backgroundColor: "black",
    height: 190,
    width: 190,
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },

  productPic: {
    height: 190,
    width: 190,
    resizeMode: "cover",
    borderRadius: 10,
  },

  component: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    margin: 5,
  },

  searchbox: {
    flex: 1,
    flexDirection: "row",
  },

  icons: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
  },

  drawer: {
    marginTop: 30,
  },

  categoryBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    borderStyle: "solid",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  category: {
    fontSize: 16,
  },

  arrowIcon: {
    position: "absolute",
    right: 10,
  },

  homeScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    paddingTop: 20,
  },

  main: {
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

  headerContainer: {
    backgroundColor: "white",
    height: 100,
    paddingRight: 10,
    paddingTop: 5,
    marginTop: 40,
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
  menuIcon: {
    flex: 0.2,
    alignItems: "center",
  },
});

export default HomeScreen;
