import React from 'react';
import { SafeAreaView as RnSafeAreaView, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import ThemeContext from './theme/ThemeContext';

const SafeAreaView = ({ children, topColor, bottom = false, bottomColor }) => {
  const { colors } = React.useContext(ThemeContext);

  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync('white');
  }, []);

  return (
    <React.Fragment>
      <RnSafeAreaView
        style={{ flex: 0, backgroundColor: topColor || colors.background }}
      />
      {children}
      {bottom && (
        <RnSafeAreaView
          style={{ flex: 0, backgroundColor: bottomColor || colors.background }}
        />
      )}
    </React.Fragment>
  );
};

export default SafeAreaView;
