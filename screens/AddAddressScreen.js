import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import Back from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { UserContext } from "../UserContext";
import axios from "axios";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { control, handleSubmit } = useForm();
  const { userId } = useContext(UserContext);

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
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.navigate("AddAddress")}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  const handleAddAddress = (data) => {
    const address = {
      blockNo: data.blockNo,
      street: data.street,
      unit: data.unit || "",
      building: data.building || "",
      postalCode: data.postalCode,
    };

    axios
      .post("http://192.168.0.110:8000/users/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Addresses added successfully");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to add address");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
              Add a new Address
            </Text>
          </View>

          <View style={{ flexDirection: "column", marginTop: 30 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              Block/Unit No{" "}
            </Text>
            <CustomInput
              name="blockNo"
              iconName="numbers"
              iconType="MaterialIcons"
              placeholder="Enter your Block/Unit No"
              control={control}
              rules={{
                required: "Block/Unit No is required",
              }}
            />
          </View>

          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              Street
            </Text>
            <CustomInput
              name="street"
              iconName="edit-road"
              iconType="MaterialIcons"
              placeholder="Eg. Marlow Street"
              control={control}
              rules={{
                required: "Street is required",
              }}
            />
          </View>

          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              Unit <Text style={{ fontWeight: "normal" }}>(Optional)</Text>
            </Text>
            <CustomInput
              name="unit"
              iconName="house"
              iconType="MaterialIcons"
              placeholder="#[Unit Level]-[Unit No.]  Eg. #12-05"
              control={control}
              rules={{}}
            />
          </View>

          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              Apartment/ Building Name{" "}
              <Text style={{ fontWeight: "normal" }}>(Optional)</Text>
            </Text>
            <CustomInput
              name="building"
              iconName="apartment"
              iconType="MaterialIcons"
              placeholder="Eg. Clife Parkview"
              control={control}
              rules={{}}
            />
          </View>

          <View style={{ flexDirection: "column", marginTop: 20 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5 }}>
              Postal Code
            </Text>
            <CustomInput
              name="postalCode"
              iconName="local-post-office"
              iconType="MaterialIcons"
              placeholder="Enter your Postal Code"
              control={control}
              rules={{
                required: "Postal Code is required",
              }}
            />
          </View>

          <View style={{ marginTop: 50 }} />

          <CustomButton
            onPress={handleSubmit(handleAddAddress)}
            text="Add Address"
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;
