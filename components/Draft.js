import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { LoginContext } from '../LoginContext';
import { styles } from '../styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        const jsonValue = await AsyncStorage.getItem('@post_draft' + id);
        const data = JSON.parse(jsonValue);
      
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class Draft extends Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentDidMount() {
        this.setState({
            text: this.props.draft.text
        })
    }
    textHandler = (value) => {
        this.setState({
            text: value
        })
    }

    addPost = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            },
            body: JSON.stringify({
                text: this.state.text
            })
        })
            .then((response) => response.json())
            .then((json) => {
                this.deleteDraft();
            })
            .catch((error) => {
                console.log(error);
            })
    }
    deleteDraft = () => {
        this.props.deleteDraft(this.props.draft.id);
    }
    render() {
        return (
            <View style={{ margin: 15 }}>
                <Text>Post:</Text>
                <TextInput value={this.state.text} style={styles.postField} placeholder={this.props.draft.text} onChangeText={value => this.textHandler(value)} />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#B22222',
                        margin: 5,
                        alignContent: 'center',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}
                    onPress={() => this.addPost()}>
                        <Text style={{ fontSize: 16, color: '#ffffff', padding: 10 }}>Post</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: '#B22222',
                        margin: 5,
                        alignContent: 'center',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}
                   onPress={() => this.deleteDraft()}
                    >
                        <Text style={{ fontSize: 16, color: '#ffffff', padding: 10 }}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        height: 1,
                        width: '86%',
                        backgroundColor: '#CED0CE',
                        marginLeft: '14%',
                    }}
                />
            </View>
        );
    }
}
export default Draft;