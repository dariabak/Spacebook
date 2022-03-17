import React, { Component } from 'react';
import {  Button, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../styles/style';


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
        fetch('http://10.0.2.2:3333/api/1.0.0/user', {
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
            <View style={styles.container}>
                <Text style={styles.text}>Sign Up</Text>
                <TextInput style={styles.inputField} placeholder='First Name' onChangeText={this.handleFirstNameInput} value={this.state.first_name}/>
                <TextInput style={styles.inputField} placeholder='Last Name' onChangeText={this.handleLastNameInput} value={this.state.last_name}/>
                <TextInput style={styles.inputField} placeholder='Email' onChangeText={this.handleEmailInput} value={this.state.email}/>
                <TextInput style={styles.inputField} placeholder='Password' onChangeText={this.handlePasswordInput} value={this.state.password} secureTextEntry={true}/>
                <View style={styles.buttonContainer}>
                <Button color='#B22222' title="Sign Up" onPress={() => this.signUp()}/>
                </View>
                <View style={styles.buttonContainer}>
                <Button color='#B22222' title="Login" onPress={() => this.props.navigation.navigate("Login")}/>
                </View>
            </View>
        );

    }
}
export default SignUp;