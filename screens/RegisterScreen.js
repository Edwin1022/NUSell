import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useLayoutEffect } from "react";
import Logo from "../assets/images/NUSell_app_icon.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

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
  }, []);

  const handleRegister = async (data) => {
    if (data.password != data["password-repeat"]) {
      Alert.alert(
        "Password Reset Failed",
        "Passwords do not match. Please try again."
      );
      return;
    }

    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // send a post request to the backend API
    axios
      .post("http://192.168.0.115:8000/users/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successful",
          "You have registered successfully"
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("registration failed", error);
        Alert.alert("Registration Error", "Email is already registered");
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
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
              Register an Account
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <CustomInput
              name="name"
              iconName="person"
              iconType="MaterialIcons"
              placeholder="Enter your Name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 8,
                  message: "Name should be at least 8 characters long",
                },
                maxLength: {
                  value: 24,
                  message: "Name should be no longer than 24 characters",
                },
              }}
            />
          </View>

          <View style={{ marginTop: 10 }}>
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

          <View style={{ marginTop: 10 }}>
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

          <View style={{ marginTop: 10 }}>
            <CustomInput
              name="password-repeat"
              iconName="lock1"
              iconType="AntDesign"
              placeholder="Confirm Password"
              secureTextEntry
              control={control}
              rules={{
                validate: (value) => value === pwd || "Password does not match",
              }}
            />
          </View>

          <View style={{ marginTop: 50 }} />

          <CustomButton
            onPress={handleSubmit(handleRegister)}
            text="Register"
          />

          <View style={{ marginTop: 10 }} />

          <CustomButton
            onPress={() => navigation.navigate("Login")}
            text="Already have an account? Sign In"
            type="TERTIARY"
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
