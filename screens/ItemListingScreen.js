import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  Alert,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";

const ItemListingScreen = () => {
  const navigation = useNavigation();

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text
          style={{
            fontFamily: "CustomFont",
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            marginLeft: 20,
          }}
        >
          NUSell
        </Text>
      ),
      headerRight: () => (
        <Back
          name="arrow-back"
          size={30}
          onPress={() => navigation.navigate("Home")}
          style={{ marginRight: 20, color: "white" }}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center"}}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        
        <TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 20, backgroundColor: "white", flex: 1, flexDirection:"column", padding:50, width:350, borderColor: "black", borderWidth: 2, borderRadius: 5, borderStyle: "solid" }}>
        
          <View>
            <Image
            source={{ uri: 'https://static-00.iconduck.com/assets.00/camera-icon-512x417-vgmhgbfy.png' }}
            style={{height:50, width: 50, resizeMode: "contain"}}
            />
          </View>

          <Text style={{fontSize: 20}}>
            Add photo to start a listing 
          </Text>
        </View>
        </TouchableOpacity>
        
        <ScrollView horizontal style={{marginTop: 20}}>
          <TouchableOpacity>
            <View style={{marginRight: 10, borderColor: "black", borderWidth: 1, borderStyle: "solid", borderRadius: 3, padding: 10}}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={{height: 40, width: 40, resizeMode: "contain", tintColor: 'gray'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{marginRight: 10, borderColor: "black", borderWidth: 1, borderStyle: "solid", borderRadius: 3, padding: 10}}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={{height: 40, width: 40, resizeMode: "contain", tintColor: 'gray'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{marginRight: 10, borderColor: "black", borderWidth: 1, borderStyle: "solid", borderRadius: 3, padding: 10}}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={{height: 40, width: 40, resizeMode: "contain", tintColor: 'gray'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{marginRight: 10, borderColor: "black", borderWidth: 1, borderStyle: "solid", borderRadius: 3, padding: 10}}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={{height: 40, width: 40, resizeMode: "contain", tintColor: 'gray'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{marginRight: 10, borderColor: "black", borderWidth: 1, borderStyle: "solid", borderRadius: 3, padding: 10}}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={{height: 40, width: 40, resizeMode: "contain", tintColor: 'gray'}}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "left", backgroundColor: "white", }}>
            <View style={{marginBottom: 20, marginTop: 20}}>
              <Text>Item Name</Text>
              <TextInput style={{borderColor: "black", borderStyle: "solid", borderWidth: 2, height: 50, textAlignVertical:"top", padding: 10}} editable multiline={true} maxLength={100} placeholder=" this is where you insert your item name"/>
            </View>
            <View style={{marginBottom: 20}}>
              <Text>Item Description</Text>
              <TextInput style={{borderColor: "black", borderStyle: "solid", borderWidth: 2, height: 100, textAlignVertical:"top", padding: 10}} editable multiline={true} maxLength={300} placeholder=" this is where you insert your item desc"/>
            </View>
            
            <View>
              <Text>Condition</Text>
              <View style={{ backgroundColor: "white", flexDirection: "row", justifyContent: "space-around", width: 360, paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}>
                <Button title="Used" buttonColor="gray" style={{height:20, width: 100}} onPress={()=> Alert.alert("Button pressed")}/>

                <Button title="Brand New" buttonColor="gray" style={{height:20, width: 100}} onPress={()=> Alert.alert("Button pressed")}/>
              </View>
              
            </View>
            <View style={{marginBottom: 20 }}>
              <Text> Price </Text>
              <View style={{marginLeft: 10, flex: 1, flexDirection: "row", alignItems: "center"}}>
                <Text>$ </Text>
                <TextInput style={{borderColor: "black", borderStyle: "solid", borderWidth: 2, height: 50, textAlignVertical:"center", padding: 10, borderRadius: 10, marginLeft: 10}} editable multiline={true} maxLength={300} keyboardType="numeric" placeholder=" this is where you insert your item price"/>
              </View>
            </View>
            <View style={{backgroundColor: "white", height: 50}}>

            </View>
            <View  style={{ position: "absolute", right: 10, bottom: 0, alignContent:"center", flex: 1, flexDirection: "row", height: 50}}>
              <Button title="Publish"></Button>
            </View>
            
          </View>
          
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>

  );
};

export default ItemListingScreen;