import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

const RatingModal = ({ username, userId, isVisible, onClose }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    axios
      .post("http://192.168.0.110:8000/users/rateUser", {
        userId,
        rating,
      })
      .then((response) => {
        Alert.alert("Success", "Rate user successfully");
        onClose();
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to rate user");
        console.log(error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 30,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 500, marginBottom: 20 }}>
            Rate {username}
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <TouchableOpacity key={item} onPress={() => handleRating(item)}>
                <AntDesign
                  name={item <= rating ? "star" : "staro"}
                  size={32}
                  color={item <= rating ? "#007AFF" : "black"}
                  style={{ marginHorizontal: 5 }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Button title="Submit" onPress={handleSubmit} />

          <View style={{ marginTop: 10 }} />

          <Button title="Close" onPress={onClose} color="black" />
        </View>
      </View>
    </Modal>
  );
};

export default RatingModal;
