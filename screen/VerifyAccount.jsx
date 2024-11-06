// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import emailIcon from '../assets/images/email.png'; // Adjust path based on your structure
// import Container from './Container';
// const VerifyAccount = () => {
//   const [email, setEmail] = useState('');
//   const [validationMessage, setValidationMessage] = useState('');

//   const handleEmailChange = newEmail => {
//     if (newEmail.length > 154) {
//       setValidationMessage('Email must be 154 characters or less.');
//     } else {
//       setEmail(newEmail);
//       validateEmail(newEmail);
//     }
//   };

//   const validateEmail = email => {
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailPattern.test(email)) {
//       setValidationMessage('Please enter a valid email address.');
//     } else {
//       setValidationMessage('');
//     }
//   };

//   const navigation = useNavigation();

//   const handleNavigation = () => {
//     if (!validationMessage && email) {
//       // Navigate to the next screen with email as a parameter
//       navigation.navigate('ForgetPassword', {email});
//     } else {
//       validateEmail(email);
//     }
//   };

//   return (
//     <Container>
//       <View style={styles.container}>
//         <Text style={styles.title}>Forgot Password</Text>
//         <Text style={styles.instructions}>
//           No worries! Enter your email address below and we will send you a code
//           to reset your password.
//         </Text>

//         <View style={styles.inputContainer}>
//           <Image source={emailIcon} style={styles.icon} />
//           <TextInput
//             style={styles.inputField}
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={handleEmailChange}
//             onBlur={() => validateEmail(email)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {validationMessage ? (
//           <Text style={styles.errorText}>{validationMessage}</Text>
//         ) : null}

//         <TouchableOpacity style={styles.button} onPress={handleNavigation}>
//           <Text style={styles.buttonText}>Send Verification Code</Text>
//         </TouchableOpacity>
//       </View>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#002366',
//     marginBottom: 20,
//   },
//   instructions: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     width: '100%',
//     maxWidth: 400,
//   },
//   icon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   inputField: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#ff0000',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '100%',
//     maxWidth: 400,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default VerifyAccount;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import emailicon from '../assets/images/email.png'; // Adjust the path as necessary
import Container from './Container'; // Adjust import based on your file structure
import {forgetPassword} from './api'; // Adjust import based on your file structure
//import ToastMsg from '../common/ToastMsg'; // Adjust import based on your file structure

const VerifyAccount = () => {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const hotemailemail = route.params?.hotemailemail; // Get hotemailemail from params

  const handleEmailChange = newEmail => {
    if (newEmail.length > 154) {
      setValidationMessage('Email must be 154 characters or less.');
    } else {
      setEmail(newEmail);
      setValidationMessage('');
    }
  };

  const validateEmail = email => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setValidationMessage('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  // Automatically send verification code if 'hotemailemail' is present
  useEffect(() => {
    if (hotemailemail) {
      setEmail(hotemailemail); // Set the email to 'hotemailemail'
      handleForgetPassword(hotemailemail); // Automatically send verification code
    }
  }, [hotemailemail]);

  // Handle forget password request
  const handleForgetPassword = async emailToUse => {
    const emailToSend = emailToUse || email; // Use passed email or state email
    console.log('Forget Password API response', emailToSend);
    console.log('Forget Password API response uhuhuhu', email);

    try {
      const response = await forgetPassword(emailToSend);
      console.log(response, 'Forget Password API response');
      // ToastMsg.success('Otp sent to your email.');
      navigation.navigate('ForgetPassword', {emailToSend});
      // navigation.navigate('EnterEmailOtp', {email: emailToSend}); // Adjust based on your navigation structure
    } catch (error) {
      console.error('Error sending forget password request:', error);
      // ToastMsg.error(
      //   'Failed to send forget password request. Please try again.',
      //  );
    }
  };

  const handleNavigation = () => {
    if (validateEmail(email)) {
      handleForgetPassword();
    } else {
      console.log('Invalid email');
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* Replace with your Header component */}
        </View>

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instructions}>
          No worries! Enter your email address below and we will send you a code
          to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Image source={emailicon} style={styles.iconSize} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={() => validateEmail(email)}
            editable={!hotemailemail} // Disable input if 'hotemailemail' is present
          />
        </View>

        {validationMessage ? (
          <Text style={styles.errorText}>{validationMessage}</Text>
        ) : null}

        {/* Fix onPress by passing a function reference, not executing it */}
        {!hotemailemail && (
          <TouchableOpacity
            onPress={handleNavigation}
            style={styles.verifyButton}>
            <Text style={styles.buttonText}>Send Verification Code</Text>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', // Change as needed
    borderRadius: 10,
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  iconSize: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VerifyAccount;
