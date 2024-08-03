import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Pressable,
    Image,
  } from "react-native";
  import React from "react";
  import { SwipeRow } from "react-native-swipe-list-view";
  import { Ionicons } from "@expo/vector-icons";
  
  export const SoldCartComponent = ({
    pfp,
    username,
    image,
    name,
    condition,
    price,
    onUser,
    onDelete,
  }) => {
    return (
      <ScrollView>
        
        <View style={styles.itemSummaryComponent}>
          <View style={styles.usernameBox}>
            <Pressable onPress={onUser}>
              <Image
                style={styles.userProfile}
                source={{
                  uri: pfp,
                }}
              />
            </Pressable>
            <Pressable onPress={onUser}>
              <Text style={styles.username}>{username}</Text>
            </Pressable>
          </View>
  
          <SwipeRow
            leftOpenValue={0}
            rightOpenValue={-80}
            style={styles.swipable}
          >
            <View style={styles.hiddenRow}>
              <TouchableOpacity
                onPress={onDelete}
                style={[styles.hiddenButton, styles.deleteButton]}
              >
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>
  
            <View>
              <View style={styles.visibleRow}>
                <View>
                  <Image
                    style={styles.itemImage}
                    source={{
                      uri: image,
                    }}
                  />
                </View>
  
                <View>
                  <View style={styles.itemNameBox}>
                    <Text style={styles.itemName}>{name}</Text>
                  </View>
                  <View style={styles.conditionBox}>
                    <Text style={styles.condition}>{condition}</Text>
                  </View>
                  <Text style={styles.itemText}>1 item(s)</Text>
                </View>
              </View>
            </View>
          </SwipeRow>
  
          <View style={styles.bottomContainer}>
            <Text style={styles.amount}>Total: ${price}</Text>
            <View style={styles.checkoutButton}>
              <Text style={styles.buttonText}>SOLD</Text>
            </View>
          </View>
        </View>
      
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    checkoutButton: {
      borderStyle: "solid",
      borderWidth: 1,
      backgroundColor: "#dc3545",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 5,
      borderColor: "#D0D0D0",
    },
    amount: {
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 17,
    },
  
    itemText: {
      color: "gray",
    },
  
    conditionBox: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 45,
      alignItems: "center",
      width: 80,
      marginTop: 5,
      marginBottom: 5,
    },
  
    condition: {
      color: "gray",
    },
    itemNameBox: {
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: 190,
    },
    itemName: {
      fontSize: 16,
      flexWrap: "wrap",
    },
    itemImage: {
      height: 80,
      width: 80,
      objectFit: "cover",
      marginRight: 10,
      borderRadius: 5,
    },
    hiddenRow: {
      flexDirection: "row",
      height: 110,
    },
    hiddenButton: {
      alignItems: "center",
      bottom: 0,
      justifyContent: "center",
      position: "absolute",
      top: 0,
      width: 75,
    },
  
    deleteButton: {
      backgroundColor: "#dc3545",
      right: 0,
      width: 80,
      height: "100%",
    },
    visibleRow: {
      backgroundColor: "#d0d0d0",
      height: 110,
      paddingLeft: 15,
      flexDirection: "row",
      alignItems: "center",
    },
    userProfile: {
      height: 30,
      width: 30,
      borderRadius: 15,
      marginRight: 10,
    },
  
    username: {
      fontSize: 18,
      fontWeight: "bold",
    },
  
    itemSummaryComponent: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      padding: 20,
      borderRadius: 10,
      backgroundColor: "#d0d0d0",
      paddingTop: 5,
      paddingBottom: 10,
      overflow: "hidden",
      width: 340,
    },
  
    
    usernameBox: {
      backgroundColor: "#d0d0d0",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      paddingLeft: 15,
      paddingBottom: 0,
      height: 50,
    },
  
    bottomContainer: {
      backgroundColor: "#d0d0d0",
      borderTopWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      justifyContent: "space-around",
    },
  });
  