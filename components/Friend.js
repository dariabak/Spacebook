import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input, requireNativeComponent } from 'react-native';
import React, { Component } from 'react';

class Friend extends Component {
    render() {
        return(
            <View>
                <Text>{this.props.friend.user_email}</Text>
            </View>
        );
    }
}
export default Friend;