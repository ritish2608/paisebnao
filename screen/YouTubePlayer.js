import React from 'react';
import {StyleSheet, View} from 'react-native';
import YouTube from 'react-native-youtube';

const YouTubePlayer = () => {
  return (
    <View style={styles.container}>
      <YouTube
        videoId="https://www.youtube.com/watch?v=dhSx1t9R7UE" // Replace with your video ID
        play={true} // control playback of video with true/false
        fullscreen={false} // control whether the video should be full screen or not
        loop={false} // control whether the video should loop when ended
        onReady={e => {
          console.log('onReady', e);
        }}
        onChangeState={e => {
          console.log('onChangeState', e);
        }}
        onChangeQuality={e => {
          console.log('onChangeQuality', e);
        }}
        onError={e => {
          console.error('onError', e);
        }}
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});

export default YouTubePlayer;
