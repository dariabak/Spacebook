import { StyleSheet, Text, View, Button, TextInput, ColorPropType, Modal } from 'react-native';
import React, { Component } from 'react';
import { HomeContext } from '../HomeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginContext } from '../loginContext';


class Post extends Component {
    // post = this.props.post;
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false  
        }
    }
    likePost = () => {
        console.log(this.props.post.post.post_id);
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.props.post.post.author.user_id + '/post/' + this.props.post.post.post_id + '/like', {
            method: 'POST',
            headers: {
                'X-Authorization': this.context.token
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
       
    }
    isItUserPost = () => {
        if(this.props.post.post.author.user_id == this.context.id) {
            return true;
        }
        return false;
    }
    toggleModal = () => {
        let isTrue = true;
        if(this.state.isModalVisible){
            isTrue = false;
        } 

        this.setState({
            isModalVisible: isTrue
        });
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
                {this.isItUserPost() ? (
                    <>
                    <Button title='Edit' onPress={this.toggleModal}></Button>
                    {/* <Modal isModalVisible={this.state.isModalVisible}>
                        <View>
                            <Text>Yeey</Text>
                        </View>
                    </Modal> */}
                    </>
                ) : (<></>)}

            </View>
        ); 
    }
}

export default Post;