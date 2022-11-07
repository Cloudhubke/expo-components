import React from 'react';
import { TextField, Colors, Spacings } from 'react-native-ui-lib';

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
          <TextField
            {...input}
            hideUnderline
            containerStyle={{
              flex: 1,
            }}
            style={{
              marginHorizontal: sizes.base / 2,
              borderWidth: 1,
              borderColor: error ? colors.danger : Colors.grey50,
              borderRadius: 8,
              backgroundColor: Colors.grey60,
              padding: sizes.padding,
              paddingTop: sizes.padding,
              paddingBottom: sizes.padding,

              ...inputStyles,
            }}
            enableErrors={false}
            mode={mode}
            autoFocus={autoFocus}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            disabled={disabled}
            placeholderTextColor={colors.gray2}
            value={`${val || ''}`} // here
            allowFontScaling={allowFontScaling}
            keyboardType={keyboard}
            ref={inputRef}
            textAlign="center"
            {...(mode !== 'outlined' ? { title: label } : {})}
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
