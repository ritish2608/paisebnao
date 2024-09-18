import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Share, StyleSheet, Clipboard, Alert, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import referralImage from '../assets/images/referandearn.png'; 
import whatsappIcon from '../assets/images/what.png';
import instagramIcon from '../assets/images/insta.png';
import telegramIcon from '../assets/images/tele.png';
import shareIcon from '../assets/images/share.png';
import copyimg from '../assets/images/copy.png';

const ReferAndEarn = () => {
    const route = useRoute();
    const [referralId, setReferralId] = useState('');
    const [referralCount, setReferralCount] = useState(0);
    const [copySuccess, setCopySuccess] = useState('');
    const [AmountWid, setAmountWid] = useState(0);

    const copyToClipboard = async () => {
    try {
      await Clipboard.setString(referralId || 'AbCdEfGhIjK');
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }

    // Clear the success message after a few seconds
    setTimeout(() => {
      setCopySuccess('');
    }, 2000);
  };

    const openNativeShare = async () => {
        try {
            await Share.share({
                message: "I'm sharing this app, enroll and get 200 rupees instantly. Check out this link: http://paisebnao.com/",
            });
        } catch (error) {
            Alert.alert('Error', 'There was an issue sharing the content.');
        }
    };

    const shareOnSocialMedia = (platform) => {
        let url = '';
        const message = "I'm sharing this app, enroll and get 200 rupees instantly.";

        switch(platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(message)}`;
                break;
            case 'telegram':
                url = `https://t.me/share/url?url=${encodeURIComponent('https://example.com')}&text=${encodeURIComponent(message)}`;
                break;
            case 'instagram':
                url = 'https://www.instagram.com/yourprofile/';
                break;
            default:
                Alert.alert('Unsupported platform');
                return;
        }
        // Use Linking API to open URL
        Linking.openURL(url);
    };

    useEffect(() => {
        if (route.params) {
            setAmountWid(route.params['points-earned'] || 0);
            setReferralId(route.params['referralId'] || 'AbCdEfGhIjK');
            setReferralCount(route.params['referralCount'] || 0);
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>PaiseBnao</Text>
            </View>
            <View style={styles.referStatus}>
                {referralCount <= 2 ? (
                    <Text>To withdraw {AmountWid}, you need to refer 3 friends <Text style={styles.referCount}>{referralCount}/3</Text></Text>
                ) : (
                    <Text>Congratulations! Your refer count is {referralCount}, eligible for {AmountWid} withdrawal.</Text>
                )}
            </View>
            <Text style={styles.referTitle}>Refer & Earn</Text>
            <Image source={referralImage} style={styles.referralImage} />
            <View style={styles.referSteps}>
                <View style={styles.step}>
                    <Text style={styles.stepNumber}>01</Text>
                    <Text>Refer your friends.</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.step}>
                    <Text style={styles.stepNumber}>02</Text>
                    <Text>Let them log in with your referral code.</Text>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.step}>
                    <Text style={styles.stepNumber}>03</Text>
                    <Text>Get {AmountWid} instantly.</Text>
                </View>
            </View>
            <View style={styles.referralCodeContainer}>
                <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
                <View style={styles.referralCodeBox}>
                    <Text style={styles.referralCode}>{referralId || 'AbCdEfGhIjK'}</Text>
                    <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                        {copySuccess ? <Text style={styles.copySuccess}>{copySuccess}</Text> : <Text>Tap to copy</Text>}
                        <Image style={styles.copyImage} source={copyimg} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.socialInviteContainer}>
                <Text style={styles.referralCodeLabel}>Invite by Social Media</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => shareOnSocialMedia('whatsapp')}>
                        <Image source={whatsappIcon} style={styles.socialIcon} />
                        <Text style={styles.iconText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => shareOnSocialMedia('instagram')}>
                        <Image source={instagramIcon} style={styles.socialIcon} />
                        <Text style={styles.iconText}>Instagram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => shareOnSocialMedia('telegram')}>
                        <Image source={telegramIcon} style={styles.socialIcon} />
                        <Text style={styles.iconText}>Telegram</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={openNativeShare}>
                        <Image source={shareIcon} style={styles.socialIcon} />
                        <Text style={styles.iconText}>Share</Text>
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
    },
    headerContainer: {
        marginBottom: 20,
    },
    referStatus: {
        marginBottom: 20,
    },
    referTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    referralImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    referSteps: {
        marginVertical: 20,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stepNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    referralCodeContainer: {
        marginBottom: 20,
    },
    referralCodeLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    referralCodeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    referralCode: {
        fontSize: 16,
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    copySuccess: {
        color: 'green',
        marginRight: 5,
    },
    copyImage: {
        width: 20,
        height: 20,
    },
    socialInviteContainer: {
        marginBottom: 20,
    },
    socialIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconContainer: {
        alignItems: 'center',
    },
    socialIcon: {
        width: 50,
        height: 50,
    },
    iconText: {
        marginTop: 5,
        color: '#777',
    },
});

export default ReferAndEarn;
