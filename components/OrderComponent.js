import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

export const OrderComponent = () => {
  return (
    <ScrollView>
      
      <View style={styles.itemSummaryComponent}>
        <View style={styles.usernameBox}>
          <Pressable>
            <Image
              style={styles.userProfile}
              source={{
                uri: "https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg",
              }}
            />
          </Pressable>
          <Pressable>
            <Text style={styles.username}>Username</Text>
          </Pressable>
          <Pressable style={styles.checkoutButton}>
            <Text style={styles.buttonText}>STATUS</Text>
          </Pressable>
        </View>

        <View style={styles.swipable}>
          <Pressable>
            <View style={styles.visibleRow}>
              <View>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
                  }}
                />
              </View>

              <View>
                <View style={styles.itemNameBox}>
                  <Text style={styles.itemName}>
                    An example of a very long item name{" "}
                  </Text>
                </View>
                <View style={styles.conditionBox}>
                  <Text style={styles.condition}>Condition</Text>
                </View>
                <Text style={styles.itemText}>1 item(s)</Text>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.amount}>Total: $100</Text>
        </View>
      </View>
      
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  checkoutButton: {
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderColor: "green",
    marginLeft: 80,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
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
    width: 340,
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
