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

const KidLevels = [
  "Yes, I have kids",
  "No, I don't have kids",
  "Someday, I want kids",
  "No, I don't want kids",
  "It's complicated"
];

const KidScreen = ({ navigation }) => {
  const [selectedKid, setSelectedKid] = useState(null);

  const handleContinue = async () => {
    if (!selectedKid) {
      Alert.alert("Validation Error", "Please select your Kid Preference.");
      return;
    }

    try {
      
      await AsyncStorage.setItem("Kid", selectedKid);
      console.log("Kid Preference stored locally:", selectedKid);

      
      navigation.navigate('ExerciseScreen', { kid: selectedKid });
    } catch (error) {
      console.error("Storage Error:", error.message);
      Alert.alert("Error", "Something went wrong while saving your kid preference.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExerciseScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.title}>Do You have Kids?</Text>
      <Text style={styles.subtitle}>Select the option that best describes you.</Text>

     
      <ScrollView style={{ marginTop: 20 }}>
        {KidLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedKid === level && styles.selectedOption
            ]}
            onPress={() => setSelectedKid(level)}
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

export default KidScreen;

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
