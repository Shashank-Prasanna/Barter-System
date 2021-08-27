import * as React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import SideBar from '../components/sideBar.js'
import SettingsScreen from '../screens/settingsScreen' 
import NotificationsScreen from '../screens/notificationsScreen.js';
import { TabNav } from '../components/tabNav'
import MyBartersScreen from '../screens/myBartersScreen'

export const AppDrawerNav = createDrawerNavigator({
  Home:{
    screen: TabNav,
  },
  MyBarters:{
    screen: MyBartersScreen,
    navigationOptions: {
      title: 'My Barters',
    }
  },
  Notifications:{
    screen: NotificationsScreen,
  },
  Settings:{
    screen: SettingsScreen,
  },
},
{
  contentComponent: SideBar
},
{
  initialRouteName: 'Home'
})