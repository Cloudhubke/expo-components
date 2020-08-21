import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const PhoneLink = ({ phone, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={() => Linking.openURL(`tel://${phone}`)}>
      <Text body primary {...props}>
        {` ${phone || ''}`}
      </Text>
    </TouchableOpacity>
  );
};

export default PhoneLink;
//export
