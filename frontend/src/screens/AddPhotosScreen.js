import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';

const AddPhotosScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);

  // Request storage/photo permission safely
  const requestStoragePermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY;

      const result = await request(permission);
      return result === 'granted';
    } catch (err) {
      console.warn('Permission error', err);
      return false;
    }
  };

  const pickImage = async () => {
    // Request permission on button press
    const granted = await requestStoragePermission();
    if (!granted) {
      Alert.alert('Permission required', 'App needs access to your photos.');
      return;
    }

    if (photos.length >= 6) {
      Alert.alert('Limit reached', 'You can upload maximum 6 photos.');
      return;
    }

    // Launch image picker
    launchImageLibrary(
      { mediaType: 'photo', quality: 1, selectionLimit: 1 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setPhotos([...photos, uri]);
        }
      }
    );
  };

  const handleContinue = () => {
    if (photos.length < 2) {
      Alert.alert('Minimum photos', 'Please add at least 2 photos.');
      return;
    }
    navigation.navigate('FindCrushScreen', { photos });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Add your first photos</Text>
      <Text style={styles.subtitle}>
        Choose photos that capture your personality and the things you love to do.
      </Text>

      {/* Photo Grid */}
      <View style={styles.grid}>
        {[...Array(6)].map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.photoBox}
            onPress={pickImage}
          >
            {photos[index] ? (
              <Image source={{ uri: photos[index] }} style={styles.photo} />
            ) : (
              <Text style={styles.plus}>＋</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tip */}
      <Text style={styles.tip}>🌟 How to choose the perfect picture</Text>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          photos.length < 2 && { backgroundColor: '#B0A9A9' },
        ]}
        onPress={handleContinue}
        disabled={photos.length < 2}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F0',
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  backArrow: {
    fontSize: 28,
    color: '#000',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoBox: {
    width: '30%',
    height: 100,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  plus: {
    fontSize: 28,
    color: '#999',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  tip: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPhotosScreen;
