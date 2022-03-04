import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import Profile from './Profile';
import Topbar from '../components/Topbar';
import { loginContext } from '../loginContext';

const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}
const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

class HomePage extends Component {
    static contextType = loginContext;
constructor(props) {
    super(props);
    this.state = {
        login_data: {},
        isLoading: true
    }
}
componentDidMount() {
    getData((data) => {
        this.setState({
            login_data: data,
            isLoading: false
        });
    });
}

logout = () => {
    fetch('http://10.0.2.2:3333/api/1.0.0/logout', {
        method: 'POST',    
        headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then(() => {
            clearAsyncStorage();
            this.context.setAuth(false);
        })
        .catch((error) => {
            console.log(error);
        })
}
render() {
    
        return (
        <View>
            <Button title='Logout' onPress={() => this.logout()}/>
        </View>
        );

}
}
export default HomePage;