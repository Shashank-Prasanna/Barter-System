import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase'
import db from '../config'


export default class NotificationsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            notifications: [],
            email: firebase.auth().currentUser.email,
        }
    }

    keyExtractor = (item,index) => index.toString(); 

    renderItem = ({item,index}) => {
        return(
            <View style={styles.container}>
                <ListItem 
                key={index}
                title={item.item_name}
                subtitle={item.message}
                titleStyle={{color: '#ff681dff', fontWeight: 'bold', fontSize: 20}}
                style={{width: '100%'}}
                />
            </View>
        )
    }

    getNotifications = () => {
        db.collection('notifications').where('user_ID', '==', this.state.email).get()
        .then(snapshot => {
            let all_notifications = []
            snapshot.forEach(doc => {
                let notification = doc.data()
                notification['doc_ID'] = doc.id
                all_notifications.push(notification)
            })
            this.setState({notifications: all_notifications})
            console.log(this.state.notifications)
        })
    }

    componentDidMount() {
        this.getNotifications()
    }


    render() {
        return(
            <View style={styles.container}>
                <FlatList keyExtractor={this.keyExtractor} renderItem={this.renderItem} data={this.state.notifications} />
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