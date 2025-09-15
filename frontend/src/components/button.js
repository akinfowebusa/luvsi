import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const Button = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Get Started →</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    position: "Center",
    bottom: 80,
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
    
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    position:"center",
  }
});
