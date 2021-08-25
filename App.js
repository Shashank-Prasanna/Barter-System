import * as React from 'react';
import { Text, View, StyleSheet, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import {createDrawerNavigator} from 'react-navigation-drawer'
import SideBar from './components/sideBar.js'
import SettingsScreen from './screens/settingsScreen' 
import AuthScreen from './screens/authScreen.js'
import{ AppStackNavigator } from './components/appStackNav.js';
import { TabNav } from './components/tabNav'
import { AppDrawerNav } from './components/appDrawerNav'


LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
    <SafeAreaProvider>
        <AppContainer/> 
    </SafeAreaProvider>
  );
}


const SwitchNav = createSwitchNavigator({
  AuthScreen:{screen: AuthScreen}, 
  AppStackNav:{screen: AppStackNavigator}
})

const AppContainer = createAppContainer(
  SwitchNav
)