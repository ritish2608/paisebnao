import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {editProfileContainer} from './api';
//import ToastMsg from './common/ToastMsg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import Header from '../../components/pages/common/header'; // Adjust import as needed

const EditProfile = () => {
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState({
    firstName: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    phone: '',
  });

  const validateName = name => {
    const nameRegex = /^[a-zA-Z\s]{3,30}$/;
    return nameRegex.test(name);
  };

  const validatePhone = phone => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (name, value) => {
    setProfileData({...profileData, [name]: value});

    if (name === 'firstName') {
      setErrors({
        ...errors,
        firstName: validateName(value)
          ? ''
          : 'Invalid name. Only alphabets allowed, 3-30 characters.',
      });
    } else if (name === 'phone') {
      setErrors({
        ...errors,
        phone: validatePhone(value)
          ? ''
          : 'Invalid phone number. Must be 10 digits starting with 6-9.',
      });
    }
  };

  const handleSubmit = async () => {
    if (!validateName(profileData.firstName)) {
      setErrors({
        ...errors,
        firstName: 'Invalid name. Only alphabets allowed, 3-30 characters.',
      });
      return;
    }

    if (!validatePhone(profileData.phone)) {
      setErrors({
        ...errors,
        phone: 'Invalid phone number. Must be 10 digits starting with 6-9.',
      });
      return;
    }

    const token = AsyncStorage.getItem('access_token');
    console.log('EDIT PROFILE TOKEN ::', token);
    try {
      const response = await editProfileContainer(
        profileData.firstName,
        profileData.phone,
        token,
      );
      console.log('Profile updated:', response);
      // ToastMsg.success('Profile updated successfully!');
      //  navigate('/dashboard');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating profile:', error);
      // ToastMsg.error(error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={profileData.firstName}
            onChangeText={value => handleInputChange('firstName', value)}
            maxLength={30}
            required
          />
          {errors.firstName ? (
            <Text style={styles.errorMessage}>{errors.firstName}</Text>
          ) : null}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone"
            value={profileData.phone}
            onChangeText={value => handleInputChange('phone', value)}
            maxLength={10}
            keyboardType="phone-pad"
            required
          />
          {errors.phone ? (
            <Text style={styles.errorMessage}>{errors.phone}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditProfile;
