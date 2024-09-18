import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import profileImage from '../assets/images/userimg.png'; // You need to add assets to your React Native project
import editProfileIcon from '../assets/images/edit.png'; 
import referIcon from '../assets/images/referr.png'; 
import withdrawIcon from '../assets/images/withdraw.png'; 
import helpIcon from '../assets/images/help.png'; 
import logoutIcon from '../assets/images/logout.png'; 
import { fetchUserdetail } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [name, setName] = useState('User');
    const [email, setEmail] = useState('abdf@gmail.com');
    const [phone, setPhone] = useState('1234567890');
    const [referral, setReferral] = useState(null);
    const [referralCount, setReferralCount] = useState(0);

    const navigation = useNavigation();

    useEffect(() => {
        handleFetchUserDetail();
    }, []);

    const handleFetchUserDetail = async () => {
        try {
            const data = await fetchUserdetail();
            console.log(data, "user API response");
            setName(data?.data?.first_name + " " + data?.data?.last_name);
            setEmail(data?.data?.email);
            setPhone(data?.data?.phone_number);
            setReferral(data?.data?.referral_id);
            setReferralCount(data?.data?.referral_count || 0);
        } catch (error) {
            console.error('Error fetching partner data:', error);
        }
    };

    const handleReferAndEarn = () => {
        if (referral) {
            navigation.navigate('ReferReferandEarnAndEarn', { referralId: referral, referralCount });
        } else {
            navigation.navigate('ReferAndEarn');
        }
    };

    const handleLogout = () => {
        // Clear local storage (AsyncStorage in React Native)
        AsyncStorage.clear();
        navigation.navigate('Login');
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Image source={profileImage} style={styles.profileImage} />
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
            <Text style={styles.profilePhone}>+91 {phone}</Text>
            <Text style={styles.profilePhone}>Your refer ID is: {referral}</Text>
            <Text style={styles.profilePhone}>Your refer count is: {referralCount}</Text>

            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EditProfile')}>
                    <Image source={editProfileIcon} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={handleReferAndEarn}>
                    <Image source={referIcon} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Refer And Earn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Image source={withdrawIcon} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Withdraw Earnings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <Image source={helpIcon} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Help Center</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={handleLogout}>
                    <Image source={logoutIcon} style={styles.optionIcon} />
                    <Text style={styles.optionText}>Log out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonDiv}>
                <Button title="Go Back" onPress={goBack} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    profilePhone: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    optionsContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        width: '80%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
    },
    optionIcon: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
    optionText: {
        fontSize: 16,
    },
    buttonDiv: {
        marginTop: 20,
    },
});

export default Profile;
