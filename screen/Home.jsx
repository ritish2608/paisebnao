import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import styles from '../styling/dashboardStyling';
import {useNavigation, useRoute} from '@react-navigation/native';
import ReactPlayer, {Video} from 'react-native-video';
import userIcon from '../assets/images/user.png';
import referIcon from '../assets/images/rupee.png';
import depositIcon from '../assets/images/deposit.png';
import viewsIcon from '../assets/images/supereye.png';
import errorIcon from '../assets/images/error.png';

import {
  dashboardApi,
  fetchPartnerData,
  addReward,
  fetchUserdetail,
} from './api';
import paisebnaotext from '../assets/images/paisebnaotext.png';

import tresery from '../assets/images/chestmoney.png';

import Play from '../assets/images/play.png';
import Pause from '../assets/images/pause.png';

import MembershipPlans from './MembershipPlans';
import Container from './Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import YoutubeIframe from 'react-native-youtube-iframe';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [withdrawalPopupVisible, setWithdrawalPopupVisible] = useState(false);
  const [name, setName] = useState('User');
  const [totalViews, setTotalViews] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');
  const [rewardAdded, setRewardAdded] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [referralId, setReferralId] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [membershipViewPoints, setMembershipViewPoints] = useState(0);
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const token = AsyncStorage.getItem('access_token');
  useEffect(() => {
    setCurrentUrl(null);

    //   setCurrentUrl(dashboardData[currentVideoIndex]?.link);
    const currentVideo = dashboardData[currentVideoIndex];
    const currentVideoLink = currentVideo?.link;
    setCurrentUrl(currentVideoLink);
  }, [currentVideoIndex, dashboardData]);

  useEffect(() => {
    fetchDashboardData();
    handlefetchUserdetail();
  }, [fetchDashboardData]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await dashboardApi();
      // console.error('response fetching dashboard data:', response);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  const handlefetchUserdetail = async () => {
    try {
      const data = await fetchUserdetail();
      setReferralCount(data.data.referral_count);
      setName(data.data.first_name?.split(' ')[0]);
      setPointsEarned(data.data.points);
      setTotalViews(data.data.views);
      setMembershipViewPoints(data.data.membership__video_point || 0);
      setFirstTimeUser(data.data.views < 1);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAddReward = async id => {
    try {
      const data = await addReward(id);
      if (data && data.data.message) {
        setRewardAdded(true);
      }
    } catch (error) {
      console.error('Error adding reward:', error);
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

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <View style={styles.container}>
        <View style={styles.topButtons}>
          {/* Error Popup */}
          <Modal visible={isVisible} animationType="fade" transparent={true}>
            <View style={styles.popupOverlay}>
              <View style={styles.popupContainer}>
                <Image source={errorIcon} style={styles.errorIcon} />
                <Text style={styles.popupTitle}>Payment Failed</Text>
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  style={styles.retryButton}>
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Congratulations Popup */}
          <Modal visible={popupVisible} animationType="fade" transparent={true}>
            <View style={styles.popupOverlay}>
              <View style={styles.popupContainer}>
                <Image source={tresery} style={styles.popupImage} />
                <Text style={styles.popupTitle}>Congratulations!!</Text>
                <Text style={styles.popupMessage}>
                  You Earned ₹{membershipViewPoints}
                </Text>
              </View>
            </View>
          </Modal>

          {/* User Info and Navigation */}
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => navigation.navigate('Profile')}>
              <Image source={userIcon} style={styles.icon} />
              <Text>Hi, {name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => navigation.navigate('ReferAndEarn')}>
              <Image source={referIcon} style={styles.icon} />
              <Text>Refer & Earn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topButton}
              onPress={() => navigation.navigate('DepositFee')}>
              <Image source={depositIcon} style={styles.icon} />
              <Text>Deposit</Text>
            </TouchableOpacity>
          </View>

          {/* Account Info */}
          <View style={styles.accountInfo}>
            <View style={styles.flexRow}>
              <Text>Welcome to</Text>
              <Image source={paisebnaotext} style={styles.logo} />
              <Text>Watch & Earn</Text>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.viewsInfo}>
                <Image source={viewsIcon} style={styles.viewsIcon} />
                <Text>{totalViews} Views</Text>
              </View>
              <View style={styles.balanceInfo}>
                <Text>{formatCurrency(pointsEarned)}</Text>
                <Text>Account Balance</Text>
                <TouchableOpacity
                  style={styles.withdrawButton}
                  onPress={() => {
                    if (pointsEarned < 5000) {
                      setWithdrawalPopupVisible(true);
                    } else {
                      navigation.navigate('AmountWithdraw', {
                        balance: pointsEarned,
                        referralCount,
                      });
                    }
                  }}>
                  <Text>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Video Player Section */}
          {/* <MembershipPlans /> */}
          <View style={styles.videoSection}>
            <Text style={styles.videoTitle}>
              View this video and get ₹{membershipViewPoints}
            </Text>
            <View style={styles.videoPlayerWrapper}>
              {/* <Video
              source={{uri: 'https://www.youtube.com/watch?v=nim2qc73xCE'}} // Video URL
              ref={ref => {
                this.player = ref;
              }} // Reference to control the player
              style={styles.video} // Apply custom styles
              controls={false} // Hide controls, as you don't want to show them
            /> */}
              {currentUrl ? (
                <YoutubeIframe
                  videoId={'iee2TATGMyI'}
                  // source={{
                  //   uri: 'https://www.youtube.com/watch?v=nim2qc73xCE',
                  // }}

                  playing={isPlaying}
                  controls={false}
                  onEnded={() => setVideoCompleted(true)}
                  onProgress={state => setCurrentTime(state.playedSeconds)}
                  onPlay={handlePlayButtonClick}
                  onPause={handlePlayButtonClick}
                />
              ) : (
                <Text>Loading Video...</Text>
              )}
            </View>
          </View>

          <View style={styles.controlButtons}>
            <TouchableOpacity
              onPress={handlePlayButtonClick}
              style={styles.controlButton}>
              <Image
                source={isPlaying ? Pause : Play}
                style={styles.playPauseIcon}
              />
              <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
