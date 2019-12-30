import React from 'react';
import Block from '../Block';
import { sizes } from '../theme';

const Row = ({ children, ...props }) => (
  <Block flex={false} padding={[sizes.padding, 0]} row middle {...props}>
    {children}
  </Block>
);

export default Row;
