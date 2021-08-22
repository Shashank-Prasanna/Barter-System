import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class SettingsScreen extends React.Component {

  constructor(){
    super()
    this.state={
      first_name: '',
      last_name: '',
      email: firebase.auth().currentUser.email,
      phone_number: '',
      address: '',
      user_doc_ID: ''
    }
  }

  getData = () => {
    db.collection('users').where('email', '==', this.state.email).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log('doc is' + doc.data())
        this.setState({
          first_name: doc.data().first_name,
          last_name: doc.data().last_name,
          address: doc.data().address,
          phone_number: doc.data().phone_number,
          user_doc_ID: doc.id
        })
        console.log(this.state)
      })
    })
  }

  saveData = () => {
    db.collection('users').doc(this.state.user_doc_ID).update({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      phone_number: this.state.phone_number
    })
  }

  componentDidMount(){
    this.getData()
  }
  
  render() {
    return(
      <View style={styles.container}>
        <TextInput onChangeText={(text) => {this.setState({first_name:text})}} value={this.state.first_name} style={styles.textinput} placeholder='First Name'/>
        <TextInput onChangeText={(text) => {this.setState({last_name:text})}} value={this.state.last_name} style={styles.textinput} placeholder='Last Name' />
        <TextInput onChangeText={(text) => {this.setState({address:text})}} value={this.state.address} style={styles.textinput} placeholder='Address' />
        <TextInput onChangeText={(text) => {this.setState({phone_number:text})}} value={this.state.phone_number} style={styles.textinput} placeholder='Phone Number' />
        <TouchableOpacity style={styles.touchableopacityorange} onPress={this.saveData}> 
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container:{
		paddingTop: 30,
    backgroundColor: '#232324',
    height: Dimensions.get('window').height
	},
	textinput:{
		marginBottom: 20,
		width: Dimensions.get('window').width/1.3,
		alignSelf: 'center',
    color: '#ffffff',
    fontSize: 19
	},
	touchableopacityorange:{
		alignSelf: 'center',
		marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff681dff'
	},
  touchableopacityblue:{
		alignSelf: 'center',
		marginBottom: 30,
    borderRadius: 10,
    borderWidth: 1,
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').height/23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#349b9aff'
	}
	
})