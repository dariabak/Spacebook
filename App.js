import React, { Component}  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import HomePage from './screens/HomePage';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();


class App extends Component {
  
  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator>          
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>   
            <Stack.Screen name="Home" component={HomePage}/>
          </Stack.Navigator>
      </NavigationContainer>
    );

}
}
 export default App;

