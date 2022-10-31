import React from 'react';
import { StyleSheet } from 'react-native';
import ThemeContext from '@expocraft/core/lib/theme/ThemeContext';
import Block from '@expocraft/core/lib/Block';
import defaultsizes from '@expocraft/core/lib/theme/Sizes';
import defaultcolors from '@expocraft/core/lib/theme/Colors';

// Cards are here
// Remove NAtive-Base

const Card = ({
  color,
  style,
  children,
  rounded,
  ...props
}: {
  [x: string]: any;
  color?: any;
  style?: React.CSSProperties;
  children?: any;
  rounded?: Boolean;
}) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const cardStyles = [
    styles.card,
    style,
    rounded && { borderRadius: sizes.border },
  ];

  return (
    <Block color={color || colors.white} style={cardStyles} {...props}>
      {children}
    </Block>
  );
};

Card.defaultProps = {
  rounded: true,
};

export const styles = StyleSheet.create({
  card: {
    padding: defaultsizes.base + 4,
    marginBottom: defaultsizes.base,
  },
  shadow: {
    shadowColor: defaultcolors.black,
    shadowOpacity: 0.11,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 13,
  },
});

export default Card;
