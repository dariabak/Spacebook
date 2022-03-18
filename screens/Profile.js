import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Button, PermissionsAndroid} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import { loginContext } from "../loginContext";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

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
       
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/photo',
            FileSystem.documentDirectory + uuid.v4(),
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
    uploadPhotoFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });
        console.log(result.uri);
        const image = await fetch(result.uri);
        const blob = await image.blob();

        await this.uploadImage(blob);
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
                <ScrollView>
                      <Image
                        source={{
                        uri: this.state.user_photo,
                        }}
                        style={{
                        width: 400,
                        height: 400,
                        borderWidth: 5,
                        borderRadius: 200
                        }}
                    />
                    <View style={styles.userDataContainer}>
                    <Text style={styles.userName}>{this.state.user_data.first_name} {this.state.user_data.last_name}</Text>
                    <Text style={styles.friendText}>Friends: {this.state.user_data.friend_count}</Text>
                    </View>
                    <View style={styles.editProfileButtonContainer}>
                    <Button marginBottom={12} color='#B22222' title='Change profile photo' onPress={() => this.uploadProfilePicture()}/>
                    </View>
                    <View style={styles.editProfileButtonContainer}>
                    <Button color='#B22222' title='Edit profile' onPress={() => this.props.navigation.navigate('EditProfile')}/>
                    </View>
                    <View style={styles.editProfileButtonContainer}>
                    <Button color='#B22222' title='Friends' onPress={() => this.props.navigation.navigate('Friends')}/>
                    </View>
                    <View style={styles.editProfileButtonContainer}>
                    <Button color='#B22222' title='Upload photo from gallery' onPress={() => this.uploadPhotoFromGallery()}/>
                    </View>
                </ScrollView>
            );
        }
    }
}

  const styles = StyleSheet.create({
    userName: {
        fontSize: 22,
        fontWeight: '200',
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
      },
      editProfileButtonContainer: {
          color: '#B22222',
          padding: 6
      },
      userDataContainer: {
          margin: 10
      },
      friendText: {
        fontSize: 18,
        margin: 5
      }
  });
export default Profile;