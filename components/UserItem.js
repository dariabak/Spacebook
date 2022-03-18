import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import { loginContext } from '../loginContext';

class UserItem extends Component {
    static contextType = loginContext;
    constructor(props) {
        super(props);
    }

getUserPhoto = () => {

}
sendFriendRequest = () => {
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.props.user.user_id + '/friends' , {
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
    return(
        <View style={{padding: 5, margin: 5}}>
            <Text>{this.props.user.user_givenname} {this.props.user.user_familyname}</Text>
            <Button title='Send friend request' onPress={this.sendFriendRequest}/>
            <Button title='See profile' onPress={() => this.props.navigation.navigate('FriendProfile')}/>
        </View>
    );
}
}

export default UserItem;