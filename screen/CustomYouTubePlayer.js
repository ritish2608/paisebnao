import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import Slider from '@react-native-community/slider'; // Import the Slider from the community package

const CustomYouTubePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const youtubePlayerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        youtubePlayerRef.current.getCurrentTime().then(time => {
          setCurrentTime(time);
          setProgress((time / videoDuration) * 100);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, videoDuration]);

  const handlePlayPause = () => {
    // Toggle play/pause
    setIsPlaying(!isPlaying);
  };

  const handleSeek = value => {
    const newTime = (value / 100) * videoDuration;
    youtubePlayerRef.current.seekTo(newTime);
    setProgress(value);
    setCurrentTime(newTime);
  };

  return (
    <View style={styles.container}>
      <YouTubeIframe
        height={200}
        width={300}
        videoId="dQw4w9WgXcQ" // Replace with the video ID you want to display
        play={isPlaying}
        onReady={() => console.log('Video is ready!')}
        // onChangeState={event => {
        //   if (event.state === 'playing') {
        //     setIsPlaying(true);
        //   } else if (event.state === 'paused' || event.state === 'ended') {
        //     setIsPlaying(false);
        //   }
        // }}
        // onError={error => console.log(error)}
        //  ref={youtubePlayerRef}
        onDuration={duration => setVideoDuration(duration)}
        style={styles.videoPlayer}
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Text style={styles.playPauseButton}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            value={progress}
            onValueChange={handleSeek}
          />
          <Text style={styles.timeText}>
            {Math.floor(currentTime)} / {Math.floor(videoDuration)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
  },
  videoPlayer: {
    width: '100%',
    height: 200,
  },
  controlsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  playPauseButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  progressContainer: {
    width: '80%',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
});

export default CustomYouTubePlayer;
