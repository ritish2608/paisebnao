// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
// // // //import Header from '../common/Header'; // Update this import based on your actual path
// // // import lock from '../assets/images/lock.png';
// // // import eyeoff from '../assets/images/eye-off.png';
// // // import eyeon from '../assets/images/eye-on.png';
// // // import Container from './Container';

// // // const CreateNewPassword = ({ navigation }) => {
// // //   const [password, setPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [passwordVisible, setPasswordVisible] = useState(false);
// // //   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const handlePasswordChange = (text) => {
// // //     setPassword(text);
// // //   };

// // //   const handleConfirmPasswordChange = (text) => {
// // //     setConfirmPassword(text);
// // //   };

// // //   const handleSubmit = () => {
// // //     if (password.length < 4) {
// // //       setError('Password must contain 4 digits only');
// // //     } else if (password !== confirmPassword) {
// // //       setError('Passwords do not match');
// // //     } else {
// // //       setError('');
// // //       // Add password reset logic here
// // //       Alert.alert('Password reset successful');
// // //       navigation.navigate('Login'); // Replace with actual route name
// // //     }
// // //   };

// // //   const togglePasswordVisibility = () => {
// // //     setPasswordVisible(!passwordVisible);
// // //   };

// // //   const toggleConfirmPasswordVisibility = () => {
// // //     setConfirmPasswordVisible(!confirmPasswordVisible);
// // //   };

// // //   return (
// // //     <Container>
// // //       <View style={styles.container}>

// // //         <Text style={styles.title}>Create New Password</Text>
// // //         <Text style={styles.instructions}>Please Enter And Confirm Your New Password</Text>
// // //         <View style={styles.inputContainer}>
// // //           <Image source={lock} style={styles.icon} />
// // //           <TextInput
// // //             secureTextEntry={!passwordVisible}
// // //             placeholder="Enter your password"
// // //             style={styles.input}
// // //             value={password}
// // //             onChangeText={handlePasswordChange}
// // //             maxLength={4}
// // //           />
// // //           <TouchableOpacity onPress={togglePasswordVisibility}>
// // //             <Image source={passwordVisible ? eyeon : eyeoff} style={styles.visibilityIcon} />
// // //           </TouchableOpacity>
// // //         </View>
// // //         <Text style={styles.passwordRequirement}>Must contain 4 digits</Text>
// // //         <View style={styles.inputContainer}>
// // //           <Image source={lock} style={styles.icon} />
// // //           <TextInput
// // //             secureTextEntry={!confirmPasswordVisible}
// // //             placeholder="Confirm your password"
// // //             style={styles.input}
// // //             value={confirmPassword}
// // //             onChangeText={handleConfirmPasswordChange}
// // //             maxLength={4}
// // //           />
// // //           <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
// // //             <Image source={confirmPasswordVisible ? eyeon : eyeoff} style={styles.visibilityIcon} />
// // //           </TouchableOpacity>
// // //         </View>
// // //         {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
// // //         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
// // //           <Text style={styles.buttonText}>Reset Password</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </Container>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     padding: 16,
// // //   },
// // //   title: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     textAlign: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   instructions: {
// // //     fontSize: 16,
// // //     textAlign: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   inputContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   input: {
// // //     flex: 1,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#ccc',
// // //     padding: 8,
// // //     fontSize: 16,
// // //   },
// // //   icon: {
// // //     width: 24,
// // //     height: 24,
// // //     marginRight: 8,
// // //   },
// // //   visibilityIcon: {
// // //     width: 24,
// // //     height: 24,
// // //     marginLeft: 8,
// // //   },
// // //   passwordRequirement: {
// // //     fontSize: 14,
// // //     color: 'gray',
// // //     textAlign: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   errorMessage: {
// // //     color: 'red',
// // //     textAlign: 'center',
// // //     marginBottom: 16,
// // //   },
// // //   button: {
// // //     backgroundColor: '#007BFF',
// // //     padding: 12,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //   },
// // //   buttonText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default CreateNewPassword;

// // import React, {useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   Image,
// //   StyleSheet,
// //   Alert,
// // } from 'react-native';
// // import lock from '../assets/images/lock.png'; // Adjust the path as necessary
// // import eyeoff from '../assets/images/eye-off.png'; // Adjust the path as necessary
// // import eyeon from '../assets/images/eye-on.png'; // Adjust the path as necessary
// // import Container from './Container'; // Adjust the import based on your file structure

// // const CreateNewPassword = ({navigation}) => {
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [passwordVisible, setPasswordVisible] = useState(false);
// //   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
// //   const [error, setError] = useState('');

// //   const handlePasswordChange = text => {
// //     setPassword(text);
// //   };

// //   const handleConfirmPasswordChange = text => {
// //     setConfirmPassword(text);
// //   };

// //   const handleSubmit = () => {
// //     if (password.length < 4) {
// //       setError('Password must contain 4 digits only');
// //     } else if (password !== confirmPassword) {
// //       setError('Passwords do not match');
// //     } else {
// //       setError('');
// //       // Add password reset logic here
// //       Alert.alert('Password reset successful');
// //       navigation.navigate('Login'); // Replace with the actual route name
// //     }
// //   };

// //   const togglePasswordVisibility = () => {
// //     setPasswordVisible(prev => !prev);
// //   };

// //   const toggleConfirmPasswordVisibility = () => {
// //     setConfirmPasswordVisible(prev => !prev);
// //   };

// //   return (
// //     <Container>
// //       <View style={styles.container}>
// //         <Text style={styles.title}>Create New Password</Text>
// //         <Text style={styles.instructions}>
// //           Please Enter And Confirm Your New Password
// //         </Text>

// //         <View style={styles.inputContainer}>
// //           <Image source={lock} style={styles.icon} />
// //           <TextInput
// //             secureTextEntry={!passwordVisible}
// //             placeholder="Enter your password"
// //             style={styles.input}
// //             value={password}
// //             onChangeText={handlePasswordChange}
// //             maxLength={4}
// //           />
// //           <TouchableOpacity onPress={togglePasswordVisibility}>
// //             <Image
// //               source={passwordVisible ? eyeon : eyeoff}
// //               style={styles.visibilityIcon}
// //             />
// //           </TouchableOpacity>
// //         </View>
// //         <Text style={styles.passwordRequirement}>Must contain 4 digits</Text>

// //         <View style={styles.inputContainer}>
// //           <Image source={lock} style={styles.icon} />
// //           <TextInput
// //             secureTextEntry={!confirmPasswordVisible}
// //             placeholder="Confirm your password"
// //             style={styles.input}
// //             value={confirmPassword}
// //             onChangeText={handleConfirmPasswordChange}
// //             maxLength={4}
// //           />
// //           <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
// //             <Image
// //               source={confirmPasswordVisible ? eyeon : eyeoff}
// //               style={styles.visibilityIcon}
// //             />
// //           </TouchableOpacity>
// //         </View>

// //         {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

// //         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
// //           <Text style={styles.buttonText}>Reset Password</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </Container>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     padding: 16,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //     marginBottom: 16,
// //   },
// //   instructions: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //     marginBottom: 16,
// //   },
// //   inputContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 16,
// //   },
// //   input: {
// //     flex: 1,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //     padding: 8,
// //     fontSize: 16,
// //   },
// //   icon: {
// //     width: 24,
// //     height: 24,
// //     marginRight: 8,
// //   },
// //   visibilityIcon: {
// //     width: 24,
// //     height: 24,
// //     marginLeft: 8,
// //   },
// //   passwordRequirement: {
// //     fontSize: 14,
// //     color: 'gray',
// //     textAlign: 'center',
// //     marginBottom: 16,
// //   },
// //   errorMessage: {
// //     color: 'red',
// //     textAlign: 'center',
// //     marginBottom: 16,
// //   },
// //   button: {
// //     backgroundColor: '#007BFF',
// //     padding: 12,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default CreateNewPassword;

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
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {setNewPassword} from './api';
// import lock from '../assets/images/lock.png';
// import eyeoff from '../assets/images/eye-off.png';
// import eyeon from '../assets/images/eye-on.png';
// //import ToastMsg from '../common/ToastMsg'; // Adjust the import path as necessary

// const CreateNewPassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState('');
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {email} = route.params; // Assuming email is passed as a parameter

//   const handleSetNewPassword = async () => {
//     try {
//       const response = await setNewPassword(email, confirmPassword);
//       console.log('Password Change Success:', response);
//       // ToastMsg.success('Password changed successfully!');
//       navigation.navigate('Login'); // Adjust the screen name as necessary
//     } catch (error) {
//       console.error('Password Change Failed:', error);
//       // ToastMsg.error('Failed to change password. Please try again.');
//     }
//   };

//   const handleSubmit = () => {
//     if (password.length < 4) {
//       setError('Password must contain 4 digits only');
//     } else if (password !== confirmPassword) {
//       setError('Passwords do not match');
//     } else {
//       setError('');
//       handleSetNewPassword();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create New Password</Text>
//       <Text style={styles.instructions}>
//         Please Enter And Confirm Your New Password
//       </Text>

//       <View style={styles.inputContainer}>
//         <Image source={lock} style={styles.icon} />
//         <TextInput
//           style={styles.inputField}
//           placeholder="Enter your password"
//           secureTextEntry={!passwordVisible}
//           value={password}
//           onChangeText={setPassword}
//           maxLength={4}
//         />
//         <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
//           <Image
//             source={passwordVisible ? eyeon : eyeoff}
//             style={styles.visibilityIcon}
//           />
//         </TouchableOpacity>
//       </View>
//       <Text style={styles.validationMessage}>Must contain 4 digits</Text>

//       <View style={styles.inputContainer}>
//         <Image source={lock} style={styles.icon} />
//         <TextInput
//           style={styles.inputField}
//           placeholder="Confirm your password"
//           secureTextEntry={!confirmPasswordVisible}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           maxLength={4}
//         />
//         <TouchableOpacity
//           onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
//           <Image
//             source={confirmPasswordVisible ? eyeon : eyeoff}
//             style={styles.visibilityIcon}
//           />
//         </TouchableOpacity>
//       </View>

//       {error && <Text style={styles.errorMessage}>{error}</Text>}

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Reset Password</Text>
//       </TouchableOpacity>
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
//     marginVertical: 20,
//   },
//   instructions: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   inputContainer: {
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
//     borderRadius: 5,
//     padding: 10,
//   },
//   visibilityIcon: {
//     width: 24,
//     height: 24,
//     marginLeft: 10,
//   },
//   validationMessage: {
//     color: 'gray',
//     marginBottom: 10,
//   },
//   errorMessage: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: '#ff0000',
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default CreateNewPassword;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {setNewPassword} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ToastMsg from '../common/ToastMsg.js';

const CreateNewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {emailToSend} = route.params;

  // Assuming email is passed via navigation
  const email_ = AsyncStorage.getItem(emailToSend);
  console.log('Create New Pass :: ', email_);
  const handleSetNewPassword = async () => {
    try {
      console.log(
        'Password Change Success: v email_',
        email_.j,
        emailToSend,
        confirmPassword,
      );
      const response = await setNewPassword(emailToSend, confirmPassword);
      console.log('Password Change Success:', email_.j, confirmPassword);
      // const response = await setNewPassword(email, confirmPassword);
      console.log('Password Change Success:', response);
      //  ToastMsg.success('Password changed successfully!');
      navigation.navigate('Login'); // Adjust navigation target as necessary
    } catch (error) {
      console.error('Password Change Failed:', error);
      //  ToastMsg.error('Failed to change password. Please try again.');
    }
  };

  const handleSubmit = () => {
    if (password.length < 4) {
      setError('Password must contain 4 digits only');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      handleSetNewPassword();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.instructions}>
        Please Enter And Confirm Your New Password
      </Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/images/lock.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          maxLength={4}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={
              passwordVisible
                ? require('../assets/images/eye-on.png')
                : require('../assets/images/eye-off.png')
            }
            style={styles.visibilityIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.passHint}>Must contain 4 digits</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../assets/images/lock.png')}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          secureTextEntry={!confirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          maxLength={4}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
          <Image
            source={
              confirmPasswordVisible
                ? require('../assets/images/eye-on.png')
                : require('../assets/images/eye-off.png')
            }
            style={styles.visibilityIcon}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  visibilityIcon: {
    width: 20,
    height: 20,
  },
  passHint: {
    marginBottom: 10,
    color: '#666',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateNewPassword;
