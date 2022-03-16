import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import PostsFeed from "../components/PostsFeed";

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
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.props.route.params.friend.user_id, {
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
    getFriendPhoto = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.route.params.friend.user_id + '/photo',
            FileSystem.documentDirectory + 'friendProfilePicture',
            {headers: {"X-Authorization": this.state.login_data.token}})
            .then(({uri}) => {
                this.setState({user_photo: uri})
            })
    }
    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data,
                isLoading: false
            });
            this.getFriendDetails();
            this.getFriendPhoto();
        });
    }

    render() {
        return(
            <View>
                <Image
                        source={{
                        uri: this.state.user_photo,
                        }}
                        style={{
                        width: 400,
                        height: 300,
                        borderWidth: 5 
                        }}
                    />
                <Text>First name: {this.state.user_data.first_name} </Text>
                    <Text>Last name: {this.state.user_data.last_name}</Text>
                    <Text>Friends: {this.state.user_data.friend_count}</Text>
                    <PostsFeed />
            </View>
        );
    }
}

export default FriendProfile;