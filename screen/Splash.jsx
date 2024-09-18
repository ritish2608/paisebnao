import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import paisebnaologo from '../assets/images/paisebnaologo.png'; // Logo Image
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {

  // Simulate a loading or time delay before navigating to the Home screen
  useEffect(() => {
    setTimeout(() => {
       const token =  AsyncStorage.getItem('access_token');
       console.log('your token recived is :: ',token);
       if (token !== null) {
          navigation.replace('Landing'); 
       // navigation.navigate('Dashboard');
      }else{
      navigation.replace('Landing'); 
      }
 // Navigate to Home screen
    }, 3000);  // 3 seconds delay
  }, [navigation]);

  return (
    <View style={styles.container}>
    <Image style={styles.text}
        source={require('../assets/images/paisebnaologo_1.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Splash;

