import { StyleSheet, Button, Modal, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

const FilterModalScreen = ({isVisible, onClose}) => {
  const [dateListed, setDateListedFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    if (!isVisible) {
      // Reset the condition state when the modal is closed
      setDateListedFilter("");
      setPriceFilter("");
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View
        style={styles.modalContainer}
      >
        <View
          style={styles.modal}
        >
          <Text style={styles.title}>
            Price
          </Text>

          <View style={styles.priceButtonRow}>
            <TouchableOpacity
              style={[
                {backgroundColor: priceFilter === "lth" ? "slategray" : "steelblue"},
                styles.filterButton
              ]}
              onPress={()=> setPriceFilter("lth")}
            >
              <MaterialCommunityIcons name="sort-numeric-ascending" size={24} color="white" />
              <Text
                style={styles.buttonText}
              >
                Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {backgroundColor: priceFilter === "htl" ? "slategray" : "steelblue"},
                styles.filterButton
              ]}
              onPress={()=> setPriceFilter("htl")}
            >
              <MaterialCommunityIcons name="sort-numeric-descending" size={24} color="white" />
              <Text
                style={styles.buttonText}
              >
                High to Low
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>
            Date Listed
          </Text>

          <View style={styles.dateListedButtonRow}>
            <TouchableOpacity
              style={[
                {backgroundColor: dateListed === "latest" ? "slategray" : "steelblue"},
                styles.dateFilterButton
              ]}
              onPress={()=> setDateListedFilter("latest")}
            >
              <MaterialCommunityIcons name="sort-calendar-ascending" size={24} color="white" />
              <Text
                style={styles.buttonText}
              >
                Latest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {backgroundColor: dateListed === "oldest" ? "slategray" : "steelblue"},
                styles.dateFilterButton
              ]}
              onPress={()=> setDateListedFilter("oldest")}
            >
              <MaterialCommunityIcons name="sort-calendar-descending" size={24} color="white" />
              <Text
                style={styles.buttonText}
              >
                Oldest
              </Text>
            </TouchableOpacity>
          </View>
          
          <Button title="Close" onPress={onClose} />
          <View style={{margin: 10}}></View>
          <Button title="Submit" color={"#dc3545"}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "95%",
  },

  priceButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },

  dateListedButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  dateFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 5,
    marginBottom: 20,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 10,
  }
})
export default FilterModalScreen;
