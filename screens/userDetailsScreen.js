import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class UserDetailsScreen extends React.Component {
  constructor(){
    super()
    this.state={
      username: '',
      first_name: '',
      last_name: '',
      address: '',
      phone_number: '',
      email: firebase.auth().currentUser.email,
      user_doc_ID: ''
    }
  }

  getUserDetails = () => {
    db.collection('users').where('email','==',this.state.email).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          username: doc.data().username,
          first_name: doc.data().first_name,
          last_name: doc.data().last_name,
          address: doc.data().address,
          phone_number: doc.data().phone_number,
          user_doc_ID: doc.id
        })
      })
    }
    )
  }


  addBarters = () => {
    db.collection('barters').add({
      item_name: '',
      exchanger_name: '',
      exchanger_phone_number: '',
      exchanger_email: '',
      exchanger_address: '',
      barter_ID: '',
      barter_status: 'TODO has shown interest',
    })
  }
  
  render() {
    return(
      <Text>UD</Text>
    )
  }
}
