import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import SideBar from '../components/sideBar.js'
import SettingsScreen from '../screens/settingsScreen' 
import { TabNav } from '../components/tabNav'
import MyBartersScreen from '../screens/myBartersScreen'

export const AppDrawerNav = createDrawerNavigator({
  Home:{
    screen: TabNav,
  },
  Settings:{
    screen: SettingsScreen,
  },
  MyBarters:{
    screen: MyBartersScreen,
    navigationOptions: {
      title: 'My Barters',
    }
  },
},
{
  contentComponent: SideBar
},
{
  initialRouteName: 'Home'
})