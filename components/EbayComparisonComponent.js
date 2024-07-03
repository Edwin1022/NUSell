import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

export const EbayComparisonComponent = () => {
  return (
    <ScrollView>
      
      <Pressable style={styles.itemSummaryComponent}>

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
                    An example of a very long item name extend this name by a lot recite the bee movie script tryna excedd my word limit be like blablabla make the item name long af longerrrrrr that way it extends to fit all the words
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.amount}>Total: $100</Text>
        </View>
      </Pressable>
      
    </ScrollView>
  );
};
const styles = StyleSheet.create({

  amount: {
    fontSize: 18,
    fontWeight: "bold",
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
    backgroundColor: "white",
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
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
