import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FriendRequest from '../components/FriendRequest';
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

class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            login_data: {},
            friendRequests: []
        };
    }

    
    getFriendsRequests = () => {
        console.log(this.state.login_data.token);
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json);
            this.setState({friendRequests: json, isLoading: false});
        })
        .catch((error) => {
            console.log(error);
        })

    }
    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data
            });
            this.getFriendsRequests();
        });
    }
    render() {
        if(this.state.isLoading) {
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        } else {
        return (
            <ScrollView>
                <FriendRequest/>
            </ScrollView>
        );
    }
}
}
export default FriendRequests;