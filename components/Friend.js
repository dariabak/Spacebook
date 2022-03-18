import { Image, Text, View, Button, TouchableOpacity, FlatList, ActivityIndicator, Input, requireNativeComponent } from 'react-native';
import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';
import { loginContext } from '../loginContext';
import uuid from 'react-native-uuid';

class Friend extends Component {
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            friend_photo: null
        }
    }

    getUserPhoto = async () => {
         FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.friend.user_id + '/photo',
            FileSystem.cacheDirectory + uuid.v4(),
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
            <View style={{flexDirection: 'row', padding:5, width: '100%'}}>
                <Image
                        source={{
                        uri: this.state.friend_photo,
                        }}
                        style={{
                        width: 70,
                        height: 70,
                        borderWidth: 5,
                        borderRadius: 5,
                        margin: 5,
                        }}
                    />
                <Text style={{marginTop: 25, fontSize: 16, marginLeft: 5, marginRight: 15}}>{this.props.friend.user_givenname} {this.props.friend.user_familyname}</Text>
                <View style={{position: 'absolute', right: 5, marginTop: 25, flexDirection: 'row-reverse'}}>
                <TouchableOpacity style={{backgroundColor:'#B22222', 
                    margin: 5, 
                    paddingHorizontal: 5,
                    alignContent: 'center', 
                    justifyContent: 'center', 
                    borderRadius: 5}} 
                    onPress={() => this.props.navigation.navigate('FriendProfile', {friend: this.props.friend})}>
                        <Text style={{color: '#ffffff', fontSize: 16, padding: 5}}>See profile</Text>
                    </TouchableOpacity>
                    </View>
            </View>
        );
    }
}
export default Friend;