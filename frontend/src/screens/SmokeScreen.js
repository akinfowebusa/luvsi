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
import { setItem } from '../utils/storage'; // ✅ AsyncStorage utils

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
      await setItem("Smoke", selectedSmoke);
      console.log("✅ Smoke stored successfully:", selectedSmoke);
      navigation.navigate('NextScreen', { smoke: selectedSmoke });
    } catch (error) {
      console.error("❌ Error saving education:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('NextScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Do You Smoke?</Text>
      <Text style={styles.subtitle}>Edit or delete answer at any time</Text>

      {/* Education Options */}
      <ScrollView style={{ marginTop: 20 }}>
        {educationLevels.map((level, index) => (
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

      {/* Continue Button */}
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

export default SmokeScreen;
