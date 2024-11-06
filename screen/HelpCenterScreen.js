import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import Container from './Container';
//import Header from './common/Header'; // Adjust the import path as necessary
// Adjust the import path as necessary

const HelpCenterScreen = () => {
  const handleContactSupport = () => {
    Linking.openURL('mailto:paisebnao1111@gmail.com');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:9769335392');
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Help Center</Text>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            Contact Us: If you have any issues or queries, feel free to reach
            out to us using the following methods:
          </Text>
          <Text style={styles.instructions}>
            <Text style={styles.link} onPress={handleContactSupport}>
              paisebnao1111@gmail.com
            </Text>
          </Text>
          <Text style={styles.instructions}>
            FAQs:Visit our FAQ section to find answers to common queries.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleContactSupport}
            style={styles.button}>
            <Text style={styles.buttonText}>Email Support</Text>
          </TouchableOpacity>
          {/* Uncomment if you want to add a Call Support button */}
          {/* <TouchableOpacity onPress={handleCallSupport} style={styles.button}>
                        <Text style={styles.buttonText}>Call Support</Text>
                    </TouchableOpacity> */}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    color: '',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HelpCenterScreen;
