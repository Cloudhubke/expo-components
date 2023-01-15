import React from 'react';
import appStore from './appStore';
import AppContext from './AppContext';
import { useStore } from './useAppContext';
import shallow from 'zustand/shallow';

const AppContextProvider = ({ children, INITIAL_STATE = {} }: any) => {
  const dispatch = useStore((state) => (state as any).dispatch, shallow);
  const [updated, setUpdated] = React.useState(false);

  const resetState = () => {
    dispatch(() => ({
      ...(INITIAL_STATE || {}),
    }));
  };

  React.useEffect(() => {
    resetState();
    setUpdated(true);
  }, []);

  if (!updated && globalThis.window) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        dispatch,
        getState: appStore.getState,
        resetState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
