// import React, {useState, useEffect, useCallback, useRef} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Modal,
//   Button,
//   ActivityIndicator,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import userIcon from '../assets/images/user.png';
// import referIcon from '../assets/images/rupee.png';
// import depositIcon from '../assets/images/deposit.png';
// import viewsIcon from '../assets/images/supereye.png';
// import errorIcon from '../assets/images/error.png';
// import styles from './../styling/dashboardStyling';
// import paisebnaotext from '../assets/images/paisebnaotext.png';
// import tresery from '.././assets/images/chestmoney.png';
// import earncash from '../assets/images/newCash.png';
// import earcchest from '../assets/images/earnChest.png';
// import Video from 'react-native-video';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {useNavigation} from '@react-navigation/native';
// import {addReward, dashboardApi, fetchUserdetail} from './api';
// import MembershipPlans from './MembershipPlans';
// import partnerImage1 from '../assets/images/partner.png';

// import YoutubePlayer from 'react-native-youtube-iframe';

// const Dashboard = () => {
//   /// dashboard
//   const [membershipViewPoints, setMembershipViewPoints] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [withdrawalPopupVisible, setWithdrawalPopupVisible] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [played, setPlayed] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [totalViews, setTotalViews] = useState(0); // Example state
//   const [pointsEarned, setPointsEarned] = useState(0); // Example state
//   const [dashboardData, setDashboardData] = useState([]); // Example state
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   const [videoPlayUrl, setVideoPlayUrl] = useState(null);
//   const [rewardAdded, setRewardAdded] = useState(false);
//   const [videoCompleted, setVideoCompleted] = useState(false);
//   const [referralId, setReferralId] = useState(null);
//   const [referralCount, setReferralCount] = useState(0);
//   const [name, setName] = useState('User');
//   const [AmountWid, setAmountWid] = useState(0);
//   const navigation = useNavigation();

//   const handleClose = () => setIsVisible(false);
//   const handleRetry = () => {
//     // Retry logic here
//   };

//   useEffect(() => {
//     fetchDashboardData();
//     handlefetchUserdetail();
//   }, [fetchDashboardData]);

//   const handleRedirect = () => {
//     // Handle redirection
//     navigation.navigate('Profile');
//   };
//   const handleRefernearn = () => {
//     // Handle refer & earn
//     // navigation.navigate(`/referandearn?points-earned=${formatCurrency(pointsEarned)}&referralId=${referralId}&referralCount=${referralCount}`);
//     navigation.navigate('ReferAndEarn');
//   };
//   const handleDeposit = () => {
//     // Handle deposit

//     navigation.navigate('PlatformFees');
//   };
//   const handleAmountWithdrawal = () => {
//     // Handle withdrawal
//     if (pointsEarned < 500) {
//       setWithdrawalPopupVisible(true);
//       // navigation.navigate('WithdrawAmount');
//     } else {
//       navigation.navigate('WithdrawAmount');
//       //   navigation.navigate(`/amount-withdraw?balance=${pointsEarned}`);
//     }
//   };
//   const token = AsyncStorage.getItem('access_token');
//   console.log('dashboard token :: ', token);
//   const youtubeRef = useRef(null);

//   const handlePlayButtonClick = () => {
//     setIsPlaying(!isPlaying);
//     if (youtubeRef.current) {
//       youtubeRef.current.play;
//       //playVideo
//       // Stop the video after 15 seconds
//       setTimeout(() => {
//         youtubeRef.current.play;
//       }, 15000); // 15000 milliseconds = 15 seconds
//     }

//     if (currentVideoIndex < dashboardData?.length - 1) {
//       setIsPlaying(prevIsPlaying => !prevIsPlaying);
//     }
//   };
//   const handleProgress = state => {
//     const videoDuration = dashboardData[currentVideoIndex]?.timer || 0;
//     const playedRatio = state.playedSeconds / videoDuration;
//     setPlayed(playedRatio);
//     setCurrentTime(state.playedSeconds);

//     if (state.playedSeconds >= videoDuration && !videoCompleted) {
//       setIsPlaying(false);
//       setVideoCompleted(true);

//       // Step 1: Display the popup after a delay
//       setTimeout(() => {
//         setPopupVisible(true);

//         // Step 2: Add the reward if not added already
//         if (!rewardAdded) {
//           handleAddReward(dashboardData[currentVideoIndex]?.id);
//           setRewardAdded(true);
//         }
//         const handleAddReward = async id => {
//           try {
//             const data = await addReward(id);
//             console.log(data, 'add reward');
//             setRewardAdded(true);
//           } catch (error) {
//             console.error('Error adding reward:', error);
//           }
//         };
//         // Step 3: Hide the popup and move to the next video after another delay
//         setTimeout(() => {
//           setPopupVisible(false);
//           handleNextVideo();
//         }, 3000); // Adjust the timeout duration as needed
//       }, 1000); // Initial delay before showing the popup
//     }
//   };

//   const handleNextVideo = () => {
//     handlefetchUserdetail();
//     if (currentVideoIndex < dashboardData.length - 1) {
//       setCurrentVideoIndex(currentVideoIndex + 1);
//       setIsPlaying(true);
//     } else {
//       // If it was the last video, do nothing or handle end of playlist logic
//       setIsPlaying(false);
//     }
//   };

//   const handleVideoReady = () => {
//     setIsLoading(false);
//   };
//   const partners = [
//     {
//       id: 1,
//       url: 'https://yarsi.in',
//       image: require('.././assets/images/partner.png'),
//     },
//     {
//       id: 2,
//       url: 'https://yarsi.in',
//       image: require('.././assets/images/partner.png'),
//     },
//     {
//       id: 3,
//       url: 'https://yarsi.in',
//       image: require('.././assets/images/partner.png'),
//     },
//     {
//       id: 4,
//       url: 'https://yarsi.in',
//       image: require('.././assets/images/partner.png'),
//     },
//   ];

//   const fetchDashboardData = useCallback(async () => {
//     try {
//       const response = await dashboardApi();
//       console.log(response.data, 'Dashboard API response');

//       if (response.data && Array.isArray(response.data)) {
//         setDashboardData(response.data);
//         console.log('Video id is :: ', response.data[currentVideoIndex]?.link);
//       } else {
//         console.error('Invalid data format received from dashboard API');
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//     }
//   }, [currentVideoIndex]);
//   const formatTime = seconds => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   const handlefetchUserdetail = async () => {
//     try {
//       const data = await fetchUserdetail();
//       console.log('User Details Data ::: ', data);
//       setReferralCount(data?.data?.referral_count);
//       setReferralId(data?.data?.referral_id);
//       setName(data?.data?.first_name);
//       setPointsEarned(data?.data?.points);
//       setTotalViews(data?.data?.views);
//       setMembershipViewPoints(data.data.membership__video_point);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   };

//   const onReady = () => {
//     console.log('Player is ready');
//   };

//   const onChangeState = state => {
//     console.log(`Player state: ${state}`);
//     if (state === 'playing') {
//       console.log(`Player state: 33 ${state}`);
//       setTimeout(() => {
//         console.log(`Player state:  44 ${state}`);
//         // Pause the video
//       }, 15000);
//       // setIsPlaying(false);
//       console.log(`Player state:  55 ${state}`);
//     }
//   };

//   const onError = error => {
//     console.log(`Error: ${error}`);
//   };

//   const onPlaybackQualityChange = quality => {
//     console.log(`Playback quality: ${quality}`);
//   };

//   const onPlaybackRateChange = rate => {
//     console.log(`Playback rate: ${rate}`);
//   };

//   const onTime = data => {
//     console.log(`Current time: ${data.currentTime}`);
//   };

//   const onFullscreen = isFullscreen => {
//     console.log(`Fullscreen: ${isFullscreen}`);
//   };

//   useEffect(() => {
//     const checkDataAndRefresh = () => {
//       if (dashboardData.length > 0) {
//         if (currentVideoIndex < dashboardData.length) {
//           const currentLink =
//             dashboardData[currentVideoIndex]?.redirection_link;
//           if (!currentLink) {
//             console.error('Invalid video link, refreshing the page');
//             //  window.location.reload(); // Refresh the page if the link is invalid
//           } else {
//             setIsPlaying(true);
//             setRewardAdded(false);
//             setVideoCompleted(false);
//           }
//         }
//       } else {
//         console.error('Dashboard data is empty, refreshing the page');
//         window.location.reload(); // Refresh the page if the data is empty
//       }
//     };

//     // Check data after a short delay to avoid continuous refreshing
//     const delay = setTimeout(checkDataAndRefresh, 2000); // 2 seconds delay

//     // Cleanup timeout on component unmount
//     return () => clearTimeout(delay);
//   }, [dashboardData, currentVideoIndex]);

//   useEffect(() => {
//     // Reset videoCompleted and rewardAdded states when the currentVideoIndex changes
//     setVideoCompleted(false);
//     setRewardAdded(false);
//   }, [currentVideoIndex]);

//   const formatCurrency = amount => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.container}>
//         <View style={styles.topButtons}>
//           <TouchableOpacity
//             onPress={handleRedirect}
//             style={styles.topButtonUser}>
//             <Image source={userIcon} style={styles.icon} />
//             <Text style={{color: '#ffffff', fontSize: 15, backgroundColor: ''}}>
//               Hi, {name}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleRefernearn} style={styles.topButton}>
//             <Image source={referIcon} style={styles.icon} />
//             <Text style={{color: '#ffffff', fontSize: 15}}>Refer & Earn</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleDeposit} style={styles.topButton}>
//             <Image source={depositIcon} style={styles.icon} />
//             <Text style={{color: '#ffffff', fontSize: 15}}>Deposit</Text>
//           </TouchableOpacity>
//         </View>
//         <Modal visible={isVisible} transparent={true} animationType="fade">
//           <View style={styles.popupOverlay}>
//             <View style={styles.popupContainer}>
//               <View style={styles.popupHeader}>
//                 <TouchableOpacity onPress={handleClose}>
//                   <Text style={styles.closeButton}>×</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.popupContent}>
//                 <Image source={errorIcon} style={styles.errorIcon} />
//                 <Text style={styles.popupTitle}>Payment Failed</Text>
//                 <TouchableOpacity
//                   onPress={handleRetry}
//                   style={styles.retryButton}>
//                   <Text style={styles.retryButtonText}>Retry</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//         <Modal visible={popupVisible} transparent={true} animationType="fade">
//           <View style={styles.popupOverlay}>
//             <View style={styles.popupContainer}>
//               <View style={styles.popupHeader}>
//                 <TouchableOpacity onPress={() => setPopupVisible(false)}>
//                   <Text style={styles.closeButton}>×</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.popupContent}>
//                 <Image source={tresery} style={styles.popupImage} />
//                 <Text style={styles.popupTitle}>Congratulations!!</Text>
//                 <Text style={styles.popupMessage}>
//                   You Earned ₹{dashboardData[currentVideoIndex]?.points}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </Modal>
//         <Modal
//           visible={withdrawalPopupVisible}
//           transparent={true}
//           animationType="fade">
//           <View style={styles.popupOverlay}>
//             <View style={styles.popupContainer}>
//               <View style={styles.popupHeader}>
//                 <TouchableOpacity
//                   onPress={() => setWithdrawalPopupVisible(false)}>
//                   <Text style={styles.closeButton}>×</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.popupContent}>
//                 <Text style={styles.popupTitle}>Minimum Withdrawal Amount</Text>
//                 <Text>You need to have at least ₹500 to withdraw.</Text>
//               </View>
//             </View>
//           </View>
//         </Modal>
//         <View style={styles.accountInfo}>
//           <View style={styles.flexRow}>
//             <Text>Welcome to </Text>
//             <Image source={paisebnaotext} style={styles.smallTextLogo} />
//             <Text>
//               {' '}
//               <Text style={styles.bold}>App</Text> Watch & Earn
//             </Text>
//           </View>
//           <View style={styles.popupHeader}>
//             {/* Views Info */}
//             <View
//               style={{
//                 backgroundColor: '#3C9AFB',
//                 borderRadius: 10,
//                 color: '#3C9AFB',
//                 width: 104,
//                 height: 76,
//                 marginRight: 10,
//                 flex: 1, // Ensures the component takes up all available space
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'column',
//               }}>
//               <Image source={viewsIcon} style={styles.icon} alt="Views" />
//               <View style={styles.pointsDisplayWrapper}>
//                 {isLoading ? (
//                   <ActivityIndicator size="small" color="#ffffff" />
//                 ) : (
//                   <Text style={{color: '#ffffff', fontSize: 15}}>
//                     {totalViews} Views
//                   </Text>
//                 )}
//               </View>
//             </View>

//             {/* Balance Info */}
//             <View style={styles.balanceInfo}>
//               <View style={styles.balanceAmount}>
//                 <View style={styles.pointsDisplayWrapper}>
//                   {isLoading ? (
//                     <ActivityIndicator size="small" color="#ffffff" />
//                   ) : (
//                     <Text style={{color: '#ffffff', fontSize: 22}}>
//                       {formatCurrency(pointsEarned)}
//                     </Text>
//                   )}
//                 </View>
//                 <Text style={{color: '#ffffff', fontSize: 15}}>
//                   Account Balance
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 onPress={handleAmountWithdrawal}
//                 style={styles.withdrawButton}>
//                 <Text
//                   onPress={handleAmountWithdrawal}
//                   style={{color: '#ffffff', fontSize: 15}}>
//                   Withdraw
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* <View style={styles.flexRow}>
//           <View style={styles.viewsInfo}>
//             <Image source={viewsIcon} style={styles.viewsIcon} />
//             <View style={styles.pointsDisplayWrapper}>
//               {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <Text>{totalViews} Views</Text>}
//             </View>
//           </View>

//           <View style={styles.balanceInfo}>
//             <View style={styles.pointsDisplayWrapper}>
//               {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <Text style={styles.balanceAmount}>{formatCurrency(pointsEarned)}</Text>}
//             </View>
//             <Text>Account Balance</Text>
//             <TouchableOpacity onPress={handleAmountWithdrawal} style={styles.withdrawButton}>
//               <Text>Withdraw</Text>
//             </TouchableOpacity>
//           </View>
//              ////videoSection
//         </View> */}
//         </View>
//         <View style={styles.container}></View>
//         {<MembershipPlans />}

//         <View style={styles.plan}>
//           <Text style={styles.videoTitle}>
//             View this video and get ₹
//             {dashboardData[currentVideoIndex]?.membership__video_point}
//           </Text>
//           <View style={styles.videoPlayerWrapper}>
//             {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
//             <View
//               style={[styles.videoPlayerWrapper, isLoading && styles.hidden]}>
//               <YoutubePlayer
//                 videoId={dashboardData[currentVideoIndex]?.link}
//                 paused={!isPlaying}
//                 controls={false}
//                 onProgress={handleProgress}
//                 onLoad={handleVideoReady}
//                 style={styles.videoPlayer}
//               />
//               {/* <YoutubePlayer
//                 height={300}
//                 width={300}
//                 play={true}
//                 videoId={{
//                   uri: dashboardData[currentVideoIndex]?.video_id,
//                 }}
//               /> */}

//               <YoutubePlayer
//                 ref={youtubeRef}
//                 height={200}
//                 width={330}
//                 play={false}
//                 videoId={dashboardData[currentVideoIndex]?.link}
//                 onReady={onReady}
//                 onChangeState={onChangeState}
//                 onError={onError}
//                 onProgress={handleProgress}
//                 onLoad={handleVideoReady}
//                 onPlaybackQualityChange={onPlaybackQualityChange}
//                 onPlaybackRateChange={onPlaybackRateChange}
//                 onTime={onTime}
//                 autoplay={true}
//                 onFullscreen={onFullscreen}
//               />

//               {/* <YoutubePlayer
//                 videoId={dashboardData[currentVideoIndex]?.link}
//                 playing={isPlaying}
//                 height={300}
//                 width={300}
//                 controls={false}
//                 playbackRate={1}
//                 onProgress={handleProgress}
//                 onReady={handleVideoReady}
//                 style={{pointerEvents: 'none'}}
//               /> */}
//             </View>
//           </View>
//           <View>
//             {/* <YoutubePlayer style={styles.videoSection}
//   ref={this.playerRef}
//   height={300}
//   width={400}
//   videoId={dashboardData[currentVideoIndex]?.video_id}
//   onChangeState={event => console.log(event)}
//   onReady={() => console.log('ready')}
//   onError={e => console.log(e)}
//   onPlaybackQualityChange={q => console.log(q)}
//   volume={100}
//   playbackRate={1}
//   initialPlayerParams={{
//     cc_lang_pref: 'us',
//     showClosedCaptions: true,
//   }}
// /> */}
//           </View>
//           <TouchableOpacity
//             onPress={handlePlayButtonClick}
//             style={styles.playButton}>
//             <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
//           </TouchableOpacity>

//           <View style={styles.progressBarContainer}>
//             <View style={styles.progressBar}>
//               <View style={[styles.progress, {width: `${played * 100}%`}]} />
//             </View>
//             <Image source={earcchest} style={styles.progressImage} />
//           </View>

//           <View style={styles.flexRowNew}>
//             <View style={styles.videoDetails}>
//               <Text>Watch full video and earn</Text>
//               <Image source={earncash} style={styles.earnCash} />
//             </View>
//             <View style={styles.videoTimer}>
//               <Text>
//                 <Text style={styles.red}>{formatTime(currentTime)}</Text> /{' '}
//                 {formatTime(dashboardData[currentVideoIndex]?.timer)}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//       {/* <View style={styles.container}>
//       <Text style={styles.title}>Our Partners</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
//         {partners.map(partner => (
//           // eslint-disable-next-line no-undef
//           <TouchableOpacity key={partner.id} onPress={() => Linking.openURL(partner.url)}>
//             <Image source={partner.image} style={styles.image} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View> */}
//     </ScrollView>
//   );
// };

// export default Dashboard;

import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {dashboardApi, fetchUserdetail} from './api';
import userIcon from '../assets/images/user.png';
import referIcon from '../assets/images/rupee.png';
import depositIcon from '../assets/images/deposit.png';
import earncash from '../assets/images/newCash.png';
import Play from '../assets/images/play.png';
import Pause from '../assets/images/pause.png';

const Dashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [pointsEarned, setPointsEarned] = useState(0);
  const [totalViews, setTotalViews] = useState(10);
  const [name, setName] = useState('User');
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardApi();
        console.log('Dashboard response :::::::::', response);
        if (response.data && Array.isArray(response.data)) {
          setDashboardData(response.data);
        } else {
          console.error('Invalid data format received from dashboard API');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const data = await fetchUserdetail();
        if (data && data.data) {
          setName(data.data.first_name || 'User');
          setPointsEarned(data.data.points);
          setTotalViews(data.data.views);
        } else {
          console.error('Failed to fetch user details.');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchDashboardData();
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (dashboardData.length > 0) {
      setCurrentUrl(dashboardData[currentVideoIndex]?.link);
    }
  }, [currentVideoIndex, dashboardData]);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < dashboardData.length - 1) {
      setCurrentVideoIndex(prevIndex => prevIndex + 1);
      setIsPlaying(false);
    }
  };

  const formatCurrency = amount => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isVisible && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>Payment Failed</Text>
          <Button
            title="Retry"
            onPress={() => Alert.alert('Retrying payment...')}
          />
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={userIcon} style={styles.icon} />
          <Text>Hi, {name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReferAndEarn')}>
          <Image source={referIcon} style={styles.icon} />
          <Text>Refer & Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Deposit')}>
          <Image source={depositIcon} style={styles.icon} />
          <Text>Deposit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.accountInfo}>
        <Text>Views: {totalViews}</Text>
        <Text>Account Balance: {formatCurrency(pointsEarned)}</Text>
        <Button title="Withdraw" onPress={() => Alert.alert('Withdraw')} />
      </View>

      <View style={styles.videoSection}>
        <Text style={styles.videoTitle}>
          Watch this video and earn ₹
          {dashboardData[currentVideoIndex]?.points || 0}
        </Text>
        {currentUrl && (
          <Video
            ref={videoRef}
            source={{uri: currentUrl}}
            style={styles.video}
            paused={!isPlaying}
            onEnd={handleNextVideo}
            resizeMode="contain"
          />
        )}
        <TouchableOpacity onPress={handlePlayPause} style={styles.playButton}>
          <Image source={isPlaying ? Pause : Play} style={styles.playIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  accountInfo: {
    marginBottom: 20,
  },
  videoSection: {
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
  },
  playButton: {
    marginTop: 10,
    padding: 10,
  },
  playIcon: {
    width: 50,
    height: 50,
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  popupText: {
    marginBottom: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Dashboard;
