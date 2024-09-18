import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backicon from '.././assets/images/backicon.png'; // Ensure the path to the image is correct
import paisebnaotext from '.././assets/images/paisebnaotext.png'; // Ensure the path to the image is correct

const Header = () => {
    const navigation = useNavigation();

    const goBack = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Image source={backicon} style={styles.backIcon} />
            </TouchableOpacity>
            <Image source={paisebnaotext} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    logo: {
        width: 150,
        height: 40,
    },
});

export default Header;
