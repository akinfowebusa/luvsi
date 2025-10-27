import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { setItem } from '../utils/storage'; 

const signs = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const SignScreen = ({ navigation }) => {
  const [selectedSign, setSelectedSign] = useState(null);

  const handleContinue = async () => {
    if (!selectedSign) {
      Alert.alert("Validation Error", "Please select your zodiac sign.");
      return;
    }

    try {
      await setItem("Sign", selectedSign);
      console.log(" Sign stored successfully:", selectedSign);
      navigation.navigate('EducationScreen', { sign: selectedSign });
    } catch (error) {
      console.error(" Error saving sign:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EducationScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>What's your sign?</Text>
      <Text style={styles.subtitle}>Edit or delete your answers anytime.</Text>

    
      <ScrollView style={{ marginTop: 20 }}>
        {signs.map((sign, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedSign === sign && styles.selectedOption
            ]}
            onPress={() => setSelectedSign(sign)}
          >
            <Text style={styles.optionText}>{sign}</Text>
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

export default SignScreen;
