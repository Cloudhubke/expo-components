import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Block from './Block';
import Text from './Text';
import Button from './Button';

import defaultsizes from './theme/Sizes';
import ThemeContext from './theme/ThemeContext';

const r = defaultsizes.inputHeight / 2;

const CounterButton = ({
  min = 0,
  max,
  counterValue = 1,
  input,
  onChange,
  meta,
  disabled,
  ...props
}) => {
  const { sizes } = React.useContext(ThemeContext);
  const val = input.value || props.value || 0;

  const [value, setValue] = React.useState(val);

  const error = meta.touched && meta.error;

  const changeValue = (val) => {
    if (max && val >= max) {
      return setValue(max);
    }

    if (min === 0 && val < 0) {
      return setValue(0);
    }

    if (min && val <= min) {
      return setValue(min);
    }

    return setValue(Number(Number(val).toFixed(2)));
  };

  React.useEffect(() => {
    setValue(val);
  }, [val]);

  React.useEffect(() => {
    if (input && input.onChange) {
      input.onChange(value);
    }
    if (input && input.onBlur) {
      input.onBlur();
    }
    if (onChange) {
      input.onChange(value);
    }
  }, [value]);

  return (
    <Block flex={false}>
      <Block flex={false} row middle>
        <Button
          outlined
          style={{
            height: sizes.inputHeight,
            borderTopLeftRadius: r,
            borderBottomLeftRadius: r,
            borderRightWidth: 0,
          }}
          onPress={() => changeValue(value - counterValue)}
          disabled={disabled}
        >
          <MaterialIcons name="chevron-left" size={24} />
        </Button>
        <Button
          outlined
          style={{
            height: sizes.inputHeight,
            borderRightWidth: 0,
            borderLeftWidth: 0,
          }}
          disabled={disabled}
        >
          <Text button dark>
            {value}
          </Text>
        </Button>
        <Button
          outlined
          style={{
            height: sizes.inputHeight,
            borderTopRightRadius: r,
            borderBottomRightRadius: r,
            borderLeftWidth: 0,
          }}
          onPress={() => changeValue(value + counterValue)}
          disabled={disabled}
        >
          <MaterialIcons name="chevron-right" size={24} />
        </Button>
      </Block>
      <Block flex={false} style={styles.error}>
        <Text small error>
          {error && meta.error}
        </Text>
      </Block>
    </Block>
  );
};

CounterButton.defaultProps = {
  input: {
    value: null,
    onChange: () => null,
    onBlur: () => null,
  },
  value: null,
  onChange: () => null,
  meta: {},
};

const styles = {
  error: {
    marginTop: 2.5,
    height: 14,
    marginBottom: 2.5,
  },
};

export default CounterButton;
