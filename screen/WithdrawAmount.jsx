// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import Slider from '@react-native-community/slider';

// const WithdrawAmount = () => {
//     const route = useRoute();
//     const initialBalance = Number(route.params?.balance) || 0;

//     const [amount, setAmount] = useState(initialBalance);
//     const [balance, setBalance] = useState(initialBalance);
//     const [upiId, setUpiId] = useState('');
//     const [isValid, setIsValid] = useState(true);

//     const formatCurrency = (amount) => {
//         return `₹${amount.toLocaleString()}`;
//     };

//     const validateUpiId = (id) => {
//         const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
//         return upiPattern.test(id);
//     };

//     const handleUPInputChange = (value) => {
//         setUpiId(value);
//         setIsValid(validateUpiId(value));
//     };

//     const handleSubmit = () => {
//         if (isValid) {
//             Alert.alert('Success', 'UPI ID is valid!');
//         } else {
//             Alert.alert('Error', 'Please enter a valid UPI ID.');
//         }
//     };

//     useEffect(() => {
//         setBalance(initialBalance);
//     }, [initialBalance]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Available Balance</Text>
//             <Text style={styles.balance}>{formatCurrency(balance)}</Text>
//             <View style={styles.withdrawSection}>
//                 <Text style={styles.instruction}>Select amount you want to withdraw</Text>
//                 <Text style={styles.amountBox}>{formatCurrency(amount)}</Text>
//                 <Slider
//                     minimumValue={0}
//                     maximumValue={balance}
//                     value={amount}
//                     onValueChange={setAmount}
//                     style={styles.slider}
//                 />
//                 <View style={styles.sliderLabels}>
//                     <Text>₹0</Text>
//                     <Text>{formatCurrency(balance)}</Text>
//                 </View>
//             </View>
//             <View style={styles.upiSection}>
//                 <Text style={styles.upiTitle}>Enter your UPI ID</Text>
//                 <TextInput
//                     style={[styles.upiInput, !isValid && styles.invalid]}
//                     placeholder="Your UPI ID"
//                     value={upiId}
//                     maxLength={50}
//                     onChangeText={handleUPInputChange}
//                 />
//                 {!isValid && <Text style={styles.errorMessage}>Invalid UPI ID format.</Text>}
//                 <Text style={styles.instruction}>Enter Your UPI ID to Receive Amount</Text>
//             </View>
//             <Button title="Withdraw Amount" onPress={handleSubmit} />
//             <Text style={styles.safetyNote}>100% Safe & Secure</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginVertical: 10,
//     },
//     balance: {
//         color: 'green',
//         fontSize: 20,
//         marginVertical: 10,
//     },
//     withdrawSection: {
//         marginVertical: 20,
//         width: '100%',
//     },
//     instruction: {
//         fontSize: 16,
//     },
//     amountBox: {
//         fontSize: 20,
//         textAlign: 'center',
//         marginVertical: 10,
//     },
//     slider: {
//         width: '100%',
//         height: 40,
//     },
//     sliderLabels: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     upiSection: {
//         marginVertical: 20,
//         width: '100%',
//     },
//     upiTitle: {
//         fontSize: 18,
//         marginBottom: 10,
//     },
//     upiInput: {
//         borderColor: 'gray',
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 5,
//         marginBottom: 5,
//     },
//     invalid: {
//         borderColor: 'red',
//     },
//     errorMessage: {
//         color: 'red',
//     },
//     safetyNote: {
//         marginTop: 20,
//         textAlign: 'center',
//     },
// });

// export default WithdrawAmount;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchUserdetail, withdrawalrequest} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';

//import Header from '../common/Header'; // Adjust the import path as needed
//import ToastMsg from '../common/ToastMsg';

const WithdrawAmount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialBalance = route.params?.balance || 0;
  const [withdrawalPopupVisible, setWithdrawalPopupVisible] = useState(false);
  const [amount, setAmount] = useState(initialBalance);
  const [balance, setBalance] = useState(initialBalance);
  const [upiId, setUpiId] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [platformFeePaid, setPlatformFeePaid] = useState(false);
  const [noMistake, setNoMistake] = useState(true);
  const [pointsEarned, setPointsEarned] = useState(0);

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    handleFetchUserDetail();
  }, []);

  const handleFetchUserDetail = async () => {
    try {
      const data = await fetchUserdetail();
      console.log('data handleFetchUserDetail', data);
      setPointsEarned(data?.data?.points);
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

  const handleUPIInputChange = value => {
    setUpiId(value);
    setIsValid(validateUpiId(value));
  };

  const handleWithdrawalRequest = async (upi_id, amount) => {
    const token = AsyncStorage.getItem('access_token');
    console.log('TOKEN IN WITHDRAW :: ', token);
    const withdrawalData = {
      upi_id: upi_id,
      amount: amount,
      token,
    };

    try {
      const response = await withdrawalrequest(
        withdrawalData.upi_id,
        withdrawalData.amount,
        withdrawalData.token,
      );

      if (response) {
        console.log('handel handleWithdrawalRequest response ::::', response);
        //   ToastMsg.success('Withdrawal request submitted successfully!');
        setTimeout(() => {
          navigation.navigate('Dashboard', {keyfrom: 'withdrawal'});
        }, 3000);
      } else {
      }
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      //   ToastMsg.error(
      //     'An error occurred while processing your request. Please try again.',
      //   );
    }
  };

  //////////////

  const handleSubmit = e => {
    console.log('pointsEarned :::', pointsEarned);
    // if (pointsEarned < 5000) {
    // setWithdrawalPopupVisible(true);
    // } else {
    setIsValid(true);

    const refrcount = parseInt(AsyncStorage.getItem('refercount'), 10);
    console.log('handel refrcount ::::', refrcount);
    console.log('handel platformFeePaid ::::', platformFeePaid);
    console.log('handel noMistake ::::', noMistake);
    if (!platformFeePaid) {
      navigation.navigate('PlatformFees', {amount});
    } else if (refrcount < 3) {
      navigation.navigate('ReferAndEarn', {keyfrom: 'withdrawal'});
    } else if (noMistake) {
      navigation.navigate('YourMistake');
    } else {
      console.log('handel handleWithdrawalRequest ::::', initialBalance);
      handleWithdrawalRequest(upiId, initialBalance);
    }
    // navigation.navigate('WithdrawAmount');
    // navigate(
    //   `/amount-withdraw?balance=${pointsEarned}&&refercount=${referralCount}`,
    // );
    //  }
    // e.preventDefault();
    // console.log('handel submit ::::', upiId.trim());
    // if (upiId.trim() === '' || !validateUpiId(upiId)) {
    //   setIsValid(false);
    //   return;
    // }

    // setIsValid(true);

    // const refrcount = parseInt(AsyncStorage.getItem('refercount'), 10);
    // console.log('handel refrcount ::::', refrcount);
    // console.log('handel platformFeePaid ::::', platformFeePaid);
    // console.log('handel noMistake ::::', noMistake);
    // if (!platformFeePaid) {
    //   navigation.navigate('PlatformFees', {amount});
    // } else if (refrcount < 3) {
    //   navigation.navigate('ReferAndEarn', {keyfrom: 'withdrawal'});
    // } else if (noMistake) {
    //   navigation.navigate('YourMistake');
    // } else {
    //   console.log('handel handleWithdrawalRequest ::::', initialBalance);
    //   handleWithdrawalRequest(upiId, initialBalance);
    // }
  };

  useEffect(() => {
    setBalance(initialBalance);
  }, [initialBalance]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.balanceTitle}>Available Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
        <View style={styles.withdrawSection}>
          <Text style={styles.withdrawInstruction}>
            Select amount you want to withdraw
          </Text>

          <Modal
            visible={withdrawalPopupVisible}
            transparent={true}
            animationType="fade">
            <View style={styles.popupOverlay}>
              <View style={styles.popupContainer}>
                <View style={styles.popupHeader}>
                  <TouchableOpacity
                    onPress={() => setWithdrawalPopupVisible(false)}>
                    <Text style={styles.closeButton}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.popupContent}>
                  <Text style={styles.popupTitle}>
                    Minimum Withdrawal Amount
                  </Text>
                  <Text>You need to have at least ₹5000 to withdraw.</Text>
                </View>
              </View>
            </View>
          </Modal>

          <Text style={styles.containerbox}>{formatCurrency(amount)}</Text>
          {/* <Slider
            minimumValue={0}
            maximumValue={balance}
            value={amount}
            onValueChange={setAmount}
            style={styles.slider}
          /> */}

          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={balance}
            value={amount}
            onValueChange={setAmount}
            thumbTintColor="#3498db" // Custom thumb color
            minimumTrackTintColor="#3498db" // Custom track color
            maximumTrackTintColor="#d3d3d3" // Custom inactive track color
            step={1} // Ensure only whole values are selected
          />

          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>₹0</Text>
            <Text style={styles.sliderLabel}>{formatCurrency(balance)}</Text>
          </View>

          {/* <View style={styles.sliderLabels}>
            <Text>₹0</Text>
            <Text>{formatCurrency(balance)}</Text>
          </View> */}
        </View>
        <View style={styles.upiSection}>
          <Text style={styles.upiTitle}>Enter your UPI ID</Text>
          <TextInput
            placeholder="Your UPI ID"
            style={[styles.upiInput, !isValid && styles.invalidInput]}
            value={upiId}
            maxLength={50}
            onChangeText={handleUPIInputChange}
          />
          {!isValid && (
            <Text style={styles.errorMessage}>Invalid UPI ID format.</Text>
          )}
          <Text style={styles.upiInstruction}>
            Enter Your UPI ID to Receive Amount
          </Text>
          <Text style={styles.safetyNote}>100% Safe & Secure</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Withdraw Amount</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  withdrawSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  containerbox: {
    borderWidth: 1,
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  popupContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxWidth: 270, // `max-width` in React Native
    position: 'relative',
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  popupOverlay: {
    position: 'absolute', // Similar to position: fixed in CSS
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    zIndex: 1000, // Ensures it's on top of other content
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  // container: {
  //   flex: 1,
  //   padding: 16,
  //   justifyContent: 'center',
  // },
  balanceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: 'black',
  },
  balanceAmount: {
    color: 'green',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },

  withdrawInstruction: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  withdrawAmountBox: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    marginTop: 20,
    fontWeight: 'bold',
    height: 10, // Makes the slider thinner by reducing height
    marginBottom: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    marginStart: 20,
    fontSize: 16,
    color: '#555',
  },
  upiSection: {
    marginBottom: 24,
    marginStart: 20,
    marginEnd: 20,
  },
  upiTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: 'black',
  },
  upiInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  upiInstruction: {
    textAlign: 'left',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safetyNote: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: 'green',
  },
});

export default WithdrawAmount;
