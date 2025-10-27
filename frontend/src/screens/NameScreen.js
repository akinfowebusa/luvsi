import React, { useState } from 'react';
import { getItem, setItem } from '../utils/storage';
import {
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';

const NameScreen = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleContinue = async () => {
    if (name.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }

    try {
      
      await setItem('Name', name);
      console.log(" Name stored successfully:", name);

      
      const storedName = await getItem('Name');
      console.log(" Retrieved from AsyncStorage:", storedName);

      // Alert.alert("Success", `Name "${storedName}" saved successfully!`);

      
      navigation.navigate('DateOfBirthScreen', { name });

    } catch (error) {
      console.error(' Error saving name:', error);
      Alert.alert('Error', 'Failed to save name. Try again!');
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

      
      <Text style={styles.heading}>Enter your Name?</Text>

      
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={name}
        onChangeText={setName}
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
   backButton: {
    position: 'absolute',
    top: 0,
    left: 10,
    padding: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
  },
  backText: { fontSize: 16, color: '#333', marginLeft: 5, fontWeight: "bold" }
});

export default NameScreen;
