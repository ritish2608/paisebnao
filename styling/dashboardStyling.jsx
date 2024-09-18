import { StyleSheet } from 'react-native';

const dashboardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  popupOverlay: {
    position: 'absolute',  // Similar to position: fixed in CSS
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent black background
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
    zIndex: 1000,  // Ensures it's on top of other content
  },

  popupContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    maxWidth: 270, // `max-width` in React Native
    position: 'relative',
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  closeButton: {
    fontSize: 24,
    color: '#000',
  },
  popupContent: {
    alignItems: 'center',
    marginTop: 10,
  },
  errorIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  popupImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 16,
    textAlign: 'center',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',

      backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  accountInfo: {
    marginTop: 20,
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  smallTextLogo: {
    width: 100,
    height: 20,
    marginHorizontal: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  viewsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,


  },
  viewsIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  pointsDisplayWrapper: {
    justifyContent: 'center',
  },
  textSkeletonLoader: {
    width: 100,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  balanceInfo: {
    alignItems: 'center',
  flexDirection: 'row',
     fontsize: 24,
  fontWeight: 'bold',
  backgroundColor: '#FF9D0A',

  width: 274,
  height: 76,
  borderRadius: 10,
  },
  balanceAmount: {
    textAlign: 'center', // Equivalent to text-align in CSS
    fontSize: 24,        // Font size
    fontWeight: 'bold',  // Font weight
    color: '#ffffff',    // Text color
    borderRadius: 8,     // Border radius for rounded corners
    padding: 10,         // Padding
    marginVertical: 10, 
  },
  withdrawButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  videoSection: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  videoPlayerWrapper: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    display: 'none',
  },
  playButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007BFF',
  },
  progressImage: {
    width: 43,
    height: 43,
    marginTop: 5,
  },
  flexRowNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  videoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earnCash: {
    width: 21,
    height: 21,
    marginLeft: 5,
  },
  videoTimer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  red: {
    color: 'red',
  },
  partnersSection: {
    marginTop: 20,
    width: '100%',
  },
  partnersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  partnersSlider: {
    // Styles for your slider component
  },
});

export default dashboardStyles;
