import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';

const WithdrawAmount = () => {
    const route = useRoute();
    const initialBalance = Number(route.params?.balance) || 0;

    const [amount, setAmount] = useState(initialBalance); 
    const [balance, setBalance] = useState(initialBalance);
    const [upiId, setUpiId] = useState('');
    const [isValid, setIsValid] = useState(true);

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString()}`;
    };

    const validateUpiId = (id) => {
        const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
        return upiPattern.test(id);
    };

    const handleUPInputChange = (value) => {
        setUpiId(value);
        setIsValid(validateUpiId(value));
    };

    const handleSubmit = () => {
        if (isValid) {
            Alert.alert('Success', 'UPI ID is valid!');
        } else {
            Alert.alert('Error', 'Please enter a valid UPI ID.');
        }
    };

    useEffect(() => {
        setBalance(initialBalance);
    }, [initialBalance]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Balance</Text>
            <Text style={styles.balance}>{formatCurrency(balance)}</Text>
            <View style={styles.withdrawSection}>
                <Text style={styles.instruction}>Select amount you want to withdraw</Text>
                <Text style={styles.amountBox}>{formatCurrency(amount)}</Text>
                <Slider
                    minimumValue={0}
                    maximumValue={balance}
                    value={amount}
                    onValueChange={setAmount}
                    style={styles.slider}
                />
                <View style={styles.sliderLabels}>
                    <Text>₹0</Text>
                    <Text>{formatCurrency(balance)}</Text>
                </View>
            </View>
            <View style={styles.upiSection}>
                <Text style={styles.upiTitle}>Enter your UPI ID</Text>
                <TextInput
                    style={[styles.upiInput, !isValid && styles.invalid]}
                    placeholder="Your UPI ID"
                    value={upiId}
                    maxLength={50}
                    onChangeText={handleUPInputChange}
                />
                {!isValid && <Text style={styles.errorMessage}>Invalid UPI ID format.</Text>}
                <Text style={styles.instruction}>Enter Your UPI ID to Receive Amount</Text>
            </View>
            <Button title="Withdraw Amount" onPress={handleSubmit} />
            <Text style={styles.safetyNote}>100% Safe & Secure</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    balance: {
        color: 'green',
        fontSize: 20,
        marginVertical: 10,
    },
    withdrawSection: {
        marginVertical: 20,
        width: '100%',
    },
    instruction: {
        fontSize: 16,
    },
    amountBox: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    upiSection: {
        marginVertical: 20,
        width: '100%',
    },
    upiTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    upiInput: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    invalid: {
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
    },
    safetyNote: {
        marginTop: 20,
        textAlign: 'center',
    },
});

export default WithdrawAmount;
