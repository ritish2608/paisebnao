import React, {useState} from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../styling/loginStyle';
import paisebnaologo from '../assets/images/paisebnaologo_1.png';
import group_1 from '../assets/images/group_1.png';
import emailicon from '../assets/images/email.png'; // Email Icon
import lock from '../assets/images/lock.png'; // Lock Icon
import eyeoff from '../assets/images/eye-off.png'; // Eye Off Icon
import eyeon from '../assets/images/eye-on.png'; // Eye On Icon
import Container from './Container';
import './Router/Routes';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {loginUser} from './api';
//import {useGlobalContext} from './GlobalProvider';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigation = useNavigation();

  // const {saveData} = useGlobalContext();
  // const {saveToken} = useGlobalContext();
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = () => {
    //ForgetPassword
    navigation.navigate('OopsScreen');
  };
  const handelForgetPAssword = () => {
    navigation.navigate('VerifyAccount');
  };

  const handleEmailChange = value => {
    if (value.length > 154) {
      setEmailError('Email must be 154 characters or less.');
    } else {
      setEmail(value);
      if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);

      console.log('Access token response :: ', response);
      // saveData(response?.access_token);
      // saveToken(response?.access_token);
      AsyncStorage.setItem('access_token', response?.access_token);

      setTimeout(async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        console.log('Access token Login :: ', accessToken);
        AsyncStorage.setItem('access_token', accessToken);

        if (accessToken) {
          navigation.navigate('RemoteDashboard');
        } else {
          throw new Error('Access token is not defined');
        }
      }, 1);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError(
        'Invalid credentials. Please enter the correct email and password.',
      );
    }
  };

  return (
    <Container>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/paisebnaologo.png')}
          style={styles.logo}
        />

        <View style={styles.inputWrapper}>
          <Image source={emailicon} style={styles.icon} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}

        <View style={styles.inputWrapper}>
          <Image source={lock} style={styles.icon} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            maxLength={4}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <Image
              source={passwordVisible ? eyeon : eyeoff}
              style={styles.visibilityIcon}
            />
          </TouchableOpacity>
        </View>

        {loginError ? (
          <Text style={styles.errorMessage}>{loginError}</Text>
        ) : null}

        <Text style={styles.termsText}>
          By going forward, you agree to{' '}
          <Text style={styles.linkText} onPress={handleSubmit}>
            Terms & Conditions
          </Text>
        </Text>

        <TouchableOpacity onPress={handelForgetPAssword}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default Login;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// import Container from './Container';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {loginUser} from './api';

// const LoginScreen = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const navigation = useNavigation();

//   const validateEmail = email => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleEmailChange = value => {
//     if (value.length > 154) {
//       setEmailError('Email must be 154 characters or less.');
//     } else {
//       setEmail(value);
//       if (!validateEmail(value)) {
//         setEmailError('Please enter a valid email address.');
//       } else {
//         setEmailError('');
//       }
//     }
//   };

//   const toggleVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await loginUser(email, password);
//       console.log(response, 'login response');

//       try {
//         console.log(
//           'SET TOKEN',
//           AsyncStorage.setItem('access_token', response?.access_token),
//         );
//         await AsyncStorage.setItem('access_token', response?.access_token);
//         console.log('GET TOKEN', AsyncStorage.getItem('access_token'));
//       } catch (e) {
//         console.error('Error saving data:', e);
//       }

//       // console.log('Login get Token:', AsyncStorage.getItem('access_token'));
//       if (!AsyncStorage.getItem('access_token')) {
//         throw new Error('Access token is not defined');
//       } else {
//         navigation.navigate('Home'); // Adjust this to your actual route name
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setLoginError(
//         'Invalid credentials. Please enter correct ID and password.',
//       );
//     }
//   };

//   return (
//     <Container>
//       <View style={styles.container}>
//         <Image
//           source={require('../assets/images/paisebnaologo.png')}
//           style={styles.logo}
//         />
//         <Text style={styles.subtitle}>Log In</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={handleEmailChange}
//             autoCompleteType="email"
//           />
//           {emailError ? (
//             <Text style={styles.errorMessage}>{emailError}</Text>
//           ) : null}

//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.inputField}
//               placeholder="Enter your password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!passwordVisible}
//               maxLength={4}
//             />
//             <TouchableOpacity onPress={toggleVisibility}>
//               <Image
//                 source={
//                   passwordVisible
//                     ? require('../assets/images/eye-on.png')
//                     : require('../assets/images/eye-off.png')
//                 }
//                 style={styles.visibilityIcon}
//               />
//             </TouchableOpacity>
//           </View>
//           {loginError ? (
//             <Text style={styles.errorMessage}>{loginError}</Text>
//           ) : null}

//           <Text style={styles.termsText}>
//             By going forward you agree to{' '}
//             <Text style={styles.redLink}>Terms & Conditions</Text>
//           </Text>
//           <TouchableOpacity onPress={() => navigation.navigate('EnterEmail')}>
//             <Text style={styles.redLink}>Forgot Password?</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   logo: {
//     width: '100%',
//     height: 200, // Adjust height as needed
//     marginBottom: 20,
//     resizeMode: 'contain',
//   },
//   subtitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   inputField: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   visibilityIcon: {
//     width: 24,
//     height: 24,
//     marginLeft: 10,
//   },
//   errorMessage: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   termsText: {
//     marginTop: 20,
//   },
//   redLink: {
//     color: 'red',
//     textDecorationLine: 'underline',
//   },
//   loginButton: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;
