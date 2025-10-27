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

const exerciseLevels = [
  "Never",
  "Occasionally",
  "Regularly",
  "Often",
  "Daily"
];

const ExerciseScreen = ({ navigation }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleContinue = async () => {
    if (!selectedExercise) {
      Alert.alert("Validation Error", "Please select your Exercise type.");
      return;
    }

    try {
      
      await AsyncStorage.setItem("Exercise", selectedExercise);
      console.log("Exercise stored locally:", selectedExercise);

      
      navigation.navigate('PersonalityScreen', { exercise: selectedExercise });
    } catch (error) {
      console.error("Storage Error:", error.message);
      Alert.alert("Error", "Something went wrong while saving your exercise preference.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoadingAnimationScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

    
      <Text style={styles.title}>Do You Exercise?</Text>
      <Text style={styles.subtitle}>Select the option that best describes you.</Text>

      
      <ScrollView style={{ marginTop: 20 }}>
        {exerciseLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedExercise === level && styles.selectedOption
            ]}
            onPress={() => setSelectedExercise(level)}
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

export default ExerciseScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8BBD0', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skipText: { color: '#d6336c', fontWeight: '600' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 10 },
  option: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10 },
  selectedOption: { borderWidth: 2, borderColor: '#F06292' },
  optionText: { fontSize: 16, color: '#333' },
  continueButton: { backgroundColor: '#F06292', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  continueText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
