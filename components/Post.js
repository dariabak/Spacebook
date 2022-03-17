import { StyleSheet, Text, View, Button, TextInput, ColorPropType, Modal, Pressable } from 'react-native';
import React, { Component } from 'react';
import { HomeContext } from '../HomeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginContext } from '../loginContext';
import EditPost from './EditPost';


class Post extends Component {
    // post = this.props.post;
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            numLikes: 0
        }
    }
    likePost = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.props.post.post.author.user_id + '/post/' + this.props.post.post.post_id + '/like', {
            method: 'POST',
            headers: {
                'X-Authorization': this.context.token
            }
        
        })
        .then((response) => {
            if(response.status == 200){
                let number = this.state.numLikes + 1;
                this.setState({
                    numLikes: number
                });
            }
            console.log(response.status);
            return response.text()
        })
        .then((result) => {
            console.log(result);
           
        })
        .catch((error) => {
            console.log(error);
        })
    }
    componentDidMount() {
       this.setState({
            numLikes: this.props.post.post.numLikes
       });
    }
    isItUserPost = () => {
        if(this.props.post.post.author.user_id == this.context.id) {
            return true;
        }
        return false;
    }
    toggleModal = () => {
        let isTrue = true;
        if(this.state.isVisible){
            isTrue = false;
        } 

        this.setState({
            isModalVisible: isTrue
        });
    }
    dislikePost = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/'  + this.props.post.post.author.user_id + '/post/' + this.props.post.post.post_id + '/like', {
            method: 'DELETE',
            headers: {
                'X-Authorization': this.context.token
            }
        
        })
        .then((response) => {
            console.log(response.status);
            if(response.status == 200){
                let number = this.state.numLikes - 1;
                this.setState({
                    numLikes: number
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    render() {
        const data = this.props.post;
        return(
            <View style={{padding: 15, margin: 5, backgroundColor: '#ececec'}}>
                <Text>{this.props.post.post.author.first_name} {this.props.post.post.author.last_name}</Text>
                <Text>{this.props.post.post.text}</Text>
                <Text>Likes: {this.state.numLikes}</Text>
                
                <Text>{this.props.post.post.timestamp}</Text>
                {this.isItUserPost() ? (
                    <>
                    <Button title='Edit' onPress={this.toggleModal}></Button>
                    <Modal 
                        visible={this.state.isModalVisible}
                        onRequestClose={() => {
                            this.setState({isModalVisible: false});
                        }}
                        >
                        <View>
                            <EditPost post_id={this.props.post.post.post_id}/>
                            
                                <Button title='Close' onPress={() => this.setState({isModalVisible: false})}></Button>
                          
           
                        </View>
                    </Modal>
                    </>
                ) : (<>
                <Button title='Like' onPress={this.likePost}/>
                <Button title='Dislike' onPress={this.dislikePost}/>
                </>)}

            </View>
        ); 
    }
}

export default Post;