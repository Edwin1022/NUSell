import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomRadioButton from "../components/CustomRadioButton";
import Back from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import ModalScreen from "./ModalScreen";
import { UserContext } from "../UserContext";
import CustomButton from "../components/CustomButton";

const YourAccountScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [teleHandle, setTeleHandle] = useState("");
  const [studentId, setStudentId] = useState("");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const navigation = useNavigation();

  const placeholderImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAM1BMVEXFzeD////Byt7L0uPByd7Q1+b7/P3j5/Dv8fbe4+3r7vTFzuDL0+P19/rn6/LZ3urW2+lU+LHUAAAFLklEQVR4nO2dC3arMAxEQXwCcfjsf7XPkLw2tEka5AEziu8CeuKpJVmyLLIskUgkEkdFbsT+HXEQKbNqOPWN59y72D9nd/z/vWqbOv/mozSY9n116vIl1acYg1++G9v+5/rzvMs+QwL/7x/O9a/lT5zL2D9uF7wAzcP1e+pP2AQi4/mZAJ6TfQ3EtY9N4D+jdQ2k6F8K4OltayDFKyP4cghmI6PzVvDnHrDuEqR9UwFPY1IEufw+C72yh8LeIUFOaxSY6K0dFt2qTXDDVJCUi0IBT2vHHmTUSWAnPjgZtBJ4p2BjJ4RIYCSHlCpEAi+CAXMowiSwIIJoguKSE7k5rD8aPWDg3gnKg8EPLrGXEUL5tGC2ijr2OkIIjAlfEJdVBLMNcmprQEnAW09YUzT5C9aNADgbfMGaPQlOgrwj1cAlDZIGGVYD2ktIpAasiRNQgzxpkOektoCMjUkDT+zFaEFqwNqohtSgiL0YHcHlVAMaoCooM6SJo/qK7RGk+yBpkGVBl2w2NAi7aEwamNEAWE5MGiQNkgZJg6RB0sCEBoj+C3YN0j5IGkyks3LKnSegdaSkQdIgaUCtwcf7RJHy02OjVG3/+knvSlxJd+uK7Emb6eqOrQVBoJvgCtu16xYasF23QXsPWDVI+yArN9CALTyW6LhAqAE8NuaEcQH2fOMbtkNS+e7IC8MaYIuJM3TnRGwxcYbvPQ+0eDBD95TFIRv3rwyx17Qa/EGRbmqSAz1xvSP2ktaDvW3MOV9xoJ0i43tftEPgc4n4U1Ls9ajAbgTOkSCh02AW1GxJ4w2gCKwSIAspF0pLmIB5BNaXvhnwnMSXMn6DqrBzBoUrqKoiXdp8B6qqWMVeSADyzijhNyDeBiinyOwSUc95uAemYZ66sl0wLYGcFPmK6gsgCTRzZJxAlJe5TQFyQiA3hQxRVuSOChPBXrEW2trBf/RDts1sg+C8iXZA1oKwc9IY++dDCDojUKcKd5T67JF6ou4C9SHBhjO4os2hiWupv1Hm0JY00LpFKx5xQmsLpjRQdisy19R/om3MsaSB9rxsSgOdBKY00E5SZOxBeoa2kGJJA+01gyEN1JmjJQ20jxnYq+p3qPNGQxqo66qtHQ3UfUlJA0MalKJ+8NnyPfh/hFzOnbpFr6vP7JeNGaALw0BJMfzemT4+IhqSYq8hFESDInNj3ky4BPSXroieLPZDAuI7nuROsUS84iAvqKmT5gWxVxEIQgJuY8BsA+6NgPmyMXVkQHXuM+cMuBEIjO98Z4K78r5pOFtVpWiRn7Qd+aop5QU9AqJuMyYVRKoNJkT58OD/cuy1vYUX4LTBvLgrzVAcXwYpthPgSjcc2ybkgjoRvKQvjqrCVl7gEU11RJMQGTeYFvicbjyaCnsrMFG3R1JBsnZjR/hEhf4gJiHi0NOg1nCOL8OejvAJ3RBTBScy7O4GHlCfXCwV4hrBkvMlQmYpZXQjWLJ7sJTyEEawZNfMsowUC/+m38kxiNtgbDCMZgfHIMUuaVEA3cYnBnx5aAu8e9xMASkYFJjoNpo/K+7oVnBPg68xuKw8zoHoPXp0pCzHg0bDV0CTa3EsjmBJjUunsB9u35Ua08wkGecmuIEIEVIReoIFwTf38JHhEQgcxuqOlx4qCBFBCnY7uKH/uhV0SHRU9CNFUO1EB0A9TMKIIczoggP+QxpRUQ0cM+MMrmiezG7x0bmoKDYCZhLqgVjf8WvhfLhkfaPnFt/di8zq6XNbfIczMqsHDW3xTdrYPFvrP7kiUsVMV4ODAAAAAElFTkSuQmCC";

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
          Your Account
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

  // retrieve user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `https://nusell.onrender.com/users/getUserData?email=${user.email}`
        );
        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user.gender) {
      setGender(user.gender);
    }
    if (user.mobileNo) {
      setMobileNo(user.mobile);
    }
    if (user.image) {
      setImage(user.image);
    } else {
      setImage(placeholderImage);
    }
  }, []);

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

  // allow users to reset their passwords
  const handleResetPassword = () => {
    clearAuthToken();
  };

  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("ForgotPassword");
  };

  const handleUpdateProfile = async () => {
    const updatedUser = {
      email: user.email,
      image: image || user.image,
      name: name || user.name,
      gender: gender || user.gender,
      mobileNo: mobileNo || user.mobileNo,
      teleHandle: teleHandle || user.teleHandle,
      studentId: studentId || user.studentId,
      faculty: faculty || user.faculty,
      major: major || user.major,
    };

    setUser(updatedUser);

    try {
      const formData = new FormData();
      formData.append("user", JSON.stringify(updatedUser));
      formData.append("image", {
        uri: image,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      // send a post request to the backend API
      const response = await axios.put(
        "https://nusell.onrender.com/users/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Alert.alert(
        "Profile Update Successful",
        "You have updated your profile successfully"
      );
    } catch (error) {
      console.log("profile update failed", error);
      Alert.alert(
        "Profile Update Error",
        "An error occurred during profile update"
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: 20 }} />

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 10,
                color: "#041E42",
              }}
            >
              Edit Your Profile
            </Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                right: 105,
                zIndex: 1,
                bottom: 5,
                height: 36,
                width: 36,
                backgroundColor: "#0163D2",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 18,
              }}
            >
              <Back name="camera" size={22} style={{ color: "white" }} />
            </View>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ModalScreen
                image={image}
                placeholderImage={placeholderImage}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCameraPress={uploadImage}
                onImagePress={() => uploadImage("gallery")}
                onDeletePress={removeImage}
              />
              <Avatar.Image
                size={140}
                style={{
                  borderRadius: 80,
                  marginTop: 30,
                  backgroundColor: "white",
                  height: 160,
                  width: 160,
                  padding: 8,
                  borderColor: "#ccc",
                  borderWidth: 1,
                  elevation: 4,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={image ? { uri: image } : { uri: placeholderImage }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Name
              </Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder={user.name}
                placeholderTextColor={"#999797"}
                maxLength={24}
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              />
            </View>
          </View>

          <View style={{ marginTop: 30 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Gender
              </Text>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomRadioButton
                    value={"Male"}
                    gender={gender}
                    setGender={setGender}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CustomRadioButton
                    value={"Female"}
                    gender={gender}
                    setGender={setGender}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Student Id
              </Text>
              <TextInput
                value={studentId}
                onChangeText={(text) => setStudentId(text)}
                placeholder={user.studentId || "Eg. A1234567B"}
                placeholderTextColor={"#999797"}
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Faculty
              </Text>
              <TextInput
                value={faculty}
                onChangeText={(text) => setFaculty(text)}
                placeholder={user.faculty || "Eg. School of Computing"}
                placeholderTextColor={"#999797"}
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Major
              </Text>
              <TextInput
                value={major}
                onChangeText={(text) => setMajor(text)}
                placeholder={user.major || "Eg. Computer Science"}
                placeholderTextColor={"#999797"}
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Mobile No.
              </Text>
              <TextInput
                value={mobileNo}
                onChangeText={(text) => setMobileNo(text)}
                placeholder={user.mobileNo || "xxxxxxxx"}
                placeholderTextColor={"#999797"}
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Telegram Handle
              </Text>
              <TextInput
                value={teleHandle}
                onChangeText={(text) => setTeleHandle(text)}
                placeholder={user.teleHandle || "Eg. @edwin_1022"}
                placeholderTextColor={"#999797"}
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Email
              </Text>
              <Text
                style={{
                  color: "#999797",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {user.email}
              </Text>
            </View>
          </View>

          <Text
            style={{
              marginTop: 5,
              marginLeft: 20,
              marginRight: 20,
              textAlign: "left",
            }}
          >
            Do note that{" "}
            <Text style={{ fontWeight: "bold", color: "#007FFF" }}>email</Text>{" "}
            is{" "}
            <Text style={{ fontWeight: "bold", color: "red" }}>
              not changeable
            </Text>
            {". "}
          </Text>

          <View
            style={{
              marginTop: 30,
            }}
          >
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text
                style={{ color: "#7d7c7c", fontSize: 16, fontWeight: "400" }}
              >
                Password
              </Text>
              <Pressable onPress={handleResetPassword}>
                <Text
                  style={{
                    color: "#007FFF",
                    fontWeight: "bold",
                    marginRight: 20,
                  }}
                >
                  ********
                </Text>
              </Pressable>
            </View>

            <Text
              style={{
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
                textAlign: "left",
              }}
            >
              Click on your{" "}
              <Text style={{ fontWeight: "bold", color: "#007FFF" }}>
                password
              </Text>{" "}
              above to reset your{" "}
              <Text style={{ fontWeight: "bold", color: "#007FFF" }}>
                password
              </Text>
              {". "}
              Do note that resetting your{"\n"}
              <Text style={{ fontWeight: "bold", color: "#007FFF" }}>
                password
              </Text>{" "}
              will{" "}
              <Text style={{ fontWeight: "bold", color: "red" }}>
                log you out
              </Text>{" "}
              from this account.
            </Text>
          </View>

          <View style={{ marginTop: 50 }} />

          <CustomButton
            onPress={handleUpdateProfile}
            text="Update Your Profile"
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YourAccountScreen;
