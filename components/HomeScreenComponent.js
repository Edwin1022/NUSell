import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

export const HomeScreenComponent = ({
  pfp,
  username,
  image,
  name,
  condition,
  price,
  onPress
}) => {
  return (
    <Pressable onPress={onPress} style={styles.component}>
      <View style={styles.picContainer}>
        <Image
          style={styles.productPic}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={styles.itemInfo}>
        <View style={styles.itemNameBox}>
          <Text style={styles.itemName}>{name}</Text>
        </View>

        <Text style={styles.priceCondition}>
          ${price} &#x2022; <Text>{condition}</Text>
        </Text>
        <Pressable style={styles.usernameBox}>
          <Image
            style={styles.userProfile}
            source={{
              uri: pfp,
            }}
          />
          <Text style={styles.username}>{username}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemNameBox: {
    maxWidth: 200,
  },
  usernameBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 0,
    height: 40,
  },
  userProfile: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },

  username: {
    fontSize: 16,
  },

  itemInfo: {
    paddingLeft: 5,
  },

  itemName: {
    fontSize: 18,
    flexWrap: "wrap",
    fontWeight: "bold",
  },

  priceCondition: {
    fontSize: 16,
  },

  picContainer: {
    backgroundColor: "black",
    height: 150,
    width: 150,
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },

  productPic: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },

  componentRow: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
  },

  component: {
    width: 150,
    margin: 5,
  },
});
