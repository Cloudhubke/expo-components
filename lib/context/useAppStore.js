import create from 'zustand';
import appStore from './appStore';

const useAppStore = create(appStore);

export default useAppStore;
