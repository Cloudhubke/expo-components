import { ToastContainer as Toast } from './native-base/basic/ToastContainer';

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
