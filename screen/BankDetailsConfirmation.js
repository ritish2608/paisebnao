import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//import Header from './common/Header'; // Adjust the import path as necessary

const BankDetailsConfirmation = ({navigation}) => {
  const handleBackToHome = () => {
    navigation.navigate('Home'); // Make sure 'Dashboard' matches your route name
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.confirmationWrapper}>
        <Text style={styles.title}>Bank Details Added Successfully!</Text>
        <Text style={styles.message}>
          Your bank details have been successfully saved. You can now proceed
          with transactions.
        </Text>

        <View style={styles.confirmationActions}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleBackToHome}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  confirmationWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmationActions: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BankDetailsConfirmation;
