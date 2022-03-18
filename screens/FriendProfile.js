import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as FileSystem from 'expo-file-system';
import PostsFeed from "../components/PostsFeed";
import { LoginContext } from "../LoginContext";
import uuid from 'react-native-uuid';



class FriendProfile extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
            user_photo: null,
            isLoading: true,
            posts: [],
            isFriend: false
        }
    }

    getFriendDetails = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.props.route.params.friend.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
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
            .then((response) => {

                if (response.status == 200) {
                    this.setState({
                        isFriend: true
                    });
                    return response.json();
                }
            })
            .then((json) => {
                console.log(json);
                this.setState({ posts: json, isLoading: false });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    getFriendPhoto = async () => {

        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.route.params.friend.user_id + '/photo',
            FileSystem.documentDirectory + uuid.v4(),
            { headers: { "X-Authorization": this.context.token } })
            .then(({ uri }) => {
                this.setState({ user_photo: uri })
            })
    }
    componentDidMount() {

        this.getFriendDetails();
        this.getFriendPhoto();
        this.getFriendPosts();

    }
    sendFriendRequest = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.props.route.params.friend.user_id + '/friends', {
            method: 'POST',
            headers: {
                'X-Authorization': this.context.token
            }
        })
            .then((response) => console.log(response.status))
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View><Text>Loading...</Text></View>
            );
        } else {
            return (
                <ScrollView>
                    <Image
                        source={{
                            uri: this.state.user_photo,
                        }}
                        style={{
                            width: 400,
                            height: 400,
                            borderWidth: 5,
                            borderRadius: 200
                        }}
                    />
                    <View style={{ margin: 10 }}>
                        <Text style={styles.userName}>{this.state.user_data.first_name} {this.state.user_data.last_name} </Text>
                        <Text style={{ fontSize: 18, marginLeft: 5 }}>Friends: {this.state.user_data.friend_count}</Text>
                    </View>
                    {
                        this.state.isFriend ?
                            (<>

                                <PostsFeed listOfPosts={this.state.posts} />
                            </>) :
                            (<View style={{ color: '#B22222', padding: 6 }}>
                                <Button color='#B22222' title='Send request' onPress={() => this.sendFriendRequest()} />
                            </View>)
                    }

                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    userName: {
        fontSize: 22,
        fontWeight: '200',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
});

export default FriendProfile;