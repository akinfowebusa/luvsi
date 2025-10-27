import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';


// import { requestLocationPermission, getCurrentLocation } from '../utils/LocationServices';

const AuthScreen = ({ navigation }) => {
  const images = [
    require('../assets/auth1.jpg'),
    require('../assets/auth2.jpg'),
    require('../assets/auth3.jpg'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  // const [location, setLocation] = useState(null);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  // useEffect(() => {
  //   const initLocation = async () => {
  //     try {
  //       const hasPermission = await requestLocationPermission();
  //       if (!hasPermission) return;

  //       const loc = await getCurrentLocation();
  //       if (loc) setLocation(loc); 
  //     } catch (err) {
  //       console.log('Location init failed:', err);
  //     }
  //   };

  //   initLocation();
  // }, []);

  return (
    <ImageBackground
      source={images[currentIndex]}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Luvsi</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.socialButton, { backgroundColor: '#000' }]}
            onPress={() => navigation.navigate('UserProfileScreen')}
          >
            <Icon name="logo-apple" size={20} color="#fff" style={styles.icon} />
            <Text style={[styles.socialText, { color: '#fff' }]}>
              Connect with Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' },
            ]}
            onPress={() => navigation.navigate('TermsOfServiceScreen')}
          >
            <Icon name="logo-google" size={20} color="#333" style={styles.icon} />
            <Text style={[styles.socialText, { color: '#333' }]}>
              Connect with Google
            </Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={[
              styles.socialButton,
              { backgroundColor: '#3b5998', borderWidth: 1, borderColor: '#ccc' },
            ]}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Icon name="logo-facebook" size={20} color="#fff" style={styles.icon} />
            <Text style={[styles.socialText, { color: '#fff' }]}>
              Connect with Facebook
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>
          When you sign up, you accept our
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('TermsOfServiceScreen')}
          >
            {' '}
            terms of service{' '}
          </Text>
          and our
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
          >
            {' '}
            privacy policy
          </Text>
          .
        </Text>

        
        {/* {location && (
          <Text style={styles.locationText}>
             Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
          </Text>
        )} */}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  titleContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  buttonContainer: { marginBottom: 40 },
  socialButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderRadius: 50, marginBottom: 15, justifyContent: 'center' },
  icon: { marginRight: 10 },
  socialText: { fontSize: 16, fontWeight: '600' },
  footerText: { textAlign: 'center', fontSize: 12, color: '#fff', marginBottom: 10 },
  link: { color: '#FFD700', fontWeight: '600' },
  locationText: { textAlign: 'center', color: '#fff', fontSize: 13, marginBottom: 10 },
});

export default AuthScreen;
