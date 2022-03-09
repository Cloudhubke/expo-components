import { Toast } from './native-base';

export default {
  show: (message) => {
    if (typeof message === 'string') {
      return Toast.show({
        text: message,
        type: 'success',
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
    }),
  error: (message) =>
    Toast.show({
      text: message,
      type: 'danger',
    }),
  info: (message) =>
    Toast.show({
      text: message,
      type: 'warning',
    }),
};
