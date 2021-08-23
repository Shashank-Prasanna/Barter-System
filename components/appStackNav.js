import * as React from 'react';
import { AppDrawerNav } from './appDrawerNav';
import UserDetailsScreen from '../screens/userDetailsScreen';
import {createStackNavigator} from 'react-navigation-stack'

export const AppStackNavigator = createStackNavigator({
    AppDrawer: {screen: AppDrawerNav},
    UserDetails: {screen: UserDetailsScreen},
})