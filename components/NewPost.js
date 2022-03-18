import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { Component } from 'react';
import { LoginContext } from '../LoginContext';
import { styles } from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


const storeDraft = async (value, id) => {
    try {
        const json = await JSON.stringify(value);
        await AsyncStorage.setItem('@post_draft' + id, json);
    } catch (e) {
        console.log(error);
    }
}

const getDrafts = async (id, done) => {
    try {
        let jsonValue = await AsyncStorage.getItem('@post_draft' + id);
        if(jsonValue == null) {
            storeDraft([], id);
            jsonValue = await AsyncStorage.getItem('@post_draft' + id);
        }
        const data = JSON.parse(jsonValue);
      
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class NewPost extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            post: '',
            drafts: []
        }
    }
    addNewPost = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/post', {
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
        this.setState({ post: value });
    }
    saveDraft = () => {
        getDrafts(this.context.id, (data) => {
           
            const post = JSON.stringify( {
                id: uuid.v4(),
                text: this.state.post
            })
            const json = JSON.parse(post);
            this.setState( {
                drafts: [...data, json]
            });
            console.log(data);
            console.log(json);
    
            
            storeDraft(this.state.drafts, this.context.id);
            alert("Draft saved");
            this.setState({
                post: ''
            })
        });  
    }
    render() {

        return (
            <View style={{ padding: 20, backgroundColor: '#ececec' }}>
                <Text style={styles.newPostText}>New post</Text>
                <TextInput style={styles.postField} multiline={true} value={this.state.post} onChangeText={this.handlePostInput}></TextInput>
                <View style={styles.buttonContainer}>
                    <Button color='#B22222' title='Post' onPress={() => this.addNewPost()} />
                </View>
                <View style={styles.buttonContainer}>
                    <Button color='#B22222' title='Save draft'  onPress={() => this.saveDraft()}/>
                </View>
            </View>
        );
    }
}
export default NewPost;