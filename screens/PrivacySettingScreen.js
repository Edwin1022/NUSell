import { View, Text, ScrollView, Pressable, Alert, StyleSheet, KeyboardAvoidingView } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { UserContext } from "../UserContext";
import ToggleSwitch from 'toggle-switch-react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const PrivacySettingScreen = () => {
  const navigation = useNavigation();

  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false,
  });

  useEffect(() => {
    const loadButtonStates = async () => {
      try {
        const savedStates = await AsyncStorage.getItem('buttonStates');
        if (savedStates) {
          setButtonStates(JSON.parse(savedStates));
        }
      } catch (error) {
        console.error('Failed to load button states:', error);
      }
    };

    loadButtonStates();
  }, []);

  useEffect(() => {
    const saveButtonStates = async () => {
      try {
        await AsyncStorage.setItem('buttonStates', JSON.stringify(buttonStates));
      } catch (error) {
        console.error('Failed to save button states:', error);
      }
    };

    saveButtonStates();
  }, [buttonStates]);

  const toggleButton = (button) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems:"center" }}>
      <ScrollView style={styles.outerContainer} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <Text style={styles.headerTitle}>Allow Other Users to See</Text>
          <View style={styles.options}>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Student Id</Text>
              <ToggleSwitch
                isOn={buttonStates["button1"]}
                onColor="#32cd32"
                offColor="#dc3545"
                size="large"
                onToggle={() => toggleButton(`button1`) }
              />
            </View>
            
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Major</Text>
              <ToggleSwitch
                isOn={buttonStates["button2"]}
                onColor="#32cd32"
                offColor="#dc3545"
                size="large"
                onToggle={()=> toggleButton(`button2`) }
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Faculty</Text>
              <ToggleSwitch
                isOn={buttonStates["button3"]}
                onColor="#32cd32"
                offColor="#dc3545"
                size="large"
                onToggle={()=> toggleButton(`button3`) }
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Address</Text>
              <ToggleSwitch
                isOn={buttonStates["button4"]}
                onColor="#32cd32"
                offColor="#dc3545"
                size="large"
                onToggle={()=> toggleButton(`button4`) }
              />
            </View>
            <View style={styles.optionContainer}>
              <Text style={styles.labels}>Email</Text>
              <ToggleSwitch
                isOn={buttonStates['button5']}
                onColor="#32cd32"
                offColor="#dc3545"
                size="large"
                onToggle={()=> toggleButton(`button5`) }
              />
            </View>
          </View>
          <CustomButton
            onPress={() => doSomething()}
            text={"Update"}
          />
          
        </KeyboardAvoidingView>

      </ScrollView>
      
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center"
  },
  options: {
    padding: 10
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
    margin: 10
  }, 

  labels: {
    fontSize: 20,
  }
});
