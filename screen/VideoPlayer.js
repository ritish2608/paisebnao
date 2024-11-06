import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import dashboardStyles from './../styling/dashboardStyling';

const VideoPlayer = url => {
  const videoId1 = url;
  console.log('URL VIDEO ::', url);
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState(videoId1);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={dashboardStyles.videoSection}>
      <Text style={dashboardStyles.videoTitle}>Video Title Here</Text>
      <TouchableOpacity
        style={dashboardStyles.videoPlayerWrapper}
        onPress={toggleModal}>
        <Text>jhjhjhh</Text>
        <View style={dashboardStyles.videoPlayer}>
          {/* <YoutubePlayer
            height={200}
            width="100%"
            play={isModalVisible}
            videoId={videoId}
            onReady={() => console.log('Ready')}
            onChangeState={state => console.log('State changed to:', state)}
          /> */}

          <YoutubePlayer
            height={100}
            width={10}
            play={false}
            videoId={videoId}
            autoplay={true}
          />
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}>
        <View style={dashboardStyles.popupOverlay}>
          <View style={dashboardStyles.popupContainer}>
            <View style={dashboardStyles.popupHeader}>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={dashboardStyles.closeButton}>jnjnjnjknjk</Text>
              </TouchableOpacity>
            </View>
            <View style={dashboardStyles.popupContent}>
              <Text style={dashboardStyles.popupTitle}>Error</Text>
              <Text style={dashboardStyles.popupMessage}>
                Something went wrong!
              </Text>
              <TouchableOpacity style={dashboardStyles.retryButton}>
                <Text style={dashboardStyles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VideoPlayer;
