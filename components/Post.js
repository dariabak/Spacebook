import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import { HomeContext } from '../HomeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class Post extends Component {
    // post = this.props.post;
    constructor(props){
        super(props);
        this.state = {
            login_data: {}
        }
    }
    likePost = () => {
        console.log(this.props.post.post.post_id);
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.props.post.post.author.user_id + '/post/' + this.props.post.post.post_id + '/like', {
            method: 'POST',
            headers: {
                'X-Authorization': this.state.login_data.token
            }
        
        })
        .then((response) => response.text())
        .then((result) => {
            console.log(result);
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
        })
    }
    render() {
        const data = this.props.post;
        return(
            <View style={{padding: 15, margin: 5, backgroundColor: '#ececec'}}>
                <Text>{this.props.post.post.author.first_name} {this.props.post.post.author.last_name}</Text>
                <Text>{this.props.post.post.text}</Text>
                <Text>Likes: {this.props.post.post.numLikes}</Text>
                <Button title='Like' onPress={this.likePost}></Button>
                <Text>{this.props.post.post.timestamp}</Text>
                
            </View>
        ); 
    }
}

export default Post;