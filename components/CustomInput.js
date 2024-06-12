import React from "react";
import { View, TextInput, Text } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  iconName,
  iconType,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
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
              marginTop: 30,
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
              secureTextEntry={secureTextEntry}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder={placeholder}
            />
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
