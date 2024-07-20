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
  StyleSheet
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
import { Ionicons } from "@expo/vector-icons";

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
        const res = await axios.put(
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
    if (user.image) {
      setImage(user.imageUrl);
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

  const [errorMobileNo, setErrorMobileNo] = useState("");
  const [errorTeleHandle, setErrorTeleHandle] = useState("");
  const [errorUsername, setErrorUsername] = useState("");

  function countCharsWithoutSpaces(text) {
    // Remove spaces from the string
    const textWithoutSpaces = text.replace(/\s+/g, '');
    // Return the length of the modified string
    return textWithoutSpaces.length;
  }
  
  const handleUpdateProfile = async () => {

    setErrorMobileNo(null);
    setErrorTeleHandle(null);
    setErrorUsername(null);

    let isValid = true;

    if (name !== "" && countCharsWithoutSpaces(name) == 0) {
      setErrorUsername("Username is required")
      isValid=false;
    }

    //if mobileNo is spacebar mobileNo === "" will return false
    if (mobileNo !== "" && countCharsWithoutSpaces(mobileNo) == 0) {
      setErrorMobileNo("Please provide a mobile number for contact")
      isValid=false;
    }

    if (teleHandle !== "" && countCharsWithoutSpaces(teleHandle) == 0) {
      setErrorTeleHandle("Please provide a Telegram Handle for contact")
      isValid=false;
    }
   
    if (isValid) {
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
        setErrorMobileNo(null);
        setErrorTeleHandle(null);
        setErrorUsername(null);
      } catch (error) {
        console.log("profile update failed", error);
        Alert.alert(
          "Profile Update Error",
          "An error occurred during profile update"
        );
      }
    } 
  };

  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false,
  });

  useEffect(() => {
    const loadButtonStates = async () => {
      try {
        const savedStates = await AsyncStorage.getItem('buttonStates');
        if (savedStates) {
          setButtonStates(JSON.parse(savedStates));
        }
      } catch (error) {
        console.error('Failed to load button states:', error);
      }
    };

    loadButtonStates();
  }, []);

  useEffect(() => {
    const saveButtonStates = async () => {
      try {
        await AsyncStorage.setItem('buttonStates', JSON.stringify(buttonStates));
      } catch (error) {
        console.error('Failed to save button states:', error);
      }
    };

    saveButtonStates();
  }, [buttonStates]);

  const toggleButton = (button) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.randomMargin} />
        <KeyboardAvoidingView>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.editProfiletext}>Edit Your Profile</Text>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.cameraIcon}>
              <Back name="camera" size={22} style={{ color: 'white' }} />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ModalScreen
                image={image}
                placeholderImage={placeholderImage}
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCameraPress={uploadImage}
                onImagePress={() => uploadImage('gallery')}
                onDeletePress={removeImage}
              />
              <Avatar.Image
                size={140}
                style={styles.profilePicContainer}
                source={image ? { uri: image } : { uri: placeholderImage }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name<Text style={{color: "red"}}>*</Text></Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder={user.name}
                placeholderTextColor="#999797"
                maxLength={24}
                style={styles.textInput}
              />
            </View>
            {!!errorUsername && <Text style={styles.error}>{errorUsername}</Text>}
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.radioContainer}>
                  <CustomRadioButton value="Male" gender={gender} setGender={setGender} />
                </View>
                <View style={styles.radioContainer}>
                  <CustomRadioButton value="Female" gender={gender} setGender={setGender} />
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <View style={styles.fieldsContainer}>
                <Text style={styles.label}>Student Id</Text>
                <Pressable onPress={() => toggleButton("button1")}>
                  {buttonStates["button1"]? <Ionicons name="eye" size={16} color={"#808080"}/> : <Ionicons name="eye-outline" size={16} color={"#808080"}/>}
                </Pressable>
              </View>
              
              <TextInput
                value={studentId}
                onChangeText={(text) => setStudentId(text)}
                placeholder={ buttonStates["button1"] ? user.studentId.replace(/\d/g, '*') :( user.studentId || 'Eg. A1234567B')}
                placeholderTextColor="#999797"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <View style={styles.fieldsContainer}>
                <Text style={styles.label}>Faculty</Text>
                <Pressable onPress={() => toggleButton("button2")}>
                  {buttonStates["button2"] ? <Ionicons name="eye" size={16} color={"#808080"}/> : <Ionicons name="eye-outline" size={16} color={"#808080"}/>}
                </Pressable>
              </View>
              <TextInput
                value={faculty}
                onChangeText={(text) => setFaculty(text)}
                placeholder={ buttonStates["button2"] ? user.faculty.replace(/[a-zA-Z]/g, '*') :( user.faculty || 'Eg. School of Computing')}
                placeholderTextColor="#999797"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <View style={styles.fieldsContainer}>
                <Text style={styles.label}>Major</Text>
                <Pressable onPress={() => toggleButton("button3")}>
                  {buttonStates["button3"] ? <Ionicons name="eye" size={16} color={"#808080"}/> : <Ionicons name="eye-outline" size={16} color={"#808080"}/> }
                </Pressable>
              </View>
              <TextInput
                value={major}
                onChangeText={(text) => setMajor(text)}
                placeholder={ buttonStates["button3"]? user.major.replace(/[a-zA-Z]/g, '*') :( user.major || 'Eg. Computer Science')}
                placeholderTextColor="#999797"
                style={styles.textInput}
              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile No.<Text style={{color: "red"}}>*</Text></Text>
              <TextInput
                value={mobileNo}
                onChangeText={(text) => setMobileNo(text)}
                placeholder={user.mobileNo || 'xxxxxxxx'}
                placeholderTextColor="#999797"
                style={styles.textInput}
                keyboardType="numeric"
              />
            </View>
            {!!errorMobileNo && <Text style={styles.error}>{errorMobileNo}</Text>}
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telegram Handle<Text style={{color: "red"}}>*</Text></Text>
              <TextInput
                value={teleHandle}
                onChangeText={(text) => setTeleHandle(text)}
                placeholder={user.teleHandle || 'Eg. @edwin_1022'}
                placeholderTextColor="#999797"
                style={styles.textInput}
              />
            </View>
            {!!errorTeleHandle && <Text style={styles.error}>{errorTeleHandle}</Text>}
          </View>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.emailText}>{user.email}</Text>
            </View>
          </View>
          <Text style={styles.note}>
            Do note that <Text style={styles.emailHighlight}>email</Text> is{' '}
            <Text style={styles.emailWarning}>not changeable</Text>{'. '}
          </Text>
          <View style={{ marginTop: 30 }}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <Pressable onPress={handleResetPassword}>
                <Text style={styles.passwordText}>********</Text>
              </Pressable>
            </View>
            <Text style={styles.note}>
              Click on your <Text style={styles.passwordHighlight}>password</Text> above to reset your{' '}
              <Text style={styles.passwordHighlight}>password</Text>
              {'. '}
              Do note that resetting your{'\n'}
              <Text style={styles.passwordHighlight}>password</Text> will{' '}
              <Text style={styles.logoutWarning}>log you out</Text> from this account.
            </Text>
          </View>
          <View style={{ marginTop: 50 }} />
          <CustomButton onPress={handleUpdateProfile} text="Update Your Profile" />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fieldsContainer: {
    flexDirection: "row",
    alignItems: "center"
 },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  randomMargin: {
    alignItems: 'center',
    marginTop: 20,
  },
  editProfiletext: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#041E42',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    right: 105,
    zIndex: 1,
    bottom: 5,
    height: 36,
    width: 36,
    backgroundColor: '#0163D2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  profilePicContainer: {
    borderRadius: 80,
    marginTop: 30,
    backgroundColor: 'white',
    height: 160,
    width: 160,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  label: {
    color: '#7d7c7c',
    fontSize: 16,
    fontWeight: '400',
    marginRight: 10
  },
  textInput: {
    color: 'black',
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'right',
    marginRight: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    color: '#999797',
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'right',
    marginRight: 20,
  },
  note: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'left',
  },
  emailHighlight: {
    fontWeight: 'bold',
    color: '#007FFF',
  },
  emailWarning: {
    fontWeight: 'bold',
    color: 'red',
  },
  passwordText: {
    color: '#007FFF',
    fontWeight: 'bold',
    marginRight: 20,
  },
  passwordHighlight: {
    fontWeight: 'bold',
    color: '#007FFF',
  },
  logoutWarning: {
    fontWeight: 'bold',
    color: 'red',
  },
  
  error: {
    color: "red"
  }

})
export default YourAccountScreen;
