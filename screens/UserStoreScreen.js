import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import { UserContext } from "../UserContext";
import axios from "axios";
import { HomeScreenComponent } from "../components/HomeScreenComponent";
import { ProductContext } from "../ProductContext";

const UserStoreScreen = () => {
  const navigation = useNavigation();
  const { selectedUser } = useContext(UserContext);
  const { setSelectedItem } = useContext(ProductContext);
  const [userProducts, setUserProducts] = useState();

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text style={styles.headerLeft}>NUSell</Text>
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

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get(
        `https://nusell.onrender.com/products/BySellers?users=${selectedUser.id}`
      );

      const products = response.data.filter((product) => product.status !== "ordered");

      setUserProducts(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const handleUserPressed = () => {
    navigation.navigate("UserProfile");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.usernameBox}>
          <Pressable onPress={handleUserPressed}>
            <Image
              style={styles.userProfile}
              source={{
                uri: selectedUser.imageUrl,
              }}
            />
          </Pressable>
          <Pressable onPress={handleUserPressed}>
            <Text style={styles.username}>{selectedUser.name}'s Listing(s)</Text>
          </Pressable>
        </View>

        <View style={styles.main}>
          {userProducts &&
            userProducts.length > 0 &&
            userProducts.map((product, index) => (
              <View key={index} style={styles.itemContainer}>
                <HomeScreenComponent
                  pfp={product.user.imageUrl}
                  username={product.user.name}
                  image={product.imageUrl}
                  name={product.name}
                  condition={product.condition}
                  price={product.price}
                  dateCreated={product.dateCreated}
                  onPress={() => {
                    setSelectedItem(product.id);
                    navigation.navigate("ProductInfo");
                  }}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserStoreScreen;

const styles = StyleSheet.create({
  headerLeft: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  },

  main: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 2,
    backgroundColor: "white",
  },

  itemContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    margin: 8,
    width: "44%",
    alignItems: "center",
  },

  userProfile: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginRight: 10,
  },

  username: {
    fontSize: 18,
    fontWeight: "bold",
  },

  usernameBox: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    marginTop: 10,
    height: 50,
  },
});
