import React from 'react';
import { SafeAreaView as RnSafeAreaView, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import ThemeContext from './theme/ThemeContext';
import StatusBar from './StatusBar';

const SafeAreaView: React.FC<{
  [key: string]: any;
  children?: any;
  topColor?: any;
  top?: boolean;
  bottom?: boolean;
  light?: boolean;
  bottomColor?: any;
}> = ({
  children,
  topColor,
  top = false,
  bottom = false,
  light = true,
  bottomColor,
}) => {
  const { colors } = React.useContext(ThemeContext);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(
        bottomColor || colors.tabBarColor || colors.background
      );
    }
  }, []);

  return (
    <React.Fragment>
      {top && (
        <StatusBar
          hasHeight
          color={topColor}
          barStyle={light ? 'light-content' : 'dark-content'}
        />
        // <RnSafeAreaView
        //   style={{ backgroundColor: topColor || colors.background }}
        // />
      )}
      {children}
      {bottom && (
        <RnSafeAreaView
          style={{
            flex: 0,
            backgroundColor:
              bottomColor || colors.tabBarColor || colors.background,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default SafeAreaView;
