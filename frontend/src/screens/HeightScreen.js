import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setItem } from '../utils/storage';

const HeightScreen = ({ navigation }) => {
  const [height, setHeight] = useState('');

  const handleContinue = async () => {
    if (!height.trim()) {
      Alert.alert('Validation Error', 'Please enter your height in cm.');
      return;
    }

    if (isNaN(height)) {
      Alert.alert('Validation Error', 'Height must be a number (in cm).');
      return;
    }

    try {
      await setItem('Height', height);
      console.log("✅ Height stored successfully:", height);
      navigation.navigate('SignScreen', { height });
    } catch (error) {
      console.error("❌ Error saving height:", error);
    }
  };

  const handleChangeText = (text) => {
    if (/^\d*$/.test(text)) {
      setHeight(text);
    } else {
      Alert.alert("Invalid Input", "Please enter only numbers (in cm).");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '50%' }]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SignScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Body (Title + Input) */}
      <View style={styles.body}>
        <Text style={styles.title}>How tall are you?</Text>
        <Text style={styles.subtitle}>Enter your height in centimeters.</Text>

        <TextInput
          style={styles.input}
          placeholder="Height in cm"
          value={height}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      {/* Button fixed at bottom */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8BBD0', padding: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  backText: { fontSize: 18, fontWeight: 'bold' },
  skipText: { color: '#d6336c', fontWeight: '600' },
  progressBar: {
    flex: 1, height: 6, backgroundColor: '#ddd', borderRadius: 3, marginHorizontal: 20
  },
  progressFill: { height: 6, backgroundColor: '#000', borderRadius: 3 },

  body: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 30,
    textAlign: "center",
    width: '90%',
  },

  continueButton: {
    backgroundColor: '#F06292',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 500,  // safe spacing from bottom
  },
  continueText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default HeightScreen;
