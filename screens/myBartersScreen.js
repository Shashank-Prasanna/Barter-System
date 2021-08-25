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
            bartersList: []
        }
    }    

    getAllBarters = () => {
        this.request_ref = db.collection('barters').onSnapshot((snapshot) => {
            let barterList = snapshot.docs.map(doc => doc.data())
            this.setState({ bartersList: barterList })
        })
        console.log(this.state.bartersList)
    }

    componentDidMount() {
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
                    <TouchableOpacity style={{backgroundColor: '#349b9aff', paddingHorizontal: 40, paddingVertical: 10}}>
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