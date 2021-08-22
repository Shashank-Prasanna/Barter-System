import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class AuthScreen extends React.Component {
	constructor() {
		super()
		this.state={
      username: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      address: '',
			email: '',
			password: '',
      confirm_password: '',
      isModalVisible: false
		}
	}

	userSignIn = () => {
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.props.navigation.navigate('Home'))
		.catch(function(error){
			let errorMessage = error.message
			return Alert.alert(errorMessage)
		})
	}

  showModal = () => (
    <View style={styles.centeredView}>
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.isModalVisible}
        style={{flex: 1, color: '#349b9aff'}}
      >
        <View style={{backgroundColor: '#349b9aff'}}>
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({username: text})}} placeholder='Username' />
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({first_name: text})}} placeholder='First Name' />
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({last_name: text})}} placeholder='Last Name' />
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({phone_number: text})}} placeholder='Phone Number' />
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({address: text})}} placeholder='Address' />
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({email: text})}} placeholder='Email' />
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({password: text})}} placeholder='Password' /> 
          <TextInput style={styles.textinput} onChangeText={(text) => {this.setState({confirm_password: text})}} placeholder='Confirm Password' />
          <TouchableOpacity style={styles.touchableopacityblue} onPress={() => {
            this.setState({isModalVisible: false})
          }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableopacityorange} onPress={() => {this.userSignUp()}}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
    </Modal>
  </View>
  )

  userSignUp = () => {
    console.log(this.state.email)
    if(this.state.password !== this.state.confirm_password) {
      return Alert.alert('Password does not match confirm password')
    }
    else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        db.collection('users').add({
          username: this.state.username,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.phone_number,
          address: this.state.address,
        })
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        return Alert.alert(
          'User added successfully!',
          '',
          [
            {text: 'OK', onPress: () => this.setState({isModalVisible: false})}
          ]
        )
      })
      .catch((error) => {
        Alert.alert(error.message)
      })
    }
  }


	render() {
		return(
			<View style={styles.container}>
      {this.state.isModalVisible == true ? this.showModal() : console.log('nope')}
				<TextInput placeholderTextColor='#cdcdcd' onChangeText={(text) => {this.setState({email: text})}} style={styles.textinput} placeholder='Email'/>
				<TextInput placeholderTextColor='#cdcdcd' secureTextEntry={true} onChangeText={(text) => {this.setState({password: text})}}style={styles.textinput} placeholder='Password'/>
				<TouchableOpacity onPress={() => {
          this.setState({isModalVisible: true})
        }} style={styles.touchableopacityorange}>
					<Text>Sign Up</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.userSignIn} style={styles.touchableopacityblue}>
					<Text>Sign In</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		paddingTop: 30,
    backgroundColor: '#232324',
    flex: 1
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
	},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    borderWidth: 20
  },
	
})