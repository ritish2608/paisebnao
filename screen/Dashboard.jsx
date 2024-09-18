
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, Modal, Button, ActivityIndicator } from 'react-native';

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
import Video from 'react-native-video';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { addReward, dashboardApi, fetchUserdetail } from './api';
import MembershipPlans from './MembershipPlans';
import partnerImage1 from '../assets/images/partner.png';

import YoutubePlayer from 'react-native-youtube-iframe';

const Dashboard = () => {

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

    const [videoPlayUrl, setVideoPlayUrl] = useState(null);
    const [rewardAdded, setRewardAdded] = useState(false);
    const [videoCompleted, setVideoCompleted] = useState(false);
    const [referralId, setReferralId] = useState(null);
    const [referralCount, setReferralCount] = useState(0);
    const [name, setName] = useState('User');

const navigation = useNavigation();
  const handleClose = () => setIsVisible(false);
  const handleRetry = () => {
    // Retry logic here
  };
  const handleRedirect = () => {
    // Handle redirection
    navigation.navigate('Profile');
  };
  const handleRefernearn = () => {
    // Handle refer & earn
            // navigation.navigate(`/referandearn?points-earned=${formatCurrency(pointsEarned)}&referralId=${referralId}&referralCount=${referralCount}`);
       navigation.navigate('ReferAndEarn');
  };
  const handleDeposit = () => {
    // Handle deposit

     navigation.navigate('PlatformFees');
  };
  const handleAmountWithdrawal = () => {
    // Handle withdrawal
     if (pointsEarned < 500) {
            setWithdrawalPopupVisible(true);
        } else {
            navigation.navigate(`/amount-withdraw?balance=${pointsEarned}`);
        }
  };
  const handlePlayButtonClick = () => {
   // setIsPlaying(!isPlaying);
     if(currentVideoIndex < dashboardData?.length - 1){
            setIsPlaying(prevIsPlaying => !prevIsPlaying);
    }
  };
  const handleProgress = (state) => {
    const videoDuration = dashboardData[currentVideoIndex]?.timer || 0;
    const playedRatio = state.playedSeconds / videoDuration;
    setPlayed(playedRatio);
    setCurrentTime(state.playedSeconds);

    if (state.playedSeconds >= videoDuration && !videoCompleted) {
        setIsPlaying(false);
        setVideoCompleted(true);

        // Step 1: Display the popup after a delay
        setTimeout(() => {
            setPopupVisible(true);

            // Step 2: Add the reward if not added already
            if (!rewardAdded) {
                handleAddReward(dashboardData[currentVideoIndex]?.id);
                setRewardAdded(true);
            }
  const handleAddReward = async (id) => {

    try {
      const data = await addReward(id);
      console.log(data, "add reward");
      setRewardAdded(true);
    } catch (error) {
      console.error('Error adding reward:', error);
    }
  };
            // Step 3: Hide the popup and move to the next video after another delay
            setTimeout(() => {
                setPopupVisible(false);
                handleNextVideo();
            }, 3000); // Adjust the timeout duration as needed
        }, 1000); // Initial delay before showing the popup
    }
};

const handleNextVideo = () => {
  handlefetchUserdetail();
  if (currentVideoIndex < dashboardData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
  } else {
      // If it was the last video, do nothing or handle end of playlist logic
      setIsPlaying(false);
  }
};

  const handleVideoReady = () => {
    setIsLoading(false);
  };
const partners = [
  { id: 1, url: 'https://yarsi.in', image: require('.././assets/images/partner.png') },
  { id: 2, url: 'https://yarsi.in', image: require('.././assets/images/partner.png') },
  { id: 3, url: 'https://yarsi.in', image: require('.././assets/images/partner.png') },
  { id: 4, url: 'https://yarsi.in', image: require('.././assets/images/partner.png') },
];

    const fetchDashboardData = useCallback(async () => {
        try {
            const response = await dashboardApi();
            console.log(response.data, 'Dashboard API response');

            if (response.data && Array.isArray(response.data)) {
                setDashboardData(response.data);
                console.log('Video id is :: ',response.data[currentVideoIndex]?.video_id);
            } else {
                console.error('Invalid data format received from dashboard API');
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    }, []);
 const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

   const handlefetchUserdetail = async () => {
        try {
            const data = await fetchUserdetail();
            console.log('RESPONCE ::: ' + data);
            setReferralCount(data?.data?.referral_count);
            setReferralId(data?.data?.referral_id);
            setName(data?.data?.first_name);
            setPointsEarned(data?.data?.points);
            setTotalViews(data?.data?.views);
        } catch (error) {
            console.error('Error fetching user data:', error);
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
                    const currentLink = dashboardData[currentVideoIndex]?.redirection_link;
                    if (!currentLink) {
                        console.error('Invalid video link, refreshing the page');
                      //  window.location.reload(); // Refresh the page if the link is invalid
                    } else {
                        setIsPlaying(true);
                        setRewardAdded(false);
                        setVideoCompleted(false);
                    }
                }
            } else {
                console.error('Dashboard data is empty, refreshing the page');
               window.location.reload(); // Refresh the page if the data is empty
            }
        };

        // Check data after a short delay to avoid continuous refreshing
        const delay = setTimeout(checkDataAndRefresh, 2000); // 2 seconds delay

        // Cleanup timeout on component unmount
        return () => clearTimeout(delay);
    }, [dashboardData, currentVideoIndex ]);

    useEffect(() => {
      // Reset videoCompleted and rewardAdded states when the currentVideoIndex changes
      setVideoCompleted(false);
      setRewardAdded(false);
  }, [currentVideoIndex]);

  const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
  }).format(amount);
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={handleRedirect} style={styles.topButton}>
          <Image source={userIcon} style={styles.icon} />
          <Text>Hi, {name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRefernearn} style={styles.topButton}>
          <Image source={referIcon} style={styles.icon} />
          <Text>Refer & Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeposit} style={styles.topButton}>
          <Image source={depositIcon} style={styles.icon} />
          <Text>Deposit</Text>
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
              <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
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
              <Text style={styles.popupMessage}>You Earned ₹{dashboardData[currentVideoIndex]?.points}</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={withdrawalPopupVisible} transparent={true} animationType="fade">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.popupHeader}>
              <TouchableOpacity onPress={() => setWithdrawalPopupVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.popupContent}>
              <Text style={styles.popupTitle}>Minimum Withdrawal Amount</Text>
              <Text>You need to have at least ₹500 to withdraw.</Text>
            </View>
          </View>
        </View>
      </Modal>


      <View style={styles.accountInfo}>
        <View style={styles.flexRow}>
          <Text>Welcome to </Text>
           <Image source={paisebnaotext} style={styles.smallTextLogo} />
          <Text> <Text style={styles.bold}>App</Text> Watch & Earn</Text>
        </View>
    <View style={styles.popupHeader}>
      {/* Views Info */}
      <View style={{
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
            <Text style={ {color: '#ffffff',fontSize:15}}>{totalViews} Views</Text>
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
              <Text style={ {color: '#ffffff',fontSize:22}}>{formatCurrency(pointsEarned)}</Text>
            )}
          </View>
          <Text style={ {color: '#ffffff',fontSize:15}}>Account Balance</Text>
        </View>
        <TouchableOpacity onPress={handleAmountWithdrawal} style={styles.withdrawButton}>
          <Text  onPress={handleAmountWithdrawal} style={ {color: '#ffffff',fontSize:15}}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>

        {/* <View style={styles.flexRow}>
          <View style={styles.viewsInfo}>
            <Image source={viewsIcon} style={styles.viewsIcon} />
            <View style={styles.pointsDisplayWrapper}>
              {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <Text>{totalViews} Views</Text>}
            </View>
          </View>

          <View style={styles.balanceInfo}>
            <View style={styles.pointsDisplayWrapper}>
              {isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : <Text style={styles.balanceAmount}>{formatCurrency(pointsEarned)}</Text>}
            </View>
            <Text>Account Balance</Text>
            <TouchableOpacity onPress={handleAmountWithdrawal} style={styles.withdrawButton}>
              <Text>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View> */}



      </View>
           {<MembershipPlans/>}
      <View style={styles.videoSection}>
        <Text style={styles.videoTitle}>View this video and get ₹{dashboardData[currentVideoIndex]?.points}</Text>
        <View style={styles.videoPlayerWrapper}>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          <View style={[styles.videoPlayerWrapper, isLoading && styles.hidden]}>
            <Video
              source={{ uri: dashboardData[currentVideoIndex]?.redirection_link }}
              paused={!isPlaying}
              controls={false}
              onProgress={handleProgress}
              onLoad={handleVideoReady}
              style={styles.videoPlayer}
            />
          </View>
        </View>
        <View>
           <YoutubePlayer style={styles.videoSection}
  ref={this.playerRef}
  height={300}
  width={400}
  videoId={dashboardData[currentVideoIndex]?.video_id}
  onChangeState={event => console.log(event)}
  onReady={() => console.log('ready')}
  onError={e => console.log(e)}
  onPlaybackQualityChange={q => console.log(q)}
  volume={100}
  playbackRate={1}
  initialPlayerParams={{
    cc_lang_pref: 'us',
    showClosedCaptions: true,
  }}
/>
        </View>
        <TouchableOpacity onPress={handlePlayButtonClick} style={styles.playButton}>
          <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${played * 100}%` }]} />
          </View>
          <Image source={earcchest} style={styles.progressImage} />
        </View>

        <View style={styles.flexRowNew}>
          <View style={styles.videoDetails}>
            <Text>Watch full video and earn</Text>
            <Image source={earncash} style={styles.earnCash} />
          </View>
          <View style={styles.videoTimer}>
            <Text><Text style={styles.red}>{formatTime(currentTime)}</Text> / {formatTime(dashboardData[currentVideoIndex]?.timer)}</Text>
          </View>
        </View>
      </View>
    </View>
         {/* <View style={styles.container}>
      <Text style={styles.title}>Our Partners</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
        {partners.map(partner => (
          // eslint-disable-next-line no-undef
          <TouchableOpacity key={partner.id} onPress={() => Linking.openURL(partner.url)}>
            <Image source={partner.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View> */}
    </ScrollView>
  );
};

export default Dashboard;
