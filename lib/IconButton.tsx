import React from 'react';
import { TouchableOpacity } from 'react-native';

import Badge from './Badge';
import hexToRgb from './theme/hextToRgb';
import ThemeContext from './theme/ThemeContext';

const IconButton: React.FC<{
  [key: string]: any;
  children: any;
  disabled?: boolean;
  onPress?: () => any;
  transparent?: boolean;
  color?: string;
  shadow?: boolean;
}> = ({ children, onPress, disabled, color, shadow = false, ...props }) => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      // style={{ padding: 0 }}
    >
      <Badge
        color={color || `rgba(${hexToRgb(colors.primaryColors.main)}, 0.1)`}
        shadow={shadow}
        {...props}
      >
        {children}
      </Badge>
    </TouchableOpacity>
  );
};

export default IconButton;
