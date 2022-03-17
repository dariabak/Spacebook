import 'react-native-gesture-handler';
import React, { Component, useState}  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import HomeNavigator from './HomeNavigator';
import { loginContext } from './loginContext';
import { SearchBar } from 'react-native-elements';
import DrawerNavigator from './DrawerNavigator';
import Friends from './screens/Friends';
import EditProfile from './screens/EditProfile';
import FriendProfile from './screens/FriendProfile';
import Friend from './components/Friend';
import Settings from './screens/Settings';


const Stack = createNativeStackNavigator();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      setAuth: this.setAuth,
      token: '',
      id: 0
 
    };
  }
  setAuth = (value) =>{
    this.setState({
      isLoggedIn: value.isLoggedIn,
      token: value.token,
      id: value.id
    });
  }

  render() {
    
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      setAuth: this.state.setAuth,
      token: this.state.token,
      id: this.state.id
    }
    return (
      <loginContext.Provider value={value}>
      <NavigationContainer>


          <Stack.Navigator>      
         
          { this.state.isLoggedIn ? (
          <><Stack.Screen name="HomeNavigator" component={HomeNavigator} 
            options={{
              headerShown: false,
            }}/>
               
              <Stack.Screen name='Friends' component={Friends}/>
              <Stack.Screen name='EditProfile' component={EditProfile}/>
              <Stack.Screen name='FriendProfile' component={FriendProfile}/>
              </>) 
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

