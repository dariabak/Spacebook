import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { Component } from 'react';
import { LoginContext } from '../LoginContext';
import { styles } from '../styles/style';


class EditPost extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false,
            post: {},
            new_text: ''
        }
    }

    getSinglePostData = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/post/' + this.props.post_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            }

        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    isLoading: false,
                    post: json
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    editPost = () => {
        console.log(this.state.post.post_id);
        console.log(this.context.token);
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/post/' + this.state.post.post_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            },
            body: JSON.stringify({
                post_id: this.state.post.post_id,
                text: this.state.new_text

            })
        })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getSinglePostData();
    }
    render() {
        if (this.isLoading) {
            return (
                <View><Text>Loading...</Text></View>
            );
        } else {
            return (
                <View >
                    <View style={{ padding: 5, margin: 5 }}>
                        <Text style={{ fontSize: 20, marginBottom: 5 }}>Date:</Text>
                        <Text> {this.state.post.timestamp}</Text>
                        <Text style={{fontSize: 20, marginTop: 5}}>Post:</Text>
                        <TextInput style={styles.postField} placeholder={this.state.post.text} value={this.state.new_text} onChangeText={text => this.setState({ new_text: text })} />
                        <Button color='#B22222' title='Update post' onPress={() => this.editPost()} />
                    </View>
                </View>
            );
        }
    }
}
export default EditPost;