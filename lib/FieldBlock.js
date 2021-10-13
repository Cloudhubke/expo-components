import React from 'react';
import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';

const FieldBlock = ({ flex = false, label, ...props }) => {
  const { sizes } = React.useContext(ThemeContext);

  return (
    <Block flex={flex} style={{ minHeight: sizes.inputHeight }} {...props}>
      {typeof label === 'string' ? (
        <Text style={{ marginBottom: 2.5 }}>{label}</Text>
      ) : (
        label
      )}
      {props.children}
    </Block>
  );
};

export default FieldBlock;
