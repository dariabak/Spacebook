import 'react-native-gesture-handler';
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import HomeNavigator from './HomeNavigator';
import { LoginContext } from './LoginContext';
import Friends from './screens/Friends';
import EditProfile from './screens/EditProfile';
import FriendProfile from './screens/FriendProfile';
import FriendSearch from './screens/FriendSearch';
import Drafts from './screens/Drafts';


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
  setAuth = (value) => {
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
    const logout = {
      isLoggedIn: false,
      token: '',
      id: 0
    }
    return (
      <LoginContext.Provider value={value}>
        <NavigationContainer>

          {this.state.isLoggedIn ? (
            <Stack.Navigator>
              <Stack.Screen name="HomeNavigator" component={HomeNavigator}
                options={{
                  headerShown: false
                }} />

              <Stack.Screen name='Friends' component={Friends} />
              <Stack.Screen name='EditProfile' component={EditProfile} />
              <Stack.Screen name='FriendProfile' component={FriendProfile} />
              <Stack.Screen name='FriendSearch' component={FriendSearch} />
              <Stack.Screen name='Drafts' component={Drafts}/>
            </Stack.Navigator>)
            : (
              <Stack.Navigator screenOptions={{
                headerLeft: () => (
                  <View>
                    <Image source={require('./assets/logo.png')}
                      style={{
                        width: 60,
                        height: 65
                      }} />
                  </View>
                ),
                title: 'Spacebook'
              }}>

                <Stack.Screen name="Login" component={Login} options={{
                  headerRight: () => (
                    <View></View>
                  )
                }} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </Stack.Navigator>)
          }

        </NavigationContainer>
      </LoginContext.Provider>
    );

  }
}
export default App;

