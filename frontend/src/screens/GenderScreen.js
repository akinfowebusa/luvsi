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
import { setItem, getItem } from '../utils/storage'; 

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];

const GenderScreen = ({ navigation, route }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const { education, height } = route.params || {};

  const handleContinue = async () => {
    if (!selectedGender) {
      Alert.alert("Validation Error", "Please select your gender.");
      return;
    }

    try {
      
      await setItem('Gender', selectedGender);
      console.log(" Gender stored successfully:", selectedGender);

      
      const storedGender = await getItem('Gender');
      console.log(" Retrieved from AsyncStorage:", storedGender);

      // Alert.alert("Success", `Gender "${storedGender}" saved successfully!`);

     
      navigation.navigate('HeightScreen', {
        education: education,
        height: height,
        gender: selectedGender,
      });

    } catch (error) {
      console.error(" Error saving gender:", error);
      Alert.alert("Error", "Failed to save gender. Try again!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('HeightScreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

     
      <Text style={styles.title}>What's your gender?</Text>
      <Text style={styles.subtitle}>Choose the option that best describes you.</Text>

      
      <ScrollView style={{ marginTop: 20 }}>
        {genderOptions.map((gender, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedGender === gender && styles.selectedOption
            ]}
            onPress={() => setSelectedGender(gender)}
          >
            <Text style={styles.optionText}>{gender}</Text>
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

export default GenderScreen;
