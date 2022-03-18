import { StyleSheet, Text, View, Button, TextInput, ColorPropType } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Post from './Post';
import { LoginContext } from '../LoginContext';
import { styles } from '../styles/style';


class PostsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPosts: [],
            isLoading: true
        };

    }

    componentDidMount() {

        this.setState({
            listOfPosts: this.props.listOfPosts,
            isLoading: false
        });

    }

    render() {

        if (this.state.isLoading) {
            return (<View><Text>Loading...</Text></View>);
        } else {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {this.state.listOfPosts.map(post =>
                        <Post key={post.post_id} post={{ post }} />
                    )}
                </View>
            );
        }
    }
}

export default PostsFeed;