import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const smokeLevels = [
  "Regularly",
  "Occasionally",
  "Trying to quit",
  "Never"
];

const SmokeScreen = ({ navigation }) => {
  const [selectedSmoke, setSelectedSmoke] = useState(null);

  const handleContinue = async () => {
    if (!selectedSmoke) {
      Alert.alert("Validation Error", "Please select your Smoke level.");
      return;
    }

    try {
     
      await AsyncStorage.setItem("Smoke", selectedSmoke);
      console.log("Smoke stored locally:", selectedSmoke);

      
      navigation.navigate('KidScreen', { smoke: selectedSmoke });
    } catch (error) {
      console.error("Storage Error:", error.message);
      Alert.alert("Error", "Something went wrong while saving your smoke preference.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('KidScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      
      <Text style={styles.title}>Do You Smoke?</Text>
      <Text style={styles.subtitle}>Edit or delete answer at any time</Text>

     
      <ScrollView style={{ marginTop: 20 }}>
        {smokeLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedSmoke === level && styles.selectedOption
            ]}
            onPress={() => setSelectedSmoke(level)}
          >
            <Text style={styles.optionText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SmokeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8BBD0', padding: 20 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  skipText: { color: '#d6336c', fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 10 },
  option: {
    backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10
  },
  selectedOption: { borderWidth: 2, borderColor: '#F06292' },
  optionText: { fontSize: 16, color: '#333' },
  continueButton: {
    backgroundColor: '#F06292', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10
  },
  continueText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
