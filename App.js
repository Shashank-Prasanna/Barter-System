import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import SideBar from './components/sideBar.js'
import SettingsScreen from './screens/settingsScreen' 
import AuthScreen from './screens/authScreen.js'
import { TabNav } from './components/tabNav'
import { AppDrawerNav } from './components/appDrawerNav'

export default function App() {
  return (
    <SafeAreaProvider>
        <AppContainer/> 
    </SafeAreaProvider>
  );
}


const SwitchNav = createSwitchNavigator({
  AuthScreen:{screen: AuthScreen}, 
  AppDrawer: {screen: AppDrawerNav},
  TabNavigator : {screen: TabNav},
})

const AppContainer = createAppContainer(
  SwitchNav
)