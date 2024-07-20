import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-paper";
import { UserContext } from "../UserContext";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import RatingModalScreen from "./RatingModalScreen";

const UserProfileScreen = () => {
  const { selectedUser } = useContext(UserContext);
  const [seller, setSeller] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const navigation = useNavigation();

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
          User Profile
        </Text>
      ),
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.goBack()}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  const fetchSellerData = async () => {
    try {
      const res = await axios.put(
        `https://nusell.onrender.com/users/getUserData?email=${selectedUser.email}`
      );
      setSeller(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // retrieve user data from the backend
  useEffect(() => {
    fetchSellerData();
  }, []);

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
              {seller.name}'s Profile
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setImageModalVisible(true)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
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
              source={{ uri: seller.imageUrl }}
            />
          </TouchableOpacity>

          <View style={{ marginTop: 30 }} />

          <CustomButton
            onPress={() => navigation.navigate("UserStore")}
            text={`${seller.name}'s store`}
          />

          <View style={{ marginTop: 30 }} />

          {buttonVisible && (
            <CustomButton
              onPress={() => setModalVisible(true)}
              text={`Rate ${seller.name}`}
            />
          )}

          <RatingModalScreen
            username={seller.name}
            userId={seller.id}
            isVisible={modalVisible}
            onClose={() => {
              setButtonVisible(false);
              setModalVisible(false);
              fetchSellerData();
            }}
          />

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
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.name}
              </Text>
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
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.gender}
              </Text>
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
                Student Id
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.studentId}
              </Text>
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
                style={{
                  color: "#7d7c7c",
                  fontSize: 16,
                  fontWeight: "400",
                  marginRight: 20,
                }}
              >
                Faculty
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.faculty}
              </Text>
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
                Major
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.major}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#7d7c7c",
                  fontSize: 16,
                  fontWeight: "400",
                  marginRight: 60,
                }}
              >
                Address
              </Text>

              <View
                style={{
                  padding: 10,
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    textAlignVertical: "center",
                    textAlign: "right",
                    marginRight: 20,
                  }}
                >
                  {seller.defaultAddress?.blockNo}{" "}
                  {seller.defaultAddress?.street}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    textAlignVertical: "center",
                    textAlign: "right",
                    marginRight: 20,
                  }}
                >
                  {seller.defaultAddress?.unit}{" "}
                  {seller.defaultAddress?.building}
                </Text>

                <Text
                  style={{
                    color: "black",
                    fontStyle: "normal",
                    fontFamily: "Open Sans",
                    fontSize: 15,
                    textAlignVertical: "center",
                    textAlign: "right",
                    marginRight: 20,
                  }}
                >
                  Singapore {seller.defaultAddress?.postalCode}
                </Text>
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
                Mobile No.
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.mobileNo}
              </Text>
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
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.teleHandle}
              </Text>
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
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.email}
              </Text>
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
                Rating
              </Text>
              <Text
                style={{
                  color: "black",
                  fontStyle: "normal",
                  fontFamily: "Open Sans",
                  fontSize: 15,
                  textAlignVertical: "center",
                  textAlign: "right",
                  marginRight: 20,
                }}
              >
                {seller.rating == 0 ? "-" : seller.rating} / 5
              </Text>
            </View>

            <View style={{ marginTop: 50 }} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setImageModalVisible(false)}
          >
            <Image
              source={{ uri: seller.imageUrl }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "90%",
  },
});
