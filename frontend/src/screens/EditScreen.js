// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Modal,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';

// const BASE_URL = "http://192.168.1.19:3000/";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDM5NDhmNjQyMjcyYWNlNTA1Y2MzOSIsImlhdCI6MTc1ODY5NjYwOCwiZXhwIjoxNzU4NzgzMDA4fQ.pKuA6YNbUye0MPK8rPikokrjYTbzxbnsFp08bG8P3uU";

// const EditScreen = ({ navigation }) => {
//   const [profile, setProfile] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentField, setCurrentField] = useState(null);
//   const [currentValue, setCurrentValue] = useState('');

 
//   const fetchUserData = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}api/get-user`, {
//         headers: { Authorization: `Bearer ${TOKEN}` },
//         params: { email: "portman@gmail.com" },
//       });

//       if (res.data.success) {
//         const data = res.data.data;

       
//         setProfile({
//           name: data.fullName || '',
//           age: data.dob ? new Date().getFullYear() - new Date(data.dob).getFullYear() : '',
//           isVerified: data.isVerified || false,
//           profilePic: data.images?.length
//             ? { uri: `${BASE_URL}${data.images[0].url}` }
//             : require('../assets/locationBanner.jpg'),
//           teasers: data.teasers || '',
//           relationshipStatus: data.lookingFor || '',
//           hobbies: data.hobbies || '',
//           places: data.favPlace?.join(', ') || '',
//           bio: data.bio || '',
//           aboutMe: [
//             { id: 'age', label: 'Age', value: data.dob ? new Date().getFullYear() - new Date(data.dob).getFullYear() : '', icon: 'calendar-outline', type: 'text' },
//             { id: 'gender', label: 'Gender', value: data.gender || '', icon: 'male-outline', type: 'text' },
//             { id: 'city', label: 'City', value: data.city || '', icon: 'location-outline', type: 'text' },
//             { id: 'education', label: 'Education', value: data.education || '', icon: 'school-outline', type: 'text' },
//           ],
//           about: [
//             { id: 'kids', label: 'Kids', value: data.kids || '', icon: 'baby-outline', type: 'text' },
//             { id: 'smoking', label: 'Smoking', value: data.smoke || '', icon: 'cafe-outline', type: 'text' },
//             { id: 'height', label: 'Height', value: data.height ? `${data.height} cm` : '', icon: 'resize-outline', type: 'text' },
//             { id: 'exercise', label: 'Exercise', value: data.exercise || '', icon: 'barbell-outline', type: 'text' },
//             { id: 'astrologicalSign', label: 'Astrological sign', value: data.sign || '', icon: 'sunny-outline', type: 'text' },
//           ],
//         });
//       } else {
//         Alert.alert("Error", res.data.message || "Failed to fetch user data");
//       }
//     } catch (err) {
//       console.error("API fetch error:", err.response?.data || err.message);
//       Alert.alert("Error", "Failed to fetch user data");
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (!profile)
//     return <Text style={{ marginTop: 50, textAlign: "center" }}>Loading...</Text>;

//   const pickImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.didCancel) return;
//       if (response.errorCode) {
//         console.log('Error picking image: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const uri = response.assets[0].uri;
//         setProfile(prev => ({ ...prev, profilePic: { uri } }));
//       }
//     });
//   };

//   const handleEdit = (field, value) => {
//     setCurrentField(field);
//     setCurrentValue(value);
//     setModalVisible(true);
//   };

//   const handleSave = async () => {
//     setProfile(prevProfile => {
      
//       if (currentField in prevProfile) {
//         return { ...prevProfile, [currentField]: currentValue };
//       } else {

//         const updatedAboutMe = prevProfile.aboutMe.map(item =>
//           item.id === currentField ? { ...item, value: currentValue } : item
//         );
//         const updatedAbout = prevProfile.about.map(item =>
//           item.id === currentField ? { ...item, value: currentValue } : item
//         );
//         return {
//           ...prevProfile,
//           aboutMe: updatedAboutMe,
//           about: updatedAbout,
//         };
//       }
//     });
//     setModalVisible(false);

//     // TODO: Send updated data to backend API
//     // await axios.post(`${BASE_URL}api/update-user`, { ...updatedProfile }, { headers: { Authorization: `Bearer ${TOKEN}` } });
//   };

//   const renderProfileItem = (item) => (
//     <TouchableOpacity
//       style={styles.listItem}
//       onPress={() => handleEdit(item.id, item.value)}
//     >
//       <View style={styles.listItemIconContainer}>
//         <Ionicons name={item.icon} size={24} color="#5544A3" />
//       </View>
//       <View style={styles.listItemTextContainer}>
//         <Text style={styles.listItemLabel}>{item.label}</Text>
//         <Text style={styles.listItemValue}>{item.value}</Text>
//       </View>
//       <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back-outline" size={30} color="#000" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
//             <Text style={styles.headerRightText}>View my profile</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.profileInfoContainer}>
//           <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
//           {profile.isVerified && <Ionicons name="checkmark-circle" size={20} color="#1E90FF" />}
//           <View style={styles.profilePicContainer}>
//             <Image source={profile.profilePic} style={styles.profileImage} />
//             <TouchableOpacity style={styles.editPhotosButton} onPress={pickImage}>
//               <Ionicons name="camera-outline" size={20} color="#fff" />
//               <Text style={styles.editPhotosText}>Edit photos</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>My Teasers (1/3)</Text>
//         <TouchableOpacity style={styles.card} onPress={() => handleEdit('teasers', profile.teasers)}>
//           <View style={styles.cardContent}>
//             <Ionicons name="chatbox-outline" size={24} color="#5544A3" style={styles.cardIcon} />
//             <Text style={styles.cardText}>{profile.teasers}</Text>
//           </View>
//           <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>I'm here for</Text>
//         <TouchableOpacity style={styles.card} onPress={() => handleEdit('relationshipStatus', profile.relationshipStatus)}>
//           <Text style={styles.cardText}>{profile.relationshipStatus}</Text>
//           <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Hobbies (1/10)</Text>
//         <TouchableOpacity style={styles.card} onPress={() => handleEdit('hobbies', profile.hobbies)}>
//           <Text style={styles.cardText}>{profile.hobbies}</Text>
//           <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>Places (1/10)</Text>
//         <TouchableOpacity style={styles.card} onPress={() => handleEdit('places', profile.places)}>
//           <Text style={styles.cardText}>{profile.places}</Text>
//           <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>My bio</Text>
//         <TouchableOpacity style={[styles.card, styles.bioCard]} onPress={() => handleEdit('bio', profile.bio)}>
//           <Text style={styles.bioText}>{profile.bio}</Text>
//           <Text style={styles.bioAddButton}>{profile.bio.includes('Tell us') ? 'Add' : 'Edit'} <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
//         </TouchableOpacity>

//         <Text style={styles.sectionTitle}>About me</Text>
//         {profile.aboutMe.map(renderProfileItem)}

//         <Text style={styles.sectionTitle}>About</Text>
//         {profile.about.map(renderProfileItem)}
//       </ScrollView>

     
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Edit {currentField}</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={setCurrentValue}
//               value={currentValue}
//               multiline={currentField === 'bio'}
//               numberOfLines={currentField === 'bio' ? 4 : 1}
//             />
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
//                 <Text style={styles.textStyle}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}>
//                 <Text style={styles.textStyle}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
//   container: { padding: 16, paddingBottom: 50 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   headerRightText: { color: '#5544A3', fontWeight: '600' },
//   profileInfoContainer: { alignItems: 'center', marginBottom: 20 },
//   profileName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
//   profilePicContainer: { marginTop: 10, width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', position: 'relative' },
//   profileImage: { width: '100%', height: '100%', resizeMode: 'cover' },
//   editPhotosButton: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
//   editPhotosText: { color: '#fff', marginLeft: 5 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
//   card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3 },
//   cardContent: { flexDirection: 'row', alignItems: 'center' },
//   cardIcon: { marginRight: 10 },
//   cardText: { fontSize: 16, color: '#555' },
//   cardEditButton: { color: '#5544A3', fontWeight: '600' },
//   bioCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
//   bioText: { flex: 1, fontSize: 16, color: '#aaa', marginRight: 10 },
//   bioAddButton: { color: '#5544A3', fontWeight: '600' },
//   listItem: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 1, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   listItemIconContainer: { width: 40, height: 40, backgroundColor: '#EBE7F7', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
//   listItemTextContainer: { flex: 1 },
//   listItemLabel: { fontSize: 14, color: '#888' },
//   listItemValue: { fontSize: 16, fontWeight: '500', color: '#000' },
//   centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '90%' },
//   button: { borderRadius: 20, padding: 10, elevation: 2, flex: 1, marginHorizontal: 5 },
//   buttonClose: { backgroundColor: '#C5C5C5' },
//   buttonSave: { backgroundColor: '#5544A3' },
//   textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
//   modalText: { marginBottom: 15, textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
//   input: { width: '100%', padding: 10, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, textAlignVertical: 'top' },
//   buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
// });

// export default EditScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import LoadingSpinner from "../components/LoadingSpinner"



const BASE_URL = "http://192.168.1.34:3000/";
const TOKEN =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDY1ZmU1M2ZkODNlNjdmZTk5ODI2YSIsImlhdCI6MTc2MTE5ODU2MSwiZXhwIjoxNzYxMjg0OTYxfQ.4_PLFXfEgfkwL_H3aKfUJtrljy3nzbbKxwZo4k4DKVo";
const EditScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [currentValue, setCurrentValue] = useState('');

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}api/get-user`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: { email: "portman@gmail.com" },
      });

      if (res.data.success) {
        const data = res.data.data;

        setProfile({
          name: data.fullName || '',
          age: data.dob ? new Date().getFullYear() - new Date(data.dob).getFullYear() : '',
          isVerified: data.isVerified || false,
          profilePic: data.images?.length
            ? { uri: `${BASE_URL}${data.images[0].url}` }
            : require('../assets/locationBanner.jpg'),
          teasers: data.teasers || '',
          relationshipStatus: data.lookingFor || '',
          hobbies: data.hobbies || '',
          places: data.favPlace?.join(',') || '',
          bio: data.bio || '',
          aboutMe: [
            { id: 'age', label: 'Age', value: data.dob ? new Date().getFullYear() - new Date(data.dob).getFullYear() : '', icon: 'calendar-outline', type: 'text' },
            { id: 'gender', label: 'Gender', value: data.gender || '', icon: 'male-outline', type: 'text' },
            { id: 'city', label: 'City', value: data.city || '', icon: 'location-outline', type: 'text' },
            { id: 'education', label: 'Education', value: data.education || '', icon: 'school-outline', type: 'text' },
          ],
          about: [
            { id: 'kids', label: 'Kids', value: data.kids || '', icon: 'baby-outline', type: 'text' },
            { id: 'smoking', label: 'Smoking', value: data.smoke || '', icon: 'cafe-outline', type: 'text' },
            { id: 'height', label: 'Height', value: data.height ? `${data.height} cm` : '', icon: 'resize-outline', type: 'text' },
            { id: 'exercise', label: 'Exercise', value: data.exercise || '', icon: 'barbell-outline', type: 'text' },
            { id: 'astrologicalSign', label: 'Astrological sign', value: data.sign || '', icon: 'sunny-outline', type: 'text' },
          ],
        });
      } else {
        Alert.alert("Error", res.data.message || "Failed to fetch user data");
      }
    } catch (err) {
      console.error("API fetch error:", err.response?.data || err.message);
      Alert.alert("Error", "Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!profile)
    return <LoadingSpinner/>

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        console.log('Error picking image: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setProfile(prev => ({ ...prev, profilePic: { uri } }));
      }
    });
  };
  const handleEdit = (field, value) => {
    setCurrentField(field);
    setCurrentValue(String(value));
    setModalVisible(true);
  };

  const handleSave = async () => {
   
    setProfile(prevProfile => {
      if (currentField in prevProfile) {
        return { ...prevProfile, [currentField]: currentValue };
      } else {
        const updatedAboutMe = prevProfile.aboutMe.map(item =>
          item.id === currentField ? { ...item, value: currentValue } : item
        );
        const updatedAbout = prevProfile.about.map(item =>
          item.id === currentField ? { ...item, value: currentValue } : item
        );
        return {
          ...prevProfile,
          aboutMe: updatedAboutMe,
          about: updatedAbout,
        };
      }
    });
    setModalVisible(false);

    
    const payload = { email: "portman@gmail.com" };

    
    if (currentField === 'places') {
      payload.favPlace = currentValue.split(',').map(s => s.trim()).filter(Boolean);
    } else if (currentField === 'relationshipStatus') {
      payload.lookingFor = currentValue;
    } else if (currentField === 'teasers') {
      payload.teasers = currentValue;
    } else if (currentField === 'hobbies') {
      payload.hobbies = currentValue;
    } else if (currentField === 'bio') {
      payload.bio = currentValue;
    } else if (currentField === 'age') {
     
      const ageNum = parseInt(currentValue, 10);
      if (!Number.isNaN(ageNum) && ageNum > 0) {
        const birthYear = new Date().getFullYear() - ageNum;
        payload.dob = `${birthYear}-01-01`;
      }
    } else {
      
      const idToField = {
        gender: 'gender',
        city: 'city',
        education: 'education',
        kids: 'kids',
        smoking: 'smoke',
        height: 'height',
        exercise: 'exercise',
        astrologicalSign: 'sign',
      };
      const backendField = idToField[currentField];
      if (backendField) {
        payload[backendField] = currentField === 'height'
          ? currentValue.replace(/\s*cm\s*$/i, '').trim()
          : currentValue;
      }
    }

   
    try {
      const res = await axios.put(`${BASE_URL}api/update-user`, payload, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      if (res.data && (res.data.success || res.status === 200)) {
        Alert.alert('Success', 'Profile updated successfully');
        
        await fetchUserData();
      } else {
        console.warn('Update response:', res.data);
        Alert.alert('Error', res.data?.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('API update error:', err.response?.data || err.message);
      Alert.alert('Error', 'Failed to update profile');
      
      await fetchUserData();
    }
  };

  const renderProfileItem = (item) => (
    <TouchableOpacity
    key={item.id}
      style={styles.listItem}
      onPress={() => handleEdit(item.id, item.value)}
    >
      <View style={styles.listItemIconContainer}>
        <Ionicons name={item.icon} size={24} color="#5544A3" />
      </View>
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemLabel}>{item.label}</Text>
        <Text style={styles.listItemValue}>{item.value}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfileScreen')}>
            <Text style={styles.headerRightText}>View my profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>{profile.name}, {profile.age}</Text>
          {profile.isVerified && <Ionicons name="checkmark-circle" size={20} color="#1E90FF" />}
          <View style={styles.profilePicContainer}>
            <Image source={profile.profilePic} style={styles.profileImage} />
            <TouchableOpacity style={styles.editPhotosButton} onPress = {()=> navigation.navigate('AddPhotosScreen')} >
              <Ionicons name="camera-outline" size={20} color="#fff" />
              <Text style={styles.editPhotosText}>Edit photos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>My Teasers (1/3)</Text>
        <TouchableOpacity style={styles.card} onPress={() => handleEdit('teasers', profile.teasers)}>
          <View style={styles.cardContent}>
            <Ionicons name="chatbox-outline" size={24} color="#5544A3" style={styles.cardIcon} />
            <Text style={styles.cardText}>{profile.teasers}</Text>
          </View>
          <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>I'm here for</Text>
        <TouchableOpacity style={styles.card} onPress={() => handleEdit('relationshipStatus', profile.relationshipStatus)}>
          <Text style={styles.cardText}>{profile.relationshipStatus}</Text>
          <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Hobbies (1/10)</Text>
        <TouchableOpacity style={styles.card} onPress={() => handleEdit('hobbies', profile.hobbies)}>
          <Text style={styles.cardText}>{profile.hobbies}</Text>
          <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Places (1/10)</Text>
        <TouchableOpacity style={styles.card} onPress={() => handleEdit('places', profile.places)}>
          <Text style={styles.cardText}>{profile.places}</Text>
          <Text style={styles.cardEditButton}>Edit <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>My bio</Text>
        <TouchableOpacity style={[styles.card, styles.bioCard]} onPress={() => handleEdit('bio', profile.bio)}>
          <Text style={styles.bioText}>{profile.bio}</Text>
          <Text style={styles.bioAddButton}>{profile.bio.includes('Tell us') ? 'Add' : 'Edit'} <Ionicons name="chevron-forward-outline" size={14} color="#5544A3" /></Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>About me</Text>
        {profile.aboutMe.map(renderProfileItem)}

        <Text style={styles.sectionTitle}>About</Text>
        {profile.about.map(renderProfileItem)}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit {currentField}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCurrentValue}
              value={currentValue}
              multiline={currentField === 'bio'}
              numberOfLines={currentField === 'bio' ? 4 : 1}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}>
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { padding: 16, paddingBottom: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerRightText: { color: '#5544A3', fontWeight: '600' },
  profileInfoContainer: { alignItems: 'center', marginBottom: 20 },
  profileName: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  profilePicContainer: { marginTop: 10, width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  profileImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  editPhotosButton: { position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  editPhotosText: { color: '#fff', marginLeft: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3 },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { marginRight: 10 },
  cardText: { fontSize: 16, color: '#555' },
  cardEditButton: { color: '#5544A3', fontWeight: '600' },
  bioCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bioText: { flex: 1, fontSize: 16, color: '#aaa', marginRight: 10 },
  bioAddButton: { color: '#5544A3', fontWeight: '600' },
  listItem: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 1, borderBottomWidth: 1, borderBottomColor: '#eee' },
  listItemIconContainer: { width: 40, height: 40, backgroundColor: '#EBE7F7', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  listItemTextContainer: { flex: 1 },
  listItemLabel: { fontSize: 14, color: '#888' },
  listItemValue: { fontSize: 16, fontWeight: '500', color: '#000' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, width: '90%' },
  button: { borderRadius: 20, padding: 10, elevation: 2, flex: 1, marginHorizontal: 5 },
  buttonClose: { backgroundColor: '#C5C5C5' },
  buttonSave: { backgroundColor: '#5544A3' },
  textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  modalText: { marginBottom: 15, textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
  input: { width: '100%', padding: 10, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, textAlignVertical: 'top' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});

export default EditScreen;