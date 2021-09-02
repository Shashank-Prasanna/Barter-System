import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, FlatList, ScrollView } from 'react-native';
import {ListItem} from 'react-native-elements'
import CustomHeader from '../components/header'
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
      let requested_books_list = snapshot.docs.map(doc => doc.data())
      this.setState({
        requested_book_list: requested_books_list
      })
    })
  }

  keyExtractor = (item,index) => index.toString(); 

  renderItem = ({item,index}) => {
    return(
      <View style={styles.container}>
        <ListItem 
        key={index} 
        title={item.item_name}
        subtitle={item.description}     
        titleStyle={{color: '#ff681dff', fontWeight: 'bold'}}
        style={{width: '100%'}}
        rightElement={
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('UserDetails',{"details": item})
          }}
          style={{backgroundColor: '#349b9aff', paddingHorizontal: 10, paddingVertical: 10}} >
          <Text>Trade</Text>
        </TouchableOpacity>
     }
          bottomDivider
          />
      </View>
    )
  }
  

  componentDidMount() {
    this.getData()
  }

  
  componentWillUnmount() { 
    this.request_ref(); 
  }

  render() {
    {console.log(typeof this.state.requested_book_list)}
    return(
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title='Home'/>
        <ScrollView style={{}}> 
          <FlatList
            data={this.state.requested_book_list}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container:{
    backgroundColor: '#232324',
    flex: 1,
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