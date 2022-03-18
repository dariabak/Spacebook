import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button, PermissionsAndroid} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { loginContext } from "../loginContext";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import * as ImagePicker from 'expo-image-picker';

class Profile extends Component {
static contextType = loginContext;
    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
            user_photo: null,
            isLoading: true
        }
    }

    getUserDetails = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.context.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
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
    getUserPhoto = async() => {
        await FileSystem.deleteAsync(FileSystem.documentDirectory + 'profilePicture')
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/photo',
            FileSystem.documentDirectory + 'profilePicture',
            {headers: {"X-Authorization": this.context.token}})
            .then(({uri}) => {
                this.setState({user_photo: uri})
            })
          
    }
    componentDidMount() {
    
           
            this.getUserPhoto();
            this.getUserDetails();
        
    }

    requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };


    uploadProfilePicture = async () => {
        await this.requestCameraPermission();
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            base64: true
          });
          const image = await fetch(result.uri);
          const blob = await image.blob();
          
          await this.uploadImage(blob);
    }

    uploadImage = async (blob) => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/photo' , {
        method: 'POST', 
        body: blob,   
        headers: {
                'Content-Type': 'image/jpeg',
                'X-Authorization': this.context.token
            }
        })
        .then((response) => response.text())
        .then((json) => console.log(json))
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        const url = 'http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/photo';
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
                    <Button title='Change profile photo' onPress={() => this.uploadProfilePicture()}/>
                    <Button title='Edit profile' onPress={() => this.props.navigation.navigate('EditProfile')}/>
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