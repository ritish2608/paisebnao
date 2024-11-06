import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Slider,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchUserdetail, withdrawalrequest} from './api';

import AsyncStorage from '@react-native-async-storage/async-storage';

const WithdrawAmount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {balance: initialBalance} = route.params || {}; // Getting balance from route params

  const [amount, setAmount] = useState(initialBalance || 0);
  const [balance, setBalance] = useState(initialBalance || 0);
  const [upiId, setUpiId] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [platformFeePaid, setPlatformFeePaid] = useState(false);
  const [noMistake, setNoMistake] = useState(true);

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    handlefetchUserdetail();
  }, []);

  const handlefetchUserdetail = async () => {
    try {
      const data = await fetchUserdetail();
      setNoMistake(data.data.is_faulty);
      setPlatformFeePaid(data.data.platform_fee_paid);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const validateUpiId = id => {
    const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    return upiPattern.test(id);
  };

  const handleUPInputChange = value => {
    setUpiId(value);
    setIsValid(validateUpiId(value));
  };

  const handleWithdrawalRequest = async (upi_id, amount) => {
    const token = AsyncStorage.getItem('access_token'); // This may need to be handled differently in React Native

    const withdrawalData = {upi_id, amount, token};

    try {
      const response = await withdrawalrequest(
        withdrawalData.upi_id,
        withdrawalData.amount,
        withdrawalData.token,
      );

      if (response) {
        //   ToastMsg.success('Withdrawal request submitted successfully!');
        setTimeout(() => {
          navigation.navigate('Dashboard', {keyfrom: 'withdrawal'});
        }, 3000);
      } else {
        // ToastMsg.error(
        //   'There was an issue with your withdrawal request. Please try again.',
        // );
      }
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      // ToastMsg.error(
      //   'An error occurred while processing your request. Please try again.',
      // );
    }
  };

  const handleSubmit = () => {
    const refrcount = parseInt(AsyncStorage.getItem('refercount'), 10);

    if (upiId.trim() === '' || !validateUpiId(upiId)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    if (!platformFeePaid) {
      navigation.navigate('PlatformFee', {amount});
    } else if (refrcount < 3) {
      navigation.navigate('ReferAndEarn', {keyfrom: 'withdrawal'});
    } else if (noMistake) {
      navigation.navigate('YourMistake');
    } else {
      handleWithdrawalRequest(upiId, initialBalance);
    }
  };

  const handleSliderChange = value => {
    setAmount(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.balanceTitle}>Available Balance</Text>
      <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>

      <View style={styles.withdrawSection}>
        <Text style={styles.withdrawInstruction}>
          Select amount you want to withdraw
        </Text>
        <Text style={[styles.upiInput]}>{formatCurrency(amount)}</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={balance}
          value={amount}
          onValueChange={handleSliderChange}
        />

        <View style={styles.sliderLabels}>
          <Text>₹0</Text>
          <Text>{formatCurrency(balance)}</Text>
        </View>
      </View>

      <View style={styles.referralCodeContainer}>
        <Text style={styles.upiTitle}>Enter your UPI ID</Text>
        <TextInput
          style={[styles.upiInput]}
          placeholder="Your UPI ID"
          value={upiId}
          onChangeText={handleUPInputChange}
          maxLength={50}
        />
        {!isValid && (
          <Text style={styles.errorMessage}>Invalid UPI ID format.</Text>
        )}
        <Text style={styles.upiInstruction}>
          Enter Your UPI ID to Receive Amount
        </Text>
      </View>

      <Button
        title="Withdraw Amount"
        onPress={handleSubmit}
        style={styles.verifyButton}
      />

      <Text style={styles.safetyNote}>100% Safe & Secure</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  referralCodeContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 5,

    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#ddd',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  stickyButtonContainer: {
    position: 'absolute', // Fixed positioning on screen
    top: 0,
    backgroundColor: 'white',
    zIndex: 1000, // Ensures the fixed container is above other content
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mt50: {
    marginTop: 50,
  },
  mt20: {
    marginTop: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  mt10: {
    marginTop: 10,
  },
  headbackbtn: {
    transform: [{translateX: -79}, {translateY: -13}],
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 25,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer', // This won't apply to React Native, so you can ignore this for now
  },
  logo: {
    width: '100%',
    maxWidth: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002366', // Navy Blue
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    paddingLeft: 7,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'left',
  },
  fontstyle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.005,
    textAlign: 'left',
  },
  pb20: {
    paddingBottom: 20,
  },
  red: {
    color: 'red',
  },
  membershipPlan: {
    color: 'white',
    backgroundColor: '#FF9D0A',
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  smallTextLogoOne: {
    width: 70,
    height: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButton: {
    width: '80%',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#ff0000', // Red
    color: '#fff',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    alignItems: 'center', // Center text
    justifyContent: 'center',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
  },
  iconInsideInput: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -50}],
  },
  visibilityIcon: {
    right: 20, // Adjust if needed
    width: 20,
    height: 20,
    cursor: 'pointer', // Ignore this for React Native
  },
  inputField: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 40, // Adjust padding for both icons
    borderWidth: 1,
    borderColor: 'rgba(226, 226, 226, 1)', // Same as outline in web
    backgroundColor: 'transparent',
    borderRadius: 5,
    boxSizing: 'border-box',
  },
  redLink: {
    color: '#000000',
    textDecorationLine: 'none',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bolder: {
    fontWeight: '700',
    fontSize: 14,
  },
  hrLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    marginVertical: 20,
  },
  orText: {
    position: 'relative',
    backgroundColor: '#fff',
    fontWeight: '600',
    fontSize: 12,
    paddingHorizontal: 10,
    zIndex: 1,
    whiteSpace: 'nowrap', // Ignore this for React Native
    marginBottom: 13,
  },
  hr: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ccc',
    margin: 0,
    top: '50%',
    transform: [{translateY: -50}],
    zIndex: 0,
  },
  loginButtonLogin: {
    width: '80%',
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: '#fff',
    color: '#ff0000', // Red
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 5,
    fontSize: 16,
    alignItems: 'center', // Center text
    justifyContent: 'center',
  },

  // Lower priority styles
  verifyAccountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  verifyAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    cursor: 'pointer', // Ignore this for React Native
  },
  verifyTitle: {
    fontSize: 18,
    marginTop: 40,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
  },
  verifyTitleCenter: {
    fontSize: 18,
    marginTop: 40,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    paddingLeft: 10,
  },
  passMustContainChar: {
    marginTop: -13,
    marginLeft: -109,
  },
  verifyInstructions: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgb(0, 0, 0)',
  },
  platformAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: 'red',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emailHighlight: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(30, 41, 59, 1)',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
  },
  iconSize: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: '-50%'}],
    width: 18,
    height: 18,
    marginLeft: 10,
  },
  inputField1: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 40, // Space for icon
    paddingRight: 10, // Optional: Adjust for icon
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  resendText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(71, 85, 105, 1)',
  },
  colourNone: {
    color: 'rgba(148, 163, 184, 1)',
  },
  font500: {
    fontWeight: '500',
  },
  verifyButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 300,
    paddingVertical: 10,
    backgroundColor: 'red',
    color: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButton2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 300,
    paddingVertical: 10,
    backgroundColor: 'red',
    color: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 4,
  },
  howToEarnContainer: {
    padding: 20,
    textAlign: 'center',
  },
  howToEarnTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  earnStep: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // No direct box-shadow in React Native
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  earnIcon: {
    width: 60,
    marginBottom: 10,
  },
  earnStepTitle: {
    fontSize: 16,
    fontWeight: '500',
    margin: -6,
  },
  earnStepDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(30, 41, 59, 1)',
    lineHeight: 23,
    letterSpacing: 1,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'red',
    color: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tclink: {
    color: '#565656',
  },
  topButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  f400: {
    fontWeight: '400',
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: 132,
    minWidth: 85,
    height: 36,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  topButtonIcon: {
    width: 20,
    height: 20,
  },
  topButtonUser: {
    backgroundColor: '#ffb74d',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  topButtonReferEarn: {
    backgroundColor: '#f44336',
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  topButtonDeposit: {
    backgroundColor: '#4caf50',
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  balanceInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#FF9D0A',
    width: 274,
    height: 76,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTitle: {
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  videoPlayerIndex: {
    position: 'relative',
    paddingTop: 300,
    width: '100%',
    height: 0,
  },
  videoPlayerIndexIframe: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    maxWidth: 480,
    height: 290,
  },
  videoPlayer: {
    position: 'relative',
    paddingTop: 300,
    width: '100%',
    height: 0,
  },
  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 0,
    borderRadius: 50,
    color: '#fff',
    fontSize: 24,
    padding: 10,
    cursor: 'pointer', // React Native doesn't use this, so it can be omitted
  },
  progress: {
    height: '100%',
    backgroundColor: 'linear-gradient(to right, #64748B 0%, #334155 100%)', // No gradient in React Native, handle with libraries
  },
  videoDetails: {
    textAlign: 'center',
    color: '#1f2937',
    fontSize: 16,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mr10: {
    marginRight: 10,
  },
  videoTimer: {
    textAlign: 'center',
    color: '#1f2937',
    marginTop: 13,
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 20,
  },
  mb17: {
    marginBottom: 17,
  },
  partnersSection: {
    textAlign: 'center',
  },
  partnerImage: {
    maxWidth: '100%',
    borderRadius: 5,
  },
  paymentIcon: {
    maxWidth: 190,
  },
  errorIcon: {
    maxWidth: 99,
  },
  balanceTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  balanceAmount: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  withdrawSection: {
    marginTop: 20,
    textAlign: 'center',
  },
  withdrawInstruction: {
    fontSize: 16,
    color: '#000',
    style: 'bold',
    marginBottom: 10,
  },
  withdrawAmountBox: {
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  withdrawSlider: {
    width: '100%',
    marginVertical: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    color: '#777',
  },
  upiSection: {
    marginTop: 20,
  },
  upiTitle: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
  },
  upiInput: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 5,
  },
  upiInstruction: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
  },
  safetyNote: {
    textAlign: 'center',
    fontSize: 14,
    color: 'green',
    marginTop: 10,
  },
  profileContainer: {
    width: '100%',
  },
  profileOptions: {
    flexDirection: 'column',
  },
  profileOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileOptionLast: {
    borderBottomWidth: 0,
  },
  buttonDiv: {
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  green: {
    color: 'rgba(0, 170, 99, 1)',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  profilePhone: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  profileOptionsContainer: {
    marginVertical: 20,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 30,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },
  goBackButton: {
    width: '100%',
    maxWidth: 300,
    margin: 20,
    paddingVertical: 15,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -150}], // Center the button
  },

  // Refer Status Styles
  referStatus: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#eaf4ff',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  referCount: {
    color: 'red',
    fontWeight: 'bold',
  },
  referTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  referralImage: {
    width: '100%',
    maxWidth: 150,
    marginTop: 20,
    zIndex: -1,
  },

  // Refer Steps Styles
  referSteps: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: 'rgba(60, 154, 251, 1)',
    borderRadius: 10,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(1, 20, 123, 1)', // Blue text
  },
  divider: {
    width: 2,
    height: 84,
    backgroundColor: 'rgba(60, 154, 251, 0.3)',
  },
  step: {
    textAlign: 'center',
    fontSize: 14,
  },

  // Referral Code Styles
  referralCodeContainer: {
    marginVertical: 20,
  },
  referralCodeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: 'rgba(71, 85, 105, 1)',
  },
  referralCodeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  referralCode: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  copyButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'rgba(71, 85, 105, 1)',
    fontSize: 14,
    fontWeight: '500',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },

  // Social Invite Styles
  socialInviteContainer: {
    marginVertical: 20,
  },
  socialInviteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialIcon: {
    width: 50,
    height: 50,
  },
  socialIconShare: {
    height: 62,
  },
  referAndShare: {
    color: 'red',
    borderWidth: 1,
    borderColor: 'rgba(60, 154, 251, 1)',
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
  },

  // Popup Styles
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    width: '90%',
    maxWidth: 270,
    position: 'relative',
  },
  popupHeader: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 24,
    cursor: 'pointer', // React Native doesn't use this, can be omitted
  },
  popupContent: {
    marginTop: 10,
  },
  errorIcon: {
    fontSize: 50,
    color: 'red',
    marginBottom: 10,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    color: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },

  // Video Styles
  videoSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // React Native doesn't support box-shadow
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  playPauseButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
  },
  videoDetails: {
    marginTop: 10,
    textAlign: 'center',
    paddingRight: 20,
  },
  viewCount: {
    marginTop: 10,
    fontWeight: 'bold',
  },

  // Gradient Background Styles
  gradientBackground: {
    width: '55%',
    height: 3,
    backgroundColor: 'transparent', // React Native doesn’t support linear gradients natively, use libraries for gradients
  },
  gradientBackgroundDeposit: {
    width: '100%',
    height: 3,
    backgroundColor: 'transparent', // Same as above for linear gradient
    marginBottom: 30,
  },

  // Progress Bar Styles
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginVertical: 60,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
    width: 0,
    transition: 'width 0.2s ease', // Not applicable in React Native, use animations for progress
  },
  progressImage: {
    position: 'absolute',
    top: -15,
    left: '100%', // For placing image at the end of the progress bar
  },

  // View Background Styles
  viewBg: {
    backgroundColor: '#3C9AFB',
    borderRadius: 10,
    color: 'white',
    width: 104,
    height: 76,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  // Miscellaneous Flexbox Helpers
  flexRow: {
    flexDirection: 'row',
  },
  flexColCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontWeight: '800',
  },
  ml7: {
    marginLeft: 7,
  },
  mr2: {
    marginRight: 2,
  },
  mt10: {
    marginTop: 10,
  },
  displayFix: {
    justifyContent: 'flex-start',
  },
  popupContent: {
    marginTop: 20,
  },
  popupImage: {
    width: 100,
    height: 'auto',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 24,
    color: '#333',
    margin: 0,
  },
  popupMessage: {
    fontSize: 18,
    color: '#4CAF50',
    margin: 0,
  },
  popupMessagePop: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000000',
    margin: 0,
  },
  retryButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 4,
    marginRight: 40,
  },
  progress: {
    height: '100%',
    backgroundColor: '#f44336',
    transition: 'width 0.2s ease-in-out',
  },

  // Account Info
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsIcon: {
    width: 30,
    height: 30,
  },
  balanceAmount: {
    fontSize: 31,
    color: '#333',
    marginRight: 10,
    width: 103,
    height: 54,
    textAlign: 'left',
    marginLeft: 5,
  },
  withdrawButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 107,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
  },

  // Play Button
  playButton: {
    position: 'absolute',
    top: '86%',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: 5,
    cursor: 'pointer',
    opacity: 1,
  },
  playButtonHover: {
    opacity: 1,
    backgroundColor: 'transparent',
  },

  // Partners Section
  partnersSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
    textAlign: 'center',
  },
  partnersSlider: {
    maxWidth: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  partnerImage: {
    width: '100%',
    height: 'auto',
    maxHeight: 200,
    objectFit: 'cover',
  },

  // Popup Container
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    textAlign: 'center',
  },

  // Membership Plans
  membershipPlans: {
    margin: 0,
    padding: 10,
    fontSize: 14,
  },
  plansTitle: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  plan: {
    marginBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  planText: {
    margin: 2,
    fontSize: 12,
  },

  // Google Login
  googleLoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },
  googleLoginButton: {
    backgroundColor: '#4285f4',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    cursor: 'pointer',
  },
  googleLoginButtonHover: {
    backgroundColor: '#357ae8',
  },

  // Error & Loading States
  textSkeletonLoader: {
    width: 100,
    height: 16,
    backgroundColor: '#FF9D0A',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
    borderRadius: 4,
  },

  // Payment Success & Failure
  paymentSuccessContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  successIcon: {
    marginBottom: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0f7ea',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 48,
    color: '#4caf50',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
  },

  // Input Validation
  inputInvalid: {
    borderColor: 'red',
  },

  // Miscellaneous
  spaced: {
    padding: 20,
    margin: 0,
    maxWidth: 800,
  },
  spaciousPopup: {
    width: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  yourMistakeContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  yourMistakeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  yourMistakeDescription: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 30,
  },

  // Conclusion and Buttons
  keepWatchingButton: {
    display: 'inline-block',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  keepWatchingButtonHover: {
    backgroundColor: '#0056b3',
  },
});

export default WithdrawAmount;
