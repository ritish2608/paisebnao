import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20, // Equivalent to padding: 0 20px
  },
  stickyButtonContainer: {
    position: 'absolute', // Position the element fixed relative to the screen
    top: 0,
    backgroundColor: 'white',
    left: 0,
    right: 0, // To ensure the container spans the full width
    zIndex: 1000, // Keeps the button container on top of other elements
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // React Native supports shadow styles for iOS and Android, but you'll need to use `shadowColor`, `shadowOffset`, and `shadowOpacity` for iOS
    shadowColor: 'rgba(0, 0, 0, 0.1)', // iOS only shadow styling
    shadowOffset: {width: 0, height: 2}, // iOS only shadow styling
    shadowOpacity: 1, // iOS only shadow styling
    elevation: 4, // Android shadow style
  },
  mt50: {
    marginTop: 50,
  },
  mt20: {
    marginTop: 20,
  },
  mb20: {
    marginBottom: 20,
  },
  mt10: {
    marginTop: 10,
  },
  headbackbtn: {
    transform: [{translateX: -79}, {translateY: -13}],
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 25,
    backgroundColor: 'transparent',
    borderWidth: 0,
    cursor: 'pointer', // Cursor property doesn't work in React Native
  },
  logo: {
    width: '100',
    maxWidth: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002366', // Navy Blue
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    paddingLeft: 7,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'left',
  },
  fontStyle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.005,
    textAlign: 'left',
  },
  pb20: {
    paddingBottom: 20,
  },
  red: {
    color: 'red', // No !important equivalent in React Native
  },
  membershipPlan: {
    color: 'white',
    backgroundColor: '#FF9D0A',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  smallTextLogoOne: {
    width: 70,
    height: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButton: {
    width: '80',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#ff0000', // Red
    color: 'white', // React Native doesn't support color directly in buttons like CSS
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center', // To center the text
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
  },
  iconInsideInput: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: '-50%'}],
  },
  visibilityIcon: {
    right: 20,
    width: 20,
    height: 20,
    cursor: 'pointer', // Cursor property doesn't work in React Native
  },
  inputField: {
    width: '100%',
    paddingHorizontal: 40, // Adjusting padding for icons inside the input
    paddingVertical: 10,
    outlineWidth: 1,
    outlineColor: 'rgb(226, 226, 226)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'transparent',
    borderRadius: 5,
    boxSizing: 'border-box', // React Native does not have this property
  },
  redLink: {
    color: '#000000',
    textDecorationLine: 'none', // Text decoration (underline) should be handled with `textDecorationLine`
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bolder: {
    fontWeight: '700',
    fontSize: 14,
  },
  hrLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    marginVertical: 20,
  },
  orText: {
    position: 'relative',
    backgroundColor: 'white',
    fontWeight: '600',
    fontSize: 12,
    paddingHorizontal: 10,
    zIndex: 1,
    whiteSpace: 'nowrap', // React Native does not have `white-space`, but text will wrap automatically
    marginBottom: 13,
  },
  hr: {
    position: 'absolute',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    margin: 0,
    top: '50%',
    transform: [{translateY: -50}],
    zIndex: 0,
  },
  loginButtonLogin: {
    width: '80%',
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: 'white',
    color: '#ff0000', // React Native buttons don't accept color directly, you can style text inside buttons
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  verifyAccountContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  verifyAccountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    // React Native does not use cursor properties, so omit
  },
  verifyTitle: {
    fontSize: 18,
    marginTop: 40,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 10,
  },
  verifyTitleCenter: {
    fontSize: 18,
    marginTop: 40,
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
    paddingLeft: 10,
  },
  passMustContainChar: {
    marginTop: -13,
    marginLeft: -109,
  },
  verifyInstructions: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
    fontSize: 16,
    color: 'rgb(0, 0, 0)',
  },
  platformAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: 'red',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emailHighlight: {
    fontWeight: '600',
    fontSize: 12,
    color: 'rgba(30, 41, 59, 1)',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
  },
  iconSize: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: '-50%'}],
    width: 18,
    height: 18,
    marginLeft: 10,
  },
  inputField: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 40,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    boxSizing: 'border-box', // React Native doesn't use box-sizing
  },
  resendText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(71, 85, 105, 1)',
  },
  colourNone: {
    color: 'rgba(148, 163, 184, 1)',
  },
  font500: {
    fontWeight: '500',
  },
  verifyButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 300,
    paddingVertical: 10,
    backgroundColor: 'red',
    color: 'white', // You would typically need to style the text inside the button
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  tclink: {
    color: '#565656',
  },
  verifyButton2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 300,
    paddingVertical: 10,
    backgroundColor: 'red',
    color: 'white', // You would typically need to style the text inside the button
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
    paddingLeft: 4,
  },

  // How to Earn Styles
  howToEarnContainer: {
    padding: 20,
    textAlign: 'center',
  },
  howToEarnTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  earnStep: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Shadow does not work directly in React Native
  },
  earnIcon: {
    width: 60,
    marginBottom: 10,
  },
  earnStepTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: -6,
  },
  earnStepDescription: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(30, 41, 59, 1)',
    lineHeight: 23,
    letterSpacing: 1,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'red',
    color: 'white', // You would typically need to style the text inside the button
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
  },

  // Top Buttons Styles
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  f400: {
    fontWeight: '400',
  },
  topButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: 'bold',
    maxWidth: 132,
    minWidth: 85,
    height: 36,
  },
  topButtonIcon: {
    width: 20, // Adjust icon size
    height: 20,
  },
  topButtonUser: {
    backgroundColor: '#ffb74d',
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  topButtonReferEarn: {
    backgroundColor: '#f44336',
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  topButtonDeposit: {
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  // Adding shadow (this needs a workaround since React Native doesn't have box-shadow)
  topButton: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // This is for Android shadow support
    transition: 'transform 0.2s ease-in-out', // React Native doesn't support CSS transition, you'd need to handle this with an animation library like `Animated`
  },
  // Add hover effect for the top button (React Native doesn't support hover directly, consider using `TouchableOpacity` or `TouchableWithoutFeedback` for tap-based interactions)
  topButtonHovered: {
    transform: [{scale: 1.05}],
  },

  // Views Info Styles
  viewsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#FF9D0A',
    width: 274,
    height: 76,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  withdrawButton: {
    backgroundColor: '#2196f3',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  videoTitle: {
    fontSize: 18,
    color: '#1f2937',
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },

  videoPlayerContainer: {
    position: 'relative',
    width: '100%',
    height: 290,
    overflow: 'hidden',
  },

  videoIframe: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    maxWidth: 480,
    maxHeight: 290,
  },

  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    color: '#fff',
    fontSize: 24,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progress: {
    height: '100%',
    backgroundColor: 'linear-gradient(to right, #64748B 0%, #334155 100%)', // React Native doesn't support gradients by default, use a library like `react-native-linear-gradient`
  },

  videoDetails: {
    textAlign: 'center',
    color: '#1f2937',
    fontSize: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  mr10: {
    marginRight: 10,
  },

  videoTimer: {
    textAlign: 'center',
    color: '#1f2937',
    marginTop: 13,
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 20,
  },

  mb17: {
    marginBottom: 17,
  },

  partnersSection: {
    textAlign: 'center',
  },

  partnerImage: {
    maxWidth: '100%',
    borderRadius: 5,
  },

  paymentIcon: {
    maxWidth: 190,
  },

  errorIcon: {
    maxWidth: 99,
  },

  balanceTitle: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },

  balanceAmount: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },

  withdrawSection: {
    marginTop: 20,
    textAlign: 'center',
  },

  withdrawInstruction: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },

  withdrawAmountBox: {
    fontSize: 24,
    fontWeight: 'bold',
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: '#f8f9fa',
  },

  withdrawSlider: {
    width: '100%',
    margin: 10,
  },

  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    color: '#777',
  },

  upiSection: {
    marginTop: 20,
  },

  upiTitle: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
  },

  upiInput: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 5,
  },

  upiInstruction: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
  },

  safetyNote: {
    textAlign: 'center',
    fontSize: 14,
    color: 'green',
    marginTop: 10,
  },

  profileContainer: {
    width: '100%',
  },

  profileOptions: {
    flexDirection: 'column',
  },

  profileOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  profileOptionLastChild: {
    borderBottomWidth: 0,
  },

  buttonDiv: {
    backgroundColor: 'white',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },

  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  green: {
    color: 'rgba(0, 170, 99, 1)',
  },

  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },

  profilePhone: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },

  profileOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 30,
  },

  optionText: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },

  goBackButton: {
    width: '100%',
    maxWidth: 300,
    margin: 20,
    paddingVertical: 15,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },

  referStatus: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#eaf4ff',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },

  referCount: {
    color: 'red',
    fontWeight: 'bold',
  },

  referTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  referralImage: {
    width: '100%',
    maxWidth: 150,
    marginTop: 20,
    marginBottom: -24,
  },

  referSteps: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: 'rgba(60, 154, 251, 1)',
    borderRadius: 10,
    paddingVertical: 15,
  },

  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(1, 20, 123, 1)', // Blue text
  },

  divider: {
    width: 2,
    height: 84,
    backgroundColor: 'rgba(60, 154, 251, 0.3)',
  },

  step: {
    textAlign: 'center',
    fontSize: 14,
  },

  referralCodeContainer: {
    marginVertical: 20,
  },

  referralCodeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: 'rgba(71, 85, 105, 1)',
  },

  referralCodeBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },

  referralCode: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  copyButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: 'rgba(71, 85, 105, 1)',
    fontSize: 14,
    fontWeight: '500',
    borderRadius: 5,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  socialInviteContainer: {
    marginVertical: 20,
  },

  socialInviteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  socialIcon: {
    width: 50,
    height: 50,
  },

  socialIconShare: {
    height: 62,
  },

  referAndShare: {
    color: 'red',
    borderWidth: 1,
    borderColor: 'rgba(60, 154, 251, 1)',
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
  },

  flexColCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fadeColour: {
    color: 'rgba(100, 116, 139, 1)',
  },

  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  popupContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    textAlign: 'center',
    width: '90%',
    maxWidth: 270,
    position: 'relative',
  },

  popupHeader: {
    justifyContent: 'flex-end',
  },

  closeButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 24,
    cursor: 'pointer', // Not supported in React Native, handled differently
  },

  popupContent: {
    marginTop: 10,
  },

  errorIcon: {
    fontSize: 50,
    color: 'red',
    marginBottom: 10,
  },

  popupTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  retryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    color: 'white',
    borderWidth: 0,
    borderRadius: 5,
    fontSize: 16,
    cursor: 'pointer',
  },

  whiteRefer: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  bold: {
    fontWeight: '800',
  },
  ml7: {
    marginLeft: 7,
  },
  mr2: {
    marginRight: 2,
  },
  viewBg: {
    backgroundColor: '#3C9AFB',
    borderRadius: 10,
    color: 'white',
    width: 104,
    height: 76,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mt10: {
    marginTop: 10,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  videoSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // React Native doesn't support box-shadow directly
    outline: '1px solid rgba(0, 0, 0, 0.1)', // React Native doesn't support outline
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'hidden',
  },
  congoWithdrawal: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    outline: '1px solid rgba(0, 0, 0, 0.1)', // React Native doesn't support outline
  },
  displayFix: {
    justifyContent: 'flex-start',
  },
  gradientBackground: {
    width: '55%',
    height: 3,
    background: 'linear-gradient(to right, #ffffff, #ff0000, #ffffff)',
  },
  gradientBackgroundDeposit: {
    width: '100%',
    height: 3,
    background: 'linear-gradient(to right, #ffffff, #ff0000, #ffffff)',
    marginBottom: 30,
  },
  playPauseButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer', // React Native doesn't support `cursor`
  },
  videoDetails: {
    marginTop: 10,
    textAlign: 'center',
    paddingRight: 20,
  },
  viewCount: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  popupTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  popupBody: {
    marginTop: 20,
  },
  popupFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    cursor: 'pointer',
    fontSize: 16,
    transition: 'background 0.3s ease', // React Native doesn't support CSS transitions
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    cursor: 'pointer',
    fontSize: 16,
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginTop: 60,
  },
  progress: {
    height: '100%',
    backgroundColor: '#f44336', // Progress bar color
    transition: 'width 0.2s ease-in-out', // React Native doesn't support `transition` directly
  },
  progressImage: {
    position: 'absolute',
    top: -15,
    left: 'calc(100% - 43px)',
  },
  popupOverlay: {
    position: 'fixed', // React Native uses `absolute` for positioning
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    textAlign: 'center',
  },
  popupHeader: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButton: {
    backgroundColor: 'none',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer', // React Native doesn't support `cursor`
  },
  popupContent: {
    marginTop: 20,
  },
  popupImage: {
    width: 100,
    height: 'auto',
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 24,
    color: '#333',
    margin: 0,
  },
  popupMessage: {
    fontSize: 18,
    color: '#4CAF50',
    margin: 0,
  },
  retryButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    cursor: 'pointer', // React Native doesn't support `cursor`
    marginTop: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // React Native doesn't support `box-shadow`
  },
  progress: {
    height: '100%',
    backgroundColor: '#f44336',
    transition: 'width 0.2s',
  },
  googleLoginContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  googleLoginBtn: {
    backgroundColor: '#4285f4',
    color: 'white',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  googleLoginBtnHover: {
    backgroundColor: '#357ae8',
  },
  outlinediv: {
    boxShadow: '0px 0px 4px rgba(21, 39, 69, 0.2)',
    padding: 5,
    borderRadius: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  pointsDisplayWrapper: {
    display: 'inline-block',
    position: 'relative',
  },
  textSkeletonLoader: {
    display: 'inline-block',
    width: 100,
    height: '1em',
    background:
      'linear-gradient(90deg, #ff9d0a00 25%, #e0e0e060 50%, #ff9d0a00 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite linear',
    borderRadius: 4,
  },
  shimmer: {
    from: {
      backgroundPosition: '200% 0',
    },
    to: {
      backgroundPosition: '-200% 0',
    },
  },
  // Edit Profile
  editProfileContainer: {
    marginTop: 20,
    textAlign: 'left',
  },
  editProfileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  editProfileForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 15,
    width: '100',
    maxWidth: 400,
  },
  formGroupLabel: {
    display: 'block',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  formGroupInput: {
    width: '100',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default styles;
