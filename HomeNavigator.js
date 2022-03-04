import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button } from 'react-native';
import {loginContext} from './loginContext';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './screens/Profile';
import HomePage from './screens/HomePage';
import { SearchBar } from 'react-native-elements';

const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

function HomeNavigator(props) {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Profile" component={Profile} />
        
    </Tab.Navigator>
  );
}
export default HomeNavigator;