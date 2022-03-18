import { StyleSheet, Text, View, Button, TextInput, ColorPropType, ScrollView, FlatList, ListItem } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from 'react-native-elements';


class Search extends Component {

    render() {
        return(
            <View>
            <SearchBar
                lightTheme
                placeholder="Type Here..."
                onChangeText={this.updateSearch}
                value={this.state.search}
            />
            <FlatList data={this.state.search_data}
            renderItem={({item}) => (
                <ListItem  title={item.user_email} subtitle={item.user_familyname} />
            )}>
               
            </FlatList>
            </View>
        );
    }
}

export default Search;