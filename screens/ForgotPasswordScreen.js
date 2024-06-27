import {
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import Logo from "../assets/images/NUSell_app_icon.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../UserContext";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";

const ForgotPasswordScreen = () => {
  const { setForgotEmail } = useContext(UserContext);
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();

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

  const handleResetPassword = async (data) => {
    const user = {
      email: data.email,
    };

    // send a post request to the backend API
    axios
      .post("http://192.168.0.115:8000/users/resetPassword", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Email Sent Successful",
          "You will receive an email containing a reset token shortly"
        );
        setForgotEmail(data.email);
        navigation.navigate("Confirmation");
      })
      .catch((error) => {
        console.log("reset password failed", error);
        Alert.alert(
          "Error Sending Email",
          "An error occurred while sending email"
        );
      });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsHorizontalScrollIndicator={false}>
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
              Reset your Password
            </Text>
          </View>

          <View style={{ marginTop: 50 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Enter your email address below to reset {"\n"} your password.
              </Text>
            </View>
          </View>

          <View
            style={{ marginTop: 40, marginLeft: "auto", marginRight: "auto" }}
          >
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

          <View style={{ marginTop: 70 }} />

          <CustomButton
            onPress={handleSubmit(handleResetPassword)}
            text="Reset Password"
          />

          <View style={{ marginTop: 10 }} />

          <CustomButton
            onPress={() => navigation.navigate("Login")}
            text="Back to Login"
            type="TERTIARY"
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
