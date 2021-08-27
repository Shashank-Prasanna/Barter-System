import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import {ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';

export default class MyBarterScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            bartersList: [],
            email: firebase.auth().currentUser.email,
            username: ''
        }
    }    

    getAllBarters = () => {
        this.request_ref = db.collection('barters').onSnapshot((snapshot) => {
            let barterList = snapshot.docs.map(doc => doc.data())
            this.setState({ bartersList: barterList })
        })
        console.log(this.state.bartersList)
    }

    sendNotification = async(item) => {
        let doc_ID = ' '
        await db.collection('notifications').where('user_ID', '==', item.exchanger_email).where('exchange_ID', '==', item.exchange_ID).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                doc_ID = doc.id
            })
        })
        console.log(doc_ID)
        db.collection('notifications').doc(doc_ID).update({
            message: this.state.username + ' has sent the item',
        })
    }

    sendItem = (item) => {
        console.log(item)
        this.sendNotification(item)
    }

    getUserInfo = () => {
        db.collection('users').where('email', '==', this.state.email).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    username: doc.data().username
                })
            })
        })
    }

    componentDidMount() {
        this.getUserInfo()
        this.getAllBarters()
    }

    keyExtractor = (item,index) => index.toString(); 

    renderItem = ({item,index}) => {
        return(
            <View style={styles.container}>
                <ListItem 
                key={index}
                title={item.item_name}
                subtitle={item.description}
                titleStyle={{color: '#ff681dff', fontWeight: 'bold', fontSize: 20}}
                style={{width: '100%'}}
                rightElement={
                    <TouchableOpacity style={{backgroundColor: '#349b9aff', paddingHorizontal: 40, paddingVertical: 10}} onPress={() => {
                        this.sendItem(item)
                    }}>
                        <Text style={{fontSize: 18}}>Barter</Text>
                    </TouchableOpacity>
                }
                />
            </View>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <FlatList 
                    data={this.state.bartersList}
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
		paddingTop: 30,
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
        backgroundColor: '#ff681dff',
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