import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message'; // Assuming you use this for Toast messages
import {load} from '@cashfreepayments/cashfree-js';
import {handleGetMembership, createOrder} from '../../../api/api';

const MembershipPlans = ({navigation}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [plans, setPlans] = useState([]);
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    load({mode: 'production'})
      .then(cashfreeInstance => {
        setCashfree(cashfreeInstance);
        console.log('Cashfree SDK loaded successfully');
      })
      .catch(error => {
        console.error('Error loading Cashfree SDK:', error);
      });
  }, []);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await handleGetMembership();
        const data = response.data;

        if (data && Array.isArray(data)) {
          const groupedPlans = data.reduce((acc, plan) => {
            const {
              id,
              membership_type,
              video_point,
              deposit_point,
              withdrawl_days,
            } = plan;

            if (!acc[membership_type]) {
              acc[membership_type] = {
                id,
                type: membership_type,
                note: `Withdrawal in ${withdrawl_days} days`,
                deposits: [],
              };
            }

            if (deposit_point !== 'FREE') {
              acc[membership_type].deposits.push({
                amount: parseInt(deposit_point),
                perVideo: parseInt(video_point),
                membershipPlanId: id,
              });
            } else {
              acc[membership_type].free = {
                videoPoint: video_point,
                depositPoint: deposit_point,
              };
            }

            return acc;
          }, {});

          setPlans(Object.values(groupedPlans));
        } else {
          Toast.show({
            text1: 'Failed to fetch membership data. Please try again.',
          });
        }
      } catch (error) {
        console.error('Error fetching membership data:', error);
        Toast.show({text1: 'Error fetching membership data.'});
      }
    };

    fetchMembershipData();
  }, []);

  const createOrderApiFunction = (deposit, membershipPlanId, token) => {
    createOrder(deposit, membershipPlanId, token)
      .then(data => {
        const paymentSessionId = data?.data?.payment_session_id;

        if (paymentSessionId) {
          const handlePayment = () => {
            if (cashfree) {
              const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: '_self',
              };

              cashfree.checkout(checkoutOptions).then(result => {
                if (result.error) {
                  console.log('Payment error: ', result.error);
                  Toast.show({text1: 'Payment error. Please try again.'});
                } else if (result.paymentDetails) {
                  console.log(
                    'Payment completed: ',
                    result.paymentDetails.paymentMessage,
                  );
                }
              });
            } else {
              console.log('Cashfree SDK not initialized yet');
            }
          };

          handlePayment();
        } else {
          Toast.show({text1: 'Failed to retrieve payment session ID.'});
        }
      })
      .catch(error => {
        console.error('Error creating order:', error);
        Toast.show({text1: 'Error creating order. Please try again.'});
      });
  };

  const handleDepositClick = (plan, deposit) => {
    setSelectedPlan(plan);
    setSelectedDeposit(deposit);
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    const token = localStorage.getItem('access_token');
    const membershipPlanId = selectedDeposit.membershipPlanId;
    createOrderApiFunction(selectedDeposit.amount, membershipPlanId, token);
    setIsPopupVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Membership Plans for You</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.plansList}>
        {plans.map((plan, index) => (
          <View key={index} style={styles.plan}>
            <Text style={styles.planType}>{plan.type}</Text>
            <Text style={styles.planNote}>{plan.note}</Text>

            {plan.deposits.length > 0 ? (
              plan.deposits.map((deposit, depositIndex) => (
                <View key={depositIndex} style={styles.depositItem}>
                  <Text style={styles.bullet}>►</Text>
                  <Text>
                    Deposit <Text style={styles.amount}>₹{deposit.amount}</Text>{' '}
                    and get
                    <Text style={styles.amount}> ₹{deposit.perVideo}</Text> per
                    video.
                  </Text>
                  <TouchableOpacity
                    style={styles.depositButton}
                    onPress={() => handleDepositClick(plan, deposit)}>
                    <Text style={styles.depositButtonText}>Deposit</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : plan.free ? (
              <View style={styles.freePlan}>
                <Text style={styles.bullet}>►</Text>
                <Text>
                  Get{' '}
                  <Text style={styles.amount}> ₹{plan.free.videoPoint} </Text>{' '}
                  per video for free.
                </Text>
              </View>
            ) : null}
          </View>
        ))}
      </ScrollView>

      <Modal visible={isPopupVisible} transparent={true} animationType="slide">
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupTitle}>Confirm Payment</Text>
            <Text>
              Are you sure you want to proceed with the payment for{' '}
              {selectedPlan?.type} plan of ₹{selectedDeposit?.amount}?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.confirmButton}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsPopupVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 25,
  },
  plansList: {
    marginTop: 20,
  },
  plan: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  planType: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  planNote: {
    marginBottom: 10,
  },
  depositItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  bullet: {
    marginRight: 5,
  },
  amount: {
    color: 'green',
    fontWeight: 'bold',
  },
  depositButton: {
    marginLeft: 'auto',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  depositButtonText: {
    color: '#fff',
  },
  freePlan: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 4,
  },
});

export default MembershipPlans;
