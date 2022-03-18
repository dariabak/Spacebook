import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Image } from 'react-native';
import React, { Component } from 'react';
import { LoginContext } from '../LoginContext';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';

class UserItem extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            user_photo: null
        }
    }
    componentDidMount() {
        this.getUserPhoto();
    }
    getUserPhoto = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.user.user_id + '/photo',
            FileSystem.cacheDirectory + uuid.v4(),
            { headers: { "X-Authorization": this.context.token } })
            .then(({ uri }) => {
                this.setState({ user_photo: uri })
            })
    }

    isLoggedUser = () => {
        if (this.props.user.user_id == this.context.id) {
            return true;
        }
        return false;
    }
    render() {
        return (
            <View style={{ padding: 5, margin: 5 }}>
                <View style={{ flexDirection: 'row', padding: 0 }}>
                    <Image
                        source={{
                            uri: this.state.user_photo,
                        }}
                        style={{
                            width: 50,
                            height: 50,
                            borderWidth: 5,
                            borderRadius: 25,
                            margin: 8
                        }} />
                    <Text style={{ marginTop: 12, fontSize: 18, marginLeft: 5 }}>{this.props.user.user_givenname} {this.props.user.user_familyname}</Text>
                </View>
                {this.isLoggedUser() ? (<>
                    <Button color='#B22222' title='Go to your profile' onPress={() => this.props.navigation.navigate('Profile')} />
                </>)
                    : (<>
                        <Button color='#B22222' title='See profile' onPress={() => this.props.navigation.navigate('FriendProfile', { friend: this.props.user })} />
                    </>)
                }
            </View>
        );
    }
}

export default UserItem;