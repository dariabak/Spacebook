import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FriendRequest from '../components/FriendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserItem from '../components/UserItem';
import { LoginContext } from '../LoginContext';
import { styles } from '../styles/style';



class FriendRequests extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            friendRequests: [],
            search_data: [],
            search: '',
            getFriendRequests: this.getFriendRequests
        };
    }


    getFriendRequests = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests', {
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
                this.setState({ friendRequests: json, isLoading: false });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    componentDidMount() {

        this.getFriendRequests();
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('FriendSearch')}>
                    <Text>Search Friends</Text>
                </TouchableOpacity>
            )
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator animating size='large' />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>
                    {this.state.friendRequests.map(request => {
                        return (
                            <View>
                                <FriendRequest key={request.user_id} request={request} update={this.state.getFriendRequests} />
                                <View
                                    style={{
                                        height: 1,
                                        width: '86%',
                                        backgroundColor: '#CED0CE',
                                        marginLeft: '14%',
                                    }}
                                />
                            </View>);
                    }
                    )}
                </View>
            );
        }
    }
}
export default FriendRequests;