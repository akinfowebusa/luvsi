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
import Ionicon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { setItem, getItem } from '../utils/storage';

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
      const [day, month, year] = parts.map(part => parseInt(part, 10));

      if (day > 31 || month > 12) {
        return null;
      }

      const parsed = new Date(`${year}-${month}-${day}`);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  };

  const handleDateChange = (text) => {
  
    const cleanText = text.replace(/[^0-9]/g, '');

   
    let formattedText = '';
    if (cleanText.length > 0) {
      formattedText += cleanText.substring(0, 2);
    }
    if (cleanText.length > 2) {
      formattedText += '-' + cleanText.substring(2, 4);
    }
    if (cleanText.length > 4) {
      formattedText += '-' + cleanText.substring(4, 8);
    }
    
    setDobInput(formattedText);
  };

  const handleContinue = async () => {
    let finalDate = dateOfBirth;

    if (!finalDate && dobInput) {
      finalDate = parseDate(dobInput);
    }

    if (!finalDate) {
      Alert.alert('Validation Error', 'Please select or enter a valid date of birth. (DD-MM-YYYY, max day: 31, max month: 12)');
      return;
    }

    try {
      const dobString = finalDate.toISOString();
      await setItem('DateOfBirth', dobString);
      console.log(" Date of Birth stored successfully:", dobString);
      navigation.navigate('GenderScreen', { dateOfBirth: dobString });
    } catch (error) {
      console.error(' Error saving Date of Birth:', error);
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicon name="chevron-back" size={28} color="#000" />

      </TouchableOpacity>
      {/* <Image
        source={{ uri: 'https://i.ibb.co/0rJZzZx/heart.png' }}
        style={styles.heartIcon}
      /> */}

      <Text style={styles.heading}>What is your Date of Birth?</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="DD-MM-YYYY"
          value={dobInput}
          onChangeText={handleDateChange}
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

      {showPicker && (
        <DateTimePicker
          value={dateOfBirth || new Date(2000, 0, 1)}
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

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
 backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    padding: 5,
  },
  backText: { fontSize: 16, color: '#333', marginLeft: 5, fontWeight: "bold" }

});

export default DateOfBirthScreen;