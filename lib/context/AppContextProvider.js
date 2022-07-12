import React from 'react';
import appStore from './appStore';
import AppContext from './AppContext';
import useAppStore from './useAppStore';

const AppContextProvider = ({ children, INITIAL_STATE = {} }) => {
  const state = useAppStore((state) => state);
  const [updated, setUpdated] = React.useState(false);

  React.useEffect(() => {
    state.dispatch({
      payload: {
        ...(INITIAL_STATE || {}),
      },
    });

    setUpdated(true);
  }, []);

  if (!updated) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        getState: appStore.getState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
