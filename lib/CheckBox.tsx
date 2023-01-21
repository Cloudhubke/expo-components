import React, { useState } from 'react';
import { Checkbox } from '@expocraft/rnuilib';
import ThemeContext from './theme/ThemeContext';
import Block from './Block';
import Text from './Text';

const CheckBox = ({
  value,
  meta = {},
  label = 'Check',
  input = {
    value: false,
    onChange: () => null,
  },
  onChange,
  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const val = input.value || value;
  const error = meta.touched && meta.error;

  const [checked, setChecked] = useState(val);

  React.useEffect(() => {
    if (val !== checked) {
      if (typeof val === 'boolean') {
        setChecked(val);
      } else {
        setChecked(Boolean(val));
      }
    }
  }, [val]);

  const handleChange = (value) => {
    if (onChange && typeof onChange === 'function') {
      onChange(value);
    }

    if (input && input.onChange && typeof input.onChange === 'function') {
      input.onChange(value);
    }
  };

  return (
    <Block flex={false} style={{ minHeight: sizes.inputHeight }}>
      <Block flex={false} row middle>
        <Checkbox
          color={colors.success}
          value={checked}
          onValueChange={handleChange}
          {...props}
        />

        <Block
          flex={false}
          ripple
          rippleColor={colors.success}
          onPress={() => handleChange(!checked)}
        >
          {typeof label === 'string' ? (
            <Text style={{ marginLeft: sizes.margin }}>{label}</Text>
          ) : (
            label
          )}
        </Block>
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
