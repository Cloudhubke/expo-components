import React from 'react';
import { StyleSheet } from 'react-native';

import Block from './Block';
import { Colors } from 'react-native-ui-lib';
import hexToRgb from './theme/hextToRgb';
import ThemeContext from './theme/ThemeContext';

const Badge = ({
  children,
  style,
  size,
  color = `rgba(${hexToRgb(Colors.primary)}, 0.2)`,
  round = true,
  transparent,
  shadow,
  ...props
}: {
  [x: string]: any;
  children?: any;
  style?: React.CSSProperties;
  size?: any;
  color?: any;
  transparent?: boolean;
  shadow?: boolean;
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const badgeStyles = StyleSheet.flatten([
    !size && { padding: 2 },
    round ? { borderRadius: 1000 } : { borderRadius: sizes.borderRadius },
    size && {
      minHeight: size,
      minWidth: size,
      borderRadius: size / 2,
      padding: 2,
    },
    Array.isArray(style) ? [...style] : style,
  ]);

  const badgeProps = {
    ...(shadow
      ? { card: true, color, enableShadow: true, shadow, elevation: 10 }
      : { color: transparent ? undefined : color }),
    ...props,
  };

  return (
    <Block flex={false} middle center style={badgeStyles} {...badgeProps}>
      {children}
    </Block>
  );
};

export default Badge;
