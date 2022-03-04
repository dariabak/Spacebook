import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useContext } from 'react';
import App from '../App';
import { loginContext } from '../loginContext';


const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@spacebook_details', jsonValue);
    } catch (e) {
        console.log(error);
    }
}

const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}


class Login extends Component {
    static contextType = loginContext;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:''
        }
        
        
    }

    componentDidMount()
    {
   
    }    
    handleEmailInput = (email) => {
        this.setState({email: email})
    }

    handlePasswordInput = (pass) => {
        this.setState({password: pass})
    }

    signUp = () => {
        
        this.props.navigation.navigate("SignUp");
    }
    login = () => {
        fetch( 'http://localhost:3333/api/1.0.0/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.state.isLoggedIn = true;
            storeData(json);
            this.context.setAuth(true);
            })
        .catch((error) => {
            clearAsyncStorage();
            console.log(error);
        })
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                <TextInput placeholder="Email" onChangeText={this.handleEmailInput} value={this.state.email}/>
                <TextInput placeholder="Password" onChangeText={this.handlePasswordInput} value={this.state.password} secureTextEntry={true}/>
                <Button title="Login" onPress={() => this.login()}/>
                <Button title="Sign Up" onPress={() => this.signUp()}/>
                <Text>Test</Text>
            </View>
        );
    }

}
export default Login;