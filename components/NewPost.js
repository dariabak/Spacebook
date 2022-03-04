import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';


class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: ''
        }
    }
addNewPost = () => {

}
handlePostInput = (value) => {
    this.setState({post: value});
}
render() {
    return(
        <View style={{padding: 20}}>
            <Text style={{padding: 10}}>Add new post!</Text>
            <TextInput style={{height: 100, backgroundColor: '#ececec', borderColor: '#232023' }} multiline={true} value={this.state.post}></TextInput>
            <Button title='Submit' onPress={() => this.addNewPost()}/>
        </View>
        );
    }
}
export default NewPost;