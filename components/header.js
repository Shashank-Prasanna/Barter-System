import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-view'
import { DrawerItems } from 'react-navigation-drawer'
import { Header, Icon, Badge } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'
import db from '../config'

export default class CustomHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: firebase.auth().currentUser.email,
            unreadNotifications: ''
        }
    }

    bellIconWithBadge = () => {
            return (
                <View style={{paddingRight: 10}}>
                    <Icon name='bell' type='font-awesome' color='#343434' size={30} onPress={() => this.props.navigation.navigate('Notifications')} />
                    <Badge value={this.state.unreadNotifications} containerStyle={{position: 'absolute', top: -3, right: 5 }} />
                </View>
            )
        }

    getUnreadNotifications = () => {  
        db.collection('notifications').where('notification_status', '==', 'Unread').where('user_ID', '==', this.state.email).onSnapshot(snapshot => {
            let unreadNotifications = snapshot.docs.length
            this.setState({unreadNotifications: unreadNotifications})
            console.log(this.state.unreadNotifications)
        })}

    componentDidMount() {
        this.getUnreadNotifications()
    }

    render() {
        return(
            <Header backgroundColor='#349b9aff' leftComponent={ 
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name='bars' type='font-awesome' color='#343434' size={35} style={{marginLeft: 5, marginBottom: 10}} onPress={() => {this.props.navigation.toggleDrawer()}} /> 
                </TouchableOpacity>
            } centerComponent={
                <Text style={{fontSize: 20, color: '#343434', fontWeight: 'bold', marginBottom:10}}>{this.props.title}</Text>
            } rightComponent={this.bellIconWithBadge()} />
        )
    }
}