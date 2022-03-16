import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Friend from '../components/Friend';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class Friends extends Component {
constructor(props) {
    super(props);
    this.state = {
        listOfFriends: [],
        isLoading: true, 
        login_data: {}
    }
}

componentDidMount() {
    getData((data) => {
        this.setState({
            login_data: data
        });
    this.getListOfFriends();
    });
}
    getListOfFriends = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id + '/friends', {
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
            this.setState({listOfFriends: json, isLoading: false});
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render() {
        if(this.state.isLoading){
            return(
                <View><Text>Loading... </Text></View>
            );
        } else {
        return(
            <View>
                {this.state.listOfFriends.map(friend => 
                    <Friend navigation={this.props.navigation} key={friend.user_id} login_data={this.state.login_data} friend={friend}/>
                 )}
            </View>
        );
        }
    }
}

export default Friends;