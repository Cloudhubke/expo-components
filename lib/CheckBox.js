import React, { useState } from 'react';
import { Checkbox } from 'react-native-ui-lib';
import ThemeContext from './theme/ThemeContext';
import Block from './Block';
import Text from './Text';

const CheckBox = ({
  value,
  meta = {},
  label = 'Check',
  input,
  onChange,
  ...props
}) => {
  const { sizes } = React.useContext(ThemeContext);
  const val = input.value || value;
  const error = meta.touched && meta.error;

  const [checked, setChecked] = useState(val);

  React.useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      onChange(checked);
    }

    if (input && input.onChange && typeof input.onChange === 'function') {
      input.onChange(checked);
    }
  }, [checked]);

  return (
    <Block flex={false} style={{ minHeight: sizes.inputHeight }}>
      <Block
        flex={false}
        row
        ripple
        middle
        onPress={() => setChecked(!checked)}
      >
        <Checkbox color="#009688" value={checked} {...props} />

        <Text>{label}</Text>
      </Block>

      <Block flex={false} style={styles.error}>
        <Text small error>
          {error && meta.error}
        </Text>
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
  inputContainer: {
    borderBottomWidth: 0,
    flexShrink: 1,
  },
};

export default CheckBox;
