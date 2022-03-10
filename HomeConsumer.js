import React, { Component } from 'react';
import {View} from 'react-native';
import NewPost from './components/NewPost';
import PostsFeed from './components/PostsFeed';
import {HomeContext} from './HomeContext';

class HomeConsumer extends Component {
    render(){
    return(
        <HomeContext.Consumer>
            { value => {
               return(
                <View>
                    <NewPost value={value}/>
                    <PostsFeed value={value}/>
                </View>
               );
            }}
        </HomeContext.Consumer>
        
    );
    }
}
export default HomeConsumer;