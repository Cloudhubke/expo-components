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
  onClose,
  enableClose = true,
}: {
  message: string;
  info?: boolean;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  color?: string;
  containerStyle?: any;
  onClose?: () => void;
  enableClose?: boolean;
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

  const showCloseButton = enableClose && typeof onClose === 'function';

  return Boolean(message) ? (
    <Block
      animatable
      flex={false}
      animation="fadeIn"
      duration={2000}
      padding
      color={alertColor}
      rounded={5}
      {...containerStyle}
      margin={[5, 0]}
    >
      {typeof message === 'string' ? <Text white>{message}</Text> : message}
      {showCloseButton && (
        <Block
          flex={false}
          style={{
            position: 'absolute',
            top: 2.5,
            right: 2.5,
            padding: 5,
          }}
        >
          <IconButton
            onPress={onClose}
            color={`rgba(${hexToRgb(colors.mistyWhite)}, 0.3)`}
          >
            <MaterialIcons name="close" size={14} color={colors.black} />
          </IconButton>
        </Block>
      )}
    </Block>
  ) : null;
};

export default Alert;
