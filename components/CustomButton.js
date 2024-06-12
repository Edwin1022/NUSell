import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },

  container_PRIMARY: {
    backgroundColor: "#007FFF",
  },

  container_SECONDARY: {
    width: 170,
  },

  container_TERTIARY: {
    width: 300,
  },

  text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  text_SECONDARY: {
    color: "#007FFF",
    fontSize: 15,
  },

  text_TERTIARY: {
    color: "gray",
    fontWeight: "normal",
  },
});

export default CustomButton;
