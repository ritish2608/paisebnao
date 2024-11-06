import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';

const PaymentForm = () => {
  const [orderId, setOrderId] = useState('');
  const [orderAmount, setOrderAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handlePayment = async () => {
    const formData = new URLSearchParams();
    formData.append('order_id', orderId);
    formData.append('order_amount', orderAmount);
    formData.append('customer_name', customerName);
    formData.append('customer_email', customerEmail);
    formData.append('customer_phone', customerPhone);

    try {
      const response = await fetch('/create-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': document.cookie.split('csrftoken=')[1],
        },
        body: formData,
      });

      const data = await response.json();
      if (data.cftoken) {
        // Initialize Cashfree and initiate payment
        window.Cashfree.init({
          orderId: orderId,
          orderAmount: orderAmount,
          tokenData: data.cftoken,
          orderCurrency: 'INR',
          appId: process.env.REACT_APP_CASHFREE_APP_ID,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
        });
        window.Cashfree.pay();
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'There was an error processing your payment.');
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24}}>Pay with Cashfree</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Order ID"
        value={orderId}
        onChangeText={setOrderId}
        required
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Amount"
        value={orderAmount}
        onChangeText={setOrderAmount}
        required
        keyboardType="numeric"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
        required
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Customer Email"
        value={customerEmail}
        onChangeText={setCustomerEmail}
        required
        keyboardType="email-address"
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
        placeholder="Customer Phone"
        value={customerPhone}
        onChangeText={setCustomerPhone}
        required
        keyboardType="phone-pad"
      />
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentForm;
