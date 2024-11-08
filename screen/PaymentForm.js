import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';

const PaymentForm = () => {
  const [orderId, setOrderId] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handlePayment = async () => {
    // Prepare the form data
    const formData = new URLSearchParams();
    formData.append('order_id', orderId);
    formData.append('order_amount', orderAmount);
    formData.append('customer_name', customerName);
    formData.append('customer_email', customerEmail);
    formData.append('customer_phone', customerPhone);

    try {
      const response = await fetch(
        'https://api.paisebnao.com/v1/create-order/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (data.cftoken) {
        // Initialize payment with Cashfree API (you will need to adapt this)
        // Since React Native doesn't have `window.Cashfree`, you need to use a native package or bridge

        // Example of what could be done using Cashfree's React Native SDK (if available)
        // Install the Cashfree SDK for React Native or implement a bridge for this

        Alert.alert('Payment successful!', 'Redirecting to payment gateway.');
        // Replace the code below with actual payment gateway integration logic.
      } else {
        Alert.alert('Error', 'Unable to fetch payment token.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong with the payment.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pay with Cashfree</Text>

      <TextInput
        style={styles.input}
        placeholder="Order ID"
        value={orderId}
        onChangeText={setOrderId}
        keyboardType="default"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={orderAmount}
        onChangeText={setOrderAmount}
        keyboardType="numeric"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Customer Email"
        value={customerEmail}
        onChangeText={setCustomerEmail}
        keyboardType="email-address"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Customer Phone"
        value={customerPhone}
        onChangeText={setCustomerPhone}
        keyboardType="phone-pad"
        required
      />

      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
});

export default PaymentForm;
