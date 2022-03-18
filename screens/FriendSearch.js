import { StyleSheet, Text, View, Button, TextInput, FlatList, ActivityIndicator, Input } from 'react-native';
import React, { Component } from 'react';
import { loginContext } from '../loginContext';
import { DefaultTheme } from '@react-navigation/native';
import { SearchBar, ListItem } from 'react-native-elements';
import UserItem from '../components/UserItem';


class FriendSearch extends Component {
    static contextType = loginContext;
    constructor(props){
        super(props);
        this.state = {
            search: '',
            isLoading: true,
            search_data: ''
        }
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

    searchFriends = () => {
    
        fetch('http://10.0.2.2:3333/api/1.0.0/search/?q=' + this.state.search , {
            method: 'GET',    
            headers: {
                    'X-Authorization': this.context.token
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

    updateSearch = (value) => {
        this.setState({search: value});
        this.searchFriends();
       }


    render() {
        return(
            <View style={{flex: 1}}>
                  <SearchBar
             placeholder="Type Here..."
             lightTheme
             round
             onChangeText={text => this.updateSearch(text)}
             autoCorrect={false}
             value={this.state.search}
           />
         
                <FlatList data={this.state.search_data}
            renderItem={({item}) => (
                <UserItem navigation={this.props.navigation} key={item.user_id} user={item} navigation={this.props.navigation}></UserItem>
        
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={() => {this.renderHeader}}
            />
            </View>
        );
    }
}

export default FriendSearch;