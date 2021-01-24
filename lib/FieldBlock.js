import React from 'react';
import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const FieldBlock = ({ flex = false, label, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);

  return (
    <Block flex={flex} style={{ minHeight: sizes.inputHeight }} {...props}>
      {!!label && <Text>{label}</Text>}
      <Block flex={false} style={{ marginTop: 5, flexGrow: 1 }}>
        {props.children}
      </Block>
    </Block>
  );
};

export default FieldBlock;
