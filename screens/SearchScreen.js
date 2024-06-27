import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  Alert,
  Button,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

export const SearchScreen = () => {
  const navigate = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <ScrollView style={styles.searchScreenContainer}>
        <View style={styles.headerContainer}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => navigate.navigate("Home")}
              style={styles.backIcon}
            >
              <Ionicons size={30} color="black" name="arrow-back-outline" />
            </Pressable>

            <View style={styles.searchBar}>
              <TouchableOpacity>
                <Ionicons
                  name="search"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="white"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.buttonRow}>
            <View>
              <Icon.Button
                name="location-outline"
                borderRadius={30}
                style={styles.button}
                iconStyle={styles.buttonIcon}
                onPress={() => navigate.navigate("SearchNearby")}
              >
                <Text style={styles.buttonText}>Search Nearby</Text>
              </Icon.Button>
            </View>

            <View>
              <Icon.Button
                name="person-outline"
                borderRadius={30}
                style={styles.button}
                iconStyle={styles.buttonIcon}
                onPress={() => navigate.navigate("SearchByUser")}
              >
                <Text style={styles.buttonText}>Search by User</Text>
              </Icon.Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: 380,
  },

  button: {
    backgroundColor: "#dcdcdc",
    padding: 15,
  },

  buttonIcon: {
    color: "black",
  },

  buttonText: {
    fontFamily: "Arial",
    fontSize: 16,
  },
  searchScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
  },

  main: {
    flex: 1,
    alignItems: "center",
  },

  searchBar: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#D0D0D0",
    width: 300,
    flex: 1,
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#D0D0D0",
    alignItems: "center",
    alignContent: "center",
  },

  backIcon: {
    flex: 0.2,
    alignItems: "center",
  },

  headerContainer: {
    backgroundColor: "white",
    height: 100,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 18,
    color: "white",
  },

  icon: {
    padding: 10,
  },
});
