// components/ProgressBar.js
import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginHorizontal: 20,
  },
  progressFill: {
    height: 6,
    backgroundColor: '#000',
    borderRadius: 3,
  },
});

export default ProgressBar;
