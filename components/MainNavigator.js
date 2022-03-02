import React, { Component}  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import HomePage from '../screens/HomePage';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    return (     
        <Stack.Navigator>
            
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>     
    );
}
const  MainNavigator = () => {

    return (
        isLoggedIn ? <Stack.Navigator> 
            <Stack.Screen name="HomePage" component={HomePage}/></Stack.Navigator> : 
            <StackNavigator/>

    );
    
  }
 export default MainNavigator;