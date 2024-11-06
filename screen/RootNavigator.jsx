import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Register from './Register';
import Splash from './Splash';

import Login from './Login';
import CustomDrawerContent from './CustomDrawerContent';

//import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  // const isDrawerOpen = useDrawerStatus() === 'open';
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
