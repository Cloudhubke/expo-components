import React from 'react';
import { TouchableOpacity } from 'react-native';

import Badge from './Badge';

const IconButton: React.FC<{
  [key: string]: any;
  children: any;
  disabled?: boolean;
  onPress?: () => any;
  transparent?: boolean;
  color?: string;
}> = ({ children, onPress, disabled, ...props }) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    // style={{ padding: 0 }}
  >
    <Badge {...props}>{children}</Badge>
  </TouchableOpacity>
);

export default IconButton;
