import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-view'
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'
import db from '../config'

export default class SideBar extends React.Component {
  constructor(){
    super()
  }
  render() {
   return(
        <View style={{backgroundColor:'#232323', flex: 1}}>
          <DrawerItems {...this.props} />
          <View style={{flex: 1, paddingLeft: 12, paddingBottom: 30}}>
            <TouchableOpacity onPress = {() => {
              this.props.navigation.navigate('AuthScreen')
              firebase.auth().signOut()
            }}>
              <Text> Log Out </Text>
            </TouchableOpacity>
            {console.log('hi!')}
          </View>
        </View>
    )
  }
 }