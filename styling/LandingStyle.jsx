import { StyleSheet } from 'react-native';

const landingStyles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full screen height
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  displayContent: {
    // In React Native, there's no direct equivalent for 'display: contents'
    // You can use it as a placeholder or simply omit it
  },
  logo: {
    width: '100%',
    maxWidth: 120,
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
