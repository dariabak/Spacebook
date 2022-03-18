import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/style';
import { loginContext } from '../loginContext';


class EditProfile extends Component {
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
       
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            data: {}
        }
    }

    componentDidMount() {
        
            this.getUserData();
        
    }
    getUserData = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
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
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            },
            body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email
            })
        })
        .then((response) => {
            if(response.status == 200){
                this.props.route.params.onGoBack();
                this.props.navigation.goBack();
            } else {
                alert('Something went wrong. Try again');
            }
            
        })
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
            <View style={styles.container}>
                <Text style={styles.label}>First name: </Text>
                <TextInput style={styles.inputField} placeholder={this.state.data.first_name} value={this.state.first_name} onChangeText={value => this.setState({first_name: value})}></TextInput>
                <Text style={styles.label}>Last name:</Text>
                <TextInput style={styles.inputField} placeholder={this.state.data.last_name} value={this.state.last_name} onChangeText={value => this.setState({last_name: value})}/>
                <Text style={styles.label}>Email:</Text>
                <TextInput style={styles.inputField} placeholder={this.state.data.email} value={this.state.email} onChangeText={value => this.setState({email: value})}/>
                <View style={styles.buttonContainer}>
                <Button color='#B22222' title='Save' onPress={() => this.updateUserInfo()}></Button>
                </View>
            </View>
        );
    }
}

export default EditProfile;