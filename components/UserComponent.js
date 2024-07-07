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

export const UserComponent = ({ pfp, username, onUser }) => {
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
    fontSize: 18,
    fontWeight: "bold",
  },

  itemSummaryComponent: {
    width: 340,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    padding: 10,
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
});
