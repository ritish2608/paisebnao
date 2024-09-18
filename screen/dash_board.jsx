import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Carousel from 'react-native-carousel-control';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { dashboardApi, fetchPartnerData, addReward, fetchUserdetail } from './api';

const Dashboard2 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [dashboardData, setDashboardData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [withdrawalPopupVisible, setWithdrawalPopupVisible] = useState(false);
  const [name, setName] = useState("User");
  const [totalViews, setTotalViews] = useState(10);
  const [rewardAdded, setRewardAdded] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [referralId, setReferralId] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const handleVideoReady = () => setIsLoading(false);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await dashboardApi();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, []);

  const handlefetchUserdetail = async () => {
    try {
      const data = await fetchUserdetail();
      setReferralCount(data?.data?.referral_count);
      setReferralId(data?.data?.referral_id);
      setName(data?.data?.first_name);
      setPointsEarned(data?.data?.points);
      setTotalViews(data?.data?.views);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleNextVideo = () => {
    handlefetchUserdetail();
    if (currentVideoIndex < dashboardData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    handlefetchUserdetail();
  }, [fetchDashboardData]);

  const handlePlayButtonClick = () => {
    if (currentVideoIndex < dashboardData.length - 1) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
          <Text>Hi, {name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReferAndEarn', { pointsEarned, referralId, referralCount })} style={styles.button}>
          <Text>Refer & Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Deposit')} style={styles.button}>
          <Text>Deposit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoSection}>
        <Text style={styles.videoTitle}>View this video and get ₹{dashboardData[currentVideoIndex]?.points}</Text>
        <Video
          source={{ uri: dashboardData[currentVideoIndex]?.redirection_link }}
          style={styles.videoPlayer}
          paused={!isPlaying}
          onProgress={({ currentTime }) => setCurrentTime(currentTime)}
          onReadyForDisplay={handleVideoReady}
        />
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <TouchableOpacity onPress={handlePlayButtonClick} style={styles.playButton}>
          <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel for Partners */}
      <View style={styles.partnersSection}>
        <Text style={styles.partnersTitle}>Our Partners</Text>
        <Carousel pageWidth={300}>
          <Image source={require('../assets/images/partner.png')} style={styles.partnerImage} />
          <Image source={require('../assets/images/partner.png')} style={styles.partnerImage} />
        </Carousel>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  videoSection: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
  },
  playButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
  },
  partnersSection: {
    marginTop: 20,
  },
  partnersTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  partnerImage: {
    width: 300,
    height: 200,
  },
});

export default Dashboard2;
