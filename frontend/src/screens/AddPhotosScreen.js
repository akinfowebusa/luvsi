// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Ionicon from 'react-native-vector-icons/Ionicons';
// import { PERMISSIONS, request } from 'react-native-permissions';

// const AddPhotosScreen = ({ navigation }) => {
//   const [photos, setPhotos] = useState([]);

//   const requestStoragePermission = async () => {
//     try {
//       const permission =
//         Platform.OS === 'android'
//           ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//           : PERMISSIONS.IOS.PHOTO_LIBRARY;

//       const result = await request(permission);
//       return result === 'granted';
//     } catch (err) {
//       console.warn('Permission error', err);
//       return false;
//     }
//   };

//   const pickImage = async () => {
//     const granted = await requestStoragePermission();
//     if (!granted) {
//       Alert.alert('Permission required', 'App needs access to your photos.');
//       return;
//     }

//     if (photos.length >= 6) {
//       Alert.alert('Limit reached', 'You can upload maximum 6 photos.');
//       return;
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', quality: 1, selectionLimit: 1 },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorMessage) {
//           console.log('Image Picker Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const uri = response.assets[0].uri;
//           setPhotos([...photos, uri]);
//         }
//       }
//     );
//   };

  
//   const removePhoto = (index) => {
//     const updatedPhotos = photos.filter((_, i) => i !== index);
//     setPhotos(updatedPhotos);
//   };

//   const handleContinue = () => {
//     if (photos.length < 2) {
//       Alert.alert('Minimum photos', 'Please add at least 2 photos.');
//       return;
//     }
//     console.log('Photos to submit:', photos);
//     navigation.navigate('FindCrushScreen', { photos });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicon name="chevron-back" size={28} color="#000" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.title}>Add your first photos</Text>
//       <Text style={styles.subtitle}>
//         Choose photos that capture your personality and the things you love to do.
//       </Text>

//       <View style={styles.grid}>
//         {[...Array(6)].map((_, index) => (
//           <View key={index} style={styles.photoBox}>
//             {photos[index] ? (
//               <>
//                 <Image source={{ uri: photos[index] }} style={styles.photo} />
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removePhoto(index)}
//                 >
//                   <Ionicon name="close-circle" size={24} color="#87849e51" />
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={pickImage}
//               >
//                 <Text style={styles.plus}>＋</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))}
//       </View>

//       <Text style={styles.tip}>🌟 How to choose the perfect picture</Text>

//       <TouchableOpacity
//         style={[
//           styles.continueButton,
//           photos.length < 2 && { backgroundColor: '#B0A9A9' },
//         ]}
//         onPress={handleContinue}
//         disabled={photos.length < 2}
//       >
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FDF6F0', padding: 20 },
//   header: { marginBottom: 10 },
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#000' },
//   subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
//   grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   photoBox: {
//     width: '30%',
//     height: 100,
//     backgroundColor: '#EFEFEF',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     position: 'relative',
//   },
//   addButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   plus: { fontSize: 28, color: '#999' },
//   photo: { width: '100%', height: '100%', borderRadius: 10 },
//   removeButton: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//   },
//   tip: { marginTop: 10, fontSize: 14, color: '#555' },
//   continueButton: {
//     marginTop: 20,
//     backgroundColor: '#F06292',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   continueText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
// });

// export default AddPhotosScreen;

// backend interation

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Alert,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Ionicon from 'react-native-vector-icons/Ionicons';
// import { PERMISSIONS, request } from 'react-native-permissions';
// import axios from 'axios';

// const BACKEND_URL = "http://YOUR_BACKEND_URL"; 

// const AddPhotosScreen = ({ navigation }) => {
//   const [photos, setPhotos] = useState([]);

 
//   const requestStoragePermission = async () => {
//     try {
//       const permission =
//         Platform.OS === 'android'
//           ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//           : PERMISSIONS.IOS.PHOTO_LIBRARY;

//       const result = await request(permission);
//       return result === 'granted';
//     } catch (err) {
//       console.warn('Permission error', err);
//       return false;
//     }
//   };

  
//   const pickImage = async () => {
//     const granted = await requestStoragePermission();
//     if (!granted) {
//       Alert.alert('Permission required', 'App needs access to your photos.');
//       return;
//     }

//     if (photos.length >= 6) {
//       Alert.alert('Limit reached', 'You can upload maximum 6 photos.');
//       return;
//     }

//     launchImageLibrary(
//       { mediaType: 'photo', quality: 1, selectionLimit: 1 },
//       (response) => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorMessage) {
//           console.log('Image Picker Error: ', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const uri = response.assets[0].uri;
//           setPhotos([...photos, uri]); 
//         }
//       }
//     );
//   };


//   const removePhoto = (index) => {
//     const updatedPhotos = photos.filter((_, i) => i !== index);
//     setPhotos(updatedPhotos);
//   };

  
//   const handleContinue = async () => {
//     if (photos.length < 2) {
//       Alert.alert('Minimum photos', 'Please add at least 2 photos.');
//       return;
//     }

//     try {
//       const formData = new FormData();
//       photos.forEach((uri, index) => {
//         formData.append('photos', {
//           uri,
//           name: `photo_${index}.jpg`,
//           type: 'image/jpeg',
//         });
//       });

//       const response = await axios.post(`${BACKEND_URL}/save-photos`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       if (response.data.success) {
//         navigation.navigate('FindCrushScreen', { photos });
//       } else {
//         Alert.alert('Error', 'Failed to save photos.');
//       }
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Something went wrong.');
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Ionicon name="chevron-back" size={28} color="#000" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.title}>Add your first photos</Text>
//       <Text style={styles.subtitle}>
//         Choose photos that capture your personality and the things you love to do.
//       </Text>

//       <View style={styles.grid}>
//         {[...Array(6)].map((_, index) => (
//           <View key={index} style={styles.photoBox}>
//             {photos[index] ? (
//               <>
//                 <Image source={{ uri: photos[index] }} style={styles.photo} />
//                 <TouchableOpacity
//                   style={styles.removeButton}
//                   onPress={() => removePhoto(index)}
//                 >
//                   <Ionicon name="close-circle" size={24} color="#87849e51" />
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={pickImage}
//               >
//                 <Text style={styles.plus}>＋</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))}
//       </View>

//       <Text style={styles.tip}>🌟 How to choose the perfect picture</Text>

//       <TouchableOpacity
//         style={[
//           styles.continueButton,
//           photos.length < 2 && { backgroundColor: '#B0A9A9' },
//         ]}
//         onPress={handleContinue}
//         disabled={photos.length < 2}
//       >
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#e4b58dff', padding: 20 },
//   header: { marginBottom: 10 },
//   title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#000' },
//   subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
//   grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//   photoBox: {
//     width: '30%',
//     height: 100,
//     backgroundColor: '#EFEFEF',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//     position: 'relative',
//   },
//   addButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   plus: { fontSize: 28, color: '#999' },
//   photo: { width: '100%', height: '100%', borderRadius: 10 },
//   removeButton: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//   },
//   tip: { marginTop: 10, fontSize: 14, color: '#555' },
//   continueButton: {
//     marginTop: 20,
//     backgroundColor: '#F06292',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   continueText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
// });

// export default AddPhotosScreen;

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
import Ionicon from 'react-native-vector-icons/Ionicons';
import { PERMISSIONS, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPhotosScreen = ({ navigation }) => {
  const [photos, setPhotos] = useState([]);

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
    const granted = await requestStoragePermission();
    if (!granted) {
      Alert.alert('Permission required', 'App needs access to your photos.');
      return;
    }

    if (photos.length >= 6) {
      Alert.alert('Limit reached', 'You can upload maximum 6 photos.');
      return;
    }

    launchImageLibrary(
      { mediaType: 'photo', quality: 1, selectionLimit: 1 },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setPhotos([...photos, uri]); // only local state

        }
      }
    );
  };

  const removePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const handleContinue = async () => {
    if (photos.length < 2) {
      Alert.alert('Minimum photos', 'Please add at least 2 photos.');
      return;
    }

    try {
      // yaha se AsyncStorage functional ha photos ko locally store krne k liye
      await AsyncStorage.setItem('userPhotos', JSON.stringify(photos));
      console.log('Photos saved locally:', photos);

      // Navigate ho rha next screen par 
      navigation.navigate('FindCrushScreen', { photos });

    } catch (error) {
      console.error('Storage Error:', error.message);
      Alert.alert('Error', 'Something went wrong while saving photos.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Add your first photos</Text>
      <Text style={styles.subtitle}>
        Choose photos that capture your personality and the things you love to do.
      </Text>

      <View style={styles.grid}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.photoBox}>
            {photos[index] ? (
              <>
                <Image source={{ uri: photos[index] }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePhoto(index)}
                >
                  <Ionicon name="close-circle" size={24} color="#87849e51" />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                <Text style={styles.plus}>＋</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <Text style={styles.tip}>🌟 How to choose the perfect picture</Text>

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
  container: { flex: 1, backgroundColor: '#e4b58dff', padding: 20 },
  header: { marginBottom: 10 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 5, color: '#000' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  photoBox: {
    width: '30%',
    height: 100,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  addButton: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  plus: { fontSize: 28, color: '#999' },
  photo: { width: '100%', height: '100%', borderRadius: 10 },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  tip: { marginTop: 10, fontSize: 14, color: '#555' },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#F06292',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default AddPhotosScreen;
