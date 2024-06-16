import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { UserContext } from "../UserContext";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState("");
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
          Your Addresses
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

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.110:8000/users/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDefaultAddress = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.110:8000/users/getDefaultAddress/${userId}`
      );
      const { defaultAddress } = response.data;
      setDefaultAddress(defaultAddress);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchDefaultAddress();
  }, []);

  // refresh the addresses when the component comes to the focus ie when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const handleRemoveAddress = (addressId) => {
    const updatedAddresses = addresses.filter(
      (address) => address.id !== addressId
    );

    setAddresses(updatedAddresses);

    axios
      .put("http://192.168.0.110:8000/users/addresses", {
        userId,
        updatedAddresses,
      })
      .then((response) => {
        Alert.alert("Success", "Addresses deleted successfully");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to delete address");
        console.log(error);
      });
  };

  const handleSetAddressAsDefault = (addressId) => {
    const defaultAddressId = addressId;
    const defaultAddress = addresses.find(
      (address) => address.id === addressId
    );

    setDefaultAddress(defaultAddress);

    axios
      .post("http://192.168.0.110:8000/users/setDefaultAddress", {
        userId,
        defaultAddressId,
        defaultAddress,
      })
      .then((response) => {
        Alert.alert("Success", "Default address set successfully");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to set default address");
        console.log(error);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 10 }}>
        <Pressable
          onPress={() => navigation.navigate("AddAddress")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ marginLeft: 20 }}>Add a new Address</Text>
          <MaterialIcons
            style={{ marginRight: 20 }}
            name="keyboard-arrow-right"
            size={24}
            color="black"
          />
        </Pressable>

        <Pressable style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>
          {addresses?.map((address, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  <MaterialIcons
                    name="location-pin"
                    size={24}
                    color="#007AFF"
                  />
                </Text>
              </View>
              
              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.blockNo} {address?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.unit} {address?.building}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Singapore {address?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  onPress={() => handleRemoveAddress(address?._id)}
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  onPress={() => handleSetAddressAsDefault(address?._id)}
                  style={{
                    backgroundColor:
                      defaultAddress?._id === address?.id
                        ? "#007AFF"
                        : "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text
                    style={{
                      color: defaultAddress?._id === address?._id ? "white" : "black",
                    }}
                  >
                    Set as Default
                  </Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;
