import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setItem } from '../utils/storage';   // ✅ AsyncStorage helper

const LookingForScreen = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    'Long-term relationship',
    'Short-term relationship',
    'We’ll see (if the feeling is right)',
    'Friendship',
    'Hangout',
    'Friends with benefits',
    'Open relationship',
  ];

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleContinue = async () => {
    if (selectedOptions.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one option.');
      return;
    }

    try {
      // ✅ Store locally in AsyncStorage
      await setItem('LookingFor', JSON.stringify(selectedOptions));
      console.log("✅ LookingFor stored locally:", selectedOptions);

      // ✅ Navigate to next screen
      navigation.navigate('UserProfileScreen', { selectedOptions });

    } catch (error) {
      console.error("❌ Storage Error:", error.message);
      Alert.alert("Error", "Something went wrong while saving your preferences.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('EducationScreen')}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>What are you looking for?</Text>
      <Text style={styles.subtitle}>
        Choose the option(s) that suits you best.
      </Text>

      {/* Options */}
      <ScrollView style={styles.scrollContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOptions.includes(option) && styles.selectedOption,
            ]}
            onPress={() => toggleOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
            <View
              style={[
                styles.checkbox,
                selectedOptions.includes(option) && styles.checkedBox,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedOptions.length === 0 && styles.disabledButton,
        ]}
        onPress={handleContinue}   // ✅ Now saving to AsyncStorage before navigation
        disabled={selectedOptions.length === 0}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4EF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  skip: {
    fontSize: 16,
    color: '#8E8E8E',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E8E',
    marginBottom: 20,
  },
  scrollContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  selectedOption: {
    borderColor: '#F06292',
  },
  checkedBox: {
    backgroundColor: '#F06292',
    borderColor: '#F06292',
  },
  continueButton: {
    backgroundColor: '#F06292',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#E8A8C1',
  },
  continueText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LookingForScreen;
