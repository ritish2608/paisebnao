import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';

import userIcon from '../assets/images/user.png';
import referIcon from '../assets/images/rupee.png';
import depositIcon from '../assets/images/deposit.png';
import viewsIcon from '../assets/images/supereye.png';
import errorIcon from '../assets/images/error.png';
import styles from './../styling/dashboardStyling';
import paisebnaotext from '../assets/images/paisebnaotext.png';
import tresery from '.././assets/images/chestmoney.png';
import earncash from '../assets/images/newCash.png';
import earcchest from '../assets/images/earnChest.png';
import {useNavigation} from '@react-navigation/native';
import {addReward, dashboardApi, fetchUserDetail, fetchUserdetail} from './api';

import Video from 'react-native-video';
import YoutubeIframe from 'react-native-youtube-iframe';
import MembershipPlans from './MembershipPlans';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from './VideoPlayer';

//RNPgReactNativeSDK.startPaymentWEB;

//import RNPgReactNativeSDK from 'react-native-pg-react-native-sdk';

const RemoteDashboard = () => {
  const [videos, setVideos] = useState();
  const playerRef = useRef(null);
  const [timer, setTimer] = useState(); // Initial timer is 15 seconds
  const [getState, setState] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [withdrawalPopupVisible, setWithdrawalPopupVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalViews, setTotalViews] = useState(0); // Example state
  const [pointsEarned, setPointsEarned] = useState(0); // Example state
  const [dashboardData, setDashboardData] = useState([]); // Example state
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const [rewardAdded, setRewardAdded] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [referralId, setReferralId] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [name, setName] = useState('User');
  const [getUserData, setUserData] = useState('user_data');

  const navigation = useNavigation();
  const handleClose = () => setIsVisible(false);
  const [getVideo, setVideo] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const [isProgressBarEnabled, setIsProgressBarEnabled] = useState(true);

  const handleRetry = () => {
    // Retry logic here
  };

  const toggleProgressBar = () => {
    setIsProgressBarEnabled(isProgressBarEnabled);
  };
  const handleRedirect = () => {
    // Handle redirection
    navigation.navigate('Profile', {});
  };
  const handleRefernearn = () => {
    // Handle refer & earn
    // navigation.navigate(`/referandearn?points-earned=${formatCurrency(pointsEarned)}&referralId=${referralId}&referralCount=${referralCount}`);
    navigation.navigate(
      'ReferAndEarn',
      referralId,
      referralCount,
      pointsEarned,
    );
  };
  const handleDeposit = () => {
    // PaymentForm;
    //navigation.navigate('PaymentForm');
    // var env = 'TEST';
    // var map = {
    //   orderId: '',
    //   orderAmount: '1',
    //   appId: '',
    //   tokenData: '',
    //   orderCurrency: 'INR',
    //   orderNote: 'asdasdasd',
    //   notifyUrl: 'https://test.gocashfree.com/notify',
    //   customerName: 'Cashfree User',
    //   customerPhone: '9999999999',
    //   customerEmail: 'cashfree@cashfree.com',
    // };
    // //navigation.navigate('PlatformFees');
    // RNPgReactNativeSDK.startPaymentUPI(map, env, result => {
    //   console.log(result);
    //   var obj = JSON.parse(result, function (key, value) {
    //     console.log(key + '::' + value);
    //     // Do something with the result
    //   });
    // });
  };

  const handleAmountWithdrawal = () => {
    if (pointsEarned < 5000) {
      setWithdrawalPopupVisible(true);
    } else {
      navigation.navigate('WithdrawAmount');
      // navigate(
      //   `/amount-withdraw?balance=${pointsEarned}&&refercount=${referralCount}`,
      // );
    }
  };

  //   const handleAmountWithdrawal = () => {
  //     // Handle withdrawal
  //     if (pointsEarned < 500) {
  //       setWithdrawalPopupVisible(true);
  //        navigation.navigate('WithdrawAmount');
  //     } else {
  //       navigation.navigate('WithdrawAmount');
  //       //   navigation.navigate(`/amount-withdraw?balance=${pointsEarned}`);
  //     }
  //   };
  const handlePlayButtonClick = () => {
    console.log('Button click :::: ', currentVideoIndex);
    setIsPlaying(!isPlaying);
    if (currentVideoIndex < dashboardData?.length - 1) {
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
    }
  };

  const handleProgress = state => {
    // setCurrentTime(state.playedSeconds);

    const videoDuration = dashboardData[currentVideoIndex]?.timer;
    const playedRatio = state.playedSeconds / videoDuration;
    console.log('VIDEO playedRatio :: state', state);
    console.log('VIDEO playedRatio :: timer', videoDuration);
    console.log('VIDEO playedRatio playedSeconds:: ', state.playedSeconds);

    setCurrentTime(state.playedSeconds);
    console.log('VIDEO playedRatio 1:: videoDuration', videoDuration);

    if (state.playedSeconds <= videoDuration && !videoCompleted) {
      setRewardAdded(false);
    }

    // Assuming handleNextVideo is a function that plays the next video
    // handleNextVideo();
  };

  const handleNextVideo = () => {
    console.log('handleNextVideo TIME ::::: ', getState);
    setIsPlaying(false);
    // if (getState === 'unstarted') {
    //   console.log('handleNextVideo TIME444 ::::: ', getState);
    //   const interval = setInterval(() => {
    //     console.log('handleNextVideo 2000 ::::: ', '2000');
    //     setPopupVisible(true);
    //   }, 2000);
    //   // if (state === 'unstarted') {
    //   //   setPopupVisible(true);
    //   // }
    //   // Update current time every second
    //   return () => clearInterval(interval);
    // } else
    if (currentVideoIndex < dashboardData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    } else {
      // If it was the last video, do nothing or handle end of playlist logic
      setIsPlaying(false);
    }
  };

  // const videoID = getYouTubeVideoID(url);
  // console.log(videoID); // Output: "dQw4w9WgXcQ"
  const handleVideoReady = () => {
    setIsLoading(false);
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await dashboardApi();
      console.log('TUSHAR Dashboard API response', response.data);

      if (response.data && Array.isArray(response.data)) {
        setDashboardData(response.data);
        setVideo(response.data[currentVideoIndex]?.link);
        console.log(
          'TUSHAR Video id is :: ',
          response.data[currentVideoIndex]?.link,
        );
      } else {
        console.error('TUSHAR Invalid data format received from dashboard API');
      }
    } catch (error) {
      console.error('TUSHAR Error fetching dashboard data:', error);
    }
    dashboardApi();
  }, [currentVideoIndex]);
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handlefetchUserdetail = async () => {
    try {
      const data = await fetchUserDetail();
      console.log('TUSHAR fetchUserdetail fetching dashboard data:', data);
      AsyncStorage.setItem('userData', JSON.stringify(data));
      // Alert.alert('Data saved successfully!');
      //   const saved = AsyncStorage.setItem('USER_DATA', data);
      //   console.log('fetchUserdetail fetching dashboard saved:', saved);

      setUserData(data);
      //const [getUserData,setUserData] = useState('user_data');
      setReferralCount(data?.data?.referral_count);
      setReferralId(data?.data?.referral_id);
      AsyncStorage.setItem('referral_count', data?.data?.referral_id);
      setName(data?.data?.first_name);
      setPointsEarned(data?.data?.points);
      AsyncStorage.setItem('points', pointsEarned);
      setTotalViews(data?.data?.views);
    } catch (error) {
      console.error('TUSHAR Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    handlefetchUserdetail();
  }, [fetchDashboardData]);

  useEffect(() => {
    const checkDataAndRefresh = () => {
      if (dashboardData.length > 0) {
        if (currentVideoIndex < dashboardData.length) {
          const currentLink = dashboardData[currentVideoIndex]?.link;
          const video_link = getYouTubeVideoID(currentLink);
          setVideos(video_link);

          console.log(
            'TUSHAR checkDataAndRefresh timer ::::',
            dashboardData[currentVideoIndex].timer,
          );
          setTimer(dashboardData[currentVideoIndex].timer);

          if (!currentLink) {
            console.log('DATAB ', dashboardData[currentVideoIndex]?.link);
            window.location.reload(); // Refresh the page if the link is invalid
          } else {
            setIsPlaying(true);
            setRewardAdded(false);
            setVideoCompleted(false);
          }
        }
      } else {
        console.error('TUSHAR Dashboard data is empty, refreshing the page');
        window.location.reload(); // Refresh the page if the data is empty
      }
    };

    // Check data after a short delay to avoid continuous refreshing
    const delay = setTimeout(checkDataAndRefresh, 2000); // 2 seconds delay

    // Cleanup timeout on component unmount
    return () => clearTimeout(delay);
  }, [dashboardData, currentVideoIndex]);

  const handleCurrentTime = async () => {
    if (playerRef.current) {
      const time = await playerRef.current.getCurrentTime();
      // console.log('TUSHAR CURRENT TIME ::::: ', formatTime(time));
      // console.log(
      //   'TUSHAR CURRENT formatTime(timer) ::::: ',
      //   dashboardData[currentVideoIndex].timer,
      // );
      const time_current = setCurrentTime(time);

      //  setTimer(dashboardData[currentVideoIndex].timer);
      console.log('over video time :: ', formatTime(timer));
      console.log('over video TUSHAR :: ', formatTime(time));
      if (formatTime(timer) === formatTime(time)) {
        console.log('over video time 11 :: ', formatTime(timer));
        console.log('over video TUSHAR  11:: ', 'TUSHAR KANT');
        setPopupVisible(true);
        //popupVisible();
        setIsPlaying(false);

        // const interval = setInterval(() => {
        //   console.log('handleNextVideo 2000 ::::: ', '2000');
        //   setPopupVisible(false);
        //   handleNextVideo();

        // }, 2000);

        setTimeout(() => {
          setPopupVisible(false); // Hide the modal after 2 seconds
          handleNextVideo();
          setIsPlaying(false); // Call the function after 2 seconds
        }, 2000);

        // setIsModalVisible(true); // Show the modal
        // setTimeout(() => {
        //   setIsModalVisible(false); // Hide the modal after 2 seconds
        //   handleAfter2Seconds(); // Call the function after 2 seconds
        // }, 2000);

        //   // if (state === 'unstarted') {
        //   //   setPopupVisible(true);
        //   // }
        //   // Update current time every second
        // return () => clearInterval(2000);
      }

      // if (isPlaying) {
      // eslint-disable-next-line no-const-assign
      //   timer = setTimeout(() => {
      //     setIsPlaying(false);
      //     setCurrentVideoIndex();
      //     handleNextVideo(); // Loop back to first video
      //   }, 15000); // 15 seconds
      // }
      return () => clearTimeout(timer);
      //   if (formatTime(time) === 1500) {
      //     console.log('PLAY SONGS TIME OUT !!');

      //     handlePlayButtonClick;
      //   }
    }
  };

  useEffect(() => {
    setState(getState);
    setVideoCompleted(false);
    setRewardAdded(false);
  }, [currentVideoIndex]);

  const getYouTubeVideoID = urlVideo => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    // console.log('url is :: ', urlVideo);
    const matches = urlVideo.match(regex);
    return matches ? matches[1] : null; // Return the video ID or null if not found
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <View style={styles.container}>
          <View style={styles.topButtons}>
            <TouchableOpacity
              onPress={handleRedirect}
              style={styles.topButtonUser}>
              <Image source={userIcon} style={styles.icon} />
              <Text style={{color: '#ffffff', fontSize: 15}}>Hi, {name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRefernearn}
              style={styles.topButtonUserRef}>
              <Image source={referIcon} style={styles.icon} />
              <Text style={{color: '#ffffff', fontSize: 15}}>Refer & Earn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeposit} style={styles.topButton}>
              <Image source={depositIcon} style={styles.icon} />
              <Text style={{color: '#ffffff', fontSize: 15}}>Deposit</Text>
            </TouchableOpacity>
          </View>

          <Modal visible={isVisible} transparent={true} animationType="fade">
            <View style={styles.popupOverlay}>
              <View style={styles.popupContainer}>
                <View style={styles.popupHeader}>
                  <TouchableOpacity onPress={handleClose}>
                    <Text style={styles.closeButton}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.popupContent}>
                  <Image source={errorIcon} style={styles.errorIcon} />
                  <Text style={styles.popupTitle}>Payment Failed</Text>
                  <TouchableOpacity
                    onPress={handleRetry}
                    style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={popupVisible} transparent={true} animationType="fade">
            <View style={styles.popupOverlay}>
              <View style={styles.popupContainer}>
                <View style={styles.popupHeader}>
                  <TouchableOpacity onPress={() => setPopupVisible(false)}>
                    <Text style={styles.closeButton}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.popupContent}>
                  <Image source={tresery} style={styles.popupImage} />
                  <Text style={styles.popupTitle}>Congratulations!!</Text>
                  <Text style={styles.popupMessage}>
                    You Earned ₹{dashboardData[currentVideoIndex]?.points}
                  </Text>
                </View>
              </View>
            </View>
          </Modal>

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

          <View style={styles.accountInfo}>
            <View style={styles.flexRow}>
              <Text>Welcome to </Text>
              <Image source={paisebnaotext} style={styles.smallTextLogo} />
              <Text>
                {' '}
                <Text style={styles.bold}>App</Text> Watch & Earn
              </Text>
            </View>
            <View style={styles.popupHeader}>
              {/* Views Info */}
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: '#3C9AFB',
                  borderRadius: 10,
                  color: '#3C9AFB',
                  width: 104,
                  height: 76,
                  marginRight: 10,
                  flex: 1, // Ensures the component takes up all available space
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Image source={viewsIcon} style={styles.icon} alt="Views" />
                <View style={styles.pointsDisplayWrapper}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={{color: '#ffffff'}}>{totalViews} Views</Text>
                  )}
                </View>
              </View>

              {/* Balance Info */}
              <View style={styles.balanceInfo}>
                <View style={styles.balanceAmount}>
                  <View style={styles.pointsDisplayWrapper}>
                    {isLoading ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text style={{color: '#ffffff', fontSize: 22}}>
                        {formatCurrency(pointsEarned)}
                      </Text>
                    )}
                  </View>
                  <Text style={{color: '#ffffff', fontSize: 15}}>
                    Account Balance
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleAmountWithdrawal}
                  style={styles.withdrawButton}>
                  <Text
                    onPress={handleAmountWithdrawal}
                    style={{
                      color: '#ffffff',
                      fontSize: 15,
                    }}>
                    Withdraw
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {<MembershipPlans />}

          <View style={styles.plan}>
            <Text style={styles.videoTitle}>
              View this video and get ₹
              {dashboardData[currentVideoIndex]?.video_id}
            </Text>
            <YoutubeIframe
              style={styles.videoSection}
              ref={playerRef}
              height={200}
              width={320}
              videoId={videos}
              onReady={() => console.log('ready')}
              onError={e => console.log(e)}
              onPlaybackQualityChange={q => console.log(q)}
              volume={100}
              playbackRate={1}
              play={isPlaying}
              webViewProps={{
                javaScriptEnabled: true,
                controls: 0,
                modestbranding: 1,
                fs: 0,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
              }}
              onChangeState={state => {
                console.log(`Player state: ${state}`);
                setState(state);

                if (state === 'playing') {
                  // toggleProgressBar();

                  const interval = setInterval(() => {
                    handleCurrentTime();
                  }, timer);
                  // if (state === 'unstarted') {
                  //   setState(state);
                  //   setPopupVisible(true);
                  // }
                  // Update current time every second
                  return () => clearInterval(interval);
                }
              }}
            />

            {/* <TouchableOpacity
              // onPress={() => playerRef.current.play()}
              onPress={handlePlayButtonClick}
              style={styles.playButton}>
              <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity> */}

            {/* <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progress, {width: `${isPlaying * 100}%`}]}
                />
              </View>
            
            </View> */}

            <View style={styles.flexRowNew}>
              <View style={styles.videoDetails}>
                <Text>Watch full video and earn</Text>
                <Image source={earncash} style={styles.earnCash} />
              </View>
              <View style={styles.videoTimer}>
                <Text>
                  <Text style={styles.red}>{formatTime(currentTime)}</Text> /{' '}
                  {formatTime(timer)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RemoteDashboard;
