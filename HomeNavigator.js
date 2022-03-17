import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, Settings, Image } from 'react-native';
import {loginContext} from './loginContext';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Profile from './screens/Profile';
import HomePage from './screens/HomePage';
import { SearchBar } from 'react-native-elements';
import FriendRequests from './screens/FriendRequests';

const Tab = createBottomTabNavigator();


function HomeNavigator(props) {
  return (
    <Tab.Navigator screenOptions={{
      headerLeft: () => (
        <View>
        <Image source={require('./assets/logo.png')}
            style={{
                width: 60,
                height: 65
            }}/>
            </View>
      ),
    }}>
        <Tab.Screen name="Home" component={HomePage} 
        options={{
          tabBarIcon: ({size, color}) => (<Icon name={'home'} color={color} size={size} color='#B22222'/>)
           }}
        />
        <Tab.Screen name="Profile" component={Profile} 
        options={{
          tabBarIcon: ({size, color}) => (<Icon name={'person'} color={color} size={size} color='#B22222' />)
           }}
        />
        <Tab.Screen name="Friend Requests" component={FriendRequests} 
        options={{
          tabBarIcon: ({size, color}) => (<Icon name={'people'} color={color} size={size} color='#B22222'/>)
           }}
        />

    </Tab.Navigator>
  );
}



export default HomeNavigator;