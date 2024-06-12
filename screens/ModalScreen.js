import { Button, Modal, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ModalScreen = ({
  image,
  placeholderImage,
  isVisible,
  onClose,
  onCameraPress,
  onImagePress,
  onDeletePress,
}) => {
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
            borderRadius: 10,
            padding: 20,
            width: "80%",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#007bff",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={onCameraPress}
          >
            <MaterialCommunityIcons name="camera" size={24} color="white" />
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Take Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#007bff",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginBottom: 10,
            }}
            onPress={onImagePress}
          >
            <MaterialCommunityIcons name="image" size={24} color="white" />
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                marginLeft: 10,
              }}
            >
              Choose from Gallery
            </Text>
          </TouchableOpacity>

          {image != placeholderImage && (
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#dc3545",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginBottom: 10,
                },
              ]}
              onPress={onDeletePress}
            >
              <MaterialCommunityIcons name="delete" size={24} color="white" />
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Remove
              </Text>
            </TouchableOpacity>
          )}

          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalScreen;
