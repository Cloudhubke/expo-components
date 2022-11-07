import React from 'react';

import Block from './Block';
import Button from './Button';

const FieldButton = ({ ...props }) => {
  const [] = React.useState(0);

  return (
    <Block row bottom>
      <Block flex={false}>
        <Button {...props} />
        <Block flex={false} style={styles.error} />
      </Block>
    </Block>
  );
};

const styles = {
  error: {
    marginTop: 2.5,
    height: 14,
    marginBottom: 2.5,
  },
};

export default FieldButton;
