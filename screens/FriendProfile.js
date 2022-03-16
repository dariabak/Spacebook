import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as FileSystem from 'expo-file-system';

const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class FriendProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_data: {},
            user_data: {},
            user_photo: null,
            isLoading: true
        }
    }

    getFriendDetails = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.state.user_data.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState ({
                user_data: json,
                isLoading: false
            });

        })
        .catch((error) => {
            console.log(error);
        })
    }

    // getFriendPosts = () => {

    // }
    // getFriendPhoto = () => {

    // }
    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data,
                isLoading: false
            });
            this.getFriendDetails();
        });
    }

    render() {
        return(
            <View>
                <Text>First name: {this.state.user_data.user_givenname} </Text>
                    <Text>Last name: {this.state.user_data.user_familyname}</Text>
                    <Text>Friends: {this.state.user_data.friend_count}</Text>
            </View>
        );
    }
}

export default FriendProfile;