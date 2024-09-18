import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from './api';

const Registration = () => {
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
        Alert.alert('Success', 'Registration successful!');
        navigation.navigate('Login');
      } else {
        setMessage('Please try with different user details, user already exists');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Please try with different user details, user already exists');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidateEmail(emailRegex.test(value));
  };

  const handleNameChange = (value) => {
    const cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
    setFirstName(cleanedValue);
  };

  const handlePhoneNoChange = (value) => {
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = () => {
    handleRegister();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputWrapper}>
        <Image source={require('../assets/images/fullname.png')} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your full name"
          value={firstName}
          onChangeText={handleNameChange}
          maxLength={20}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/images/mobileno.png')} style={styles.icon} />
        <TextInput
          style={[styles.inputField, !isValid && styles.inputInvalid]}
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChangeText={handlePhoneNoChange}
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>
      {!isValid && <Text style={styles.errorMessage}>Invalid phone number</Text>}

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/images/email.png')} style={styles.icon} />
        <TextInput
          style={[styles.inputField, !validateEmail && styles.inputInvalid]}
          placeholder="Enter your email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
      </View>
      {!validateEmail && <Text style={styles.errorMessage}>Invalid email address</Text>}

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/images/password.png')} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          maxLength={4}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image source={passwordVisible ? require('../assets/images/eye-on.png') : require('../assets/images/eye-off.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <Image source={require('../assets/images/refer.png')} style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Enter Referral Code"
          value={referralCode}
          onChangeText={setReferralCode}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {message && <Text style={styles.errorMessage}>{message}</Text>}

      <Text style={styles.termsText}>
        By continuing, you agree to our <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  termsText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
  },
  link: {
    color: 'red',
  },
});

export default Registration;
