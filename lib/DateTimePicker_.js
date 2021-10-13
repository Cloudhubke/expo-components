import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import isString from 'lodash/isString';
import Block from './Block';
import Text from './Text';
import IconButton from './IconButton';
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
  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const val = input.value || value;
  const [selectedDate, setSeletedDate] = React.useState(new Date());
  const [timestamp, setTimestamp] = React.useState(selectedDate.getTime());

  const [show, setShow] = React.useState(false);
  const [mode, setMode] = React.useState('date');

  const onChange = (event, date) => {
    setSeletedDate(date || selectedDate);
    setShow(false);
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
  }, [timestamp]);

  const removeDate = () => {};

  const { error } = meta;

  return (
    <Block flex={false}>
      {Platform.OS === 'android' && (
        <Block row middle flex={false} style={styles.textField(meta)}>
          {selectedDate ? (
            <Block row middle>
              <TouchableOpacity
                onPress={() => {
                  showDatepicker();
                  setShow(true);
                }}
                disabled={disabled}
                style={{ flex: 1 }}
              >
                <Text style={{ color: '#333' }}>
                  {`${moment(timestamp).format('DD MMM, YYYY')}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  showTimepicker();
                  setShow(true);
                }}
                disabled={disabled}
                style={{ marginRight: sizes.margin }}
              >
                <Text style={{ color: '#333' }}>
                  {`${moment(timestamp).format('hh:mm a')}`}
                </Text>
              </TouchableOpacity>

              <IconButton size={32} onPress={removeDate}>
                <MaterialIcons name="close" style={{ fontSize: 16 }} />
              </IconButton>
            </Block>
          ) : (
            <Text style={{ flex: 1, color: '#BBB' }}>{placeholder}</Text>
          )}
        </Block>
      )}
      {(Platform.OS === 'ios' || show) && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
          style={{
            height: sizes.inputHeight,
            borderWidth: 0.5,
            borderColor: error ? colors.error : colors.darkGray,
            borderRadius: 5,
          }}
          {...(Platform.OS === 'ios' ? { mode: 'datetime' } : {})}
        />
      )}

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
