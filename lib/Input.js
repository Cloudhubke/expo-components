import React from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';

import Text from './Text';
import Block from './Block';
import ThemeContext from './theme/ThemeContext';

const Input = React.forwardRef(
  (
    {
      placeholder,
      disabled,
      secureTextEntry,
      uppercase,
      lowercase,
      value,
      input,
      allowFontScaling,
      leadingIcon,
      trailingIcon,
      meta,
      autoFocus,
      style,
      mode = 'outlined',
      showErrors,
      label,
      props = {},
      ...otherprops
    },
    ref
  ) => {
    const { sizes, colors, fonts } = React.useContext(ThemeContext);
    const error = meta.touched && meta.error;
    const val = input.value || value;
    const inputRef = React.useRef();

    const inputStyles = {
      flex: 1,
      backgroundColor: colors.white,
      ...fonts.default,
      color: '#000',
      width: '100%',
      maxHeight: sizes.inputHeight * 3,
      ...(!props.height ? { height: sizes.inputHeight } : {}),
      ...style,
    };
    const getKeyboardType = () => {
      switch (props.type) {
        case 'number':
          return 'numeric';
        default:
          return 'default';
      }
    };
    const keyboard = getKeyboardType();

    const { borderWidth, height } = style;

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    return (
      <Block flex={false}>
        <Block flex={false} row middle>
          <TextInput
            {...input}
            mode={mode}
            autoFocus={autoFocus}
            style={inputStyles}
            theme={{
              roundness: 5,
              colors: {
                primary: error ? colors.danger : colors.primary,
                text: colors.dark,
              },
            }}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            disabled={disabled}
            placeholderTextColor={colors.gray2}
            value={`${val || ''}`} // here
            allowFontScaling={allowFontScaling}
            keyboardType={keyboard}
            label={mode !== 'outlined' ? label || '' : ''}
            ref={inputRef}
            textAlign={'center'}
            {...otherprops}
          />
          {trailingIcon && (
            <Block flex={false} padding={2.5}>
              {trailingIcon}
            </Block>
          )}
        </Block>

        {showErrors && (
          <Block flex={false} style={styles.error}>
            <Text small error>
              {error && meta.error}
            </Text>
          </Block>
        )}
      </Block>
    );
  }
);

Input.defaultProps = {
  showErrors: true,
  meta: {},
  allowFontScaling: false,
  style: {},
  input: {
    value: '',
    onChange: () => null,
    onBlur: () => null,
  },
};

const styles = {
  error: {
    marginTop: 2.5,
    height: 14,
    marginBottom: 2.5,
  },
};

export default Input;
