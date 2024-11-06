import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

//import ToastMsg from '../common/ToastMsg';
import profileImage from '../assets/images/userimg.png';
import editProfileIcon from '../assets/images/edit.png';
import policiesIcon from '../assets/images/policies.png';
import referIcon from '../assets/images/referr.png';
import withdrawIcon from '../assets/images/withdraw.png';
import helpIcon from '../assets/images/help.png';
import logoutIcon from '../assets/images/logout.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUserDetail} from './api';

const Profile = () => {
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('example@gmail.com');
  const [phone, setPhone] = useState('1234567890');
  const [referral, setReferral] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [points, setPoints] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    handleFetchUserDetail();
  }, []);

  const handleFetchUserDetail = async () => {
    try {
      const data = await fetchUserDetail();
      console.log(data, 'user API response');

      setName(data?.data?.first_name);
      setEmail(data?.data?.email);
      setPhone(data?.data?.phone_number);
      setPoints(data?.data?.points);
      setReferral(data?.data?.referral_id);
      setReferralCount(data?.data?.referral_count ?? 0);
    } catch (error) {
      console.error('Error fetching user details:', error);
      // ToastMsg.error('Error fetching user details. Please try again.');
    }
  };

  const handleLogout = () => {
    // Clear local storage and navigate to home
    AsyncStorage.clear(); // Adapt this as needed for React Native
    navigation.navigate('Landing'); // Update to your main screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileEmail}>{email}</Text>
      <Text style={styles.profilePhone}>+91 {phone}</Text>
      <Text style={styles.profileInfo}>Your referral ID is: {referral}</Text>
      <Text style={styles.profileInfo}>
        Your referral count is: {referralCount}
      </Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.option}>
          <Image source={editProfileIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddBankDetails')}
          style={styles.option}>
          <Image source={editProfileIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Add Bank Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Policies')}
          style={styles.option}>
          <Image source={policiesIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Policies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ReferAndEarn', {
              referralId: referral,
              referralCount,
            })
          }
          style={styles.option}>
          <Image source={referIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Refer And Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WithdrawAmount', {balance: points})
          }
          style={styles.option}>
          <Image source={withdrawIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Withdraw Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('HelpCenterScreen')}
          style={styles.option}>
          <Image source={helpIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.option}>
          <Image source={logoutIcon} style={styles.optionIcon} />
          <Text style={styles.optionText}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Button
          style={{backgroundColor: '#ff0000'}}
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
  profilePhone: {
    fontSize: 16,
    marginVertical: 5,
  },
  profileInfo: {
    fontSize: 16,
    marginVertical: 2,
  },
  optionsContainer: {
    width: '100%',
    marginVertical: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#ff0000',
  },
});

export default Profile;
