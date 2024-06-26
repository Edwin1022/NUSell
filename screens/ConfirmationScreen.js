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

const ConfirmationScreen = () => {
  const { forgotEmail, setForgotEmail } = useContext(UserContext);
  const navigation = useNavigation();
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

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

  const handleConfirm = async (data) => {
    if (data.password != data["password-repeat"]) {
      Alert.alert(
        "Password Reset Failed",
        "Passwords do not match. Please try again."
      );
    }

    const user = {
      email: forgotEmail,
      verificationCode: data.code,
      newPassword: data.password,
    };

    // send a post request to the backend API
    axios
      .post("http://192.168.1.100:8000/users/resetPasswordConfirm", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Password Reset Successful",
          "You have reset your password successfully"
        );
        navigation.navigate("Login");
        setForgotEmail("");
      })
      .catch((error) => {
        console.log("password reset failed", error);
        Alert.alert(
          "Password Reset Error",
          "An error occurred during password reset"
        );
      });
  };

  const handleResendCode = () => {
    const user = {
      email: forgotEmail,
    };

    // send a post request to the backend API
    axios
      .post("http://192.168.1.100:8000/users/resetPassword", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Email Sent Successful",
          "You will receive an email containing a reset token shortly"
        );
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
              Reset Password Confirmation
            </Text>
          </View>

          <View style={{ marginTop: 60 }}>
            <CustomInput
              name="code"
              iconName="domain-verification"
              iconType="MaterialIcons"
              placeholder="Enter your Verification Code"
              control={control}
              rules={{ required: "Verification code is required" }}
            />
          </View>

          <View style={{ marginTop: 40 }}>
            <CustomInput
              name="password"
              iconName="lock1"
              iconType="AntDesign"
              secureTextEntry
              placeholder="New Password"
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

          <View style={{ marginTop: 40 }}>
            <CustomInput
              name="password-repeat"
              iconName="lock1"
              iconType="AntDesign"
              secureTextEntry
              placeholder="Confirm New Password"
              control={control}
              rules={{
                validate: (value) => value === pwd || "Password does not match",
              }}
            />
          </View>

          <View style={{ marginTop: 60 }} />

          <CustomButton onPress={handleSubmit(handleConfirm)} text="Submit" />

          <View style={{ marginTop: 10 }} />

          <CustomButton
            onPress={handleResendCode}
            text="Resend Code"
            type="SECONDARY"
          />

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

export default ConfirmationScreen;
