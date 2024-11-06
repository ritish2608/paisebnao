import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import WebView from 'react-native-webview';

const VideoPlayer = () => {
  const videoList = [
    'https://www.youtube.com/embed/VIDEO_ID_1',
    'https://www.youtube.com/embed/VIDEO_ID_2',
    'https://www.youtube.com/embed/VIDEO_ID_3',
  ]; // Replace with actual YouTube video IDs

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videoList.length);
    }, 15000); // Switch videos every 15 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: videoList[currentVideoIndex]}}
      />
      <Text style={{textAlign: 'center', padding: 10}}>
        Playing video {currentVideoIndex + 1} of {videoList.length}
      </Text>
    </View>
  );
};

export default VideoPlayer;
