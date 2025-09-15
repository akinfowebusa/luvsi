import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setItem, getItem } from '../utils/storage'; // 👈 AsyncStorage utils

const DateOfBirthScreen = ({ navigation }) => {
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [dobInput, setDobInput] = useState("");

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const parseDate = (text) => {
    const parts = text.split("-");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const parsed = new Date(`${year}-${month}-${day}`);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  };

  const handleContinue = async () => {
    let finalDate = dateOfBirth;

    if (!finalDate && dobInput) {
      finalDate = parseDate(dobInput);
    }

    if (!finalDate) {
      Alert.alert('Validation Error', 'Please select or enter a valid date of birth.');
      return;
    }

    try {
      await setItem('DateOfBirth', finalDate.toISOString());
      console.log("✅ Date of Birth stored successfully:", finalDate.toISOString());

      const storedDob = await getItem('DateOfBirth');
      console.log("📦 Retrieved from AsyncStorage:", storedDob);

      navigation.navigate('GenderScreen', { dateOfBirth: finalDate });

    } catch (error) {
      console.error('❌ Error saving Date of Birth:', error);
      Alert.alert("Error", "Failed to save date of birth. Try again!");
    }
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      setDobInput(formatDate(selectedDate));
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" />

      {/* Decorative Image */}
      <Image
        source={{ uri: 'https://i.ibb.co/0rJZzZx/heart.png' }}
        style={styles.heartIcon}
      />

      {/* Heading */}
      <Text style={styles.heading}>What is your Date of Birth?</Text>

      {/* Date Input with Calendar Icon */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="DD-MM-YYYY"
          value={dobInput}
          onChangeText={(text) => setDobInput(text)}
          keyboardType="numeric"
          maxLength={10}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.icon}>📅</Text>
        </TouchableOpacity>
      </View>

      {/* Show Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={dateOfBirth || new Date(2000, 0, 1)}
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    padding: 20,
  },
  heartIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D81B60',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
  },
  icon: {
    fontSize: 22,
  },
  button: {
    backgroundColor: '#F06292',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DateOfBirthScreen;
