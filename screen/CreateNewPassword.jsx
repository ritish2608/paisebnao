import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
//import Header from '../common/Header'; // Update this import based on your actual path
import lock from '../assets/images/lock.png';
import eyeoff from '../assets/images/eye-off.png';
import eyeon from '../assets/images/eye-on.png';
import Container from './Container';


const CreateNewPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleSubmit = () => {
    if (password.length < 4) {
      setError('Password must contain 4 digits only');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Add password reset logic here
      Alert.alert('Password reset successful');
      navigation.navigate('Login'); // Replace with actual route name
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <Container>
      <View style={styles.container}>

        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.instructions}>Please Enter And Confirm Your New Password</Text>
        <View style={styles.inputContainer}>
          <Image source={lock} style={styles.icon} />
          <TextInput
            secureTextEntry={!passwordVisible}
            placeholder="Enter your password"
            style={styles.input}
            value={password}
            onChangeText={handlePasswordChange}
            maxLength={4}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image source={passwordVisible ? eyeon : eyeoff} style={styles.visibilityIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordRequirement}>Must contain 4 digits</Text>
        <View style={styles.inputContainer}>
          <Image source={lock} style={styles.icon} />
          <TextInput
            secureTextEntry={!confirmPasswordVisible}
            placeholder="Confirm your password"
            style={styles.input}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            maxLength={4}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Image source={confirmPasswordVisible ? eyeon : eyeoff} style={styles.visibilityIcon} />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  visibilityIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  passwordRequirement: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateNewPassword;
