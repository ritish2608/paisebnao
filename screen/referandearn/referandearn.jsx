// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Share,
//   StyleSheet,
//   Clipboard,
//   Alert,
//   Linking,
//   Button,
// } from 'react-native';

// import {useNavigation, useRoute} from '@react-navigation/native';
// import referralImage from '../../assets/images/referandearn.png';
// import whatsappIcon from '../../assets/images/what.png';
// import instagramIcon from '../../assets/images/insta.png';
// import telegramIcon from '../../assets/images/tele.png';
// import shareIcon from '../../assets/images/share.png';
// import copyimg from '../../assets/images/copy.png';
// import {fetchUserDetail} from '../api';
// //import {fetchUserdetail, handleFetchUserDetail} from '../api';

// const ReferAndEarn = props => {
//   const route = useRoute();
//   const [referralId, setReferralId] = useState('');
//   const [referralCount, setReferralCount] = useState(0);
//   const [copySuccess, setCopySuccess] = useState('');
//   const [AmountWid, setAmountWid] = useState(0);

//   const copyToClipboard = async () => {
//     try {
//       await Clipboard.setString(referralId);
//       setCopySuccess('Copied!');
//     } catch (err) {
//       setCopySuccess('Failed to copy!');
//     }

//     // Clear the success message after a few seconds
//     setTimeout(() => {
//       setCopySuccess('');
//     }, 2000);
//   };
//   useEffect(() => {
//     handlefetchUserdetail();
//   }, []);

//   const handleSubmit = async () => {
//     // ToastMsg.error('Invalid IFSC code.');
//   };

//   const handlefetchUserdetail = async () => {
//     try {
//       const data = await fetchUserDetail();
//       console.log(data, 'user API response refer n earn ');
//       setAmountWid(data?.data?.points);
//       setReferralId(data?.data?.referral_id);
//       setReferralCount(data?.data?.referral_count ?? 0);
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };
//   const openNativeShare = async () => {
//     try {
//       await Share.share({
//         message:
//           "I'm sharing this app, enroll and get 200 rupees instantly. Check out this link: http://paisebnao.com/",
//       });
//     } catch (error) {
//       Alert.alert('Error', 'There was an issue sharing the content.');
//     }
//   };

//   const shareOnSocialMedia = platform => {
//     let url = '';
//     const message =
//       "I'm sharing this app, enroll and get 200 rupees instantly.";

//     switch (platform) {
//       case 'whatsapp':
//         url = `https://wa.me/?text=${encodeURIComponent(message)}`;
//         break;
//       case 'telegram':
//         url = `https://t.me/share/url?url=${encodeURIComponent(
//           'https://example.com',
//         )}&text=${encodeURIComponent(message)}`;
//         break;
//       case 'instagram':
//         url = 'https://www.instagram.com/yourprofile/';
//         break;
//       default:
//         Alert.alert('Unsupported platform');
//         return;
//     }
//     // Use Linking API to open URL
//     Linking.openURL(url);
//   };

//   useEffect(() => {
//     if (route.params) {
//       setAmountWid(route.params['points-earned'] || 0);
//       console.log('ref id :: ', route.params.referralId);
//       setReferralId(route.params.referralId || 'AbCdEfGhIjK');
//       setReferralCount(route.params.referralCount || 0);
//     }
//   }, [route.params]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.referStatus}>
//         {referralCount <= 2 ? (
//           <Text>
//             To withdraw {AmountWid}, you need to refer 3 friends{' '}
//             <Text style={styles.referCount}>{referralCount}/3</Text>
//           </Text>
//         ) : (
//           <Text>
//             Congratulations! Your refer count is {referralCount}, eligible for{' '}
//             {AmountWid} withdrawal.
//           </Text>
//         )}
//       </View>
//       <Text style={styles.referTitle}>Refer & Earn</Text>
//       <Image source={referralImage} style={styles.referralImage} />
//       <View style={styles.referSteps}>
//         <View style={styles.step}>
//           <Text style={styles.stepNumber}>01</Text>
//           <Text>Refer your friends.</Text>
//         </View>
//         <View style={styles.divider}></View>
//         <View style={styles.step}>
//           <Text style={styles.stepNumber}>02</Text>
//           <Text>Let them log in with your referral code.</Text>
//         </View>
//         <View style={styles.divider}></View>
//         <View style={styles.step}>
//           <Text style={styles.stepNumber}>03</Text>
//           <Text>Get {AmountWid} instantly.</Text>
//         </View>
//       </View>
//       <View style={styles.referralCodeContainer}>
//         <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
//         <View style={styles.referralCodeBox}>
//           <Text style={styles.referralCode}>{referralId}</Text>
//           <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
//             {copySuccess ? (
//               <Text style={styles.copySuccess}>{copySuccess}</Text>
//             ) : (
//               <Text>Tap to copy</Text>
//             )}
//             <Image style={styles.copyImage} source={copyimg} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.socialInviteContainer}>
//         <Text style={styles.referralCodeLabel}>Invite by Social Media</Text>
//         {/* <View style={styles.socialIcons}>
//           <TouchableOpacity
//             style={styles.iconContainer}
//             onPress={() => shareOnSocialMedia('whatsapp')}>
//             <Image source={whatsappIcon} style={styles.socialIcon} />
//             <Text style={styles.iconText}>WhatsApp</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.iconContainer}
//             onPress={() => shareOnSocialMedia('instagram')}>
//             <Image source={instagramIcon} style={styles.socialIcon} />
//             <Text style={styles.iconText}>Instagram</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.iconContainer}
//             onPress={() => shareOnSocialMedia('telegram')}>
//             <Image source={telegramIcon} style={styles.socialIcon} />
//             <Text style={styles.iconText}>Telegram</Text>
//           </TouchableOpacity> */}
//         <TouchableOpacity
//           style={styles.iconContainer}
//           onPress={openNativeShare}>
//           <Image source={shareIcon} style={styles.socialIcon} />
//           <Text style={styles.iconText}>Share</Text>
//         </TouchableOpacity>
//         <Button title="Refer Now " onPress={openNativeShare} color="red" />

//         {/* </View> */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   headerContainer: {
//     marginBottom: 20,
//   },
//   referStatus: {
//     marginBottom: 20,
//   },
//   referTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   referralImage: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'contain',
//   },
//   referSteps: {
//     marginVertical: 20,
//   },
//   step: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   stepNumber: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#ccc',
//     marginVertical: 10,
//   },
//   referralCodeContainer: {
//     marginBottom: 20,
//   },
//   referralCodeLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   referralCodeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
//   referralCode: {
//     fontSize: 16,
//     Color: '#000',
//   },
//   copyButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   copySuccess: {
//     color: 'green',
//     marginRight: 5,
//   },
//   copyImage: {
//     width: 20,
//     height: 20,
//   },
//   socialInviteContainer: {
//     marginBottom: 20,
//   },
//   socialIcons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   iconContainer: {
//     alignItems: 'center',
//   },
//   socialIcon: {
//     width: 50,
//     height: 50,
//   },
//   iconText: {
//     marginTop: 5,
//     color: '#777',
//   },
// });

// export default ReferAndEarn;
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';
import {fetchUserdetail} from './api'; //
import referralImage from '../../assets/images/referandearn.png';
import shareIcon from '../../assets/images/share.png';
import copyimg from '../../assets/images/copy.png';
import {Share} from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReferAndEarn = ({route}) => {
  const navigation = useNavigation();
  const [referralId, setReferralId] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');
  const [AmountWid, setAmountWid] = useState(0);
  const [keyFrom, setKeyFrom] = useState('');

  // const referral_count = AsyncStorage.getItem('referral_count');
  // if (referral_count != null) {
  //   setReferralId(referral_count);
  // }

  useEffect(() => {
    if (route.params) {
      setAmountWid(route.params['points-earned'] || 0);
      console.log('ref id :: ', route.params.referralId);
      setReferralId(route.params.referralId || 'AbCdEfGhIjK');
      setReferralCount(route.params.referralCount || 0);
    }
  }, [route.params]);
  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(referralId || 'AbCdEfGhIjK');
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }

    setTimeout(() => {
      setCopySuccess('');
    }, 2000);
  };

  useEffect(() => {
    handlefetchUserdetail();
  }, []);

  const handlefetchUserdetail = async () => {
    try {
      const data = await fetchUserdetail();
      console.log(data, 'user API response');
      setAmountWid(data?.data?.points);
      setReferralId(data?.data?.referral_id);
      setReferralCount(data?.data?.referral_count ?? 0);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const openNativeShare = referralId => {
    const message = `I'm sharing this app with you! Enroll now and instantly get referral Coins. Use my referral ID: ${referralId}.`;
    const shareOptions = {
      title: 'Check out this app, Payme!',
      message,
      url: 'https://paisebnao.com/',
    };

    Share.open(shareOptions)
      .then(() => console.log('Thanks for sharing!'))
      .catch(error => console.error('Error sharing:', error));
  };

  useEffect(() => {
    if (route.params && route.params.keyfrom) {
      setKeyFrom(route.params.keyfrom);
    }
  }, [route]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {keyFrom === 'withdrawal' && (
          <View style={styles.referStatus}>
            {referralCount <= 2 ? (
              <>
                To withdraw ₹{AmountWid}, you need to refer 3 friends.
                <Text style={styles.referCount}>{referralCount ?? 0}/3</Text>
              </>
            ) : (
              <>
                Congratulations! Your refer count is {referralCount}, eligible
                for ₹{AmountWid} withdrawal.
              </>
            )}
          </View>
        )}

        <Text style={styles.title}>Refer & Earn</Text>
        <View style={styles.referandshare}>
          <Text style={styles.referandshareText}>
            Refer your Friend & Family and earn ₹500 Each
          </Text>
        </View>

        <Image source={referralImage} style={styles.referralImage} />

        <View style={styles.referSteps}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>01</Text>
            <Text>Refer your friends.</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.step}>
            <Text style={styles.stepNumber}>02</Text>
            <Text>Let them log in with your referral code.</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.step}>
            <Text style={styles.stepNumber}>03</Text>
            <Text>Get ₹500 instantly.</Text>
          </View>
        </View>

        {/* <View style={styles.referralCodeContainer}>
        <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
        <View style={styles.referralCodeBox}>
          <Text style={styles.referralCode}>{referralId || 'AbCdEfGhIjK'}</Text>
          <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
            {copySuccess ? (
              <Text style={styles.copySuccess}>{copySuccess}</Text>
            ) : (
              <Text>Tap to copy</Text>
            )}
            <Image source={copyimg} style={styles.copyIcon} />
          </TouchableOpacity>
        </View>
      </View> */}
        <View style={styles.referralCodeContainer}>
          <Text style={styles.referralCodeLabel}>Your Referral Code</Text>
          <View style={styles.referralCodeContainer}>
            <View style={styles.referralCodeBox}>
              <Text style={styles.referralCode}>
                {referralId || 'AbCdEfGhIjK'}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={copyToClipboard}>
                {copySuccess ? (
                  <Text style={styles.copySuccess}>{copySuccess}</Text>
                ) : (
                  <Text>Tap to copy</Text>
                )}
                <Image style={styles.copyIcon} source={copyimg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.socialInviteContainer}>
          <Text style={styles.inviteLabel}>Invite by Social Media</Text>
          <TouchableOpacity
            onPress={() => openNativeShare(referralId)}
            style={styles.socialShareButton}>
            <Image source={shareIcon} style={styles.socialIcon} />
            <Button
              title="Refer Now"
              onPress={() => openNativeShare(referralId)}
              color="#4CAF50"
              backgroundColor="#4CAF50"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  referStatus: {
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  referCount: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  referralImage: {
    width: 200,
    height: 150,
    marginTop: 20,
  },
  steps: {
    marginTop: 30,
    marginBottom: 20,
  },
  referSteps: {
    flexDirection: 'row', // Equivalent to display: flex in CSS (row direction)
    // Align items with space in between
    // Margin top and bottom (equivalent to margin: 20px 0)
    borderWidth: 2, // Border width
    borderColor: 'rgba(60, 154, 251, 1)', // Border color
    borderRadius: 10, // Border radius
    paddingTop: 15, // Adjust the padding if needed
    paddingBottom: 15, // Adjust the padding if needed
    marginBottom: 10,
  },

  step: {
    width: 90,
    height: 90,
    alignItems: 'center',
    textAlign: 'center', // Center-aligns the text horizontally
    fontSize: 14, // Set font size to 14px
  },

  stepNumber: {
    fontSize: 24, // Set font size to 24
    fontWeight: 'bold', // Set font weight to bold
    color: 'rgba(1, 20, 123, 1)', // Set color using RGBA format
  },

  divider: {
    padding: 2,
    width: 2,
    height: 80,
    backgroundColor: 'rgba(60, 154, 251, 0.3)',
    marginHorizontal: 20, // Adding margin on both sides
  },
  referralCodeContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 5,

    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#ddd',
  },
  referralCodeContainer2: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    borderColor: '#ddd',
  },

  referralCodeLabel: {
    fontWeight: 'bold',
  },
  referralCodeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  referralCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copySuccess: {
    color: 'green',
  },
  copyIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  socialInviteContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    padding: 5,

    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#ddd',
  },
  inviteLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  socialShareButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  referandshare: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(60, 154, 251, 1)', // Border color to mimic the outline
    backgroundColor: 'white', // The background color (red as per your CSS)
    justifyContent: 'center',
    alignItems: 'center',
  },
  referandshareText: {
    color: 'red', // White text to contrast with red background
    fontSize: 13,
  },
});

export default ReferAndEarn;
