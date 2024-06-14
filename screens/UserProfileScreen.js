import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { UserContext } from "../UserContext";
import axios from "axios";

const UserProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
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
            marginLeft: 10,
          }}
        >
          User Profile
        </Text>
      ),
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  // retrieve user data from the backend
  useEffect(() => {
    axios
      .get(`http://192.168.0.110:8000/users/getUserData?email=${user.email}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: 20 }}></View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 10,
                color: "#041E42",
              }}
            >
              {user.name}'s Profile
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Avatar.Image
              size={140}
              style={{
                borderRadius: 80,
                marginTop: 30,
                backgroundColor: "white",
                height: 160,
                width: 160,
                padding: 8,
                borderColor: "#ccc",
                borderWidth: 1,
                elevation: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
              source={{ uri: user.image }}
            />
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Name
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.name}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Gender
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.gender}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Student Id
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.studentId}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Faculty
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.faculty}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Major
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.major}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#7d7c7c",
                  fontSize: 16,
                  fontWeight: "400",
                  marginRight: 60,
                }}
              >
                Address
              </Text>

              <View
                style={{
                  padding: 10,
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    textAlignVertical: "center",
                    textAlign: "right",
                    marginRight: 20,
                  }}
                >
                  {user.defaultAddress?.blockNo} {user.defaultAddress?.street}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    textAlignVertical: "center",
                    textAlign: "right",
                    marginRight: 20,
                  }}
                >
                  {user.defaultAddress?.unit} {user.defaultAddress?.building}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    textAlignVertical: "center",
                    textAlign: "right",
                    marginRight: 20,
                  }}
                >
                  Singapore {user.defaultAddress?.postalCode}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Mobile No.
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.mobileNo}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Telegram Handle
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.teleHandle}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Email
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.email}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Rating
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.rating == 0 ? "-" : user.rating}
              </Text>
            </View>

            <View style={{ marginTop: 50 }} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
