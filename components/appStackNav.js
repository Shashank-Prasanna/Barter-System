import * as React from 'react';
import {AppDrawerNav, appDrawerNav} from './appDrawerNav';
import UserDetailsScreen from '../screens/userDetailsScreen';
import {createStackNavigator} from 'react-navigation-stack'

export const AppStackNavigator = createStackNavigator({
    AppDrawer: {screen: AppDrawerNav, navigationOptions:{headerShown: false}},
    UserDetails: {screen: UserDetailsScreen, navigationOptions: {headerShown: false}}
})