import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from 'react-native';
import {loginContext} from './loginContext';
import Profile from './screens/Profile';
import HomePage from './screens/HomePage'

const Tab = createBottomTabNavigator();

function HomeNavigator(props) {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Home" component={HomePage} />
    </Tab.Navigator>
  );
}
export default HomeNavigator;