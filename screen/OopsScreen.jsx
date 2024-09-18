import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import errorIcon from '../assets/images/error.png'; 
import Container from './Container';
import Header from './Header';

const OopsScreen = () => {
  const navigation = useNavigation();

  const handleWatchVideo = () => {
    navigation.navigate('Dashboard'); // Navigating to the "Dashboard" screen
  };

  return (
    <Container>
      <View style={styles.oopsContainer}>
        {/* <View style={styles.header}>
          <Header />
        </View> */}

        <View style={styles.errorIconContainer}>
          <Image source={errorIcon} style={styles.errorIcon} />
        </View>

        <Text style={styles.oopsTitle}>Oops!!</Text>
        <Text style={styles.oopsSubtitle}>Your Mistake</Text>

        <View style={styles.instructionsContainer}>
          <Text style={styles.oopsInstructions}>
            • No Worries! Enter Your Email Address Below And We Will Send You A Code To Reset Password
          </Text>
          <Text style={styles.oopsInstructions}>
            • No Worries! Enter Your Email Address Below And We Will Send You A Code To Reset Password
          </Text>
          <Text style={styles.oopsInstructions}>
            • No Worries! Enter Your Email Address Below And We Will Send You A Code To Reset Password
          </Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleWatchVideo} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Continue Watching Videos</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  oopsContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
  },
  errorIconContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  errorIcon: {
    width: 100,
    height: 100,
  },
  oopsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  oopsSubtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  instructionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  oopsInstructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  verifyButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OopsScreen;
