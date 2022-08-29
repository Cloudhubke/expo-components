import create from 'zustand/vanilla';
import appReducer, { INITIAL_STATE } from './appReducer';

const appStore: any = create((set: any) => ({
  ...INITIAL_STATE,
  dispatch: (args) => {
    if (typeof args === 'function') {
      set((state) => appReducer(state, args(state)));
    } else {
      set((state) => appReducer(state, args));
    }
  },
}));

export default appStore;
