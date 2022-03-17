import { StyleSheet, Text, View, Button, TextInput, Image, Modal, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { HomeContext } from '../HomeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginContext } from '../loginContext';
import EditPost from './EditPost';
import { styles } from '../styles/style';
import * as FileSystem from 'expo-file-system';


class Post extends Component {
    // post = this.props.post;
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            numLikes: 0,
            user_photo: null
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
       this.getUserImage();
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
    getUserImage = () => {
        FileSystem.downloadAsync(
            'http://10.0.2.2:3333/api/1.0.0/user/' + this.props.post.post.author.user_id + '/photo',
            FileSystem.documentDirectory + 'profilePicture',
            {headers: {"X-Authorization": this.context.token}})
            .then(({uri}) => {
                this.setState({user_photo: uri})
            })
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
            <View style={styles.postContainer}>
                <View style={styles.postData}>
                    <Image 
                    source={{
                        uri: this.state.user_photo,
                        }}
                        style={{
                        width: 50,
                        height: 50,
                        borderWidth: 5,
                        borderRadius: 25, 
                        }}/>
                    <View style={styles.userNameText}>
                        <Text style={{fontSize: 20}}>{this.props.post.post.author.first_name} {this.props.post.post.author.last_name}</Text>
                        <Text style={{fontSize: 12}}>{this.props.post.post.timestamp}</Text>
                    </View>
                    <Text style={{fontSize: 14, marginTop: 8, marginBottom: 8}}>{this.props.post.post.text}</Text>
                <Text>Likes: {this.state.numLikes}</Text>
                
                
                {this.isItUserPost() ? (
                    <>
                    <TouchableOpacity style={styles.editButton} onPress={this.toggleModal}>
                        <Text style={{color: '#ffffff'}}>Edit</Text>
                    </TouchableOpacity>
                    <Modal 
                        visible={this.state.isModalVisible}
                        onRequestClose={() => {
                            this.setState({isModalVisible: false});
                        }}
                        >
                        <View>
                            <EditPost post_id={this.props.post.post.post_id}/>
                            
                                <Button color='#B22222' title='Close' onPress={() => this.setState({isModalVisible: false})}></Button>
                          
           
                        </View>
                    </Modal>
                    </>
                ) : (<>
                <Button title='Like' onPress={this.likePost}/>
                <Button title='Dislike' onPress={this.dislikePost}/>
                </>)}
                </View>
            </View>
        ); 
    }
}

export default Post;