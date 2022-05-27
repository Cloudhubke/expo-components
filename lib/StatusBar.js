import React from 'react';
import Constants from 'expo-constants';
import { Platform, StatusBar as RNStatusBar, View } from 'react-native';

const StatusBar = ({ light, dark, color, hasHeight, style, ...props }) => {
  const statusBarProps = {
    ...{ barStyle: 'default' },
    ...(light && { barStyle: 'light-content' }),
    ...(dark && { barStyle: 'dark-content' }),
    ...(color ? { backgroundColor: color || '#ffffff' } : {}),
  };

  const [hidden, setHidden] = React.useState(Boolean(props.hidden));

  React.useEffect(() => {
    setHidden(Boolean(props.hidden));
  }, [props.hidden]);

  const containerStyles = {
    height: Platform.OS === 'android' ? 0 : Constants.statusBarHeight,
    ...(color ? { backgroundColor: color } : {}),
  };

  if (hasHeight) {
    return (
      <View
        style={[containerStyles, Array.isArray(style) ? [...style] : style]}
      >
        <RNStatusBar hidden={hidden} {...statusBarProps} {...props} />
      </View>
    );
  }

  return <RNStatusBar hidden={hidden} {...statusBarProps} {...props} />;
};

export default StatusBar;
