import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class ExchangeScreen extends React.Component {
  constructor() {
    super()
    this.state={
      item_name : '',
      description : '',
      username: firebase.auth().currentUser.email
    }
  }

  addItem = () => {
    console.log(this.state.username)
    db.collection('exchange_requests').add({
      'username' : this.state.username,
      'item_name': this.state.item_name,
      'description': this.state.description
    })
    .catch((error) => {
      console.log(error)
    })
    return Alert.alert(
      'Request Sent!',
      '',
      [
        {text: 'OK', onPress:  () => {
          this.props.navigation.navigate('HomeScreen')
        }}
      ]
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <TextInput onChangeText={(text) => {this.setState({item_name: text})}} placeholderTextColor='#349b9a' style={styles.textinput} placeholder='Item Name'/>
        <TextInput onChangeText={(text) => {this.setState({description: text})}} placeholderTextColor='#349b9a' style={styles.textinput} placeholder='Description' multiline={true}/>
        <TouchableOpacity style={styles.touchableopacityorange} onPress={this.addItem}>
          <Text>Add Item</Text>
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
    color: '#cdcdcd',
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

