import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FriendRequest from '../components/FriendRequest';

class FriendRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            friendRequests: []
        }
    }
    render() {
        return (
            <ScrollView>
                <FriendRequest/>
            </ScrollView>
        );
    }
}
export default FriendRequests;