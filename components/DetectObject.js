import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import CustomButton from "./CustomButton";
import ModalScreen from "../screens/ModalScreen";

const DetectObject = () => {
  const [image, setImage] = useState();
  const [labels, setLabels] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // allow users to upload their profile pictures
  const uploadImage = async (mode) => {
    try {
      let result = {};

      if (mode == "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled) {
        // save image
        setImage(result.assets[0].uri);
        setModalVisible(false);
      }
    } catch (error) {
      Alert.alert("Error uploading image: " + error.message);
      setModalVisible(false);
    }
  };

  // allow users to delete their profile pictures
  const removeImage = async () => {
    try {
      setImage(placeholderImage);
      setModalVisible(false);
    } catch ({ message }) {
      Alert.alert(message);
      setModalVisible(false);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!image) {
        Alert.alert("Please select an image first!!");
        return;
      }

      const apiKey = "AIzaSyAaJRcyT4CBEtGydOxCx9Cl1gcvGaAN2Xk";
      const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      // read the image file from local URI and convert it to base64
      const base64ImageData = await FileSystem.readAsStringAsync(image, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64ImageData,
            },
            features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
          },
        ],
      };

      const apiResponse = await axios.post(apiURL, requestData);
      setLabels(apiResponse.data.responses[0].labelAnnotations);
    } catch (error) {
      console.error("Error analyzing image: ", error);
      Alert.alert("Error analyzing image. Please try again later");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Cloud Vision API</Text>

      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}

      <View style={{ marginTop: 50 }} />

      <CustomButton
        onPress={() => setModalVisible(true)}
        text="Upload an image"
      />

      <ModalScreen
        image={image}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCameraPress={uploadImage}
        onImagePress={() => uploadImage("gallery")}
        onDeletePress={removeImage}
      />

      <View style={{ marginTop: 10 }} />

      <CustomButton onPress={analyzeImage} text="Analyze image" />

      {labels.length > 0 && (
        <View>
          <Text style={styles.label}>Labels:</Text>
          {labels.map((label) => (
            <Text key={label.mid} style={styles.outputText}>
              {label.description}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default DetectObject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "Bold",
    marginBottom: 50,
    marginTop: 100,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  outputText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
