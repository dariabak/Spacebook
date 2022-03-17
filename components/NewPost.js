import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HomeContext } from '../HomeContext';
import { loginContext } from '../loginContext';
import { styles } from '../styles/style';


class NewPost extends Component {
    static contextType = loginContext;
    constructor(props) {
        super(props);
        this.state = {
            post: ''
        }
    }
addNewPost = () => {
    fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.context.id + '/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            },
            body: JSON.stringify({
                text: this.state.post
            })
        })
        .then((response) => response.json())
        .then((json) => {
            this.props.addedNewPost();
        })
        .catch((error) => {
            console.log(error);
        })
}

componentDidMount() {
   
}

handlePostInput = (value) => {
    this.setState({post: value});
}
render() {
  
    return(
        <View style={{padding: 20, backgroundColor: '#ececec'}}>
            <Text style={styles.newPostText}>New post</Text>
            <TextInput style={styles.postField} multiline={true} value={this.state.post} onChangeText={this.handlePostInput}></TextInput>
            <View style={styles.buttonContainer}>
            <Button color='#B22222' title='Submit' onPress={() => this.addNewPost()}/>
            </View>
        </View>
        );
    }
}
export default NewPost;