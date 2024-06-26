import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../assets/images/NUSell_app_icon.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "react-native-check-box";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";

const LoginScreen = () => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
          NUSell
        </Text>
      ),
    });
  }, [navigation]);

  // keep users logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const keepLoggedInValue = await AsyncStorage.getItem("keepLoggedIn");

        if (keepLoggedInValue != null) {
          setKeepLoggedIn(JSON.parse(keepLoggedInValue));
        }

        if (token && JSON.parse(keepLoggedInValue)) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("error message", error);
      }
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("http://192.168.1.100:8000/users/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("keepLoggedIn", JSON.stringify(keepLoggedIn));
        navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Login Error", "Invalid Email or Password");
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Image source={Logo} style={{ width: 150, height: 150 }} />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#041E42",
              }}
            >
              Login to your Account
            </Text>
          </View>

          <View style={{ marginTop: 80 }}>
            <CustomInput
              name="email"
              iconName="email"
              iconType="MaterialIcons"
              placeholder="Enter your Email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Email is invalid",
                },
              }}
            />
          </View>

          <View style={{ marginTop: 40 }}>
            <CustomInput
              name="password"
              iconName="lock1"
              iconType="AntDesign"
              placeholder="Enter your Password"
              secureTextEntry
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Password should be no longer than 24 characters",
                },
              }}
            />
          </View>

          <View
            style={{
              marginTop: 3,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <CheckBox
              isChecked={keepLoggedIn}
              onClick={() => setKeepLoggedIn(!keepLoggedIn)}
              checkBoxColor="gray"
            />
            <Text style={{ marginLeft: 5, flex: 1 }}>Keep me logged in</Text>

            <CustomButton
              onPress={() => navigation.navigate("ForgotPassword")}
              text="Forgot Password"
              type="SECONDARY"
            />
          </View>

          <View style={{ marginTop: 60 }} />

          <CustomButton onPress={handleSubmit(handleLogin)} text="Login" />

          <View style={{ marginTop: 10 }} />

          <CustomButton
            onPress={() => navigation.navigate("Register")}
            text="Don't have an account? Sign Up"
            type="TERTIARY"
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
