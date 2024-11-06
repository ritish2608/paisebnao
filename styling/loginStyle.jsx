import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    flex: 1,
    flexDirection: 'column',
  },
  logo: {
    marginBottom: 20,
    width: 200,
    height: 220,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    placeholderTextColor: '#000',
  },
  visibilityIcon: {
    width: 20,
    height: 20,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
