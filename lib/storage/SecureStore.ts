import * as SecureStore from 'expo-secure-store';

export default {
  setItem: async (key, value) => {
    try {
      const obj = JSON.stringify({ key, value });
      await SecureStore.setItemAsync(`${key}`, obj);
    } catch (error) {}
  },

  getItem: async (key) => {
    try {
      const str = await SecureStore.getItemAsync(`${key}`);
      const jsonValue = str != null ? JSON.parse(str) : {};
      return jsonValue.value || null;
    } catch (error) {}
  },
};
