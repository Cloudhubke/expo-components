import React from 'react';
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

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
