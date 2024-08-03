import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";

export const EbayComparisonComponent = ({image, name, price, onItem}) => {
  return (
    <ScrollView>
      
      <Pressable style={styles.itemSummaryComponent}>

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
                  <Text style={styles.itemName}>
                    {name}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.amount}>Price: ${price}</Text>
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
