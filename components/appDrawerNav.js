import * as React from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer'
import SideBar from '../components/sideBar.js'
import SettingsScreen from '../screens/settingsScreen' 
import { TabNav } from '../components/tabNav'
import MyBartersScreen from '../screens/myBartersScreen'

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return(
    <Drawer.Navigator initialRouteName='Home' drawerContent={(props) => {<SideBar {...props} />}}>
      <Drawer.Screen name="Home" component={TabNav} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="My Barters" component={MyBartersScreen} />
      <DrawerItem label="Logout" onPress={() => {
        firebase.auth().signOut()
        this.props.navigation.navigate('AuthScreen')
      }} />
    </Drawer.Navigator>
  )
}