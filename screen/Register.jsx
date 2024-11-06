import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {registerUser} from './api'; // Your API file path

// Import images (Make sure you have them in your project)
import fullnameicon from '../assets/images/fullname.png';
import mobileicon from '../assets/images/mobileno.png';
import emailicon from '../assets/images/email.png';
import lockicon from '../assets/images/password.png';
import referralicon from '../assets/images/refer.png';
import eyeon from '../assets/images/eye-on.png';
import eyeoff from '../assets/images/eye-off.png';
import safeimg from '../assets/images/safe.png';
import {AsyncStorage} from 'react-native';

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [validateEmail, setValidateEmail] = useState(true);

  const navigation = useNavigation();

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
        AsyncStorage.setItem('access_token', response?.access_token);
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login'); // Navigate to dashboard
      } else {
        setMessage(
          'Please try with different user details, user already exists.',
        );
      }
    } catch (error) {
      Alert.alert(error);
      console.error('Error registering user:', error);
      setMessage('Error registering user. Please try again.');
    }
  };

  const handleEmailChange = value => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidateEmail(emailRegex.test(value));
  };

  const handlePhoneNoChange = value => {
    const cleanedValue = value.replace(/\D/g, '');
    if (cleanedValue && !/^[6-9]/.test(cleanedValue)) {
      setIsValid(false);
      return;
    }
    setPhoneNumber(cleanedValue);
    const phoneRegex = /^[6-9][0-9]{9}$/;
    setIsValid(phoneRegex.test(cleanedValue));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = () => {
    handleRegister();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Register</Text> */}
      <View style={styles.inputWrapper}>
        <Image source={fullnameicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your full name"
          style={styles.inputField}
          value={firstName}
          onChangeText={setFirstName}
          maxLength={20}
          required
        />
      </View>

      <View style={styles.inputWrapper}>
        <Image source={mobileicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your mobile number"
          style={[styles.inputField, !isValid && styles.inputInvalid]}
          value={phoneNumber}
          onChangeText={handlePhoneNoChange}
          maxLength={10}
          keyboardType="numeric"
        />
        {!isValid && (
          <Text style={styles.errorMessage}>Invalid phone number</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Image source={emailicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your email"
          style={[styles.inputField, !validateEmail && styles.inputInvalid]}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {!validateEmail && (
          <Text style={styles.errorMessage}>Invalid email address</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Image source={lockicon} style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          style={styles.inputField}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          maxLength={4}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
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
          style={styles.inputField}
          value={referralCode}
          onChangeText={setReferralCode}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {message && <Text style={styles.errorMessage}>{message}</Text>}

      <Text style={styles.text}>
        By continuing, you agree to our{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('OopsScreen')}>
          Terms & Conditions
        </Text>{' '}
        and{' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('PrivacyPolicy')}>
          Privacy Policy
        </Text>
      </Text>

      <View style={styles.safeView}>
        <Image source={safeimg} style={styles.safeIcon} />
        <Text style={styles.safeText}>100% Safe & Secure</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputInvalid: {
    borderBottomColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
  visibilityIcon: {
    width: 24,
    height: 24,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#ff6347',
    textDecorationLine: 'underline',
  },
  safeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  safeIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  safeText: {
    color: '#2ecc71',
    fontSize: 14,
  },
});

export default RegisterScreen;
