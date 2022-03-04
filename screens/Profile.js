import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Topbar from "../components/Topbar";
import Constants from 'expo-constants';



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
            user_photo: '',
            isLoading: true
        }
    }

    getUserDetails = () => {
        fetch('http://localhost:3333/api/1.0.0/user/'  + this.state.login_data.id, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState ({
                user_data: json,
                isLoading: false
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data
            });
            this.getUserDetails();
        });
    }
    
    render() {
        if(this.state.isLoading){
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.statusBar}>
                        <Topbar/>
                    </View>
                    <Text>First name: {this.state.user_data.first_name} </Text>
                    <Text>Last name: {this.state.user_data.last_name}</Text>
                    <Text>Friends: {this.state.user_data.friend_count}</Text>
                </View>
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
    }
  });
export default Profile;