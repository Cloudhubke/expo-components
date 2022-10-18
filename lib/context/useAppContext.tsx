import create from 'zustand';
import shallow from 'zustand/shallow';
import appStore from './appStore';

export const useStore = create(appStore);

export default function useAppStore<S>() {
  return function (callBack: (store: S) => Partial<S>) {
    const state = useStore<S>(callBack as any, shallow);

    (state as any).getState = appStore.getState;

    return state;
  };
}
