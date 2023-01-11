import React from 'react';
import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const Alert = ({
  message,
  info,
  error,
  success,
  warning,
  color,
  containerStyle = {},
}: {
  message: string;
  info?: boolean;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  color?: string;
  containerStyle?: any;
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
    </Block>
  ) : null;
};

export default Alert;
