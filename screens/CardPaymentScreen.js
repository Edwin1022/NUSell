import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const CardPaymentScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    user,
    orderItem,
    status,
    subtotal,
    shippingFee,
    totalPrice,
    shippingAddress,
    paymentMethod,
  } = route.params;
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePlaceOrder = async () => {
    axios
      .post("http://172.20.10.11:8000/orders", {
        email,
        user,
        orderItem,
        status,
        subtotal,
        shippingFee,
        totalPrice,
        shippingAddress,
        paymentMethod,
      })
      .then((response) => {
        Alert.alert("Success", "Order placed successfully");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to place order");
        console.log(error);
      });
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      "http://172.20.10.11:8000/orders/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      }
    );

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePay = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter complete card details and email.");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) {
        console.log("Unable to process payment", error);
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
          paymentMethodType: "Card",
        });
        if (error) {
          Alert.alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          Alert.alert("Payment Successful");
          handlePlaceOrder();
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Enter your Email"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />

      <CardField
        postalCodeEnabled={true}
        placeholder={{ number: "4242 4242 4242 4242" }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />

      <Button onPress={handlePay} title="Pay" disabled={loading} />
    </View>
  );
};

export default CardPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
