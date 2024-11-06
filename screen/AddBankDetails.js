import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  fetchIFSCDetails,
  submitBankDetails,
  getBankDetails,
  fetchUserDetail,
} from './api';
import {useGlobalContext} from './GlobalProvider';
//import ToastMsg from './common/ToastMsg'; // Ensure this works in React Native

const AddBankDetails = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [ifscValid, setIfscValid] = useState(true);
  const navigation = useNavigation();

  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const maxAccountNumberLength = 16;
  const maxIfscLength = 11;

  const {saveData} = useGlobalContext();

  useEffect(() => {
    const handleFetchUserDetail = async () => {
      try {
        const data = await fetchUserDetail();
        console.log(data, 'user API  44 response');
        saveData(data.data); // Save data globally
      } catch (error) {
        console.error('Error fetching user  44 details:', error);
        // ToastMsg.error('Error fetching user details. Please try again.');
      }
    };

    handleFetchUserDetail();
  }, [saveData]);

  const fetchBankDetails = async () => {
    try {
      const token = AsyncStorage.getItem('access_token');
      console.log('bank details token ::', token);
      if (!token) {
        //  ToastMsg.error('Token not found. Please log in again.');
        return;
      }

      const response = await getBankDetails(token);
      const bankDetails = response?.data;

      if (bankDetails) {
        setAccountNumber(bankDetails?.data?.acc_no || '');
        setIfscCode(bankDetails?.data?.ifsc || '');
        setHolderName(bankDetails?.data?.holder_name || '');
      }

      // ToastMsg.success('Bank details fetched successfully!');
    } catch (error) {
      console.error('Error fetching bank details:', error);
      // ToastMsg.error('Failed to fetch bank details. Please try again.');
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const handleIFSCChange = async value => {
    const upperValue = value.toUpperCase();
    setIfscCode(upperValue);

    if (ifscRegex.test(upperValue)) {
      setIfscValid(true);

      try {
        const ifscDetails = await fetchIFSCDetails(upperValue);
        setBankName(ifscDetails?.BANK || '');
        setBranchName(ifscDetails?.BRANCH || '');
      } catch (error) {
        console.error('Error fetching IFSC details:', error);
        //ToastMsg.error('Invalid IFSC code or bank details not found.');
        setBankName('');
        setBranchName('');
      }
    } else {
      setIfscValid(false);
      setBankName('');
      setBranchName('');
    }
  };

  const handleSubmit = async () => {
    if (!ifscValid) {
      // ToastMsg.error('Invalid IFSC code.');
      return;
    }

    if (!accountNumber || !holderName || !ifscCode) {
      // ToastMsg.error('Please fill out all fields.');
      return;
    }

    const bankData = {
      account_number: accountNumber,
      ifsc_code: ifscCode,
      bank_name: bankName,
      account_holder_name: holderName,
    };

    try {
      const token = AsyncStorage.getItem('access_token');
      console.log('token add bank', token);
      const response = await submitBankDetails(
        bankData.account_number,
        bankData.ifsc_code,
        bankData.account_holder_name,
        token,
      );

      if (response.status === 200) {
        console.log('Bank details added successfully!');
        //  ToastMsg.success('Bank details added successfully!');
        navigation.navigate('BankDetailsConfirmation'); // Adjust your //navigation route
      } else {
        // ToastMsg.error(
        //   response?.message || 'Failed to add bank details. Please try again.',
        // );
      }
    } catch (error) {
      console.error('Error submitting bank details:', error);
      //   ToastMsg.error(
      //     'An error occurred while submitting bank details. Please try again.',
      //   );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Bank Details</Text>
      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Account Number"
          value={accountNumber}
          maxLength={maxAccountNumberLength}
          onChangeText={text => setAccountNumber(text.replace(/\D/g, ''))}
          required
        />
        <TextInput
          style={[styles.input, !ifscValid && styles.inputInvalid]}
          placeholder="Enter IFSC Code"
          value={ifscCode}
          maxLength={maxIfscLength}
          onChangeText={handleIFSCChange}
          required
        />
        {!ifscValid && (
          <Text style={styles.errorMessage}>Invalid IFSC code format</Text>
        )}

        {bankName && branchName && (
          <View style={styles.bankDetails}>
            <Text>Bank Name: {bankName}</Text>
            <Text>Branch: {branchName}</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter Account Holder Name"
          value={holderName}
          onChangeText={text => setHolderName(text.toUpperCase())}
          required
        />
        <Button title="Submit" onPress={handleSubmit} color="red" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    paddingBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  bankDetails: {
    marginBottom: 20,
  },
});

export default AddBankDetails;
