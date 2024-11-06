import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './../styling/LandingStyle';
import {useNavigation} from '@react-navigation/native';
import paisebnaologo from '../assets/images/paisebnaologo_1.png';
import group_1 from '../assets/images/group_1.png';

const Landing = () => {
  const navigation = useNavigation();
  const handelButton = () => {
    navigation.navigate('Registration');
  };

  const loginButton = () => {
    //  navigation.navigate('RootNavigator');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container2}>
      <Image
        source={require('../assets/images/paisebnaologo.png')}
        style={styles.logo2}
      />
      <Image source={group_1} style={{marginTop: 20}} />
      <Text style={styles.subtitle}>Hello ! Welcome</Text>
      <Text style={styles.text}>Login and create an account</Text>
      <TouchableOpacity style={styles.registerButton} onPress={handelButton}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={loginButton}>
        <Text style={{color: '#FF0000', textAlign: 'center'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;
