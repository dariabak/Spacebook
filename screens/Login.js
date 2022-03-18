
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useContext } from 'react';
import { LoginContext } from '../LoginContext';
import Topbar from '../components/Topbar';


const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('@spacebook_details', jsonValue);
    } catch (e) {
        console.log(error);
    }
}

const clearAsyncStorage = async () => {
    //AsyncStorage.clear();
}


class Login extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            email: 'daria@gmail.com',
            password: '123456'
        }


    }

    componentDidMount() {

    }
    handleEmailInput = (email) => {
        this.setState({ email: email })
    }

    handlePasswordInput = (pass) => {
        this.setState({ password: pass })
    }

    signUp = () => {

        this.props.navigation.navigate("SignUp");
    }
    login = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/login/', {
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
                this.state.isLoggedIn = true;
                const value = {
                    isLoggedIn: true,
                    token: json.token,
                    id: json.id
                }
                storeData(json);
                this.context.setAuth(value);
            })
            .catch((error) => {
                clearAsyncStorage();
                console.log(error);
            })
    }

    render() {
        return (

            <View style={styles.container}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        width: 375,
                        height: 175
                    }}
                />
                <Text style={styles.text}>Login</Text>


                <TextInput style={styles.inputField} placeholder="Email" onChangeText={this.handleEmailInput} value={this.state.email} />
                <TextInput style={styles.inputField} placeholder="Password" onChangeText={this.handlePasswordInput} value={this.state.password} secureTextEntry={true} />
                <View style={styles.buttonContainer}>
                    <Button color='#B22222' title="Login" onPress={() => this.login()} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color='#B22222' title="Sign Up" onPress={() => this.signUp()} />
                </View>
            </View>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        margin: 10
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        padding: 5
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: 300,
        height: 40,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    buttonContainer: {
        color: '#B22222',
        padding: 5
    },
});
export default Login;