import * as React from 'react';
import { TabNav } from './tabNav'
import UserDetailsScreen from '../screens/userDetailsScreen';
import {createStackNavigator} from 'react-navigation-stack'

export const AppStackNavigator = createStackNavigator({
    TabNav: {screen: TabNav, navigationOptions:{headerShown: false}},
    UserDetails: {screen: UserDetailsScreen, navigationOptions: {headerShown: false}},
})