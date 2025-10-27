import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setItem } from '../utils/storage'; 

const educationLevels = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Diploma",
  "Other"
];

const EducationScreen = ({ navigation }) => {
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleContinue = async () => {
    if (!selectedEducation) {
      Alert.alert("Validation Error", "Please select your education level.");
      return;
    }

    try {
      await setItem("Education", selectedEducation);
      console.log(" Education stored successfully:", selectedEducation);
      navigation.navigate('PleasureScreen', { education: selectedEducation });
    } catch (error) {
      console.error(" Error saving education:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('LookingForScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

    
      <Text style={styles.title}>What is your education level?</Text>
      <Text style={styles.subtitle}>Select the option that best describes you.</Text>

     
      <ScrollView style={{ marginTop: 20 }}>
        {educationLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedEducation === level && styles.selectedOption
            ]}
            onPress={() => setSelectedEducation(level)}
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

export default EducationScreen;
