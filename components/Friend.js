import { Image, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input, requireNativeComponent } from 'react-native';
import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';
import { loginContext } from '../loginContext';

class Friend extends Component {
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            friend_photo: null
        }
    }

    getUserPhoto = async () => {
        await FileSystem.deleteAsync(FileSystem.documentDirectory + this.props.friend.user_id);
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.friend.user_id + '/photo',
            FileSystem.documentDirectory + this.props.friend.user_id,
            {headers: {"X-Authorization": this.context.token}})
            .then(({uri}) => {
                this.setState({friend_photo: uri})
            })
    }
    
    componentDidMount() {
        this.getUserPhoto();
    }
    render() {
        return(
            <View style={{margin: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                        source={{
                        uri: this.state.friend_photo,
                        }}
                        style={{
                        width: 100,
                        height: 100,
                        borderWidth: 5,
                        borderRadius: 10

                        }}
                    />
                <Text>{this.props.friend.user_givenname}</Text>
                <Text>{this.props.friend.user_familyname}</Text>
                <Button color='#B22222' title='See profile' onPress={() => this.props.navigation.navigate('FriendProfile', {friend: this.props.friend})}/>
            </View>
        );
    }
}
export default Friend;