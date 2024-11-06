import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import Header from '../common/Header'; // Adjust import based on your file structure
import Container from './Container'; // Adjust import based on your file structure

const OopsScreen = () => {
  const navigation = useNavigation();
  const handleWatchVideo = () => {
    // Navigate to dashboard (you'll need to set up navigation)
    // For example, using React Navigation:

    navigation.navigate('Home');
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}></View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>
            To participate in PaiseBnao, users must be at least 18 years old and
            located within eligible regions where the app operates. Only one
            account is permitted per user. Users are required to provide
            accurate information during registration.
          </Text>
          <Text style={styles.instructions}>
            Users earn money by watching videos provided on the PaiseBnao
            platform. Each video has a predefined payout, and the time spent
            watching videos is tracked to ensure compliance. Any attempt to
            automate or fake video views will result in account suspension.
          </Text>
          <Text style={styles.instructions}>
            Earnings can be withdrawn once users reach a minimum balance of Rs.
            5000 in their PaiseBnao wallet. Payments are processed through UPI,
            bank transfer, or digital wallets. Users will be notified of
            successful transfers, and any processing fees for transactions will
            be clearly stated.
          </Text>
          <Text style={styles.instructions}>
            PaiseBnao reserves the right to suspend or terminate any account
            found to be violating the platform's rules, such as using bots,
            manipulating the system, or providing false information. Suspended
            accounts will forfeit any earned balance.
          </Text>
          <Text style={styles.instructions}>
            Before withdrawing earnings, users must pay the platform fee.
            Without paying this fee, users will not be entitled to withdraw
            their earnings. Additionally, users must refer at least three
            friends or family members who successfully log in using the user's
            referral code. Without completing these referrals, users will be
            unable to withdraw their earned amount.
          </Text>
          <Text style={styles.instructions}>
            If users skip or jump between videos or watch videos irregularly, or
            if users watch less than one hour a day consistently, their
            withdrawal amount, membership fee, and platform fee may be
            forfeited. The user will also not be able to take legal action
            against the company for violating the rules of the platform.
          </Text>
          <Text style={styles.instructions}>
            If the user is facing any issue from the company's side, the user
            will not be able to take legal action. Any issues will be resolved
            with mutual understanding between the user and the company. If the
            company faces financial losses, any earned amount by the user may be
            forfeited. The company will not take responsibility for any unpaid
            amounts.
          </Text>
          <Text style={styles.instructions}>
            In case of company profit, the company will share some part of the
            amount earned with the user, based on the user's activity. However,
            if the company faces financial difficulties, the user will not be
            able to claim unpaid amounts.
          </Text>
          <Text style={styles.instructions}>
            If the user is facing any issue from the company's side, the user
            will not be able to take legal action. Any issues will be resolved
            with mutual understanding between the user and the company. If the
            company faces financial losses, any earned amount by the user may be
            forfeited, and any membership or platform fees paid by the user will
            not be refunded. The company will not take responsibility for any
            unpaid or non-returned amounts.
          </Text>
          <Text style={styles.instructions}>
            In the event of adverse circumstances, the company reserves the
            right to convert the balance in rupees to a coin-based system. The
            value of these coins will be determined at the sole discretion of
            the company's authorities. All subsequent payments and withdrawals
            will be made based on the coin value set by the company.
          </Text>
        </View>

        {/* Continue Watching Button */}
        <TouchableOpacity
          onPress={handleWatchVideo}
          style={styles.button}
          activeOpacity={0.7}>
          <Text style={styles.buttonText}>Continue Watching Videos</Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 20,
  },
  instructionsContainer: {
    textAlign: 'left',
    lineHeight: 24,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
  },
  button: {
    display: 'flex',
    width: '100%',
    maxWidth: 300,
    margin: '0 auto',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OopsScreen;
