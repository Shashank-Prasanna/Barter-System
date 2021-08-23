import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import AuthScreen from './screens/authScreen.js'
import { TabNav } from './components/tabNav'
import { AppDrawerNav } from './components/appDrawerNav'
import { LogBox } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
        <AppContainer/> 
    </SafeAreaProvider>
  );
}

LogBox.ignoreAllLogs(true)

const SwitchNav = createSwitchNavigator({
  AuthScreen:{screen: AuthScreen}, 
  AppDrawer: {screen: AppDrawerNav},
  TabNavigator : {screen: TabNav},
})

const AppContainer = createAppContainer(
  SwitchNav
)