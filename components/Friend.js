import { Image, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input, requireNativeComponent } from 'react-native';
import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';

class Friend extends Component {
    constructor(props){
        super(props);
        this.state = {
            friend_photo: null
        }
    }

    getUserPhoto = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.friend.user_id + '/photo',
            FileSystem.documentDirectory + 'friendPicture',
            {headers: {"X-Authorization": this.props.login_data.token}})
            .then(({uri}) => {
                this.setState({friend_photo: uri})
            })
    }
    
    componentDidMount() {
        this.getUserPhoto();
    }
    render() {
        return(
            <View>
                <Image
                        source={{
                        uri: this.state.friend_photo,
                        }}
                        style={{
                        width: 100,
                        height: 100,
                        borderWidth: 5 
                        }}
                    />
                <Text>{this.props.friend.user_givenname}</Text>
                <Text>{this.props.friend.user_familyname}</Text>
                <Button title='See profile' onPress={() => this.props.navigation.navigate('FriendProfile', {friend: this.props.friend})}/>
            </View>
        );
    }
}
export default Friend;