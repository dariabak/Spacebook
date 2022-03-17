import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Friend from '../components/Friend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginContext } from '../loginContext';


class Friends extends Component {
    static contextType = loginContext;
constructor(props) {
    super(props);
    this.state = {
        listOfFriends: [],
        isLoading: true, 
    }
}

componentDidMount() {
   
    this.getListOfFriends();

}
    getListOfFriends = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/friends', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
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
                    <Friend navigation={this.props.navigation} key={friend.user_id} friend={friend}/>
                 )}
            </View>
        );
        }
    }
}

export default Friends;