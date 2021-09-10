import React from 'react';

import { Modal, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import isObject from 'lodash/isObject';
import { isEqual, isEmpty } from 'lodash';
import { Header } from '../native-base/basic/Header';
import { Button } from '../native-base/basic/Button';
import { Title } from '../native-base/basic/Title';
import { Body } from '../native-base/basic/Body';
import { Right } from '../native-base/basic/Right';

import Text from '../Text';
import Block from '../Block';

import IconButton from '../IconButton';
import ThemeContext from '../theme/ThemeContext';

const StaticListSelector = ({
  value,
  input,
  labelExtractor,
  valueExtractor,
  keyExtractor,
  disabled,
  ...props
}) => {
  const incomingoptions = props.options.map((option) => ({
    item: option,
    value: isObject(option) ? keyExtractor(option) : option,
    label: isObject(option) ? labelExtractor(option) : option,
  }));

  const val = input.value || value;

  const [options, setOptions] = React.useState(incomingoptions);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [searching, setSearching] = React.useState(false);

  React.useEffect(() => {
    if (!isEmpty(incomingoptions) && !isEqual(incomingoptions, options)) {
      setOptions(incomingoptions);
    }
  }, [incomingoptions]);

  React.useEffect(() => {
    const opt = {
      item: val,
      value: isObject(val) ? keyExtractor(val) : val || '',
      label: isObject(val) ? labelExtractor(val) : val || '',
    };
    let opts = options;
    if (opts.length === 0) {
      opts = [opts];
      setOptions(opts);
    }

    const ind = opts.findIndex((i) => i.value === opt.value);
    setSelectedValue(opts[ind]);
  }, [val, options]);

  const onChange = (value, index) => {
    setModalVisible(false);
    logChange(value, index);
  };

  const logChange = (val, index) => {
    const { onChange, onSelectChange, returnkeys } = props;

    if (val) {
      if (returnkeys.length > 1) {
        const objValue = { ...val.item };
        const obj = {};
        returnkeys.forEach((key) => {
          obj[key] = objValue[key];
        });
        onChange({ ...obj });
        input.onChange({ ...obj });
        onSelectChange(val.item);
        input.onBlur();
      } else {
        const rval = valueExtractor(val.item);
        onChange(rval);
        input.onChange(rval);
        onSelectChange(val.item);
        input.onBlur();
      }
    } else {
      onChange(null);
      onSelectChange(null);
      input.onChange(null);
      input.onBlur();
    }
  };

  const {
    placeholder,
    meta,
    inputStyle,
    iconSize,
    textStyle,
    iconStyle,
    showIcon,
  } = props;

  const error = meta.touched && meta.error;

  return (
    <ThemeContext.Consumer>
      {({ sizes, colors }) => {
        const styles = {
          statusBarUnderlay: {
            height: 24,
            // backgroundColor: 'rgba(0,0,0,0.2)'
          },
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFF6FF',
            paddingTop: 16,
          },
          titleText: {
            color: '#333C33',
          },
          headerTitleContainer: {
            marginLeft: 15,
          },
          leftalignedTitleContainer: {
            flex: 1,
            marginLeft: 15,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
          textField: (meta) => ({
            flexDirection: 'row',
            borderRadius: 5,
            borderWidth: 1,
            borderColor:
              meta.touched && meta.error ? colors.error : colors.gray,
            height: sizes.inputHeight,
            alignItems: 'center',
            paddingHorizontal: 5,
            marginBottom: 7,
            ...inputStyle,
          }),
          listItem: {
            minHeight: sizes.inputHeight,
            borderBottomWidth: 0.5,
            borderBottomColor: '#CCC',
            paddingVertical: 5,
            paddingHorizontal: sizes.padding,
            flexDirection: 'row',
            alignItems: 'center',
          },
          error: {
            marginTop: 2.5,
            height: 14,
            marginBottom: 2.5,
          },
        };

        return (
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={[styles.textField(meta)]}
              disabled={disabled}
            >
              {selectedValue ? (
                <Block row middle>
                  <Text style={{ flex: 1, color: '#333', ...textStyle }}>
                    {`${selectedValue.label}`}
                  </Text>

                  <Block flex={false}>
                    {showIcon && (
                      <IconButton
                        size={iconSize}
                        onPress={() => logChange(null)}
                      >
                        <MaterialIcons
                          name="close"
                          style={{ fontSize: 16, ...iconStyle }}
                        />
                      </IconButton>
                    )}
                  </Block>
                </Block>
              ) : (
                <Text style={{ flex: 1, color: '#BBB' }}>
                  {` ${placeholder}`}
                </Text>
              )}
              <Ionicons
                name="ios-arrow-down"
                style={{ fontSize: 16, marginHorizontal: 7 }}
              />
            </TouchableOpacity>

            {meta.touched && meta.error && (
              <Block flex={false} style={styles.error}>
                <Text small error>
                  {error && meta.error}
                </Text>
              </Block>
            )}

            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {}}
            >
              <Header style={styles.header}>
                <Button
                  transparent
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Ionicons style={{ fontSize: 24 }} name="md-arrow-back" />
                </Button>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 3,
                    marginHorizontal: 7,
                  }}
                >
                  <Body style={{ flex: 3 }}>
                    <Title style={styles.titleText}>{placeholder}</Title>
                  </Body>
                  <Right>
                    <TouchableOpacity onPress={() => setSearching(!searching)}>
                      <Ionicons style={{ fontSize: 24 }} name="ios-search" />
                    </TouchableOpacity>
                  </Right>
                </View>
              </Header>

              <View style={{ marginTop: 10, flex: 1 }}>
                <FlatList
                  data={options}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => onChange(item, index)}
                    >
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Modal>
          </View>
        );
      }}
    </ThemeContext.Consumer>
  );
};

StaticListSelector.defaultProps = {
  params: {},
  options: [],
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
  },
  keyExtractor: (value) => value,
  valueExtractor: (value) => value,
  labelExtractor: () => {},
  onSelectChange: () => {},
  displayField: '',
  returnkeys: [],
  inputStyle: {},
  textStyle: {},
  iconStyle: {},
  iconSize: 32,
  showIcon: true,
  url: '',
  placeholder: 'Select...',
  meta: {},
};

export default StaticListSelector;
