import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post';
import { HomeContext } from '../HomeContext';
import { loginContext } from '../loginContext';


class PostsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    
            this.setState({
                listOfPosts: this.props.listOfPosts,
                isLoading: false
            });
     
    }

    render() {

       if(this.state.isLoading){
            return (<View><Text>Loading...</Text></View>);
       }else{
        return (
            <View>
                {this.state.listOfPosts.map(post => 
                    <Post key={post.id} post={{post}}/>
                 )}
            </View>
        );
                }
    }
}

export default PostsFeed;