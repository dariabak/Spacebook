import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import PostsFeed from "../components/PostsFeed";
import { loginContext } from "../loginContext";



class FriendProfile extends Component {
    static contextType = loginContext;
    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
            user_photo: null,
            isLoading: true,
            posts: []
        }
    }

    getFriendDetails = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.props.route.params.friend.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState ({
                user_data: json
            });

        })
        .catch((error) => {
            console.log(error);
        })
    }

    getFriendPosts = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.props.route.params.friend.user_id + '/post', {
        method: 'GET',    
        headers: {
                'X-Authorization': this.context.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState({posts: json, isLoading: false}); 
        })
        .catch((error) => {
            console.log(error);
        })
    }
    getFriendPhoto = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.route.params.friend.user_id + '/photo',
            FileSystem.documentDirectory + 'friendProfilePicture',
            {headers: {"X-Authorization": this.context.token}})
            .then(({uri}) => {
                this.setState({user_photo: uri})
            })
    }
    componentDidMount() {
        
            this.getFriendDetails();
            this.getFriendPhoto();
            this.getFriendPosts();
    
    }

    render() {
        if(this.state.isLoading){
            return(
                <View><Text>Loading...</Text></View>
            );
        } else {
        return(
            <ScrollView>
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
                    <PostsFeed listOfPosts={this.state.posts}/>
            </ScrollView>
        );
        }
    }
}

export default FriendProfile;