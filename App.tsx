import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';




//import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator()
//const Drawer = createDrawerNavigator();

import 'react-native-gesture-handler';

import Splash from './screen/Splash';
import Register from './screen/Register';
import Landing from './screen/Landing';
import Dashboard from './screen/Dashboard';

import Login from './screen/Login';
import OopsScreen from './screen/OopsScreen';
import ForgetPassword from './screen/ForgetPassword';
import CreateNewPassword from './screen/CreateNewPassword';
import VerifyAccount from './screen/VerifyAccount';
import RootNavigator from './screen/RootNavigator';
import Profile from './screen/Profile';
import ReferAndEarn from './screen/ReferAndEarn';
import PlatformFees from './screen/PlatformFees';
import Dashboard1 from './screen/dash_board';
import Dashboard2 from './screen/dash_board';

const App = () => {
 // const Drawer = createDrawerNavigator();
  //const isDrawerOpen = useDrawerStatus() === 'open';
  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="Landing" component={Landing} options={{headerShown:false}}/>
          <Stack.Screen name="Dashboard" component={Dashboard} />
                 <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="OopsScreen" component={OopsScreen} />
 <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
  <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
   <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
   <Stack.Screen name="RootNavigator" component={RootNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
         <Stack.Screen name="ReferAndEarn" component={ReferAndEarn} />
                  <Stack.Screen name="PlatformFees" component={PlatformFees} />
                  <Stack.Screen name="Dashboard2" component={Dashboard2} />

      </Stack.Navigator>
    </NavigationContainer>
 );
};
export default App;