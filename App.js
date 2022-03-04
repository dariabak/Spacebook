import React, { Component, useState}  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import HomeNavigator from './HomeNavigator';
import { loginContext } from './loginContext';
import { SearchBar } from 'react-native-elements';


const Stack = createNativeStackNavigator();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      setAuth: this.setAuth
 
    };
  }
  setAuth = (value) =>{
    this.setState({isLoggedIn: value});
    console.log("Yeeey");
    console.log(this.state.isLoggedIn);
  }

  render() {
    
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      setAuth: this.state.setAuth
    }
    return (
      <loginContext.Provider value={value}>
      <NavigationContainer>
          <Stack.Navigator>      
            
          { this.state.isLoggedIn ? (
          <><Stack.Screen name="HomeNavigator" component={HomeNavigator} 
            options={{
              headerShown: false,
            }}
              /></>) 
          : (
          <>
          <Stack.Screen name="Login" component={Login} options={{ 
            headerRight: () => (
              <Button title='Click it'></Button>
            )
          }}/>   
          <Stack.Screen name="SignUp" component={SignUp}/>   
          </>)      
          }
          </Stack.Navigator>
      </NavigationContainer>
      </loginContext.Provider>
    );

}
}
 export default App;

