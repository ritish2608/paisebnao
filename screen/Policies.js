import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from './Header';
import Dashboard from './Dashboard';
import {useNavigate} from 'react-router-dom';
import {useNavigation} from '@react-navigation/native';

const Policies = () => {
  const navigation = useNavigation();
  const handleWatchVideo = () => {
    navigation.navigate('Home');
    // Navigate to dashboard
    // Replace with your navigation logic
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.errorIconContainer}>
        {/* <Image source={errorIcon} style={styles.errorIcon} /> */}
      </View>
      {/* <Text style={styles.oopsTitle}>Oops!!</Text> */}
      <Text style={styles.termsTitle}>Privacy Policy</Text>
      <ScrollView contentContainerStyle={styles.instructionsContainer}>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Data Collection:</Text> PaiseBnao
          collects personal information such as name, email, and phone number
          during registration to enhance user experience. We may also collect
          data about your activity within the app for analytical purposes.
        </Text>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Data Usage:</Text> The information
          collected is used to personalize content, improve services, and
          process payments. We do not share your personal data with third
          parties, except for payment processing and legal compliance.
        </Text>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Cookies and Tracking:</Text> PaiseBnao
          may use cookies to track user activity and preferences. This helps us
          optimize the platform experience, but users can choose to disable
          cookies in their browser settings.
        </Text>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Security Measures:</Text> We implement
          industry-standard security protocols to protect your data from
          unauthorized access. However, users are responsible for safeguarding
          their login credentials.
        </Text>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Data Retention:</Text> We retain
          personal data for as long as necessary to provide our services or as
          required by law. Users can request the deletion of their data by
          contacting support.
        </Text>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Changes to Policy:</Text> PaiseBnao
          reserves the right to modify this privacy policy at any time. Users
          will be notified of significant changes, and continued use of the app
          constitutes acceptance of the updated policy.
        </Text>
        <Text style={styles.termsInstructions}>
          <Text style={styles.boldText}>Conversion of Earnings:</Text> PaiseBnao
          reserves the right to convert rupees earned by users into points at
          any time. This means that users' rupees may be converted into a
          points-based system at the discretion of the company. The conversion
          rate and the way these points can be redeemed will be communicated
          when necessary. Users must acknowledge that the value of points may
          vary and agree to these terms by continuing to use the platform.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleWatchVideo}>
        <Text style={styles.buttonText}>Continue Watching Videos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  errorIconContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  // errorIcon: {
  //   width: 50,
  //   height: 50,
  // },
  // oopsTitle: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginTop: 10,
  // },
  termsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  instructionsContainer: {
    paddingBottom: 20,
  },
  termsInstructions: {
    marginBottom: 10,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Policies;
