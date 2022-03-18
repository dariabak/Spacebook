import { TouchableOpacity, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../LoginContext';
import NewPost from '../components/NewPost';
import PostsFeed from '../components/PostsFeed';
import { styles } from '../styles/style';
import { useFocusEffect } from '@react-navigation/native';



const clearAsyncStorage = async () => {
    AsyncStorage.clear();
}

class HomePage extends Component {
    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            addedNewPost: this.addedNewPost,
            posts: [],


        }
    }
    componentDidMount() {
        console.log(this.context);
        this.setState({
            login_data: this.context
        })
        this.getUserPosts();
        this.props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            )
        });

        const {navigation} = this.props;
        this.focusListener = navigation.addListener("focus", () => {
          this.addedNewPost();
        });

    }
    componentWillUnmount() {
        this.focusListener.remove();
    }


    addedNewPost = () => {
        this.setState({ isLoading: true });
        this.getUserPosts();
    }
    useFocusEffect() {
        console.log("yeeey");
    }
    getUserPosts = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.context.id + '/post', {
            method: 'GET',
            headers: {
                'X-Authorization': this.context.token
            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ posts: json, isLoading: false });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    logout = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.context.token
            }
        })
            .then(() => {
                const logout = {
                    isLoggedIn: false,
                    token: '',
                    id: 0
                }
                clearAsyncStorage();
                this.context.setAuth(logout);
            })
            .catch((error) => {
                console.log(error);
            })
    }



    render() {
        const value = {
            listOfPosts: this.state.posts,
            addedNewPost: this.state.addedNewPost
        }
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator animating size='large' />
                </View>
            );
        } else {
            return (

                <ScrollView >

                    <NewPost addedNewPost={this.state.addedNewPost} />
                    <PostsFeed listOfPosts={this.state.posts} />

                </ScrollView>

            );
        }
    }
}

export default HomePage;