/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//import 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator();

import 'react-native-gesture-handler';

import Splash from './screen/Splash';
import Register from './screen/Register';
import Landing from './screen/Landing';

import Login from './screen/Login';
import OopsScreen from './screen/OopsScreen';
import ForgetPassword from './screen/ForgetPassword';
import CreateNewPassword from './screen/CreateNewPassword';
import VerifyAccount from './screen/VerifyAccount';
import RootNavigator from './screen/RootNavigator';
import Profile from './screen/Profile';
import ReferAndEarn from './screen/referandearn/referandearn';
import PlatformFees from './screen/PlatformFees';

import Registration from './screen/Registration';
import VideoPlayer from './screen/VideoPlayer';
import WithdrawAmount from './screen/WithdrawAmount';
import Dashboard2 from './screen/dash_board';

import AddBankDetails from './screen/AddBankDetails';
import Policies from './screen/Policies';
import WithdrawAmount1 from './screen/WithdrawAmount1';
import HelpCenterScreen from './screen/HelpCenterScreen';
import BankDetailsConfirmation from './screen/BankDetailsConfirmation';
import EditProfileScreen from './screen/EditProfileScreen';

import Home from './screen/Home';
import VerifyOtpSignup from './screen/VerifyOtpSignup';
//import {GlobalProvider} from './screen/GlobalProvider';
import RemoteDashboard from './screen/RemoteDashboard';
import PaymentForm from './screen/PaymentForm';
import CustomYouTubePlayer from './screen/CustomYouTubePlayer';

const App = () => {
  // const Drawer = createDrawerNavigator();
  //const isDrawerOpen = useDrawerStatus() === 'open';
  return (
    // <GlobalProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Policies" component={Policies} />
        <Stack.Screen name="AddBankDetails" component={AddBankDetails} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OopsScreen"
          component={OopsScreen}
          options={{title: 'Term and Condition'}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{title: 'Forget Password'}}
        />
        <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
        <Stack.Screen
          name="VerifyAccount"
          component={VerifyAccount}
          options={{title: 'Verify Account'}}
        />
        <Stack.Screen name="RootNavigator" component={RootNavigator} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="ReferAndEarn"
          component={ReferAndEarn}
          options={{title: 'Refer And Earn'}}
        />
        <Stack.Screen name="PlatformFees" component={PlatformFees} />
        <Stack.Screen name="VerifyOtpSignup" component={VerifyOtpSignup} />
        <Stack.Screen
          name="Dashboard2"
          options={{headerShown: false}}
          component={Dashboard2}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{title: 'Edit Profile'}}
        />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen
          name="WithdrawAmount"
          component={WithdrawAmount}
          options={{title: 'Withdraw Amount'}}
        />
        <Stack.Screen
          name="WithdrawAmount1"
          component={WithdrawAmount1}
          options={{title: 'Withdraw Amount'}}
        />
        <Stack.Screen
          name="HelpCenterScreen"
          component={HelpCenterScreen}
          options={{title: 'Help Center'}}
        />
        <Stack.Screen
          name="BankDetailsConfirmation"
          component={BankDetailsConfirmation}
          options={{title: 'Bank Details Confirmation'}}
        />
        <Stack.Screen
          name="RemoteDashboard"
          options={{headerShown: false}}
          component={RemoteDashboard}
        />
        <Stack.Screen name="PaymentForm" component={PaymentForm} />

        <Stack.Screen
          name="CustomYouTubePlayer"
          component={CustomYouTubePlayer}
        />
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // </GlobalProvider>
  );
};
export default App;
