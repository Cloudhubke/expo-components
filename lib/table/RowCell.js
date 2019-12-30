import React from 'react';
import Block from '../Block';

const RowCell = ({ children, flex = true, ...props }) => (
  <Block flex={flex} padding={2} middle {...props}>
    {children}
  </Block>
);

export default RowCell;
