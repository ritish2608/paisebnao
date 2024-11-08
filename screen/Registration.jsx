import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import fullnameicon from '../assets/images/fullname.png';
import mobileicon from '../assets/images/mobileno.png';
import emailicon from '../assets/images/email.png';
import lockicon from '../assets/images/password.png';
import referralicon from '../assets/images/refer.png';
import eyeon from '../assets/images/eye-on.png';
import eyeoff from '../assets/images/eye-off.png';
import safeimg from '../assets/images/safe.png';

//import ToastMsg from '../common/ToastMsg'; // Ensure you have this component for notifications
import {registerUser} from './api'; // Update the import path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validateEmail, setValidateEmail] = useState(true);

  const handleRegister = async () => {
    const userData = {
      phone_number: phoneNumber,
      email: email,
      first_name: firstName,
      password: password,
      referral_id: referralCode,
    };

    try {
      const response = await registerUser(userData);
      if (response?.access_token) {
        console.log('Reg Email ::: ', userData.email);
        AsyncStorage.setItem('email', userData.email);
        AsyncStorage.setItem('access_token', response?.access_token);
        // ToastMsg.success('OTP Sent Successfully!');
        navigation.navigate('VerifyOtpSignup'); // Update navigation path
      } else {
      }
    } catch (error) {
      if (error.response && error.response.status === 417) {
        AsyncStorage.setItem('access_token', error.response.data.token);
        navigation.navigate('VerifyOtpSignup');
        // navigation.navigate(
        //   `/verify-otp-signup?hotemailemail=${encodeURIComponent(email)}`,
        // );
      } else {
        console.error('Error registering user:', error.response?.data);
      }
    }
  };

  const handleEmailChange = value => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidateEmail(emailRegex.test(value));
  };

  const handelPolicy = () => {
    //ForgetPassword
    navigation.navigate('Policies');
  };
  const handelPrivacy = () => {
    //ForgetPassword
    navigation.navigate('OopsScreen');

    //handelPolicy
  };
  const handlePhoneNoChange = value => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue && !/^[6-9]/.test(cleanedValue)) {
      setIsValid(false);
      return;
    }
    if (cleanedValue.length <= 10) {
      setPhoneNumber(cleanedValue);
    }
    const phoneRegex = /^[6-9][0-9]{9}$/;
    setIsValid(phoneRegex.test(cleanedValue));
  };

  const handleSubmit = () => {
    if (password.length < 4) {
      //  ToastMsg.error('Password must contain at least 4 characters.');
      return;
    }
    handleRegister();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <View style={styles.inputWrapper}>
        <Image source={fullnameicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your full name"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          required
          maxLength={20}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Image source={mobileicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your mobile number"
          style={[styles.input, !isValid && styles.inputInvalid]}
          value={phoneNumber}
          onChangeText={handlePhoneNoChange}
          required
          maxLength={10}
        />
        {!isValid && (
          <Text style={styles.errorMessage}>Invalid phone number</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Image source={emailicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          style={[styles.input, !validateEmail && styles.inputInvalid]}
          value={email}
          onChangeText={handleEmailChange}
          required
        />
        {!validateEmail && (
          <Text style={styles.errorMessage}>Invalid email address</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Image source={lockicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          maxLength={20}
          required
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            source={passwordVisible ? eyeon : eyeoff}
            style={styles.visibilityIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <Image source={referralicon} style={styles.icon} />
        <TextInput
          placeholder="Enter Referral Code"
          style={styles.input}
          value={referralCode}
          onChangeText={setReferralCode}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By continuing, you agree to{' '}
        <Text style={styles.linkText} onPress={handelPrivacy}>
          Terms & Conditions
        </Text>{' '}
        and{' '}
        <Text style={styles.linkText} onPress={handelPolicy}>
          Privacy Policy
        </Text>
      </Text>
      <View style={styles.safeContainer}>
        <Image source={safeimg} style={styles.safeIcon} />
        <Text style={styles.safeText}>100% Safe & Secure</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  visibilityIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
  registerButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    marginTop: 10,
    textAlign: 'center',
  },
  linkText: {
    color: 'red',
  },
  safeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  safeIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  safeText: {
    fontSize: 16,
  },
});

export default RegisterScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// import {registerUser} from './api'; // Adjust the import path

// const RegisterScreen = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [password, setPassword] = useState('');
//   const [referralCode, setReferralCode] = useState('');
//   const [isValid, setIsValid] = useState(true);
//   const [validateEmail, setValidateEmail] = useState(true);

//   const navigation = useNavigation();

//   const handleRegister = async () => {
//     const userData = {
//       phone_number: phoneNumber,
//       email: email,
//       first_name: firstName,
//       password: password,
//       referral_id: referralCode,
//     };

//     try {
//       console.log('token recive ::userData ', userData);
//       const response = await registerUser(userData);
//       if (response?.access_token) {
//         console.log('token recive :: ', response?.access_token);
//         // Store the token as needed
//         // Toast.show({text1: 'OTP Sent Successfully!'});
//         navigation.navigate('VerifyOTPSignup');
//       } else {
//         //  Toast.show({text1: 'User already exists.'});
//       }
//     } catch (error) {
//       //Toast.show({text1: 'Registration failed. Please try again.'});
//       console.error('Error registering user:', error);
//     }
//   };

//   const handleEmailChange = value => {
//     setEmail(value);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setValidateEmail(emailRegex.test(value));
//   };

//   const handlePhoneNoChange = value => {
//     const cleanedValue = value.replace(/\D/g, '');
//     if (cleanedValue && !/^[6-9]/.test(cleanedValue)) {
//       setIsValid(false);
//       return;
//     }
//     if (cleanedValue.length <= 10) {
//       setPhoneNumber(cleanedValue);
//     }
//     const phoneRegex = /^[6-9][0-9]{9}$/;
//     setIsValid(phoneRegex.test(cleanedValue));
//   };

//   const handleSubmit = () => {
//     handleRegister();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../../Paisebanao/assets/images/fullname.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Enter your full name"
//           style={styles.input}
//           value={firstName}
//           onChangeText={setFirstName}
//           required
//         />
//       </View>

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../../Paisebanao/assets/images/mobileno.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Enter your mobile number"
//           style={[styles.input, !isValid && styles.inputInvalid]}
//           value={phoneNumber}
//           onChangeText={handlePhoneNoChange}
//           keyboardType="numeric"
//           maxLength={10}
//           required
//         />
//       </View>
//       {!isValid && (
//         <Text style={styles.errorMessage}>Invalid phone number</Text>
//       )}

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../../Paisebanao/assets/images/email.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Enter your email"
//           style={[styles.input, !validateEmail && styles.inputInvalid]}
//           value={email}
//           onChangeText={handleEmailChange}
//           required
//         />
//       </View>
//       {!validateEmail && (
//         <Text style={styles.errorMessage}>Invalid email address</Text>
//       )}

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../../Paisebanao/assets/images/password.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Enter your password"
//           style={styles.input}
//           secureTextEntry={!passwordVisible}
//           value={password}
//           onChangeText={setPassword}
//           maxLength={4}
//           required
//         />
//         <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
//           <Text style={styles.toggleVisibility}>
//             {passwordVisible ? 'Hide' : 'Show'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../../Paisebanao/assets/images/refer.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           placeholder="Enter Referral Code"
//           style={styles.input}
//           value={referralCode}
//           onChangeText={setReferralCode}
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>

//       <Text style={styles.agreementText}>
//         By continuing, you agree to{' '}
//         <Text style={styles.link}>Terms & Conditions</Text> and{' '}
//         <Text style={styles.link}>Privacy Policy</Text>
//       </Text>

//       <View style={styles.safeContainer}>
//         <Image
//           source={require('../../Paisebanao/assets/images/safe.png')}
//           style={styles.safeImage}
//         />
//         <Text style={styles.safeText}>100% Safe & Secure</Text>
//       </View>

//       {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//   },
//   inputInvalid: {
//     borderColor: 'red',
//   },
//   errorMessage: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   agreementText: {
//     marginTop: 20,
//     textAlign: 'center',
//   },
//   link: {
//     color: '#007BFF',
//     textDecorationLine: 'underline',
//   },
//   safeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   safeImage: {
//     width: 18,
//     height: 18,
//     marginRight: 10,
//   },
//   safeText: {
//     fontSize: 16,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   toggleVisibility: {
//     color: '#007BFF',
//     marginLeft: 10,
//   },
// });

// export default RegisterScreen;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {registerUser} from './api';

// const Registration = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [password, setPassword] = useState('');
//   const [referralCode, setReferralCode] = useState('');
//   const [message, setMessage] = useState('');
//   const [isValid, setIsValid] = useState(true);
//   const [validateEmail, setValidateEmail] = useState(true);

//   const navigation = useNavigation();

//   const handleRegister = async () => {
//     const userData = {
//       phone_number: phoneNumber,
//       email: email,
//       first_name: firstName,
//       password: password,
//       referral_id: referralCode,
//     };

//     try {
//       const response = await registerUser(userData);
//       if (response?.access_token) {
//         Alert.alert('Success', 'Registration successful!');
//         navigation.navigate('Login');
//       } else {
//         setMessage(
//           'Please try with different user details, user already exists',
//         );
//       }
//     } catch (error) {
//       console.error('Error registering user:', error);
//       setMessage('Please try with different user details, user already exists');
//     }
//   };

//   const handleEmailChange = value => {
//     setEmail(value);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setValidateEmail(emailRegex.test(value));
//   };

//   const handleNameChange = value => {
//     const cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
//     setFirstName(cleanedValue);
//   };

//   const handlePhoneNoChange = value => {
//     const cleanedValue = value.replace(/\D/g, '');
//     if (cleanedValue && !/^[6-9]/.test(cleanedValue)) {
//       setIsValid(false);
//       return;
//     }
//     if (cleanedValue.length <= 10) {
//       setPhoneNumber(cleanedValue);
//     }
//     const phoneRegex = /^[6-9][0-9]{9}$/;
//     setIsValid(phoneRegex.test(cleanedValue));
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleSubmit = () => {
//     handleRegister();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>
//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../assets/images/fullname.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.inputField}
//           placeholder="Enter your full name"
//           value={firstName}
//           onChangeText={handleNameChange}
//           maxLength={20}
//         />
//       </View>

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../assets/images/mobileno.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           style={[styles.inputField, !isValid && styles.inputInvalid]}
//           placeholder="Enter your mobile number"
//           value={phoneNumber}
//           onChangeText={handlePhoneNoChange}
//           keyboardType="phone-pad"
//           maxLength={10}
//         />
//       </View>

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../assets/images/mobileno.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.inputField}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={handleEmailChange}
//           autoCapitalize="none"
//           keyboardType="email-address"
//           textContentType="emailAddress"
//         />
//       </View>

//       {!isValid && (
//         <Text style={styles.errorMessage}>Invalid phone number</Text>
//       )}

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../assets/images/email.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           style={[styles.inputField, !validateEmail && styles.inputInvalid]}
//           placeholder="Enter your email"
//           value={email}
//           onChangeText={handleEmailChange}
//           keyboardType="email-address"
//         />
//       </View>
//       {!validateEmail && (
//         <Text style={styles.errorMessage}>Invalid email address</Text>
//       )}

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../assets/images/password.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.inputField}
//           placeholder="Enter your password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry={!passwordVisible}
//           maxLength={4}
//         />
//         <TouchableOpacity onPress={togglePasswordVisibility}>
//           <Image
//             source={
//               passwordVisible
//                 ? require('../assets/images/eye-on.png')
//                 : require('../assets/images/eye-off.png')
//             }
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputWrapper}>
//         <Image
//           source={require('../assets/images/refer.png')}
//           style={styles.icon}
//         />
//         <TextInput
//           style={styles.inputField}
//           placeholder="Enter Referral Code"
//           value={referralCode}
//           onChangeText={setReferralCode}
//         />
//       </View>

//       <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>

//       {message && <Text style={styles.errorMessage}>{message}</Text>}

//       <Text style={styles.termsText}>
//         By continuing, you agree to our{' '}
//         <Text style={styles.link}>Terms & Conditions</Text> and{' '}
//         <Text style={styles.link}>Privacy Policy</Text>
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     marginRight: 10,
//   },
//   inputField: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 10,
//     fontSize: 16,
//   },
//   inputInvalid: {
//     borderColor: 'red',
//   },
//   errorMessage: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   registerButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   termsText: {
//     marginTop: 20,
//     textAlign: 'center',
//     fontSize: 14,
//   },
//   link: {
//     color: 'red',
//   },
// });

// export default Registration;
