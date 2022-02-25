import React, { Component } from 'react';
import {  Button, View, Text, TextInput, Alert } from 'react-native';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }
    handleEmailInput = (email) => {
        this.setState({email: email})
    }

    handlePasswordInput = (pass) => {
        this.setState({password: pass})
    }
    handleFirstNameInput = (first_name) => {
        this.setState({first_name: first_name})
    }
    handleLastNameInput = (last_name) => {
        this.setState({last_name: last_name})
    }
    message = (text) => {
        alert(text);
    }
    signUp = () => {
        fetch('http://localhost:3333/api/1.0.0/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.message("Succesfully registered");
           
         })
        .catch((error) => {
            console.log(error);
            this.message("Something's wrong. Try again");
        })
        
    }
   
    render() {
        return (
            <View>
                <Text>Sign Up</Text>
                <TextInput placeholder='First Name' onChangeText={this.handleFirstNameInput} value={this.state.first_name}/>
                <TextInput placeholder='Last Name' onChangeText={this.handleLastNameInput} value={this.state.last_name}/>
                <TextInput placeholder='Email' onChangeText={this.handleEmailInput} value={this.state.email}/>
                <TextInput placeholder='Password' onChangeText={this.handlePasswordInput} value={this.state.password} secureTextEntry={true}/>
                <Button title="Sign Up" onPress={() => this.signUp()}/>
            </View>
        );

    }
}
export default SignUp;