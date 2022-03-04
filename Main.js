import Login from './screens/Login';
import { StyleSheet, Text, View, Button } from 'react-native';
import {loginContext} from './loginContext';
import Home from './screens/Home';
import SignUp from './screens/SignUp';

function Main(props) {
  return (

    <loginContext.Consumer>
      {
      ({isLoggedIn, setAuth}) => 
          
         <Login isLoggedIn={isLoggedIn} setAuth={setAuth}/>
        
      
      }
    </loginContext.Consumer>

  );
}

export default Main;
