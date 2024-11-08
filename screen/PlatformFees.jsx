// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   ScrollView,
// } from 'react-native';
// import {load} from '@cashfreepayments/cashfree-js';
// import {handleGetMembership, createOrder} from './api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const MembershipPlans = ({navigation}) => {
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [selectedDeposit, setSelectedDeposit] = useState(null);
//   const [plans, setPlans] = useState([]);
//   const [cashfree, setCashfree] = useState(null);

//   useEffect(() => {
//     load({mode: 'production'})
//       .then(cashfreeInstance => {
//         setCashfree(cashfreeInstance);
//         console.log('Cashfree SDK loaded successfully');
//       })
//       .catch(error => {
//         console.error('Error loading Cashfree SDK:', error);
//       });
//   }, []);

//   useEffect(() => {
//     const fetchMembershipData = async () => {
//       try {
//         const response = await handleGetMembership();
//         const data = response.data;

//         if (data && Array.isArray(data)) {
//           const groupedPlans = data.reduce((acc, plan) => {
//             const {
//               id,
//               membership_type,
//               video_point,
//               deposit_point,
//               withdrawl_days,
//             } = plan;

//             if (!acc[membership_type]) {
//               acc[membership_type] = {
//                 id,
//                 type: membership_type,
//                 note: `Withdrawal in ${withdrawl_days} days`,
//                 deposits: [],
//               };
//             }

//             if (deposit_point !== 'FREE') {
//               acc[membership_type].deposits.push({
//                 amount: parseInt(deposit_point),
//                 perVideo: parseInt(video_point),
//                 membershipPlanId: id,
//               });
//             } else {
//               acc[membership_type].free = {
//                 videoPoint: video_point,
//                 depositPoint: deposit_point,
//               };
//             }

//             return acc;
//           }, {});

//           setPlans(Object.values(groupedPlans));
//         } else {
//           //   Toast.show({
//           //     text1: 'Failed to fetch membership data. Please try again.',
//           //   });
//         }
//       } catch (error) {
//         console.error('Error fetching membership data:', error);
//         // Toast.show({text1: 'Error fetching membership data.'});
//       }
//     };

//     fetchMembershipData();
//   }, []);

//   const createOrderApiFunction = (deposit, membershipPlanId, token) => {
//     createOrder(deposit, membershipPlanId, token)
//       .then(data => {
//         const paymentSessionId = data?.data?.payment_session_id;

//         if (paymentSessionId) {
//           const handlePayment = () => {
//             if (cashfree) {
//               const checkoutOptions = {
//                 paymentSessionId: paymentSessionId,
//                 redirectTarget: '_self',
//               };

//               cashfree.checkout(checkoutOptions).then(result => {
//                 if (result.error) {
//                   console.log('Payment error: ', result.error);
//                   //   Toast.show({text1: 'Payment error. Please try again.'});
//                 } else if (result.paymentDetails) {
//                   console.log(
//                     'Payment completed: ',
//                     result.paymentDetails.paymentMessage,
//                   );
//                 }
//               });
//             } else {
//               console.log('Cashfree SDK not initialized yet');
//             }
//           };

//           handlePayment();
//         } else {
//           //  Toast.show({text1: 'Failed to retrieve payment session ID.'});
//         }
//       })
//       .catch(error => {
//         console.error('Error creating order:', error);
//         // Toast.show({text1: 'Error creating order. Please try again.'});
//       });
//   };

//   const handleDepositClick = (plan, deposit) => {
//     setSelectedPlan(plan);
//     setSelectedDeposit(deposit);
//     setIsPopupVisible(true);
//   };

//   const handleConfirm = () => {
//     const token = AsyncStorage.getItem('access_token');
//     const membershipPlanId = selectedDeposit.membershipPlanId;
//     createOrderApiFunction(selectedDeposit.amount, membershipPlanId, token);
//     setIsPopupVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backButton}></TouchableOpacity>
//       </View>
//       <ScrollView style={styles.plansList}>
//         {plans.map((plan, index) => (
//           <View key={index} style={styles.plan}>
//             <Text style={styles.planType}>{plan.type}</Text>
//             <Text style={styles.planNote}>{plan.note}</Text>

//             {plan.deposits.length > 0 ? (
//               plan.deposits.map((deposit, depositIndex) => (
//                 <View key={depositIndex} style={styles.depositItem}>
//                   <Text style={styles.bullet}>►</Text>
//                   <Text>
//                     Deposit <Text style={styles.amount}>₹{deposit.amount}</Text>{' '}
//                     and get
//                     <Text style={styles.amount}> ₹{deposit.perVideo}</Text> per
//                     video.
//                   </Text>
//                   <TouchableOpacity
//                     style={styles.depositButton}
//                     onPress={() => handleDepositClick(plan, deposit)}>
//                     <Text style={styles.depositButtonText}>Deposit</Text>
//                   </TouchableOpacity>
//                 </View>
//               ))
//             ) : plan.free ? (
//               <View style={styles.freePlan}>
//                 <Text style={styles.bullet}>►</Text>
//                 <Text>
//                   Get{' '}
//                   <Text style={styles.amount}> ₹{plan.free.videoPoint} </Text>{' '}
//                   per video for free.
//                 </Text>
//               </View>
//             ) : null}
//           </View>
//         ))}
//       </ScrollView>

//       <Modal visible={isPopupVisible} transparent={true} animationType="slide">
//         <View style={styles.popupOverlay}>
//           <View style={styles.popupContainer}>
//             <Text style={styles.popupTitle}>Confirm Payment</Text>
//             <Text>
//               Are you sure you want to proceed with the payment for{' '}
//               {selectedPlan?.type} plan of ₹{selectedDeposit?.amount}?
//             </Text>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 onPress={handleConfirm}
//                 style={styles.confirmButton}>
//                 <Text style={styles.buttonText}>Yes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => setIsPopupVisible(false)}
//                 style={styles.cancelButton}>
//                 <Text style={styles.buttonText}>No</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   backButton: {
//     padding: 10,
//   },
//   backButtonText: {
//     fontSize: 25,
//   },
//   plansList: {
//     marginTop: 20,
//   },
//   plan: {
//     marginBottom: 20,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//   },
//   planType: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   planNote: {
//     marginBottom: 10,
//   },
//   depositItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   bullet: {
//     marginRight: 5,
//   },
//   amount: {
//     color: 'green',
//     fontWeight: 'bold',
//   },
//   depositButton: {
//     marginLeft: 'auto',
//     backgroundColor: '#28a745',
//     padding: 10,
//     borderRadius: 5,
//   },
//   depositButtonText: {
//     color: '#fff',
//   },
//   freePlan: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   popupOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   popupContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//     alignItems: 'center',
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   confirmButton: {
//     marginTop: 16,
//     padding: 10,
//     backgroundColor: '#28a745',
//     borderRadius: 4,
//   },
// });

// export default MembershipPlans;
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Navigation
import {load} from '@cashfreepayments/cashfree-js'; // Assuming this is compatible with React Native
//import Toast from 'react-native-toast-message'; // For showing Toast messages
import PlatformFeesicon from '../../Paisebanao/assets/images/platformimg.png'; // Assuming //../../assets/images/platformimg.pngit's a local image
import {createOrder} from './api'; // Your API call for order creation

const PlatformFees = () => {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(null);
  const [cashfree, setCashfree] = useState(null);
  const navigation = useNavigation(); // For navigation

  useEffect(() => {
    load({mode: 'production'})
      .then(cashfreeInstance => {
        setCashfree(cashfreeInstance);
      })
      .catch(error => {
        console.error('Error loading Cashfree SDK:', error);
      });
  }, []);

  useEffect(() => {
    const amountFromQuery = '499'; // Set this directly or get from AsyncStorage or some source

    if (amountFromQuery) {
      setWithdrawalAmount(amountFromQuery);
    }
  }, []);

  const createOrderApiFunction = (depositAmount, token) => {
    createOrder(depositAmount, null, token)
      .then(data => {
        const paymentSessionId = data?.data?.payment_session_id;
        console.log('Order created successfully:', paymentSessionId);

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
                } else if (result.paymentDetails) {
                  console.log(
                    'Payment completed: ',
                    result.paymentDetails.paymentMessage,
                  );
                  // Toast.show({
                  //   type: 'success',
                  //   text1: 'Payment completed successfully!',
                  // });
                }
              });
            } else {
              console.log('Cashfree SDK not initialized yet');
            }
          };

          handlePayment();
        } else {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Failed to retrieve payment session ID.',
          // });
        }
      })
      .catch(error => {
        console.error('Error creating order:', error);
        // Toast.show({
        //   type: 'error',
        //   text1: 'Error processing payment. Please try again.',
        // });
        setIsPaymentProcessing(false);
      });
  };

  const handlePaymentClick = () => {
    setIsPaymentProcessing(true);
    const depositAmount = 499;
    const token = 'access_token_placeholder';
    createOrderApiFunction(depositAmount, token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay Platform Fee</Text>
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructions}>
          To proceed with the withdrawal of your funds, you arex required to pay
          a one-time platform fee of
          {'\n\n'}
          {/* <View style={styles.title}>
            <Text onPress={handlePaymentClick}>₹499/-</Text>
          </View> */}
          <View style={styles.container1}>
            <Text style={styles.platformAmount}> ₹499/-</Text>
          </View>
        </Text>
        <Text style={styles.instructions}>
          Once you have paid the fee, you will be able to withdraw your
          available balance directly to your account.
        </Text>
      </View>
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          onPress={handlePaymentClick}
          style={styles.paymentMethods}>
          <Image source={PlatformFeesicon} style={styles.paymentIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.safetyNote}>
        Once the payment is completed, you will be able to withdraw your funds
        instantly.
      </Text>

      <TouchableOpacity
        style={[
          styles.paymentButton,
          isPaymentProcessing && styles.processingButton,
        ]}
        onPress={handlePaymentClick}
        disabled={isPaymentProcessing}>
        <Text style={styles.paymentButtonText}>
          {isPaymentProcessing ? 'Processing...' : 'Pay ₹499'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    padding: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
  },
  containerbox: {
    borderWidth: 2,
    textAlign: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 3,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  submitText: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },

  platformAmount: {
    alignContent: 'center',
    fontSize: 20,
    padding: 20,
    alignItems: 'center',
    fontWeight: '500', // Use '800' for bold text
    color: 'red',
    borderColor: 'black', // Equivalent to 'outline'
    borderWidth: 1, // Border width
    borderRadius: 5,
    paddingVertical: 10, // Padding top and bottom
    paddingHorizontal: 20, // Padding left and right
  },
  title: {
    fontSize: 20,

    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'red',
  },
  instructionsContainer: {
    marginTop: 20,
    flex: 1,
    alignContent: 'center',
    marginBottom: 10,
  },
  instructions: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  amountText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
  paymentContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  paymentMethods: {
    padding: 20,
    borderRadius: 10,
  },
  paymentIcon: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  paymentButtonprs: {
    width: '200',
    height: '200',
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    borderBottomColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  paymentButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  processingButton: {
    backgroundColor: '#ccc',
  },
  paymentButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  safetyNote: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PlatformFees;
