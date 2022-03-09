import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post';
import { HomeContext } from '../HomeContext';


const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class PostsFeed extends Component {
    static contextType = HomeContext;
    constructor(props) {
        super(props);
        this.state = {
            login_data: {},
            listOfPosts: [],
            isLoading: true
        };
        
    }

    
    // getUserPosts = () => {
    //     fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id + '/post', {
    //         method: 'GET',    
    //         headers: {
    //                 'X-Authorization': this.state.login_data.token
    //             }
    //         })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             this.setState({listOfPosts: json}); 

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }
    componentDidMount() {
        getData((data) => {
            console.log("ComponentDidMount");
            console.log(this.context.listOfPosts);
            this.setState({
                login_data: data,
                listOfPosts: this.context.listOfPosts,
                isLoading: false
            });
        });
    }

    render() {
        console.log("Render");
       console.log(this.context.listOfPosts);
       if(this.state.isLoading){
            return (<View><Text>Loading...</Text></View>);
       }else{
        return (
            <View>
                {this.state.listOfPosts.map(post => 
                    <Post post={{post}}/>
                 )}
            </View>
        );
                }
    }
}

export default PostsFeed;