import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, Modal, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import HomeScreen from '../screens/homeScreen'
import ExchangeScreen from '../screens/exchangeScreen'

export const TabNav = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen, 
    navigationOption: {
      tabBarLabel: 'Donate'
    }
  }, 
  Exchange: {
    screen: ExchangeScreen, 
    navigationOption: {
      tabBarLabel: 'Request'
    }
  }
})

function MyTabs() {
  return (
    <TabNav.Navigator shifting={true} barStyle={{backgroundColor:'#349b9a'}}>
      <TabNav.Screen name='Home' component={HomeScreen} />
      <TabNav.Screen name='Add Item' component={ExchangeScreen} />
    </TabNav.Navigator>
  )
}