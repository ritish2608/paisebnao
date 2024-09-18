import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { handleGetMembership } from './api';
import { useNavigation } from '@react-navigation/native';

const MembershipPlans = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedDeposit, setSelectedDeposit] = useState(null);
    const [newplans, setPlans] = useState([]);
    const [withdrawalDays, setWithdrawalDays] = useState(8);
    const navigation = useNavigation(); // Used for navigation
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const plans = [
        {
            type: 'Normal',
            note: 'Withdrawal in 7 days',
            details: ['Without Membership get ₹1 per video.'],
            deposits: []
        },
        {
            type: 'Standard',
            note: 'Withdrawal in 3 days',
            details: [
                'Deposit ₹19 and get ₹2 per video.',
                'Deposit ₹49 and get ₹5 per video.',
                'Deposit ₹99 and get ₹10 per video.'
            ],
            deposits: [
                { amount: 19, perVideo: 2 },
                { amount: 49, perVideo: 5 },
                { amount: 99, perVideo: 10 }
            ]
        },
        {
            type: 'VIP',
            note: 'Withdrawal in 1 day',
            details: [
                'Deposit ₹249 and get ₹35 per video.',
                'Deposit ₹499 and get ₹80 per video.'
            ],
            deposits: [
                { amount: 249, perVideo: 35 },
                { amount: 499, perVideo: 80 }
            ]
        }
    ];

    useEffect(() => {
        const fetchMembershipData = async () => {
            try {
                const plans = await handleGetMembership();
                console.log(data, "membership data");
                
                console.error('membership data:withdrawal_day', data[0]?.withdrawal_day);
                setWithdrawalDays(data[0]?.withdrawal_days);
                setPlans(data[0]?.video_point);
                       console.log(withdrawalDays, "withdrawalDays data count");
            } catch (error) {
                console.error('Error fetching membership data:', error);
            }
        };

        fetchMembershipData();
    }, []);

    const handleDepositClick = (plan, deposit) => {
        setSelectedPlan(plan);
        setSelectedDeposit(deposit);
        setIsPopupVisible(true);
    };

    const handleConfirm = () => {
        setIsPopupVisible(false);
        // Redirect to platform-fee page after confirming the payment
        navigation.navigate('PlatformFee', {
            plan: selectedPlan.type,
            amount: selectedDeposit.amount,
            perVideo: selectedDeposit.perVideo
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Membership Plans for You</Text>
            {plans.map((plan, index) => (
                <View key={index} style={styles.plan}>
                    <Text style={styles.planTitle}>
                        {plan.type}{' '}
                        <Text style={styles.planNote}>Withdrawal in {withdrawalDays} days</Text>
                    </Text>
                    {plan.details.map((detail, index) => (
                        <View key={index} style={styles.planDetail}>
                            {plan.type === 'Normal' && (
                                <>
                                    <Text style={styles.bullet}>►</Text>
                                   
                                      <Text>New in {newplans} days</Text>
                                </>
                            )}
                        </View>
                    ))}
                    {plan.deposits.length > 0 && (
                        <View style={styles.deposits}>
                            {plan.deposits.map((deposit, index) => (
                                <View key={index} style={styles.depositItem}>
                                    <Text style={styles.bullet}>►</Text>
                                    <Text>
                                        Deposit{' '}
                                        <Text style={styles.amount}>₹{deposit.amount}</Text> and get{' '}
                                        <Text style={styles.amount}>₹{deposit.perVideo}</Text> per video.
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.depositButton}
                                        onPress={() => handleDepositClick(plan, deposit)}
                                    >
                                        <Text style={styles.buttonText}>Deposit</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            ))}

            {isPopupVisible && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Confirm Payment</Text>
                            <Text style={styles.modalText}>
                                Are you sure you want to proceed with the payment for{' '}
                                {selectedPlan?.type} plan of ₹{selectedDeposit?.amount}?
                            </Text>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsPopupVisible(false)}
                            >
                                <Text style={styles.buttonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    plan: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3
    },
    planTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    planNote: {
        color: 'red',
    },
    planDetail: {
        flexDirection: 'row',
        marginBottom: 5
    },
    bullet: {
        marginRight: 5
    },
    deposits: {
        marginTop: 10
    },
    depositItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    depositButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    amount: {
        color: 'green',
        fontWeight: 'bold'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    cancelButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5
    }
});

export default MembershipPlans;
