import create from 'zustand/vanilla';
import appReducer, { INITIAL_STATE } from './appReducer';

const appStore = create((set) => ({
  ...INITIAL_STATE,
  dispatch: (args) => {
    if (typeof args === 'function') {
      set((state) => appReducer(state, args(state)));
    } else {
      console.log(
        'DEPRECATION WARNING:use Callback function instead of object to update state'
      );
      set((state) => appReducer(state, args));
    }
  },
}));

export default appStore;
