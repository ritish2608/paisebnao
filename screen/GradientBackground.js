import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = () => {
  return (
    <View style={styles.gradient}>
      <LinearGradient
        colors={['#ffffff', '#ff0000', '#ffffff']} // Define the gradient colors
        start={{x: 0, y: 0}} // Gradient start point (left)
        end={{x: 1, y: 0}} // Gradient end point (right)
        style={styles.gradientBackground} // Apply styles for width and height
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    padding: 1,
    width: 500,
    marginHorizontal: 40,
    marginTop: 1,
    justifyContent: 'center',
    flex: 5, // Adjust the size as needed
    // Add any additional styles if necessary
  },
});

export default GradientBackground;
