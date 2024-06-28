import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {SearchNearbyScreen} from '../screens/SearchNearbyScreen';
import {SearchByUserScreen} from '../screens/SearchByUserScreen';


const Stack = createNativeStackNavigator();

const HomeSearchStackNav = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            title: 'Home',
            headerShown: false,
           }}
          
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ 
            title: 'Search',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchNearby"
          component={SearchNearbyScreen}
          options={{ title: 'Search Nearby' }}
        />
        <Stack.Screen
          name="SearchByUser"
          component={SearchByUserScreen}
          options={{ title: 'Search by User' }}
        />
      </Stack.Navigator>
   
  );
};

export default HomeSearchStackNav;