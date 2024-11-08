import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
// Logo Image
import AsyncStorage from '@react-native-async-storage/async-storage';

import paisebnaologo from '../assets/images/paisebnaologo.png';
import group_1 from '../assets/images/group_1.png';

const Splash = ({navigation}) => {
  const getToken = async () => {
    return await AsyncStorage.getItem('access_token');
  };
  const token_ = getToken();
  // Simulate a loading or time delay before navigating to the Home screen
  useEffect(() => {
    setTimeout(() => {
      console.log('splash  token recived is :: ', token_.j);
      console.log('splash  token is :: ', token_);
      //const dashboarddata = '';
      navigation.replace('Landing');
      // if (token.length === undefined) {
      //   navigation.replace('Landing');

      //   //  navigation.navigate('Dashboard');
      // } else {
      //   navigation.replace('Dashboard');
      // }
      // Navigate to Home screen
    }, 3000); // 3 seconds delay
  }, [navigation, token_]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/paisebnaologo.png')}
        style={styles.text}
      />
      {/* <Image style={styles.text} source={paisebnaologo} /> */}
      {/* <Image tyle={styles.text} source={paisebnaologo} /> */}
      {/* <Image source={group_1} style={{marginTop: 20}} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  text: {
    width: 'auto',
    height: '200',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Splash;
