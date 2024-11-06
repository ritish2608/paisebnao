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
import {verifyOtpAfterSignup, forgetPassword} from './api'; // Adjust the import path as needed
import lockIcon from '../assets/images/lock.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyOtpSignup = () => {
  const [code, setCode] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [timer, setTimer] = useState(59);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [error, setError] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const {email, hotemailemail} = route.params || {};
  const mail = AsyncStorage.getItem('email');
  console.log('mail:', mail);
  AsyncStorage.setItem('email', mail);
  useEffect(() => {
    if (hotemailemail) {
      handleResend(mail);
    }
  }, [hotemailemail]);

  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleChange = value => {
    if (/^\d{0,4}$/.test(value)) {
      setCode(value);
      setValidationMessage('');
      setError(false);
    } else {
      setValidationMessage('Max OTP length is 4 digits.');
    }
  };

  const handleResend = async emailToUse => {
    try {
      await forgetPassword(emailToUse);
      setTimer(59);
      setIsResendEnabled(false);
    } catch (error) {
      console.error('Error resending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log('handleVerifyOtp', token);
    console.log('handleVerifyOtp email', email);
    try {
      await verifyOtpAfterSignup(code, token);
      // CreateNewPassword;
      navigation.navigate('CreateNewPassword', {email});
    } catch (error) {
      console.error('OTP Verification Failed:', error);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.verifyTitle}>Verify Account</Text>
      <Text style={styles.verifyInstructions}>
        Code has been sent to <Text style={styles.emailHighlight}>{email}</Text>
        . Enter the code to verify your account.
      </Text>
      <View style={styles.inputContainer}>
        <Image source={lockIcon} style={styles.icon} />
        <TextInput
          placeholder="4 digit code"
          style={styles.inputField}
          value={code}
          onChangeText={handleChange}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      {validationMessage && (
        <Text style={styles.errorMessage}>{validationMessage}</Text>
      )}
      <Text style={styles.resendText}>
        Didn’t Receive Code?{' '}
        <TouchableOpacity
          onPress={
            isResendEnabled ? () => handleResend(email || hotemailemail) : null
          }
          disabled={!isResendEnabled}>
          <Text style={[styles.link, !isResendEnabled && styles.disabledLink]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </Text>
      <Text style={styles.resendText}>
        Resend code in 00:{timer < 10 ? `0${timer}` : timer}
      </Text>
      {error && <Text style={styles.errorMessage}>Enter Correct OTP</Text>}
      <TouchableOpacity onPress={handleVerifyOtp} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  verifyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  verifyInstructions: {
    fontSize: 16,
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
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  resendText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  link: {
    color: '#ff0000',
    textDecorationLine: 'underline',
  },
  disabledLink: {
    color: 'gray',
  },
  verifyButton: {
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VerifyOtpSignup;
