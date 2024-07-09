import {
  StyleSheet,
  Button,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonContext } from "../ButtonContext";

const FilterModalScreen = ({ isVisible, onSubmit, onClose }) => {
  const { activeButton, setActiveButton } = useContext(ButtonContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Sort</Text>
            <Pressable onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <View style={styles.priceButtonRow}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    activeButton === "Button1" ? "slategray" : "steelblue",
                },
                styles.filterButton,
              ]}
              onPress={() => setActiveButton("Button1")}
            >
              <MaterialCommunityIcons
                name="sort-numeric-ascending"
                size={24}
                color="white"
              />
              <Text style={styles.buttonText}>Price Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    activeButton === "Button2" ? "slategray" : "steelblue",
                },
                styles.filterButton,
              ]}
              onPress={() => setActiveButton("Button2")}
            >
              <MaterialCommunityIcons
                name="sort-numeric-descending"
                size={24}
                color="white"
              />
              <Text style={styles.buttonText}>Price High to Low</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateListedButtonRow}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    activeButton === "Button3" ? "slategray" : "steelblue",
                },
                styles.dateFilterButton,
              ]}
              onPress={() => setActiveButton("Button3")}
            >
              <MaterialCommunityIcons
                name="sort-calendar-ascending"
                size={24}
                color="white"
              />
              <Text style={styles.buttonText}>Newest First</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    activeButton === "Button4" ? "slategray" : "steelblue",
                },
                styles.dateFilterButton,
              ]}
              onPress={() => setActiveButton("Button4")}
            >
              <MaterialCommunityIcons
                name="sort-calendar-descending"
                size={24}
                color="white"
              />
              <Text style={styles.buttonText}>Oldest First</Text>
            </TouchableOpacity>
          </View>

          <Pressable
            style={styles.submitButton}
            onPress={() => {
              onSubmit();
              onClose();
            }}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    width: "95%",
    marginLeft: 8,
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
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
    padding: 10,
    width: "95%",
  },

  priceButtonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },

  dateListedButtonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },

  dateFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default FilterModalScreen;
