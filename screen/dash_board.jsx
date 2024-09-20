import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import Slider from 'react-native-slick';
import { useNavigation } from '@react-navigation/native';

import { dashboardApi ,addReward, fetchUserDetail } from './api';
import partnerImage from '../assets/images/partner.png';
import tresery from "../assets/images/chestmoney.png";
import paisebnaotext from '../assets/images/paisebnaotext.png';
import YouTubePlayer from 'react-player/youtube';

const Dashboard2 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [dashboardData, setDashboardData] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [pointsEarned, setPointsEarned] = useState(0);
    const [name, setName] = useState("User");
    const [totalViews, setTotalViews] = useState(10);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [rewardAdded, setRewardAdded] = useState(false);
    const [videoCompleted, setVideoCompleted] = useState(false);
    const navigation = useNavigation();

    ////

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
    }, [dashboardApi]);

    const fetchUserDetails = async () => {
        try {
            const data = await fetchUserDetail();
            setName(data?.data?.first_name || "User");
            setPointsEarned(data?.data?.points || 0);
            setTotalViews(data?.data?.views || 0);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handlePlayButtonClick = () => {
        setIsPlaying(prev => !prev);
    };

    const handleAddReward = async (id) => {
        try {
            await addReward(id);
            setRewardAdded(true);
        } catch (error) {
            console.error('Error adding reward:', error);
        }
    };

    const handleProgress = (state) => {
        const videoDuration = dashboardData[currentVideoIndex]?.timer || 0;
        if (state.playedSeconds >= videoDuration && !videoCompleted) {
            setIsPlaying(false);
            setVideoCompleted(true);
            setTimeout(() => {
                setPopupVisible(true);
                handleAddReward(dashboardData[currentVideoIndex]?.id);
                setTimeout(() => {
                    setPopupVisible(false);
                    handleNextVideo();
                }, 3000);
            }, 1000);
        }
    };

    const handleNextVideo = () => {
        if (currentVideoIndex < dashboardData.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        fetchUserDetails();
    }, [fetchDashboardData]);

    return (
        <ScrollView style={styles.container}>
            {isVisible && (
                <View style={styles.popup}>
                    <Text>Payment Failed</Text>
                    <Button title="Retry" onPress={() => Alert.alert('Retrying payment...')} />
                </View>
            )}

            {popupVisible && (
                <View style={styles.popup}>
                    <Image source={tresery} style={styles.popupImage} />
                    <Text>Congratulations!!</Text>
                    <Text>You Earned ₹{dashboardData[currentVideoIndex]?.points}</Text>
                </View>
            )}

            <View style={styles.topButtons}>
                <Button title={`Hi, ${name}`} onPress={() => navigation.navigate('Profile')} />
                <Button title="Refer & Earn" onPress={() => navigation.navigate('ReferAndEarn')} />
                <Button title="Deposit" onPress={() => navigation.navigate('PlatformFee')} />
            </View>

            <View style={styles.accountInfo}>
                <Text>Welcome to </Text>
                <Image source={paisebnaotext} style={styles.logo} />
                <Text> App watch & Earn</Text>
                <Text>{totalViews} Views</Text>
                <Text>{pointsEarned}</Text>
                <Button title="Withdraw" onPress={() => Alert.alert('Withdraw')} />
            </View>

            <View style={styles.videoSection}>
                <Text>View this video and get ₹{dashboardData[currentVideoIndex]?.points}</Text>
                 <YouTubePlayer
                // source={{ uri: dashboardData[currentVideoIndex]?.video_id }}
                    url={{ uri: dashboardData[currentVideoIndex]?.video_id }}
                    playing={isPlaying}
                    controls={false}
                    onProgress={handleProgress}
                    width="100%"
                    height="100%"
                />
                <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayButtonClick} />
            </View>

            <View style={styles.partnersSection}>
                <Text>Our Partners</Text>
                <Slider>
                    {dashboardData.map((partner, index) => (
                        <Image key={index} source={partnerImage} style={styles.partnerImage} />
                    ))}
                </Slider>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    popup: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popupImage: {
        width: 200,
        height: 200,
    },
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    accountInfo: {
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 30,
        marginVertical: 10,
    },
    videoSection: {
        marginBottom: 20,
    },
    partnersSection: {
        marginBottom: 20,
    },
    partnerImage: {
        width: '100%',
        height: 150,
    },
});

export default Dashboard2;
