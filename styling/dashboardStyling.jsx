import {StyleSheet} from 'react-native';

const dashboardStyles = StyleSheet.create({
  gradient: {
    padding: 1,
    width: 100,
    marginHorizontal: 40,
    marginTop: 5,
    justifyContent: 'center',
    flex: 5, // Adjust the size as needed
    // Add any additional styles if necessary
  },
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#fff',
  },
  container1: {
    marginTop: 50,
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  plansTitle: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 6,
  },
  planTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  planNote: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'orange',
    padding: 35,
  },
  depositItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  depositText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
  colorArrow: {
    color: 'orange',
  },
  amount: {
    fontWeight: 'bold',
    color: 'green',
  },
  depositButton: {
    backgroundColor: '#28a745',
    padding: 6,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
  },
  freePlan: {
    marginVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  container2: {
    flex: 1,
    padding: 4,
    backgroundColor: '#fff',

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  video: {
    width: '100%',
    height: 300,
  },
  plan: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: '200',
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 12,
    marginTop: '200',
    flex: 1,
  },
  popupOverlay: {
    position: 'absolute', // Similar to position: fixed in CSS
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    zIndex: 1000, // Ensures it's on top of other content
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
  topButtonUser: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ffffff',

    fontSize: 15,
    backgroundColor: '#FF9D0A',
    padding: 10,
    borderRadius: 5,
  },
  topButtonUserRef: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#ffffff',

    fontSize: 15,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  accountInfo: {
    marginTop: 20,
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignContent: 'center',
  },
  smallTextLogo: {
    width: 100,
    height: 20,
    marginHorizontal: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: 'black',
    fontsize: 26,
  },
  viewsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  viewsIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  pointsDisplayWrapper: {
    justifyContent: 'center',
    color: '#fff',
  },
  textSkeletonLoader: {
    width: 100,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  // plan: {
  //   marginBottom: 16,
  //   padding: 35,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   alignContent: 'center',
  //   flex: 1,

  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
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
    fontSize: 24, // Font size
    fontWeight: 'bold', // Font weight
    color: '#ffffff', // Text color
    borderRadius: 8, // Border radius for rounded corners
    padding: 10, // Padding
    marginVertical: 10,
  },
  withdrawButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignContent: 'flex-end',
    borderRadius: 5,
    marginTop: 10,
  },
  videoSection: {
    width: '100%',
    alignItems: 'center',
  },
  videoTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
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
    position: 'absolute',

    left: '50%',
    backgroundColor: '#007BFF', // Semi-transparent red
    padding: 15,
    borderRadius: 10,
  },

  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
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
