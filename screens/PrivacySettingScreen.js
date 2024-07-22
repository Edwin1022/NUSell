import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import ToggleSwitch from "toggle-switch-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { IndependentButtonContext } from "../IndependentButtonContext";
import axios from "axios";
import { UserContext } from "../UserContext";

export const PrivacySettingScreen = () => {
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);

  const { buttonStates, setButtonStates, toggleButton } = useContext(
    IndependentButtonContext
  );

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
          Privacy Settings
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

  useEffect(() => {
    fetchUserData();
  }, []);
  
  useEffect(() => {
    setButtonStates((prevState) => ({
      ...prevState,
      button1: user.studentIdVisible,
      button2: user.majorVisible,
      button3: user.facultyVisible,
      button4: user.addressVisible,
      button5: user.emailVisible,
    }));
  }, [user]);

  const fetchUserData = async () => {
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

  const handleUpdate = async () => {
    axios
      .post("https://nusell.onrender.com/users/privacy", { userId, buttonStates })
      .then((response) => {
        Alert.alert("Success", "Privacy set successfully");
        fetchUserData();
        navigation.navigate("Profile");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to set privacy");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView
        style={styles.outerContainer}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView>
          <Text style={styles.headerTitle}>Allow Other Users to See</Text>
          <View style={{ margin: 20 }} />
          <View style={styles.options}>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Student Id</Text>
              <ToggleSwitch
                isOn={buttonStates["button1"]}
                onColor="#007AFF"
                offColor="#d0d0d0"
                size="large"
                onToggle={() => toggleButton(`button1`)}
              />
            </View>

            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Major</Text>
              <ToggleSwitch
                isOn={buttonStates["button2"]}
                onColor="#007AFF"
                offColor="#d0d0d0"
                size="large"
                onToggle={() => toggleButton(`button2`)}
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Faculty</Text>
              <ToggleSwitch
                isOn={buttonStates["button3"]}
                onColor="#007AFF"
                offColor="#d0d0d0"
                size="large"
                onToggle={() => toggleButton(`button3`)}
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Address</Text>
              <ToggleSwitch
                isOn={buttonStates["button4"]}
                onColor="#007AFF"
                offColor="#d0d0d0"
                size="large"
                onToggle={() => toggleButton(`button4`)}
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Email</Text>
              <ToggleSwitch
                isOn={buttonStates["button5"]}
                onColor="#007AFF"
                offColor="#d0d0d0"
                size="large"
                onToggle={() => toggleButton(`button5`)}
              />
            </View>
          </View>
          <View style={{ margin: 20 }} />
          <CustomButton onPress={() => handleUpdate()} text={"Update"} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
    alignSelf: "center",
  },
  options: {
    padding: 10,
  },
  outerContainer: {
    padding: 10,
    marginTop: -30,
  },

  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    alignItems: "center",
    margin: 10,
  },

  labels: {
    fontSize: 20,
  },
});
