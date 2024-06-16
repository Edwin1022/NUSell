import { Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/CustomButton";

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
          `http://192.168.0.115:8000/users/profile/${userId}`
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
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Orders</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("UserAccount")}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Log Out</Text>
        </Pressable>
      </View>

      {/*dummy buttons*/}
      <View style={{ marginTop: 50 }} />

      <CustomButton
        onPress={() => navigation.navigate("Address")}
        text="AddressScreen"
      />

      <View style={{ marginTop: 20 }} />

      <CustomButton
        onPress={() => navigation.navigate("Purchase")}
        text="PurchaseScreen"
      />

      <View style={{ marginTop: 20 }} />

      <CustomButton
        onPress={() => navigation.navigate("UserProfile")}
        text="UserProfileScreen"
      />
    </ScrollView>
  );
};

export default ProfileScreen;
