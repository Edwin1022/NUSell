import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import DetectObject from "../components/DetectObject";
import axios from "axios";

const HomeScreen = () => {
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

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
