import React from 'react';

import Block from './Block';
import FieldBlock from './FieldBlock';
import ThemeContext from './theme/ThemeContext';

const FieldLabel = ({ children, label, containerStyle, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);
  const inputStyles = {
    height: sizes.inputHeight,
    borderRadius: sizes.borderRadius || 5,
    borderWidth: 1,
    borderColor: '#ccc',
  };

  return (
    <FieldBlock label="Test it" {...props}>
      <Block flex={false}>
        <Block row middle padding={[0, 5]} style={inputStyles}>
          {children}
        </Block>
        <Block flex={false} style={styles.error} />
      </Block>
    </FieldBlock>
  );
};

const styles = {
  error: {
    marginTop: 2.5,
    height: 14,
    marginBottom: 2.5,
  },
};

export default FieldLabel;
