import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import lock from '../assets/images/lock.png';


const ForgetPassword = () => {
  const [code, setCode] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [timer, setTimer] = useState(59);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email; // Get email from route params

  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleChange = (value) => {
    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
      setValidationMessage('');
    } else {
      setValidationMessage('Max OTP length is 4 digits.');
    }
  };

  const handleNavigation = () => {
   // navigation.navigate('CreateNewPassword');
        navigation.navigate('CreateNewPassword');
  };

  const handleResend = () => {
    // Logic to resend code goes here
    setTimer(59);
    setIsResendEnabled(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Assuming Header is a component you have already created for React Native */}
      </View>
      <Text style={styles.title}>Verify Account</Text>
      <Text style={styles.instructions}>
        Code has been sent to <Text style={styles.emailHighlight}>{email}</Text>
        Enter the code to verify your account.
      </Text>
      <View style={styles.inputWrapper}>
        <Image source={lock} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="4 digit code"
          keyboardType="numeric"
          value={code}
          onChangeText={handleChange}
        />
      </View>
      {validationMessage && <Text style={styles.validationMessage}>{validationMessage}</Text>}
      <Text style={styles.resendText}>
        Didn’t Receive Code?{' '}
        <TouchableOpacity onPress={isResendEnabled ? handleResend : null} disabled={!isResendEnabled}>
          <Text style={[styles.resendLink, !isResendEnabled && styles.disabled]}>Resend Code</Text>
        </TouchableOpacity>
      </Text>
      <Text style={styles.resendText}>
        Resend code in 00:{timer < 10 ? `0${timer}` : timer}
      </Text>
      <TouchableOpacity onPress={handleNavigation} style={styles.button}>
        <Text style={styles.buttonText}>Verify Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  emailHighlight: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
   icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
   inputField: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width: 100,
    textAlign: 'center',
  },
  validationMessage: {
    color: 'red',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 16,
    marginBottom: 10,
  },
  resendLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  disabled: {
    color: 'gray',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ForgetPassword;
