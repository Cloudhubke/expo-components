import { Toast } from './native-base/basic/Toast';

export default {
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
