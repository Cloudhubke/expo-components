import { Toast } from './native-base';

export default {
  show: (message) => {
    if (typeof message === 'string') {
      return Toast.show({
        text: message,
        type: 'success',
        duration: 5000,
      });
    }
    return Toast.show({
      text: message.message || '',
      type: message.type || 'success',
    });
  },

  success: (message) =>
    Toast.show({
      text: message,
      type: 'success',
      duration: 5000,
    }),
  error: (message) =>
    Toast.show({
      text: message,
      type: 'danger',
      duration: 5000,
    }),
  info: (message) =>
    Toast.show({
      text: message,
      type: 'warning',
      duration: 5000,
    }),
};
