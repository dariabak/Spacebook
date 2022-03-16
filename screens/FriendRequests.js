import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FriendRequest from '../components/FriendRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar, ListItem } from 'react-native-elements';
import UserItem from '../components/UserItem';

const getData = async(done) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@spacebook_details');    
        const data = JSON.parse(jsonValue);
        return done(data);
    } catch (e) {
        console.log(e);
    }
}

class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            login_data: {},
            friendRequests: [],
            search_data: [],
            search: ''
        };
    }

    
    getFriendsRequests = () => {
        fetch('http://10.0.2.2:3333/api/1.0.0/friendrequests', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json);
            this.setState({friendRequests: json, isLoading: false});
        })
        .catch((error) => {
            console.log(error);
        })

    }
    updateSearch = (value) => {
        this.setState({search: value});
        this.searchFriends();
       }
searchFriends = () => {
    
    fetch('http://10.0.2.2:3333/api/1.0.0/search/?q=' + this.state.search , {
        method: 'GET',    
        headers: {
                'X-Authorization': this.state.login_data.token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            this.setState({search_data: json, isLoading: false});
        })
        .catch((error) => {
            console.log(error);
        })
}

    renderHeader = () => {
        return (
        //     <SearchBar
        //     placeholder="Type Here..."
        //     lightTheme
        //     round
        //     onChangeText={text => this.updateSearch(text)}
        //     autoCorrect={false}
        //     value={this.state.value}
        //   />

        <View><Text>return</Text></View>
        );
      }
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '14%',
            }}
          />
        );
      };
    componentDidMount() {
        getData((data) => {
            this.setState({
                login_data: data
            });
            this.getFriendsRequests();
        });
    }
    render() {
        if(this.state.isLoading) {
            return(
                <View>
                    <ActivityIndicator animating size='large' />
                </View>
            );
        } else {
        return (
            <View style={{ flex: 1 }}>
             <SearchBar
             placeholder="Type Here..."
             lightTheme
             round
             onChangeText={text => this.updateSearch(text)}
             autoCorrect={false}
             value={this.state.search}
           />
           {this.state.friendRequests.map(request => 
                    <FriendRequest key={request.user_id} login_data={this.state.login_data} request={request}/>
                 )}
                <FlatList data={this.state.search_data}
            renderItem={({item}) => (
                <UserItem key={item.user_id} user={item} navigation={this.props.navigation} login_data={this.state.login_data}></UserItem>
        
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={() => {this.renderHeader}}
            />

            
               
            </View>
        );
    }
}
}
export default FriendRequests;