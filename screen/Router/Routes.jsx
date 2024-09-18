import React from 'react';

import { Router, Scene } from 'react-native-router-flux'
// import PrivateRoute from '../components/PrivateRoute';
// import PublicRoute from '../components/PublicRoute';
// import Home from '../components/Home';
// import Login from '../components/Login';
// import SignupScreen from '../components/pages/signup/SignupScreen'
// import LoginScreen from '../components/pages/Login/LoginScreen'
// import ForgetPassword from '../components/pages/Forgetpass/forget-password'
// import EnterEmail from '../components/pages/Forgetpass/enter-email'
// import UpdatePassword from '../components/pages/Forgetpass/update-password'
// import HowToEarn from '../components/pages/howtoearn/how-to-earn'
// import Dashboard from '../components/pages/dashboard/dashboard'
import Terms from './../OopsScreen';

import PublicRoute from './PublicRoute';
import OopsScreen from './../OopsScreen';

// import WithdrawAmount from '../components/pages/withdrawal/withdrawamount';
// import Profile from '../components/pages/profile/profile.js';
// import ReferandEarn from '../components/pages/referandearn/referandearn';
// import Registration from '../components/pages/register/register';
// import Index from '../components/pages/index';
// import Container from '../components/container.js';

const AppRoutes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "OopsScreen" component = {OopsScreen} title = "OopsScreen" initial = {true} />
         
      </Scene>
   </Router>
)
export default AppRoutes;
// const AppRoutes = () => {
//   <Router>
//       <Scene key = "root">
//          <Scene key = "home" component = {Home} title = "Home" initial = {true} />
//          <Scene key = "about" component = {About} title = "About" />
//       </Scene>
//    </Router>
    
// }



// export default AppRoutes;