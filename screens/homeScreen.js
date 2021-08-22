import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state={
      requested_book_list: []
    }
  }

  getData = () => {
    this.request_ref = db.collection('exchange_requests').onSnapshot((snapshot) => {
      let requested_books_list = snapshot.docs.map((doc) => 
      doc.data()
      )
      this.setState({
        requested_book_list: requested_books_list
      })
      console.log(this.state.requested_book_list)
      console.log('^ book list')
    })
  }

  keyExtractor = (item,index) => index.toString(); 

  renderItem = ({item,index}) => {
    console.log(item + ' ' + index)
    return(
      <ListItem 
      style={{flex: 1}}
      key={index} 
      title={item.item_name}
      subtitle={item.description}     
      titleStyle={{color: '#121212', fontWeight: 'bold'}}
      rightElement={
        <TouchableOpacity style={styles.touchableopacityorange} 
        onPress={() => {this.props.navigations.navigate('UserDetails', {'details' : item})}}>
          <Text style={{color:'#ffffff'}}>Trade</Text>
        </TouchableOpacity>
      }
        bottomDivider
        />
    )
  }

  componentDidMount() {
    this.getData()
  }
  
  componentWillUnmount() { 
    this.request_ref(); 
  }

  render() {
    return(
      <View style={styles.container}>
        {this.state.requested_book_list === 0 ? (<Text>No items here!</Text>)          : (<FlatList keyExtractor={this.keyExtractor} data={this.state.requested_book_list} renderItem={this.renderItem} />)}
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
	}
	
})