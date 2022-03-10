import { StyleSheet, Text, View, Button, TextInput, ColorPropType, ScrollView } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Profile';
import Topbar from '../components/Topbar';
import { loginContext } from '../loginContext';
import { HomeContext} from '../HomeContext';
import { SearchBar } from 'react-native-elements';
import NewPost from '../components/NewPost';
import PostsFeed from '../components/PostsFeed';
import HomeConsumer from '../HomeConsumer';

const getData = async (done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details')
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}
const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

class HomePage extends Component {
    static contextType = loginContext;
constructor(props) {
    super(props);
    this.state = {
        login_data: {},
        isLoading: true,
        search: '',
        addedNewPost: this.addedNewPost,
        posts: []
        
    }
}
componentDidMount() {
    getData((data) => {
        this.setState({
            login_data: data
        });
    this.getUserPosts();
    });
}
addedNewPost = () => {
    this.setState({isLoading: true});
this.getUserPosts();
}

getUserPosts = () => {
    fetch('http://10.0.2.2:3333/api/1.0.0/user/' + this.state.login_data.id + '/post', {
        method: 'GET',    
        headers: {
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState({posts: json, isLoading: false}); 
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
                'X-Authorization': this.state.login_data.token
            }
        })
        .then(() => {
            clearAsyncStorage();
            this.context.setAuth(false);
        })
        .catch((error) => {
            console.log(error);
        })
}
updateSearch = (value) => {
 this.setState({search: value});
}



render() {
    const value = {
        listOfPosts: this.state.posts,
        addedNewPost: this.state.addedNewPost
    }
    if(this.state.isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    } else {
        return (
            
        <ScrollView>
            <SearchBar
                lightTheme
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.state.search}
            />
          <HomeContext.Provider value={value}>
              <HomeConsumer/>
              </HomeContext.Provider>
            <Button title='Logout' onPress={() => this.logout()}/>
        </ScrollView>
        
        );
        }
}
}
export default HomePage;