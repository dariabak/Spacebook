import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { Component } from 'react';



const login = () => {
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
        // storeData(json);
        // this.props.navigation.navigate("HomeScreen");
    })
    .catch((error) => {
        console.log(error);
    })
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:''
        }
    }

    handleEmailInput = (email) => {
        this.setState({email: email})
    }

    handlePasswordInput = (pass) => {
        this.setState({password: pass})
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                <TextInput placeholder="Email" onChangeText={this.handleEmailInput} value={this.state.email}/>
                <TextInput placeholder="Password" onChangeText={this.handlePasswordInput} value={this.state.password} secureTextEntry={true}/>
                <Button title="Login" onPress={() => this.login()}/>
            </View>
        );
    }

}
export default Login;