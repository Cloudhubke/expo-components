import React from 'react';

import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import isObject from 'lodash/isObject';
import { isEqual, isEmpty } from 'lodash';
import Fuse from 'fuse.js';
import * as Animatable from 'react-native-animatable';
import {
  AnimatableManager,
  Colors,
  ListItem,
  Avatar,
  AvatarHelper,
} from 'react-native-ui-lib';
import { Header } from '../native-base/basic/Header';
import { Button } from '../native-base/basic/Button';

import Text from '../Text';
import Block from '../Block';

import IconButton from '../IconButton';
import ThemeContext from '../theme/ThemeContext';
import SearchComponent from '../SearchComponent';

const randomColor = () => {
  const BACKGROUND_COLORS = [
    Colors.red70,
    Colors.yellow70,
    Colors.purple70,
    Colors.green70,
    Colors.cyan70,
    Colors.purple70,
    Colors.blue70,
    Colors.red70,
    Colors.green70,
    Colors.purple70,
  ];
  const int = Math.floor(Math.random() * 10 + 1);

  return BACKGROUND_COLORS[int];
};

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
  const [filtered, setFiltered] = React.useState(options);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  React.useEffect(() => {
    if (!isEmpty(incomingoptions) && !isEqual(incomingoptions, options)) {
      setOptions(incomingoptions);
    }
  }, [incomingoptions.length]);

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
  }, [val, options.length]);

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

  const thisfuse = React.useMemo(() => {
    const fuseOptions = {
      // includeScore: true,
      useExtendedSearch: true,
      keys: ['label'],
    };

    return new Fuse(options, fuseOptions);
  }, [options.length]);

  const handleFilterChange = (value) => {
    const str = `${value}`
      .split(' ')
      .filter((i) => Boolean(i))
      .map((str) => `'${str}`)
      .join(' ');
    // const filtered = thisfuse.search(str || '');
    const filtered = !value ? options : thisfuse.search(str || '');

    setFiltered(filtered.map((o) => (!value ? o : o.item)));
  };

  const renderItem = ({ item, index }) => {
    const initials = AvatarHelper.getInitials(item.label);
    const animationProps = AnimatableManager.getEntranceByIndex(index);

    return (
      <Animatable.View {...animationProps}>
        <ListItem key={index} onPress={() => onChange(item, index)}>
          <ListItem.Part left>
            <Avatar
              source={item.thumbnail ? { uri: item.thumbnail } : null}
              label={initials}
              badgeProps={{
                backgroundColor:
                  Number(index) % 3 === 0 ? Colors.green30 : undefined,
              }}
              backgroundColor={randomColor()}
              containerStyle={{ marginHorizontal: 18 }}
            />
          </ListItem.Part>
          <ListItem.Part
            middle
            containerStyle={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.dark70,
            }}
          >
            <Block>
              <Text semibold>{`${item.label}`}</Text>
              {/* <Text text70>{item.Phone}</Text> */}
            </Block>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  };

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
                  <SearchComponent onChange={handleFilterChange} />
                </View>
              </Header>

              <View style={{ marginTop: 10, flex: 1 }}>
                <FlatList
                  data={filtered}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={renderItem}
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
