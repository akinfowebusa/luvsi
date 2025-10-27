import { PermissionsAndroid, Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import * as RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Luvsi needs access to your location to show nearby matches.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      return true;
    } else {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to find nearby users.'
      );
      return false;
    }
  } catch (err) {
    console.warn('Permission error:', err);
    return false;
  }
}

export async function getCurrentLocation() {
  try {
    
    await new Promise(resolve => setTimeout(resolve, 500));

    if (
      Platform.OS === 'android' &&
      RNAndroidLocationEnabler?.promptForEnableLocationIfNeeded
    ) {
      try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        });
      } catch (e) {
        console.log('⚠️ GPS prompt skipped or failed:', e?.message);
      }
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('User location:', position.coords);
          resolve(position.coords);
        },
        (error) => {
          console.log('Location error:', error);

          if (error.code === 2) {
            Alert.alert(
              'GPS Disabled',
              'Please turn on your device location to use this feature.'
            );
          } else {
            Alert.alert('Error', 'Unable to fetch location.');
          }

          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  } catch (err) {
    console.log('Location init failed:', err);
    Alert.alert('Error', 'Unable to access location. Please try again.');
    return null;
  }
}
