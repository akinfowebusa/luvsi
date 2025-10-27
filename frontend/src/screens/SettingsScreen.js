import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from 'axios';

const BASE_URL = 'http://192.168.1.14:3000/'; 
const TOKEN = 'YOUR_TOKEN_HERE'; 
const EMAIL = 'portman@gmail.com'; 

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const SettingItem = ({ title, value, onPress, isLast = false, rightElement }) => (
  <TouchableOpacity
    style={[styles.settingItem, isLast && styles.lastItem]}
    onPress={onPress}
    activeOpacity={onPress ? 0.6 : 1}
  >
    <View>
      <Text style={styles.settingItemTitle}>{title}</Text>
      {value && <Text style={styles.settingItemValue}>{value}</Text>}
    </View>
    {rightElement || <Ionicons name="chevron-forward-outline" size={20} color="#888" />}
  </TouchableOpacity>
);

const UserDataRow = ({ label, value, imageUri, onCopy }) => (
  <View style={styles.userDataCard}>
    {imageUri && <Image source={{ uri: imageUri }} style={styles.profileImage} />}
    <View style={styles.userDataTextContainer}>
      <Text style={styles.settingItemTitle}>{label}</Text>
      <Text style={styles.userDataValue}>{value}</Text>
    </View>
    <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
      <Ionicons name="copy-outline" size={20} color="#666" />
    </TouchableOpacity>
  </View>
);

const SettingsScreen = ({ navigation }) => {
  const [shareClusters, setShareClusters] = useState(true);
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => navigation.goBack();
  const handleLogout = () => navigation.replace('Login');

  useEffect(() => {
    fetchUserData();
  }, []);

  const generateUniqueUsername = () => 'luvsi-' + Math.random().toString(36).substring(2, 10);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}api/get-user`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
        params: { email: EMAIL }, 
      });

      if (res.data.success) {
        const user = res.data.data;
        setUsername(user.username || generateUniqueUsername());
        if (user.images && user.images[0]) {
          setProfileImage({ uri: `${BASE_URL}${user.images[0].url}` });
        }
      } else {
        console.warn('Fetch user failed:', res.data.message || res.data);
        setUsername(generateUniqueUsername());
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err.response?.data || err.message);
      setUsername(generateUniqueUsername());
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#5544A3" />
        ) : (
          <Image
            source={profileImage ? profileImage : { uri: 'https://via.placeholder.com/60' }}
            style={styles.profileImageHeader}
          />
        )}
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 40 }}>
      
        <SectionHeader title="Preferences" />
        <SettingItem
          title="Notifications"
          value="Enable app notifications"
          onPress={() => navigation.navigate('NotificationSettingsScreen')}
        />

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingItemTitle}>Distance Units</Text>
            <Text style={styles.settingItemValue}>Choose kilometers or miles</Text>
          </View>
          <View style={styles.units}>
            {['km','mi'].map(unit => (
              <TouchableOpacity
                key={unit}
                onPress={() => setDistanceUnit(unit)}
                style={[styles.unitBtn, distanceUnit === unit && styles.unitBtnActive]}
              >
                <Text style={[styles.unitText, distanceUnit === unit && styles.unitTextActive]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <SettingItem
          title="Share my crossing clusters"
          value="Allow Luvsi to share cluster info with others"
          rightElement={
            <Switch
              trackColor={{ false: '#ccc', true: '#5544A3' }}
              thumbColor="#fff"
              onValueChange={setShareClusters}
              value={shareClusters}
            />
          }
          isLast
        />


        <SectionHeader title="Personal Data" />
        <UserDataRow
          label="My Luvsi username"
          value={username}
          imageUri={profileImage?.uri}
          onCopy={() => console.log('Username copied')}
        />
        <SettingItem title="My data" onPress={() => navigation.navigate('MyDataScreen')} />
        <SettingItem title="Restore my purchases" onPress={() => console.log('Restore purchases')} />
        <SettingItem title="Deactivate my account" onPress={() => console.log('Deactivate account')} isLast />

      
        <SectionHeader title="Legal Notice" />
        <SettingItem title="General terms of service" onPress={() => console.log('Open terms')} />
        <SettingItem title="Privacy policy" onPress={() => console.log('Open privacy policy')} />
        <SettingItem title="Cookie policy" onPress={() => console.log('Open cookie policy')} isLast />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  scrollView: { paddingHorizontal: 15 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  backButton: { width: 36 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#000' },
  profileImageHeader: { width: 36, height: 36, borderRadius: 18 },

  sectionHeader: { paddingVertical: 15 },
  sectionHeaderText: { fontSize: 16, fontWeight: 'bold', color: '#000' },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
  },
  lastItem: { marginBottom: 20, borderBottomWidth: 0 },
  settingItemTitle: { fontSize: 16, color: '#000' },
  settingItemValue: { fontSize: 14, color: '#666', marginTop: 2 },

  units: { flexDirection: 'row', alignItems: 'center' },
  unitBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 6,
    backgroundColor: '#fff',
  },
  unitBtnActive: { backgroundColor: '#5544A3', borderColor: '#5544A3' },
  unitText: { color: '#444', fontWeight: '600' },
  unitTextActive: { color: '#fff' },

  userDataCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#eee',
  },
  userDataTextContainer: { flex: 1 },
  userDataValue: { fontSize: 14, color: '#666', marginTop: 2 },
  copyButton: { padding: 10 },
});

export default SettingsScreen;
