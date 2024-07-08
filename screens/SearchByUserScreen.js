import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { UserComponent } from "../components/UserComponent";
import axios from "axios";
import { UserContext } from "../UserContext";

export const SearchByUserScreen = () => {
  const navigation = useNavigation();
  const { setSelectedUser } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);

      const response = await axios.get("http://192.168.0.109:8000/users");

      const users = response.data;

      users.sort((a, b) => a.name.localeCompare(b.name));

      setAllUsers(users);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserPressed = (user) => {
    setSelectedUser(user);
    navigation.navigate("UserStore");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center",paddingTop: 30 }}
    >
      <View style={styles.headerContainer}>
              
        <Pressable
          onPress={() => navigation.goBack()}
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
            onChangeText={handleSearch}
          />
          
        </View>
      </View>
      <View style={styles.searchScreenContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View>
            <View style={styles.headerContainer}>
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Pressable
                  onPress={() => navigation.goBack()}
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
                    onChangeText={handleSearch}
                  />
                </View>
              </View>
            </View>
            <View style={styles.main}>
              <View style={styles.buttonRow}>
                <FlatList
                  data={searchQuery.length > 0 ? filteredUsers : allUsers}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <UserComponent
                      pfp={item.imageUrl}
                      username={item.name}
                      rating={item.rating}
                      onUser={() => handleUserPressed(item)}
                    />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={{ marginBottom: 20 }} />
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  buttonText: {
    fontFamily: "Arial",
    fontSize: 16,
  },
  searchScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    padding: 10
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
    flexDirection: "row",
    alignItems: "center",
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
});
