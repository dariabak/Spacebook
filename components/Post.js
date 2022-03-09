import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';

class Post extends Component {
    // post = this.props.post;
    
    render() {
        const data = this.props.post;
        console.log(data.post);
        return(
            <View style={{padding: 15, margin: 5, backgroundColor: '#ececec'}}>
                <Text>{this.props.post.post.author.first_name} {this.props.post.post.author.last_name}</Text>
                <Text>{this.props.post.post.text}</Text>
                <Text>Likes: {this.props.post.post.numLikes}</Text>
                <Text>{this.props.post.post.timestamp}</Text>
            </View>
        ); 
    }
}

export default Post;