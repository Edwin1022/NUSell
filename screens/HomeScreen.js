import 'react-native-gesture-handler';
import { Text, View, StyleSheet, Button, Pressable, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { UserContext } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Drawer } from 'react-native-drawer-layout';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setUserId } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const [open, setOpen] = React.useState(false);

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <View style={styles.drawer}> 
                <Text style={styles.category}>
                  Browse by Categories
                </Text>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryBox}>
                  <Text style={styles.category}>Category 1</Text>

                  <Ionicons 
                    name="chevron-forward-outline"
                    size={24}
                    color="gray"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>;
      }}
    >
      <View style={styles.homeScreenContainer}>
        <View style={styles.headerContainer}>
          <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
            <Pressable 
              onPress={() => setOpen((prevOpen) => !prevOpen)} 
              style={styles.menuIcon} >
              <Ionicons size={30} color="black" name='menu-outline'/>
            </Pressable >
            
            <View style={styles.searchBar}>
              <TouchableOpacity onPress={()=> navigation.navigate("Search")}>
                <Ionicons
                name="search"
                size={24}
                color="white"
                style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Search")} style={styles.searchbox}>
                <Text
                style={styles.input}
                >
                  Search
                </Text>
              </TouchableOpacity>
              

              <View style={styles.icons}>
                <TouchableOpacity>
                  <Ionicons
                    name="camera-outline"
                    size={27}
                    color="white"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
             
            </View>
          </View>

          <View style={styles.main}>
            <Text>Home Screen</Text>
          </View>
        </View>

      </View>
      
      
    </Drawer>
    
  );
};

const styles = StyleSheet.create({
  searchbox: {
    flex: 1,
    flexDirection: "row",
  },

  icons: {
    flexDirection: "row",
    paddingRight: 10,
    alignItems: "center",
  },

  drawer: {
    marginTop: 30,
  },

  categoryBox: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    borderStyle: "solid",
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  category: {
    fontSize: 18,
  },

  arrowIcon: {
    position: "absolute",
    right: 10
  },

  homeScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    paddingTop: 20
  },

  main: {
     flex: 1, 
     justifyContent: 'center', 
     alignItems: 'center'
  },

  headerContainer: {
    backgroundColor: "white", 
    height: 100,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 18,
    color: "white"
  },

  icon: {
    padding: 10,
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
  menuIcon: {
    flex: 0.2,
    alignItems: "center",
  }
}
)

export default HomeScreen;
