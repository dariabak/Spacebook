import { StyleSheet, Text, View, Button, TextInput, ColorPropType, Modal } from 'react-native';
import React, { Component } from 'react';
import { HomeContext } from '../HomeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false
        }
    }



    toggleModal = () => {
        let isTrue = true;
        if(this.state.isModalVisible){
            isTrue = false;
        } 

        this.setState({
            isModalVisible: isTrue
        })
    }


    render() {
        return(
            <View>
                <Text></Text>
            </View>
        );
}
}