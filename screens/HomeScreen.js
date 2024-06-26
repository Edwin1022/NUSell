import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "react-native-gesture-handler";
import { Drawer } from "react-native-drawer-layout";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenComponent } from "../components/HomeScreenComponent";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setUserId } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  // retrieve user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://192.168.0.110:8000/users/getUserData?email=${user.email}`
        );
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <View style={styles.drawer}>
            <Text style={styles.category}>Browse by Categories</Text>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryBox}>
              <Text style={styles.category}>Category 1</Text>

              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="gray"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
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
          <View style={styles.icons}>
            <TouchableOpacity>
              <Ionicons
                name="camera-outline"
                size={27}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.main}>
          <View style={styles.componentRow}>
            <HomeScreenComponent></HomeScreenComponent>
            <HomeScreenComponent></HomeScreenComponent>
          </View>
          <View style={styles.componentRow}>
            <HomeScreenComponent></HomeScreenComponent>
            <HomeScreenComponent></HomeScreenComponent>
          </View>
          <View style={styles.componentRow}>
            <HomeScreenComponent></HomeScreenComponent>
            <HomeScreenComponent></HomeScreenComponent>
          </View>
        </View>
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

  componentRow: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
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
    fontSize: 18,
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
    flex: 1,
    justifyContent: "center",
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
