import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 
 * @param {string} key - The key under which the data is stored
 * @param {any} value - The value to store (object/string/number)
 */
export const setItem = async (key, value) => {
  try {
    const jsonValue =
      typeof value === 'string' ? value : JSON.stringify(value); 
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data', error);
  }
};

/**
 * Get data from AsyncStorage
 * @param {string} key - The key to retrieve
 */
export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) return null;

    
    try {
      return JSON.parse(value);
    } catch {
      return value; 
    }
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};

/**
 * Remove data from AsyncStorage
 * @param {string} key - The key to remove
 */
export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data', error);
  }
};

/**
 * Check if a value exists in AsyncStorage
 */
export const checkValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Value for "${key}":`, value);
      return value;
    } else {
      console.log(`No value found for "${key}"`);
      return null;
    }
  } catch (error) {
    console.error('Error checking data', error);
    return null;
  }
};
