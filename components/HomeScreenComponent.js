import 'react-native-gesture-handler';
import { Text, View, StyleSheet, Button, Pressable, TouchableOpacity, Image} from "react-native";

export const HomeScreenComponent = () => {

  return (
    <View style={styles.component}>
      <View style={styles.picContainer}>
        <Image style={styles.productPic} source={{uri: "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/01/Minecraft-How-To-Get-Invisible-Item-Frames.webp-.jpg"}} />
      </View>
      <View style={styles.itemInfo}>
        <View style={styles.itemNameBox}>
          <Text style={styles.itemName}>Testing with a v long item name</Text>
        </View>
        
        <Text style={styles.priceCondition}>$500 &#x2022; <Text>Brand New</Text></Text>
        <Pressable style={styles.usernameBox}>
          <Image style={styles.userProfile} source={{uri: "https://people.com/thmb/n6EdTmvAL3TkkAqrT47caD6tUu8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg"}}/>
          <Text style={styles.username}>Username</Text>
        </Pressable>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  itemNameBox: {
    maxWidth: 200
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
    paddingLeft: 5
  },

  itemName: {
    fontSize: 18,
    flexWrap: "wrap",
    fontWeight: "bold"
  },

  priceCondition: {
    fontSize: 16
  },

  picContainer: {
    backgroundColor: "black",
    height: 190,
    width: 190,
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10
  },

  productPic: {
    height: 190,
    width: 190,
    resizeMode: "cover",
    borderRadius: 10
  },
  
  componentRow: {
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
  },

  component: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    margin: 5
  },
 
}
)
