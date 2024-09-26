import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Alert,
  StyleSheet,
  Modal,
} from 'react-native';
import {handleGetMembership} from './api';

const MembershipPlans = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [plans, setPlans] = useState([]);
  const [withdrawalDays, setWithdrawalDays] = useState(8);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const data = await handleGetMembership();
        setWithdrawalDays(data[0]?.withdrawl_days);
        setPlans(data.data);
      } catch (error) {
        console.error('Error fetching membership data:', error);
      }
    };

    fetchMembershipData();
  }, []);

  const handleDepositClick = (data, deposit) => {
    setSelectedPlan(data);
    setSelectedDeposit(deposit);
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    // Navigate to platform-fee page with parameters
    // Replace this with your navigation logic
    Alert.alert(
      'Payment Confirmed',
      `Proceeding with ${selectedPlan.type} plan of ₹${selectedDeposit.amount}.`,
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membership Plans for You</Text>
      <ScrollView>
        {plans.map((data, index) => (
          <View key={index} style={styles.plan}>
            <Text style={styles.planTitle}>
              {data.type}{' '}
              <Text style={styles.note}>
                Withdrawal in {data.withdrawl_days} days
              </Text>
            </Text>

            <Text key={index} style={styles.planDetail}>
              {data.type === 'Normal' ? `► ${data.withdrawl_days}` : ''}
            </Text>

            {data.deposit_point.length > 0 && (
              <View style={styles.deposits}>
                <View key={index} style={styles.depositItem}>
                  <Text>
                    ► Deposit{' '}
                    <Text style={styles.greenText}>₹{data.video_point}</Text>{' '}
                    and get{' '}
                    <Text style={styles.greenText}>₹{data.video_point}</Text>{' '}
                    per video.
                  </Text>
                  <Button
                    title="Deposit"
                    onPress={() => handleDepositClick(data, data.video_point)}
                  />
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <Modal
        transparent={true}
        visible={isPopupVisible}
        animationType="slide"
        onRequestClose={() => setIsPopupVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text>
              Are you sure you want to proceed with the payment for{' '}
              {selectedPlan?.type} plan of ₹{selectedDeposit?.amount}?
            </Text>
            <View style={styles.modalButtons}>
              <Button title="Yes" onPress={handleConfirm} />
              <Button title="No" onPress={() => setIsPopupVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  plan: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  note: {
    color: 'red',
  },
  planDetail: {
    marginVertical: 5,
  },
  deposits: {
    marginTop: 10,
  },
  depositItem: {
    marginBottom: 10,
  },
  greenText: {
    color: 'green',
    fontWeight: '600',
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
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default MembershipPlans;
