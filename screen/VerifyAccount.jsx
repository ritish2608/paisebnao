import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import emailIcon from '../assets/images/email.png'; // Adjust path based on your structure
import Container from './Container';
const VerifyAccount = () => {
  const [email, setEmail] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const handleEmailChange = (newEmail) => {
    if (newEmail.length > 154) {
      setValidationMessage('Email must be 154 characters or less.');
    } else {
      setEmail(newEmail);
      validateEmail(newEmail);
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setValidationMessage('Please enter a valid email address.');
    } else {
      setValidationMessage('');
    }
  };

  const navigation = useNavigation();

  const handleNavigation = () => {
    if (!validationMessage && email) {
      // Navigate to the next screen with email as a parameter
      navigation.navigate('ForgetPassword', { email });
    } else {
      validateEmail(email);
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.instructions}>
          No worries! Enter your email address below and we will send you a code to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Image source={emailIcon} style={styles.icon} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your email"
            value={email}
            onChangeText={handleEmailChange}
            onBlur={() => validateEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {validationMessage ? <Text style={styles.errorText}>{validationMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleNavigation}>
          <Text style={styles.buttonText}>Send Verification Code</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002366',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
    maxWidth: 400,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerifyAccount;
