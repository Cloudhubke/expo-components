import React from 'react';

import { StyleSheet, TextInput, Platform } from 'react-native';
import PhoneNumber from 'awesome-phonenumber';
import PickCountry from './country-picker-modal/PickCountry';
import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';
import countries from './country-picker-modal/data/countries.json';

const PhoneInput = React.forwardRef(
  (
    {
      bordered,
      meta,
      showErrors,
      disabled,
      allowFontScaling,
      showCountryPicker,
      trailingIcon,
      autoFocus,
      inputStyle,
      keyboardType = 'numeric',
      validatePhone = true,
      ...props
    },
    ref
  ) => {
    const phonevalue = props.input.value || props.value;

    const [cca2, setCca2] = React.useState(props.cca2 || 'KE');
    const [callingCode, setCallingCode] = React.useState(
      props.callingCode || '254'
    );
    const [currency, setCurrency] = React.useState(props.currency || 'KES');
    const [country, setCountry] = React.useState(props.country || 'Kenya');
    const [phone, setPhone] = React.useState(phonevalue || '');
    const [placeholder, setPlaceholder] = React.useState(props.placeholder);

    const mobilenumberInput = React.useRef();

    function getPlaceHolder() {
      if (!props.placeholder) {
        const placeholder = PhoneNumber.getExample(
          cca2 || 'KE',
          'mobile'
        ).getNumber('national');
        setPlaceholder(placeholder);
      }
    }

    React.useEffect(() => {
      setPlaceholder(props.placeholder);
    }, [props.placeholder]);

    function getPhone() {
      const pn = new PhoneNumber(phonevalue || '', cca2);

      if (pn.isValid()) {
        const newphone = pn.getNumber();
        setPhone(newphone);
        setCca2(pn.getRegionCode());
        onPhoneChange(newphone);
      }
    }

    React.useEffect(() => {
      getPlaceHolder();
      getPhone();
      if (!validatePhone) {
        if (phone !== phonevalue) {
          setPhone(phonevalue);
        }
      }
    }, [phonevalue]);

    const callingcodeChanged = ({ cca2, callingCode }) => {
      const country = countries[cca2 || 'KE'];
      const countrynames = country.name || {};
      const countryName = countrynames.common || 'Kenya';

      const placeholder = PhoneNumber.getExample(
        cca2 || 'KE',
        'mobile'
      ).getNumber('national');

      setCallingCode(callingCode || '254');
      setCca2(cca2 || 'KE');
      setCurrency(country.currency || 'KES');
      setCountry(countryName);
      setPlaceholder(placeholder);

      mobilenumberInput.current.focus();
    };

    const onPhoneChange = (phone) => {
      if (phone) {
        const pn = new PhoneNumber(phone, cca2);

        const cc = pn.getRegionCode();

        const country = countries[cc || cca2 || 'KE'];
        const countrynames = country.name || {};

        const currency = country.currency || 'KES';
        const countryName = countrynames.common || 'Kenya';
        const placeholder = PhoneNumber.getExample(
          cc || cca2 || 'KE',
          'mobile'
        ).getNumber('national');

        setCca2(cc || cca2 || 'KE');
        setCountry(countryName);
        setCurrency(currency);
        setCallingCode(country.callingCode || '254');

        setPlaceholder(placeholder);

        if (pn.isValid() && !`${phone}`.includes('/')) {
          props.onPhoneChanged({
            text: phone,
            phone: pn.getNumber(),
            cca2: cc || cca2,
            currency,
            country: countryName,
          });
          props.input.onChange(pn.getNumber());
          props.input.onBlur();
          props.onChange(pn.getNumber());
        } else if (validatePhone) {
          props.onPhoneChanged({
            text: phone,
            phone: '',
            cca2: cc || cca2,
            currency,
            country: countryName,
          });
          props.input.onChange('');
          props.onChange('');
          props.input.onBlur();
        } else {
          props.onPhoneChanged({
            text: phone,
            phone,
            cca2: cc || cca2,
            currency,
            country: countryName,
          });
          props.input.onChange(phone);
          props.onChange(phone);
          props.input.onBlur();
        }
      } else {
        props.onPhoneChanged({
          text: phone,
          phone: '',
          cca2,
          currency,
          country,
        });
        props.input.onChange('');
        props.onChange('');
        props.input.onBlur();
      }

      setPhone(phone);
    };

    React.useImperativeHandle(ref, () => ({
      clearInput: () => {
        setPhone('');
      },
    }));
    const { error } = meta;

    return (
      <ThemeContext.Consumer>
        {({ fonts, sizes, colors }) => {
          const styles = StyleSheet.create({
            error: {
              marginTop: 5,
              height: 14,
              marginBottom: 2.5,
            },
            inputContainer: {
              height: sizes.inputHeight,
              marginTop: 5,
            },
            labeledContainer: {
              paddingHorizontal: sizes.padding,
              borderWidth: 0.5,
              borderRadius: 5,
            },
          });

          return (
            <Block flex={false}>
              <Block
                flex={false}
                row
                middle
                style={{
                  height: sizes.inputHeight,
                  minWidth: '100%',
                  borderWidth: 1,
                  borderColor: error ? colors.error : colors.gray,
                  borderRadius: 5,
                  paddingHorizontal: 2.5,
                }}
              >
                {showCountryPicker && (
                  <PickCountry
                    callingcodeChanged={callingcodeChanged}
                    cca2={cca2}
                    fontSize={sizes.body}
                  />
                )}
                <TextInput
                  placeholder={placeholder}
                  ref={mobilenumberInput}
                  keyboardType={keyboardType}
                  underlineColorAndroid="transparent"
                  onChangeText={onPhoneChange}
                  value={phone}
                  editable={!disabled}
                  allowFontScaling={allowFontScaling}
                  style={{
                    paddingTop: Platform.OS === 'android' ? 0 : '1%',
                    flex: 1,
                    ...inputStyle,
                  }}
                  autoFocus={autoFocus}
                />
                {trailingIcon && (
                  <Block flex={false} padding={2.5}>
                    {trailingIcon}
                  </Block>
                )}
              </Block>
              {showErrors && (
                <Text small error style={styles.error}>
                  {error && meta.error}
                </Text>
              )}
            </Block>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
);

PhoneInput.defaultProps = {
  style: {},
  meta: {},
  showErrors: true,
  input: {
    onChange: () => {},
    onBlur: () => {},
    value: '',
  },
  focused: false,
  onPhoneChanged: () => {},
  onChange: () => {},
  phone: '',
  placeholder: 'Enter your phone number',
  bordered: true,
  disabled: false,
  allowFontScaling: false,
  showCountryPicker: true,
  cca2: 'KE',
  callingCode: '254',
  currency: 'KES',
  country: 'Kenya',
};
export default PhoneInput;
