import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async(done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details');    
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            login_data: {},
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            data: {}
        }
    }

    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data
            });
            this.getUserData();
        });
    }
    getUserData = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState({
                data: json,
                first_name: json.first_name,
                last_name: json.last_name,
                email: json.email
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    updateUserInfo = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email
            })
        })
        .then((response) => response)
        .catch((error) => {
            console.log(error);
        })
    }
    onChangeHandler = (key, value) => {
        this.setState({
            key: value
        })
    }

    render() {
        return(
            <View>
                <Text>First name: </Text>
                <TextInput placeholder={this.state.data.first_name} value={this.state.first_name} onChangeText={value => this.setState({first_name: value})}></TextInput>
                <Text>Last name:</Text>
                <TextInput placeholder={this.state.data.last_name} value={this.state.last_name} onChangeText={value => this.setState({last_name: value})}/>
                <Text>Email:</Text>
                <TextInput placeholder={this.state.data.email} value={this.state.email} onChangeText={value => this.setState({email: value})}/>
                <Button title='Save' onPress={() => this.updateUserInfo()}></Button>
            </View>
        );
    }
}

export default EditProfile;