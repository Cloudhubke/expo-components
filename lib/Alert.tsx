import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import Block from './Block';
import IconButton from './IconButton';
import Text from './Text';
import hexToRgb from './theme/hextToRgb';
import ThemeContext from './theme/ThemeContext';

const Alert = ({
  message,
  info,
  error,
  success,
  warning,
  color,
  containerStyle = {},
  onClose = () => {},
}: {
  message: string;
  info?: boolean;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  color?: string;
  containerStyle?: any;
  onClose?: () => void;
}) => {
  const { colors } = React.useContext(ThemeContext);

  let alertColor = color || colors.info;
  if (info) {
    alertColor = colors.info;
  }

  if (success) {
    alertColor = colors.success;
  }

  if (error) {
    alertColor = colors.error;
  }

  if (warning) {
    alertColor = colors.warning;
  }

  return Boolean(message) ? (
    <Block
      animatable
      flex={false}
      animation="fadeIn"
      duration={2000}
      padding
      color={alertColor}
      rounded
      {...containerStyle}
      margin={[5, 0]}
    >
      <Text white>{message}</Text>
      <Block
        flex={false}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 5,
        }}
      >
        <IconButton onPress={onClose}>
          <MaterialIcons name="close" size={20} color={colors.black} />
        </IconButton>
      </Block>
    </Block>
  ) : null;
};

export default Alert;
