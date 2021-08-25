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
      item_name: this.props.navigation.getParam('details')['item_name'],
      exchanger_name: this.state.username,
      exchanger_phone_number: this.state.phone_number,
      exchanger_email: this.state.email,
      exchanger_address: this.state.address,
      exchange_ID: this.props.navigation.getParam('details')['exchange_ID'],
      barter_status: this.state.username + ' wants to trade',
    })
    this.props.navigation.navigate('Home')
  }

  componentDidMount(){
    this.getUserDetails()
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.titleStyle}>{this.props.navigation.getParam('details')['item_name']}</Text>
        <Text style={styles.subtitleStyle}>{this.props.navigation.getParam('details')['description']}</Text>
        <TouchableOpacity style={styles.touchableopacityorange} onPress={() => {this.addBarters()}}>
          <Text style={{fontSize: 20}}>Barter</Text>
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
    width: '50%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff681dff',
    marginTop: 40
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
	},
  titleStyle:{
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    color: '#349b9aff'
  },
  subtitleStyle:{
    alignSelf: 'center',
    marginTop: 20, 
    width: '90%',
    color: 'white',
    fontSize: 20,
  }
	
})
