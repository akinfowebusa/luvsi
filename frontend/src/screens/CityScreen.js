import React, { useState } from 'react';
import { setItem, getItem } from '../utils/storage'; 
import {
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';

const CityScreen = ({ navigation }) => {
  const [city, setCity] = useState('');

  const handleContinue = async () => {
    if (city.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your city name.');
      return;
    }

    try {
      // Store city as JSON string
      await setItem('City', JSON.stringify(city));
      console.log("City stored successfully:", city);

      // Retrieve and safely parse back
      const rawCity = await getItem('City');

      let storedCity;
      try {
        storedCity = JSON.parse(rawCity);
      } catch {
        storedCity = rawCity; // fallback if not JSON
      }

      console.log("Retrieved from AsyncStorage:", storedCity);
      navigation.navigate('NameScreen', { city: storedCity });

    } catch (error) {
      console.error('Error saving city:', error);
      Alert.alert("Error", "Failed to save city. Try again!");
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" />
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicon name="chevron-back" size={28} color="#000" />
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://i.ibb.co/0rJZzZx/heart.png' }}
        style={styles.heartIcon}
      />

      <Text style={styles.heading}>What City do you live in?</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
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
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 30,
    textAlign: 'center',
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
});

export default CityScreen;
