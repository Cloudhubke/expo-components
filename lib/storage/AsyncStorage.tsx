import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  type: 'asyncStorage',
  setItem: async (key, value) => {
    try {
      const obj = JSON.stringify({ key, value });
      await AsyncStorage.setItem(`${key}`, obj);
    } catch (error) {}
  },

  getItem: async (key) => {
    try {
      const str = await AsyncStorage.getItem(`${key}`);
      const jsonValue = str != null ? JSON.parse(str) : {};
      return jsonValue.value || null;
    } catch (error) {}
  },
};
