import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal } from 'react-native';
import db from '../config'

export default class MyBarterScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            bartersList: []
        }
    }    

    getAllBarters = () => {
        db.collection('barters').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    bartersList: doc.data()
                })
            })
        })
    }

    componentDidMount() {
        this.getAllBarters()
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>My Barters</Text>
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