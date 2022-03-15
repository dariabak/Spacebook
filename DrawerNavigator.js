import { createDrawerNavigator } from '@react-navigation/drawer';
import FriendRequests from './screens/FriendRequests';
import Settings from './screens/Settings';



const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
    return(
      <Drawer.Navigator>
        <Drawer.Screen name="Friend Requests" component={FriendRequests}/>
        <Drawer.Screen name='Settings' component={Settings}/>
      </Drawer.Navigator>
    );
  }
  export default DrawerNavigator;