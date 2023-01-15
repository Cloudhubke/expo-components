import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Block from '@expocraft/core/lib/Block';
import { Colors } from 'react-native-ui-lib';
import hexToRgb from './theme/hextToRgb';

const Badge = ({
  children,
  style,
  size,
  color,
  transparent,
  ...props
}: {
  [x: string]: any;
  children?: any;
  style?: React.CSSProperties;
  size?: any;
  color?: any;
  transparent?: boolean;
}) => {
  const badgeStyles = StyleSheet.flatten([
    !size && { padding: 5 },
    size && {
      minHeight: size,
      minWidth: size,
      borderRadius: size / 2,
      padding: 2,
    },
    Array.isArray(style) ? [...style] : style,
  ]);

  return (
    <Block
      flex={false}
      middle
      center
      color={transparent ? undefined : color}
      style={badgeStyles}
      {...props}
    >
      {children}
    </Block>
  );
};

Badge.defaultProps = {
  size: 32,
  color: `rgba(${hexToRgb(Colors.grey10)}, 0.2)`,
};

export default Badge;
