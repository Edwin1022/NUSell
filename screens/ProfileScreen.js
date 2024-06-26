import { Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { userId } = useContext(UserContext);
  const navigation = useNavigation();

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text
          style={{
            fontFamily: "CustomFont",
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            marginLeft: 20,
          }}
        >
          Your Profile
        </Text>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 20,
          }}
        >
          <AntDesign
            onPress={() => navigation.navigate("Cart")}
            name="shoppingcart"
            size={30}
            color="white"
          />
        </View>
      ),
    });
  }, []);

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.100:8000/users/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 15 }}>
        Welcome {user.name}
      </Text>

      <Pressable
        onPress={() => navigation.navigate("YourOrders")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Your Orders</Text>
        </View>
        <MaterialIcons
          style={{ marginRight: 20 }}
          name="keyboard-arrow-right"
          size={24}
          color="black"
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("YourListings")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Your Listings</Text>
        </View>
        <MaterialIcons
          style={{ marginRight: 20 }}
          name="keyboard-arrow-right"
          size={24}
          color="black"
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("YourAccount")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Your Account</Text>
        </View>
        <MaterialIcons
          style={{ marginRight: 20 }}
          name="keyboard-arrow-right"
          size={24}
          color="black"
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Address")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 500 }}>Your Addresses</Text>
        </View>
        <MaterialIcons
          style={{ marginRight: 20 }}
          name="keyboard-arrow-right"
          size={24}
          color="black"
        />
      </Pressable>

      <Pressable
        onPress={logout}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#D0D0D0",
          borderWidth: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingVertical: 15,
          paddingHorizontal: 5,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "red", fontSize: 18, fontWeight: 500 }}>
            Log Out
          </Text>
        </View>
        <MaterialIcons
          style={{ marginRight: 20 }}
          name="logout"
          size={24}
          color="red"
        />
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;
