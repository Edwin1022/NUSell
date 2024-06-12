import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CustomRadioButton = ({ value, gender, setGender }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
      }}
      onPress={() => {
        setGender(value);
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: gender === value ? "#007FFF" : "gray",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 5,
        }}
      >
        {gender === value && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "#007FFF",
            }}
          />
        )}
      </View>
      <Text style={{ color: "black", fontSize: 15, textAlign: "center"}}>{value}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
