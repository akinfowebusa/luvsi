import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";  

const DataSettingItem = ({ title, onPress, isLast = false }) => (
  <TouchableOpacity
    style={[styles.itemContainer, isLast && styles.lastItem]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.itemTitle}>{title}</Text>
    <Ionicons name="chevron-forward-outline" size={18} color="#999" />
  </TouchableOpacity>
);

const MyDataScreen = ({ navigation }) => {
  const handleBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      console.log('Go back to previous screen');
    }
  };

  const handleAction = (action) => {
    console.log(`Action requested: ${action}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={styles.colors.text} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>My data</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <DataSettingItem
          title="Standard settings"
          onPress={() => handleAction('Standard settings')}
        />
        <DataSettingItem
          title="Access my data"
          onPress={() => handleAction('Access my data')}
        />
        <DataSettingItem
          title="Adjust, edit my data"
          onPress={() => handleAction('Adjust, edit my data')}
        />

        <View style={styles.largeDivider} />

        <DataSettingItem
          title="Manage my choices"
          onPress={() => handleAction('Manage my choices')}
        />

        <View style={styles.largeDivider} />

        <DataSettingItem
          title="Delete my account"
          onPress={() =>navigation.navigate(' DeactivateScreen')}
          isLast={true}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  colors: {
    background: '#FAF8F4',
    text: '#000000',
    divider: '#E0E0E0',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAF8F4',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FAF8F4',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemTitle: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  largeDivider: {
    height: 20,
  },
});

export default MyDataScreen;
