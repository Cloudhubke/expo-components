import EncryptedStorage from 'react-native-encrypted-storage';

export default {
  setItem: async (key, value) => {
    try {
      const obj = JSON.stringify({ key, value });
      await EncryptedStorage.setItem(`${key}`, obj);
    } catch (error) {}
  },

  getItem: async (key) => {
    try {
      const str = await EncryptedStorage.getItem(`${key}`);
      const jsonValue = str != null ? JSON.parse(str) : {};
      return jsonValue.value || null;
    } catch (error) {}
  },
};
