import React from 'react';
import { TouchableOpacity } from 'react-native';

import Badge from './Badge';

const IconButton: React.FC<{
  [key: string]: any;
  children: any;
  disabled?: boolean;
  onPress?: () => any;
}> = ({ children, onPress, disabled, ...props }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <Badge {...props}>{children}</Badge>
  </TouchableOpacity>
);

export default IconButton;
