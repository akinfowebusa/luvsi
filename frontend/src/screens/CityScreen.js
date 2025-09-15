// import React, { useState } from 'react';
// import { checkValue, setItem } from '../utils/storage';
// import {
//   Text,
//   StyleSheet,
//   StatusBar,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   Alert
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const CityScreen = ({ navigation }) => {
//   const [city, setCity] = useState('');

//   const handleContinue = async () => {
//     if (city.trim() === '') {
//       Alert.alert('Validation Error', 'Please enter your city name.');
//       return;
//     }

//     try {
//       await setItem('City', city); // ✅ Save to storage
//       navigation.navigate('NameScreen', { city });
//     } catch (error) {
//       console.error('Error saving city:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.pageContainer}>
//       <StatusBar barStyle="dark-content" />

//       {/* Decorative Image */}
//       <Image
//         source={{ uri: 'https://i.ibb.co/0rJZzZx/heart.png' }}
//         style={styles.heartIcon}
//       />

//       {/* Heading */}
//       <Text style={styles.heading}>What City do you live in?</Text>

//       {/* Input Field */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your city"
//         value={city}
//         onChangeText={setCity}
//       />

//       {/* Continue Button */}
//       <TouchableOpacity style={styles.button} onPress={handleContinue}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   pageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFEBEE',
//     padding: 20,
//   },
//   heartIcon: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#D81B60',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     width: '90%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 12,
//     fontSize: 16,
//     backgroundColor: '#fff',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#F06292',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 12,
//     elevation: 3,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default CityScreen;



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

const CityScreen = ({ navigation }) => {
  const [city, setCity] = useState('');

  const handleContinue = async () => {
    if (city.trim() === '') {
      Alert.alert('Validation Error', 'Please enter your city name.');
      return;
    }

    try {
      // ✅ Save city to AsyncStorage
      await setItem('City', city);
      console.log("✅ City stored successfully:", city);

      // ✅ Double-check from AsyncStorage
      const storedCity = await getItem('City');
      console.log("📦 Retrieved from AsyncStorage:", storedCity);

      // Alert.alert("Success", `City "${storedCity}" saved successfully!`);

      // ✅ Navigate to next screen
      navigation.navigate('NameScreen', { city });

    } catch (error) {
      console.error('❌ Error saving city:', error);
      Alert.alert("Error", "Failed to save city. Try again!");
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <StatusBar barStyle="dark-content" />

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
});

export default CityScreen;
