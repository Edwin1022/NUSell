import React from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const CustomInput = ({
  control,
  name,
  iconName,
  iconType,
  rules = {},
  placeholder,
  secureTextEntry,
  hidable,
}) => {

  const [buttonStates, setButtonStates] = useState({});
  const isPasswordVisible = buttonStates[name];

  const toggleButton = (button) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [button]: !prevStates[button], // Toggle the state of the specific button
    }));
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, },
        fieldState: { error },
      }) => (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
            }}
          >
            {iconType === "MaterialIcons" ? (
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name={iconName}
                size={24}
                color="gray"
              />
            ) : (
              <AntDesign
                style={{ marginLeft: 8 }}
                name={iconName}
                size={24}
                color="gray"
              />
            )}

            <TextInput
              value={value}
              onChangeText={onChange}
              secureTextEntry={hidable && !isPasswordVisible}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 270,
                fontSize: 16,
              }}
              placeholder={placeholder}
            />
            {hidable ? 
            <Pressable onPress={()=> toggleButton(name)}>
              {isPasswordVisible ? <Ionicons name="eye" size={16} color={"#808080"} style={{marginRight: 8}}/> : <Ionicons name="eye-outline" size={16} color={"#808080"} style={{marginRight: 8}}/>}
            </Pressable> : 
            <View></View>}
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;
