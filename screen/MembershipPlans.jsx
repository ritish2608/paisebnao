/* eslint-disable react-native/no-inline-styles */
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Button,
//   ScrollView,
//   Alert,
//   StyleSheet,
//   Modal,
// } from 'react-native';
// import {handleGetMembership} from './api';

// const MembershipPlans = () => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [selectedDeposit, setSelectedDeposit] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [withdrawalDays, setWithdrawalDays] = useState(8);

//   useEffect(() => {
//     const fetchMembershipData = async () => {
//       try {
//         const data = await handleGetMembership();
//         console.log(' membership data:', data);
//         setWithdrawalDays(data[0]?.withdrawl_days);
//         setPlans(data.data);
//       } catch (error) {
//         console.error('Error fetching membership data:', error);
//       }
//     };

//     fetchMembershipData();
//   }, []);

//   const handleDepositClick = (data, deposit) => {
//     setSelectedPlan(data);
//     setSelectedDeposit(deposit);
//     setIsPopupVisible(true);
//   };

//   const handleConfirm = () => {
//     setIsPopupVisible(false);
//     // Navigate to platform-fee page with parameters
//     // Replace this with your navigation logic
//     Alert.alert(
//       'Payment Confirmed',
//       `Proceeding with ${selectedPlan.type} plan of ₹${selectedDeposit.amount}.`,
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={styles.plan}>
//           <Text style={styles.title}>Membership Plans for You</Text>
//           {plans.map((data, index) => (
//             <View key={index}>
//               <Text style={styles.planTitle}>
//                 {data.membership_type}
//                 <Text style={styles.note}>
//                   Withdrawal in {data.withdrawl_days} days
//                 </Text>
//               </Text>

//               <Text key={index} style={styles.planDetail}>
//                 {data.type === 'Normal' ? `► ${data.withdrawl_days}` : ''}
//               </Text>

//               {data.deposit_point.length > 0 && (
//                 <View style={styles.deposits}>
//                   <View key={index} style={styles.depositItem}>

//                     <Text>
//                       ► Deposit{}
//                       <Text style={styles.greenText}>
//                         ₹{data.deposit_point}
//                       </Text>{' '}
//                       and get{' '}
//                       <Text style={styles.greenText}>₹{data.video_point}</Text>{' '}
//                       per video.
//                     </Text>
//                     <Button
//                       title="Deposit"
//                       onPress={() => handleDepositClick(data, data.video_point)}
//                     />
//                   </View>
//                 </View>
//               )}
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       <Modal
//         transparent={true}
//         visible={isPopupVisible}
//         animationType="slide"
//         onRequestClose={() => setIsPopupVisible(false)}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Confirm Payment</Text>
//             <Text>
//               Are you sure you want to proceed with the payment for{' '}
//               {selectedPlan?.type} plan of ₹{selectedDeposit?.amount}?
//             </Text>
//             <View style={styles.modalButtons}>
//               <Button title="Yes" onPress={handleConfirm} />
//               <Button title="No" onPress={() => setIsPopupVisible(false)} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   padding: 10,
//   //   backgroundColor: '#fff',
//   // },
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//     flex: 1,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//     marginBottom: 20,
//   },
//   plan: {
//     marginBottom: 10,
//     paddingHorizontal: 35,
//     paddingTop: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     fontSize: 12,
//   },
//   planTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   note: {
//     color: 'white',
//     backgroundColor: 'orange',
//     padding: 5,
//   },
//   planDetail: {
//     marginVertical: 5,
//   },
//   deposits: {
//     marginTop: 10,
//   },
//   depositable123: {
//     marginTop: 10,
//     backgroundColor: 'blue',
//   },
//   depositItem: {
//     marginBottom: 10,
//   },
//   greenText: {
//     color: 'green',
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
// });

// export default MembershipPlans;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
//import {load} from '@cashfreepayments/cashfree-js'; // Ensure this works in React Native

import {
  addReward,
  dashboardApi,
  fetchUserdetail,
  createOrder,
  handleGetMembership,
} from './api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientBackground from './GradientBackground';

import {load} from '@cashfreepayments/cashfree-js';
const MembershipPlans = () => {
  const [cashFree, setCashfree] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [plans, setPlans] = useState([]);

  // useEffect(() => {
  //   load({mode: 'production'})
  //     .then(cashfreeInstance => {
  //       setCashfree(cashfreeInstance);
  //     })
  //     .catch(error => {
  //       console.error('Error loading Cashfree SDK:', error);
  //     });
  // }, []);

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({mode: 'production'}); // Adjust the mode if needed
        setCashfree(cashfreeInstance);

        console.log('Cashfree SDK loaded successfully');
      } catch (error) {
        console.error('Error loading Cashfree SDK:', error);
        Alert.alert('Error', 'Failed to load Cashfree SDK');
      }
    };

    initializeCashfree();
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
          console.error('Invalid membership data format received.');
        }
      } catch (error) {
        console.error('Error fetching membership data:', error);
      }
    };

    fetchMembershipData();
  }, []);

  const createOrderApiFunction = (deposit, membership_plan_id, token) => {
    console.log('paymentSessionId', token);
    createOrder(deposit, membership_plan_id, token)
      .then(data => {
        const paymentSessionId = data?.data?.payment_session_id;
        console.log('paymentSessionId', paymentSessionId);
        if (paymentSessionId) {
          const handlePayment = () => {
            if (cashFree) {
              console.log('cashFree', cashFree);
              const checkoutOptions = {
                paymentSessionId: paymentSessionId,
                redirectTarget: '_self',
              };

              cashFree.checkout(checkoutOptions).then(result => {
                if (result.error) {
                  console.log('Payment error: ', result.error);
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
          //  ToastMsg.error('Failed to retrieve payment session ID.');
        }
      })
      .catch(error => {
        console.error('Error creating order:', error);
        //  ToastMsg.error('Error creating order. Please try again.');
      });
  };

  const handleDepositClick = (plan, deposit) => {
    setSelectedPlan(plan);
    setSelectedDeposit(deposit);
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    // const token = AsyncStorage.getItem('access_token');
    // const token =
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNjZ9.jdMuX69iTmRDfkSASm4BTk8Xx0c8KirGO-pxYV5RhEk';
    const token = AsyncStorage.getItem('access_token');
    //AsyncStorage.getItem('access_token');
    console.log('GET MEMBERSHIP TOKEN ::', token);
    const membershipPlanId = selectedDeposit.membershipPlanId;
    console.log(
      'GET MEMBERSHIP selectedDeposit.membershipPlanId ::',
      selectedDeposit.membershipPlanId,
    );
    console.log(
      'GET MEMBERSHIP selectedDeposit.amount ::',
      selectedDeposit.amount,
    );
    createOrderApiFunction(selectedDeposit.amount, membershipPlanId, token);
    setIsPopupVisible(false);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.plan}>
          <Text style={styles.planTitle}>Membership Plans for You</Text>
          {<GradientBackground />}
          <View style={styles.gradient} />

          {plans.map((plan, index) => (
            <View key={index}>
              <Text style={styles.planTitle2}>
                {plan.type} <Text style={styles.planNote}>{plan.note}</Text>
              </Text>

              {plan.deposits.length > 0 ? (
                plan.deposits.map((deposit, depositIndex) => (
                  <View key={depositIndex} style={styles.depositItem}>
                    <Text style={{color: '#FF9D0A'}}>
                      ►<Text />
                      <Text style={styles.depositText}> Deposit </Text>
                      <Text style={styles.amount}>₹{deposit.amount}</Text>{' '}
                      <Text style={{color: '#000'}}>and get</Text>{' '}
                      <Text style={styles.amount}>₹{deposit.perVideo}</Text>
                      <Text style={{color: '#000'}}> {''}per video.</Text>
                    </Text>
                    <TouchableOpacity
                      style={styles.depositButton}
                      onPress={() => handleDepositClick(plan, deposit)}>
                      <Text style={styles.buttonText}>Deposit</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : plan.free ? (
                <Text style={styles.freePlan}>
                  Get <Text style={styles.amount}>₹{plan.free.videoPoint}</Text>{' '}
                  per video for free.
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal transparent={true} visible={isPopupVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text>
              Are you sure you want to proceed with the payment for{' '}
              {selectedPlan?.type} plan of ₹{selectedDeposit?.amount}?
            </Text>
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
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  membershipContainer: {
    width: '100%',
    maxWidth: 370,
    paddingHorizontal: 10, // shorthand for padding-left and padding-right
    height: 442,
    fontSize: 14,
    borderRadius: 2,
    marginBottom: 15,
    marginTop: 50,
    borderWidth: 1, // border equivalent to outline
    borderColor: 'rgba(0, 0, 0, 0.1)', // outline color
    shadowColor: '#000', // shadow color (for iOS and Android)
    shadowOffset: {width: 0, height: 2}, // shadow offset
    shadowOpacity: 0.1, // shadow opacity (iOS)
    shadowRadius: 5, // shadow blur radius (iOS)
    elevation: 2, // Android equivalent of box-shadow
  },
  gradient: {
    backgroundColor: '#dc3545',
    padding: 1,
    width: '50%',
    marginBottom: '20',
    // Adjust the size as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  plan: {
    marginBottom: 16,
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plansTitle: {
    marginBottom: 3,
    fontSize: 16,
    fontWeight: 700,
    marginTop: 6,
  },
  planTitle2: {
    fontSize: 18,
    padding: 2,
    fontWeight: 'bold',
    color: '#000',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#000',
    alignContent: 'center',
    alignItems: 'center',
  },
  planNote: {
    fontSize: 14,
    color: 'white',
    backgroundColor: 'orange',
    padding: 5,
  },
  depositItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
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
});

export default MembershipPlans;
