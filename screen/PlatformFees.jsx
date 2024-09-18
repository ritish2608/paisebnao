import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import rupeeIcon from '../assets/images/rupee.png'; 
import PlatformFeesicon from '../assets/images/platformimg.png';
import Container from './Container';

const PlatformFees = () => {
    return (
        <Container>
            <View style={styles.platformFeesContainer}>
            
                <Text style={styles.title}>Platform Fees</Text>

                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructions}>• No Worries! Enter Your Email Address Below And We Will Send You A Code To Reset Password</Text>
                    <Text style={styles.instructions}>• No Worries! Enter Your Email Address Below And We Will Send You A Code To Reset Password</Text>
                </View>

                <View style={styles.paymentContainer}>
                    <Image source={PlatformFeesicon} style={styles.paymentIcon} />
                </View>

                <TouchableOpacity style={styles.verifyButton}>
                    <Text style={styles.buttonText}>Pay ₹299</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    platformFeesContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    instructionsContainer: {
        marginVertical: 20,
    },
    instructions: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    paymentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    paymentIcon: {
        width: 100,
        height: 100,
    },
    verifyButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlatformFees;
