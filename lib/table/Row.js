import React from 'react';
import Block from '../Block';
import ThemeContext from '../theme/ThemeContext';

const Row = ({ children, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);

  return (
    <Block flex={false} padding={[sizes.padding, 0]} row middle {...props}>
      {children}
    </Block>
  );
};

export default Row;
