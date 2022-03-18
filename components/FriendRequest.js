import { StyleSheet, Text, View, Button, TextInput, ColorPropType, Image, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { loginContext } from '../loginContext';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';

class FriendRequest extends Component {
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            user_photo: null
        };
    }
    componentDidMount() {
        this.getUserPhoto();
    }
    acceptFriendRequest = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests/' + this.props.request.user_id , {
        method: 'POST',    
        headers: {
                'X-Authorization': this.context.token
            }
        })
        .then((response) => {
            if(response.status == 200) {
                this.props.update;
            } 
        })
        .catch((error) => {
            console.log(error);
        })
    }

    declineFriendRequest = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests/' + this.props.request.user_id , {
        method: 'DELETE',    
        headers: {
                'X-Authorization': this.context.token
            }
        })
        .then((response) => {
            if(response.status == 200) {
                this.props.update.updateRequests();
            } 
        })
        .catch((error) => {
            console.log(error);
        })
    }

    getUserPhoto = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.request.user_id + '/photo',
            FileSystem.cacheDirectory + uuid.v4(),
            {headers: {"X-Authorization": this.context.token}})
            .then(({uri}) => {
                this.setState({user_photo: uri})
            })
    }

    render() {
        return (
            
            <View style={{flexDirection: 'row', padding:5, width: '100%'}}>
            <Image 
                    source={{
                        uri: this.state.user_photo,
                        }}
                        style={{
                        width: 50,
                        height: 50,
                        borderWidth: 5,
                        borderRadius: 25, 
                        margin: 5
                        }}/>
            <Text style={{marginTop: 12, fontSize: 18, marginLeft: 5, marginRight: 15}}> {this.props.request.first_name} {this.props.request.last_name}</Text>
           
                <View style={{position: 'absolute', right: 5, marginTop: 12, flexDirection: 'row-reverse'}}>
                    <TouchableOpacity style={styles.button} onPress={() => this.declineFriendRequest()}>
                        <Text style={{color: '#ffffff', fontSize: 16, padding: 5}}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.acceptFriendRequest()}>
                        <Text style={{color: '#ffffff', fontSize: 16, padding: 5}}>Accept</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
          
        );
    }
}

const styles = StyleSheet.create( {
    button: {
        backgroundColor:'#B22222', 
        margin: 5, 
        alignContent: 'center', 
        justifyContent: 'center', 
        borderRadius: 5
    }
});
export default FriendRequest;