import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';



const getData = async(done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}



class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login_data: {},
            user_data: {},
            user_photo: null,
            isLoading: true
        }
    }

    getUserDetails = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.state.login_data.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            this.setState ({
                user_data: json,
                isLoading: false
            });

        })
        .catch((error) => {
            console.log(error);
        })
    }
    getUserPhoto = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id + '/photo',
            FileSystem.documentDirectory + 'profilePicture',
            {headers: {"X-Authorization": this.state.login_data.token}})
            .then(({uri}) => {
                this.setState({user_photo: uri})
            })
          
    }
    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data
            });
            this.getUserPhoto();
            this.getUserDetails();
        });
    }
    
    render() {
        const url = 'http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id + '/photo';
        if(this.state.isLoading){
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        );
        } else {
            return (
                <ScrollView style={styles.container}>
                      <Image
                        source={{
                        uri: this.state.user_photo,
                        }}
                        style={{
                        width: 400,
                        height: 300,
                        borderWidth: 5 
                        }}
                    />
                    <Text style={styles.userName}>First name: {this.state.user_data.first_name} </Text>
                    <Text>Last name: {this.state.user_data.last_name}</Text>
                    <Text>Friends: {this.state.user_data.friend_count}</Text>
                    <Button title='Edit profile'/>
                    <Button title='Friends' onPress={() => this.props.navigation.navigate('Friends')}/>
                    
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: '#C2185B',
      height: Constants.statusBarHeight
    },
    container: {
      flex: 1
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
      },
  });
export default Profile;