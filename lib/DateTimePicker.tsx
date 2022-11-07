import React from 'react';
import { DateTimePicker as RNDateTimePicker } from 'react-native-ui-lib';
import Block from './Block';
import Text from './Text';
import defaultcolors from './theme/Colors';
import defaultsizes from './theme/Sizes';
import ThemeContext from './theme/ThemeContext';

const styles = {
  textField: (meta) => ({
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    borderColor:
      meta.touched && meta.error ? defaultcolors.error : defaultcolors.gray,
    height: defaultsizes.inputHeight,
    padding: 7,
    alignItems: 'center',
    marginBottom: 7,
  }),

  error: {
    marginTop: 2.5,
    height: 14,
    marginBottom: 2.5,
  },
};

const DateTimePicker = ({
  disabled,
  input,
  value,
  meta,
  placeholder,
  onDateChanged,
  showTime = false,
  format,
  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const val = input.value || value;
  const [selectedDate, setSeletedDate] = React.useState(new Date());
  const [timestamp, setTimestamp] = React.useState(selectedDate.getTime());

  const onChange = (date) => {
    setSeletedDate(date || selectedDate);
  };

  React.useEffect(() => {
    if (selectedDate && selectedDate.getTime) {
      setTimestamp(selectedDate.getTime());
    }
  }, [selectedDate]);

  React.useEffect(() => {
    if (val && typeof val === 'number') {
      setSeletedDate(new Date(val));
    } else {
      // setSeletedDate(null);
    }
  }, [val]);

  React.useEffect(() => {
    if (input.onChange && typeof input.onChange === 'function') {
      input.onChange(timestamp);
    }
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange(timestamp);
    }
    if (onDateChanged && typeof onDateChanged === 'function') {
      onDateChanged(timestamp);
    }
  }, [timestamp]);

  const removeDate = () => {};

  const { error } = meta;

  return (
    <Block flex={false}>
      <Block row middle flex={false} style={styles.textField(meta)}>
        <Block absolute row>
          <Block padding={[0, sizes.padding / 2]}>
            <RNDateTimePicker
              value={selectedDate}
              mode="date"
              is24Hour
              display="default"
              dateFormat={format || 'YYYY-MM-DD'}
              onChange={onChange}
              style={{
                flex: 1,
                height: sizes.inputHeight,
              }}
              disabled={disabled}
            />
          </Block>
          {showTime && (
            <Block padding={[0, sizes.padding / 2]}>
              <RNDateTimePicker
                value={selectedDate}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
                style={{
                  flex: 1,
                  height: sizes.inputHeight,
                }}
                disabled={disabled}
              />
            </Block>
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

DateTimePicker.defaultProps = {
  placeholder: 'select...',
  format: 'DD MMM, YYYY',
  value: null,
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {},
  },
  meta: {},
  disabled: false,
};

export default DateTimePicker;
