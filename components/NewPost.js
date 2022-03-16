import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

class NewPost extends Component {
    static contextType = HomeContext;
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            login_data: {}
        }
    }
addNewPost = () => {
    fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.state.login_data.id + '/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
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
    getData((data) => {
        this.setState({
            login_data: data        
        });
    })
}

handlePostInput = (value) => {
    this.setState({post: value});
}
render() {
  
    return(
        <View style={{padding: 20}}>
            <Text style={{padding: 10}}>Add new post!</Text>
            <TextInput style={{height: 100, backgroundColor: '#ececec', borderColor: '#232023' }} multiline={true} value={this.state.post} onChangeText={this.handlePostInput}></TextInput>
            <Button title='Submit' onPress={() => this.addNewPost()}/>
        </View>
        );
    }
}
export default NewPost;