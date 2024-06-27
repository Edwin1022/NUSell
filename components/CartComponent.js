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

export const CartComponent = ({
  pfp,
  username,
  image,
  name,
  condition,
  price,
  onUser,
  onItem,
  onDelete,
  onCheckout
}) => {
  return (
    <ScrollView>
      <View style={styles.OrderScreenContainer}>
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
            rightOpenValue={-155}
            style={styles.swipable}
          >
            <View style={styles.hiddenRow}>
              <TouchableOpacity
                style={[styles.hiddenButton, styles.editButton]}
              >
                <Ionicons name="pencil" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onDelete}
                style={[styles.hiddenButton, styles.deleteButton]}
              >
                <Ionicons name="trash" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <Pressable onPress={onItem}>
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
            </Pressable>
          </SwipeRow>

          <View style={styles.bottomContainer}>
            <Text style={styles.amount}>Total: ${price}</Text>
            <Pressable onPress={onCheckout} style={styles.checkoutButton}>
              <Text style={styles.buttonText}>CHECKOUT</Text>
            </Pressable>
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
    backgroundColor: "#007FFF",
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
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 15,
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

  editButton: {
    backgroundColor: "#007bff",
    right: 80,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    right: 0,
    width: 80,
    height: "100%",
  },
  visibleRow: {
    backgroundColor: "#FFF",
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
    flex: 1,
    width: 380,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    overflow: "hidden",
  },

  OrderScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  usernameBox: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 0,
    height: 50,
  },

  bottomContainer: {
    backgroundColor: "white",
    borderTopWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-around",
  },
});
