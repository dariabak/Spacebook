import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, Settings } from 'react-native';
import {loginContext} from './loginContext';

import Profile from './screens/Profile';
import HomePage from './screens/HomePage';
import { SearchBar } from 'react-native-elements';
import FriendRequests from './screens/FriendRequests';

const Tab = createBottomTabNavigator();


function HomeNavigator(props) {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Friend Requests" component={FriendRequests} />
    </Tab.Navigator>
  );
}



export default HomeNavigator;