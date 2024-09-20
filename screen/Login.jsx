import React, { useState } from 'react';

import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

import { loginUser } from './api';
  import { BackHandler } from "react-native";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');


  const navigation = useNavigation();

  const validateEmail = (email) => {
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

  const handleEmailChange = (value) => {
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
      AsyncStorage.setItem('access_token', response?.access_token);
      const token = AsyncStorage.getItem('access_token');
      if (token != null) {
        navigation.navigate('Dashboard');
      } else {
        throw new Error('Access token is not defined');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid credentials. Please enter the correct email and password.');
    }
  };

  return (
    <Container>
      <View style={styles.logoContainer}>
        <Image source={paisebnaologo} style={styles.logo} />

       <Image source={group_1}  style={{marginTop:20}}/>

        <View style={styles.inputWrapper} >
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
        {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}

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
            <Image source={passwordVisible ? eyeon : eyeoff} style={styles.visibilityIcon} />
          </TouchableOpacity>
        </View>

        {loginError ? <Text style={styles.errorMessage}>{loginError}</Text> : null}

        <Text style={styles.termsText}>
          By going forward, you agree to{' '}
          <Text style={styles.linkText}
           onPress={handleSubmit}>
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
