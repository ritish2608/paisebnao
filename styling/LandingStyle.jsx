import {StyleSheet} from 'react-native';

const landingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100, // Set your desired width
    height: 100, // Set your desired height
  },
  logo2: {
    width: '100%',
    height: 200, // Adjust height as needed
    marginBottom: 20,
    resizeMode: 'contain',
  },
  container1: {
    flex: 1, // Ensures the container takes up the full screen height
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 30,
  },
  displayContent: {
    // In React Native, there's no direct equivalent for 'display: contents'
    // You can use it as a placeholder or simply omit it
  },
  logo: {
    width: '50%',
    maxWidth: 50,

    // marginBottom: 20, // Uncomment if needed
  },
  logo_: {
    width: '100%',
    maxWidth: 120,
    marginTop: 10,
    height: 100,
    transform: [{translateY: -50}],
    flex: 1,
    justifyContent: 'center', // Center vertically

    // marginBottom: 20, // Uncomment if needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002366', // Navy Blue
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#000',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  registerButton: {
    width: '80%',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#FF0000', // Red
    color: '#fff',
    borderRadius: 5,
    fontSize: 16,
  },
  loginButton: {
    width: '80%',
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#FF0000', // Red
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 5,
    fontSize: 16,
  },
  googleBtn: {
    width: '100%',
    maxWidth: 250,
    marginBottom: 20,
  },
  orText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  googleButton: {
    width: '80%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    color: '#000',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
  },
});

export default landingStyles;
