import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { UserContext } from "../UserContext";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { ProductContext } from "../ProductContext";

const PurchaseScreen = () => {
  const navigation = useNavigation();
  const { selectedItem } = useContext(ProductContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const { userId } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);

  const [errorDelivery, setErrorDelivery] = useState("");
  const [errorPayment, setErrorPayment] = useState("");

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.115:8000/users/addresses/${userId}`
      );
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.115:8000/users/getUserData?email=${user.email}`
      );
      setUser(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.115:8000/products/${selectedItem}`
      );
      setTotalPrice(res.data.price);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
    fetchUserData();
    fetchProductData();
    setSelectedAddress(user.defaultAddress);
  }, []);

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
          onPress={() => navigation.goBack()}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const handleContinueToPayment = () => {
    setErrorDelivery(null);

    let isValid = true;

    if (!selectedDelivery) {
      setErrorDelivery("Please select a delivery option");
      isValid = false;
    }

    if (isValid) {
      setCurrentStep(2);
    } else {
      return;
    }
  };

  const handleContinueToOrderSummary = () => {
    setErrorPayment(null);

    let isValid = true;

    if (!selectedPayment) {
      setErrorPayment("Please select a payment option");
      isValid = false;
    }

    if (isValid) {
      setCurrentStep(3);
    } else {
      return;
    }
  };

  const handlePlaceOrder = async () => {
    navigation.navigate("YourOrders");
  };

  /*const pay = async () => {
    try {
        
    } catch(error) {
        console.log("error", error)
    }
  }*/

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Pressable
                onPress={() => {
                  if (
                    (index === 0 && selectedAddress) ||
                    (index === 1 && selectedDelivery) ||
                    (index === 2 && selectedPayment)
                  ) {
                    setCurrentStep(index);
                  }
                }}
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "#007FFF" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </Pressable>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/*Address Form*/}
      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold", marginLeft: 10 }}>
            Select a Delivery Address
          </Text>

          <Pressable style={{ marginLeft: 5, marginRight: 5 }}>
            {addresses?.map((address, index) => (
              <Pressable
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginVertical: 10,
                }}
              >
                {selectedAddress && selectedAddress._id == address?._id ? (
                  <AntDesign name="checkcircle" size={24} color="#007AFF" />
                ) : (
                  <AntDesign
                    onPress={() => setSelectedAddress(address)}
                    name="checkcircleo"
                    size={24}
                    color="#007AFF"
                  />
                )}

                <View style={{ marginLeft: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
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

                  <View>
                    {selectedAddress && selectedAddress._id == address?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#007FFF",
                          width: 200,
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Deliver to this Address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}

      {/*Delivery Options*/}
      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Choose Your Delivery Options
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            {selectedDelivery == "grab" ? (
              <AntDesign name="checkcircle" size={24} color="#007AFF" />
            ) : (
              <AntDesign
                onPress={() => {
                  setSelectedDelivery("grab");
                  setShippingFee(20);
                }}
                name="checkcircleo"
                size={24}
                color="#007AFF"
              />
            )}

            <Text style={{ flex: 1, marginLeft: 10, fontSize: 15 }}>
              <Text style={{ color: "#00B14F", fontSize: 17, fontWeight: 500 }}>
                GrabExpress
              </Text>
              {"\n"}$20 - large, bulky items
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            {selectedDelivery == "lalamove" ? (
              <AntDesign name="checkcircle" size={24} color="#007AFF" />
            ) : (
              <AntDesign
                onPress={() => {
                  setSelectedDelivery("lalamove");
                  setShippingFee(5);
                }}
                name="checkcircleo"
                size={24}
                color="#007AFF"
              />
            )}

            <Text style={{ flex: 1, marginLeft: 10, fontSize: 15 }}>
              <Text style={{ color: "#FFD00D", fontSize: 17, fontWeight: 500 }}>
                Lalamove
              </Text>
              {"\n"}$5 - small items
            </Text>
          </View>

          {!!errorDelivery && (
            <Text style={{ color: "red", marginBottom: 5, marginTop: 5 }}>
              {errorDelivery}
            </Text>
          )}

          <View style={{ marginTop: 25 }} />

          <CustomButton onPress={handleContinueToPayment} text="Continue" />
        </View>
      )}

      {/*Payment Details*/}
      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Select your Payment Method
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            {selectedPayment == "paypal" ? (
              <AntDesign name="checkcircle" size={24} color="#007AFF" />
            ) : (
              <AntDesign
                onPress={() => setSelectedPayment("paypal")}
                name="checkcircleo"
                size={24}
                color="#007AFF"
              />
            )}

            <Text style={{ flex: 1, marginLeft: 10 }}>PayPal</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            {selectedPayment == "cash" ? (
              <AntDesign name="checkcircle" size={24} color="#007AFF" />
            ) : (
              <AntDesign
                onPress={() => setSelectedPayment("cash")}
                name="checkcircleo"
                size={24}
                color="#007AFF"
              />
            )}

            <Text style={{ flex: 1, marginLeft: 10 }}>Cash on Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            {selectedPayment == "card" ? (
              <AntDesign name="checkcircle" size={24} color="#007AFF" />
            ) : (
              <AntDesign
                onPress={() => setSelectedPayment("card")}
                name="checkcircleo"
                size={24}
                color="#007AFF"
              />
            )}

            <Text style={{ flex: 1, marginLeft: 10 }}>Credit/Debit Card</Text>
          </View>

          {!!errorPayment && (
            <Text style={{ color: "red", marginBottom: 5, marginTop: 5 }}>
              {errorPayment}
            </Text>
          )}

          <View style={{ marginTop: 25 }} />

          <CustomButton
            onPress={handleContinueToOrderSummary}
            text="Continue"
          />
        </View>
      )}

      {/*Order Summary*/}
      {currentStep == 3 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Place your Order
          </Text>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Shipping to
              </Text>
              <Text style={{ marginTop: 5, fontSize: 15, color: "gray" }}>
                {selectedAddress?.blockNo} {selectedAddress?.street}
              </Text>
              <Text style={{ fontSize: 15, color: "gray" }}>
                {selectedAddress?.unit} {selectedAddress?.building}
              </Text>
              <Text style={{ fontSize: 15, color: "gray" }}>
                Singapore {selectedAddress?.postalCode}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              gap: 5,
              marginVertical: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Payment Details
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500", color: "gray" }}>
                Merchandise Subtotal
              </Text>

              <Text style={{ fontSize: 15, fontWeight: "500", color: "gray" }}>
                ${totalPrice}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500", color: "gray" }}>
                Shipping Fee (
                {selectedDelivery == "grab" ? "GrabExpress" : "Lalamove"})
              </Text>

              <Text style={{ fontSize: 15, fontWeight: "500", color: "gray" }}>
                ${shippingFee}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                Total Payment
              </Text>

              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#007AFF" }}
              >
                ${totalPrice + shippingFee}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#D0D0D0",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              marginVertical: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Pay with</Text>
              <Text style={{ marginTop: 5, fontSize: 15, color: "gray" }}>
                {selectedPayment == "paypal"
                  ? "Pay Online (PayPal)"
                  : selectedPayment == "cash"
                  ? "Pay on delivery (Cash)"
                  : "Pay Online (Credit/Debit Card)"}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 25 }} />

          <CustomButton onPress={handlePlaceOrder} text="Place Order" />
        </View>
      )}
    </ScrollView>
  );
};

export default PurchaseScreen;
