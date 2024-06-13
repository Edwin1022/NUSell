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
  TouchableOpacity,
  Pressable
} from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Back from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { StyleSheet } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';




const ItemListingScreen = () => {
  const navigation = useNavigation();
  //category states
  const [value, setValue] = useState(null);
  const data = [
    { label: 'Computers and Tech', value: 'computers and tech' },
    { label: 'Women\'s Fashion', value: 'women\'s fashion' },
    { label: 'Men\'s Fashion', value: 'men\'s fashion' },
    { label: 'Luxury', value: 'luxury' },
    { label: 'Mobile Phones & Gadgets', value: 'mobile phones & gadgets' },
    { label: 'Video Gaming', value: 'video gaming' },
    { label: 'Audio', value: 'audio' },
    { label: 'Photography', value: 'photography' },
    { label: 'TV & Home Appliances', value: 'tv & home appliances' },
    { label: 'Sports Equipments', value: 'sports equipments' },
    { label: 'Others', value: 'others' },
  ];
  //button states
  const [isPressedUsedButton, setIsPressedUsedButton] = useState(false);
  const [isPressedBrandNewButton, setIsPressedBrandNewButton] = useState(false);

  //text input states
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [price, setPrice] = useState('');

  const [errorItemName, setErrorItemName] = useState('');
  const [errorItemDescription, setErrorItemDescription] = useState('');
  const [errorCategory, setErrorCategory] = useState('');
  const [errorCondition, setErrorCondition] = useState('');
  const [errorPrice, setErrorPrice] = useState('');

  //handle UsedButton
  const handlePressUsedButton = () => {
    setIsPressedUsedButton(!isPressedUsedButton);
    if (isPressedBrandNewButton) {
      setIsPressedBrandNewButton(false);
    }
  };

  //handleBrandNewButton
  const handlePressBrandNewButton = () => {
    setIsPressedBrandNewButton(!isPressedBrandNewButton);
    if (isPressedUsedButton) {
      setIsPressedUsedButton(false);
    }
  };

  //handle Publish logic
  const handlePublish = () => {
    setErrorItemName(null);
    setErrorItemDescription(null);
    setErrorCategory(null);
    setErrorCondition(null);
    setErrorPrice(null);

    let isValid = true;

    if (!itemName.trim()) {
      setErrorItemName('Please provide an item name');
      isValid = false;
    }

    if (!itemDescription.trim()) {
      setErrorItemDescription('Please give a brief description of this item');
      isValid = false;
    }

    if (!value) {
      setErrorCategory('Please select a category');
      isValid = false;
    }

    if (!isPressedUsedButton && !isPressedBrandNewButton) {
      setErrorCondition('Please select a condition');
      isValid = false;
    }

    if (!price.trim()) {
      setErrorPrice('Please indicate a price');
      isValid = false;
    }

    if (isValid) {
      Alert.alert('Published successfully!');
    }
  };

  // header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#007AFF",
      },
      headerLeft: () => (
        <Text
          style={styles.headerLeft}
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
          <View style={styles.photoUpload}>
          <View>
            <Image
            source={{ uri: 'https://static-00.iconduck.com/assets.00/camera-icon-512x417-vgmhgbfy.png' }}
            style={styles.itemPhoto}
            />
          </View>

          <Text style={{fontSize: 20}}>
            Add photo to start a listing 
          </Text>
        </View>
        </TouchableOpacity>
        
        <ScrollView horizontal style={{marginTop: 20}}>
          <TouchableOpacity >
            <View style={styles.morePhotosContainer}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={styles.photoItem}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.morePhotosContainer}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={styles.photoItem}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.morePhotosContainer}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={styles.photoItem}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.morePhotosContainer}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={styles.photoItem}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity >
            <View style={styles.morePhotosContainer}>
              <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/262/262038.png'}} 
              style={styles.photoItem}
              />
            </View>
          </TouchableOpacity>
          
        </ScrollView>

        <KeyboardAvoidingView>
          
          <View style={{ alignItems: "left"}}>
            <View style={{marginBottom: 20, marginTop: 20}}>
              <Text style={styles.Title}>Item Name</Text>
              <TextInput 
              value={itemName} 
              onChangeText={setItemName} 
              style={styles.itemNameInput} 
              editable 
              multiline={true} 
              maxLength={100} 
              placeholder="What is this item?"/>
              {!!errorItemName && <Text style={styles.error}>{errorItemName}</Text>}
            </View>
            <View>
              <Text style={styles.Title}>Item Description</Text>
              <TextInput 
              value={itemDescription} 
              onChangeText={setItemDescription} 
              style={styles.itemDescriptionInput} 
              editable 
              multiline={true} 
              maxLength={300} 
              placeholder="Give a brief description of your item"/>
              {!!errorItemDescription && <Text style={styles.error}>{errorItemDescription}</Text>}
            </View>

            <View style={styles.container}>
                <Text style={styles.Title}>Category </Text>
                <Dropdown
                  style={styles.dropdown}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a category"
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                  }}
                />
                {!!errorCategory && <Text style={styles.error}>{errorCategory}</Text>}
              </View>
            
            <View>
              <Text style={styles.Title}>Condition</Text>
              <View style={styles.conditionButtonContainer}>
                <Pressable style={
                  ({pressed}) => [
                    {backgroundColor: isPressedUsedButton ? "white": "#007FFF"},
                    styles.usedButton
                  ]}
                  onPress={handlePressUsedButton}>
                  <Text style={[
                    {color: isPressedUsedButton ? "#007FFF" : "white"},
                    styles.usedButtonText
                  ]}>
                    USED</Text>
                </Pressable>

                <Pressable style={
                  ({pressed}) => [
                    {backgroundColor: isPressedBrandNewButton ? "white": "#007FFF"},
                    styles.brandNewButton
                  ]}
                  onPress={handlePressBrandNewButton}>
                  <Text style={[
                    {color: isPressedBrandNewButton ? "#007FFF" : "white"},
                    styles.brandNewButtonText
                  ]}>
                    BRAND NEW</Text>
                </Pressable>
                
              </View>
              {!!errorCondition && <Text style={styles.error}>{errorCondition}</Text>}
            </View>
            <View style={{marginBottom: 20 }}>
              <Text style={styles.Title}> Price </Text>
              <View style={styles.priceInputContainer}>
                <Text>$ </Text>
                <TextInput 
                value={price} 
                onChangeText={setPrice} 
                style={styles.priceInput} 
                editable 
                multiline={true} 
                maxLength={200} 
                keyboardType="numeric" 
                placeholder="Price"/>
                {!!errorPrice && <Text style={styles.error}>{errorPrice}</Text>}
              </View>
            </View>
           
            <View style={styles.publishButton}>
              <CustomButton onPress={handlePublish} type="PRIMARY" text={"Publish"}/>
            </View>
            
          </View>
          
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  photoItem: {
    height: 40, 
    width: 40, 
    resizeMode: "contain", 
    tintColor: 'black', 
    opacity: 0.5
  },

  morePhotosContainer: {
    backgroundColor: "#D0D0D0", 
    marginRight: 10, 
    borderRadius: 5, 
    padding: 10
  },

  itemPhoto: {
    height:50, 
    width: 50, 
    resizeMode: "contain"
  },

  photoUpload: {
    alignItems: "center", 
    marginTop: 20, 
    backgroundColor: "#D0D0D0", 
    flex: 1, 
    flexDirection:"column", 
    padding:50, 
    width:350, 
    borderColor: "gray", 
    borderWidth: 1, 
    borderRadius: 10, 
    borderStyle: "solid"
  },

  error: {
    color: 'red',
    marginBottom: 5,
    marginTop: 5,
  },

  container: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
    justifyContent: 'center',
    marginBottom: 10,
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  publishButton: { 
    alignContent:"center", 
    flex: 1, 
    flexDirection: "row", 
    height: 50
  }, 

  priceInput: {
    width: 100, 
    borderBottomColor: "gray", 
    borderBottomWidth: 1, 
    padding: 5, 
    marginLeft: 10
  },

  priceInputContainer: {
    paddingLeft: 10,
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center"
  },

  Title: {
    fontWeight: "bold", 
    fontSize: 18,
    marginBottom: 10
  },

  brandNewButtonText: {
    fontWeight: "bold"
  },

  brandNewButton: {
    flex: 0.4,
    flexDirection: "row", 
    justifyContent: "center", 
    padding: 30, 
    paddingTop: 10, 
    paddingBottom: 10, 
    borderRadius: 20, 
    borderColor: "#007FFF",
    borderWidth: 1,
  },

  usedButton: {
    flex: 0.2, 
    flexDirection: "row", 
    justifyContent: "center", 
    padding: 40, 
    paddingTop: 10, 
    paddingBottom: 10, 
    borderRadius: 20, 
    borderColor: "#007FFF",
    borderWidth: 1,
  },

  usedButtonText: { 
    fontWeight: "bold"
  },

  conditionButtonContainer: {
    flex: 1, 
    flexDirection: "row", 
    justifyContent:"space-between", 
    backgroundColor: "white", 
    width: 360, 
    paddingLeft: 0,
    paddingRight: 10, 
    marginBottom: 10, 
    alignItems: "center"
  },

  itemDescriptionInput: {
    
    borderRadius: 5, 
    borderColor: "gray", 
    borderStyle: "solid", 
    borderWidth: 1, 
    height: 100, 
    textAlignVertical:"top", 
    padding: 10,
    width: 350
  },

  itemNameInput: {
    borderRadius: 5, 
    borderColor: "gray", 
    borderStyle: "solid", 
    borderWidth: 1, 
    height: 50, 
    textAlignVertical:"top", 
    padding: 10,
    width: 350,
  },

  headerLeft: {
    fontFamily: "CustomFont",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 20,
  }
});

export default ItemListingScreen;