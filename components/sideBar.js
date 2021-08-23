import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-view'
import { DrawerItems } from 'react-navigation-drawer'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import db from '../config'

export default class SideBar extends React.Component {
  constructor(){
    super()
    this.state={
      email:firebase.auth().currentUser.email,
      image: '#',
      first_name: '',
      last_name: '',
      username: ''
    }
  }

  selectPicture = async() => {
    const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if(!cancelled){
      this.uploadImage(uri,this.state.email)
    }
  }

  uploadImage = async(uri,email) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    let ref = firebase.storage().ref().child('profile-' + email)
    return ref.put(blob).then((response) => {
      this.fetchImage(email)
    })
  }

  fetchImage = (email) => {
    let storage_ref=firebase.storage().ref().child('profile-' + email)
    storage_ref.getDownloadURL().then((url) => {
      this.setState({
        image:url
      })
    }).catch((error) => {
      console.log(error)
      this.setState({
        image:'#'
      })
    })
  }

  getUserInfo = () => {
    db.collection('users').where('email','==',this.state.email).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        this.setState({
          first_name: doc.data().first_name,
          last_name: doc.data().last_name,
          username: doc.data().username
        })
      })
    })
  }

  componentDidMount(){
    this.fetchImage(this.state.email)
    this.getUserInfo()
  }

  componentDidUpdate(){
    this.getUserInfo()
    this.fetchImage(this.state.email)
  }


  render() {
   return(
        <View style={{backgroundColor:'#232323', flex: 1}}>
          <View style={{flex: 0.5, alignItems: 'center', backgroundColor: 'orange'}}>
            <Avatar rounded source={{uri:this.state.image}} size='medium' onPress={() => {
              this.selectPicture()
            }} containerStyle={styles.imageContainer} showEditButton />
            <Text style={{marginTop: 15, marginLeft: 11, alignSelf: 'center', fontWeight: 'bold'}}>{this.state.username}</Text>
          </View>
          <DrawerItems {...this.props} />
          <View style={{flex: 1, paddingLeft: 12, paddingBottom: 30}}>
            <TouchableOpacity onPress = {() => {
              this.props.navigation.navigate('AuthScreen')
              firebase.auth().signOut()
            }}>
              <Text> Log Out </Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
 }

 const styles = StyleSheet.create({
  imageContainer:{
    flex:0.75,
    width: '40%',
    height: '20%',
    marginLeft: 20,
    marginTop: 30, 
    borderRadius: 40
  }
})