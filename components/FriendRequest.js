import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';

class FriendRequest extends Component {
    render() {
        return (
            <View>
                <Button title='Accept'/>
                <Button title='Decline'/>
            </View>
        );
    }
}
export default FriendRequest;