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

export const ProductComponent = ({
  pfp,
  username,
  image,
  name,
  condition,
  price,
  priceChangeType,
  priceChanged,
  onUser,
  onItem,
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

          <View style={styles.swipable}>
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
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.amount}>
              Price: ${price}{" "}
              {priceChanged !== 0 && (
                <Text
                  style={{
                    color: priceChangeType === "increased" ? "green" : "red",
                  }}
                >
                  (
                  {priceChangeType === "increased"
                    ? `+${priceChanged}`
                    : priceChanged}
                  )
                </Text>
              )}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
});
