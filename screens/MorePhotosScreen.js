import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
import { Button } from 'react-native-paper';
import CustomButton from "../components/CustomButton";


const MorePhotosScreen = () => {
  return (
    <ScrollView style={styles.addPhotoScreen}>
      <View style={styles.morePhotosContainer}>
        <View style={styles.addPhotoRow}>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.addPhotoRow}>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.addPhotoRow}>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.addPhotoRow}>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.addPhotoRow}>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} color={"black"} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addPhoto}>
            <Ionicons name='add-circle-outline' size={120} color={"black"} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        <CustomButton text="Confirm"></CustomButton>
     </View>
    </ScrollView>
    
  )
}

export default MorePhotosScreen

const styles = StyleSheet.create({
  

  morePhotosContainer: {
    padding: 20,
    flex: 1,
    alignItems: "center",
  },

  addPhoto: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    borderRadius: 15
  },

  icon: {
    color: "gray"
  },

  addPhotoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginBottom: 30
  }

})