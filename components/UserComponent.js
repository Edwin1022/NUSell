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

export const UserComponent = ({ pfp, username, rating, onUser }) => {
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
              <Text style={styles.rating}>Rating: {rating == 0 ? "-" : rating} / 5</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  userProfile: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  username: {
    fontSize: 16,
    fontWeight: "bold"
  },

  rating: {
    fontSize: 17
  },

  itemSummaryComponent: {
    width: 340,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
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
    paddingLeft: 15,
    height: 50,
  },
});
