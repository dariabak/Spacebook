import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';

class FriendRequest extends Component {

    acceptFriendRequest = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests/' + this.props.request.user_id , {
        method: 'POST',    
        headers: {
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => console.log(response.status))
        .catch((error) => {
            console.log(error);
        })
    }

    declineFriendRequest = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests/' + this.props.request.user_id , {
        method: 'DELETE',    
        headers: {
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => console.log(response.status))
        .catch((error) => {
            console.log(error);
        })
    }
    render() {
        return (
            <View>
                <Text>{this.props.request.email}</Text>
                <Text>{this.props.request.frist_name}</Text>
                <Button title='Accept' onPress={this.acceptFriendRequest}/>
                <Button title='Decline' onPress={this.declineFriendRequest}/>
            </View>
        );
    }
}
export default FriendRequest;