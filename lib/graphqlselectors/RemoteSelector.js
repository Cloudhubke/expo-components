/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  AnimatableManager,
  Colors,
  ListItem,
  Avatar,
  AvatarHelper,
  Chip,
} from 'react-native-ui-lib';

import isObject from 'lodash/isObject';

import { MaterialIcons } from '@expo/vector-icons';

import { moderateScale, verticalScale } from 'react-native-size-matters';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';
import IconButton from '../IconButton';
import Header from '../Header';

import SearchComponent from '../SearchComponent';
import Modal from '../modal/Modal';
import useDebounce from '../useDebounce';
import SafeAreaView from '../SafeAreaView';
import Button from '../Button';

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

const RemoteSelector = ({
  value,
  input,
  style = {},
  textStyle = {},
  showIcon = false,
  iconSize = 32,
  iconStyle = {},
  meta = {},
  placeholder = 'Select...',
  valueExtractor = (item) => item,
  labelExtractor = (item) => item.id || item,
  keyExtractor = (item) => item.id || item,
  secondaryLabelExtractor = (item) => item.id || item,
  avatarExtractor = (item) => item.avatar || {},
  onChange = () => null,
  onSelectChange = () => null,
  isMulti = false,
  Graphqlmodel,
  disabled,
  ...props
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { colors, sizes } = React.useContext(ThemeContext);

  let val = value || input.value;
  if (val && !Array.isArray(val)) {
    val = [val];
  }

  const [loading, setLoading] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    val
      ? val.map((v) => ({
          item: v,
          label: labelExtractor(v),
          secondaryLabel: secondaryLabelExtractor(v),
          avatar: avatarExtractor(v),
          value: valueExtractor(v),
          key: keyExtractor(v),
          selected: true,
        }))
      : []
  );

  const [options, setOptions] = React.useState(
    selectedValue ? [selectedValue] : []
  );
  const [firstoptions, setFirstoptions] = React.useState(null);

  const [searchText, setSearchText] = React.useState(searchText);
  const debouncedSearchText = useDebounce(searchText, 1000);

  const getOptions = async (params = {}) => {
    if (!Graphqlmodel) {
      throw new Error('Graphqlmodel is not defined');
    }
    setLoading(true);

    const { items } = await Graphqlmodel()
      .find({
        ...params,
      })
      .toJson();

    setLoading(false);

    if (Array.isArray(items)) {
      const options = items.map((item) => {
        if (!isObject(item)) {
          return {
            item,
            value: valueExtractor(item),
            label: labelExtractor(item),
            key: keyExtractor(item),
            secondaryLabel: secondaryLabelExtractor(item),
            avatar: avatarExtractor(item),
            selected: selectedValue
              ? selectedValue.key === keyExtractor(item)
              : false,
          };
        }
        return {
          item,
          value: valueExtractor(item),
          label: labelExtractor(item),
          key: keyExtractor(item),
          secondaryLabel: secondaryLabelExtractor(item),
          avatar: avatarExtractor(item),
          selected: selectedValue
            ? selectedValue.key === keyExtractor(item)
            : false,
        };
      });

      if (!firstoptions) {
        setFirstoptions(options);
      }
      setOptions(options);
    }
  };

  const logChange = (val) => {
    if (isMulti) {
      if (!val) {
        onChange([]);
        onSelectChange([]);
        input.onChange([]);
        input.onBlur();
      } else {
        const ind = selectedValue.findIndex((v) => v.id === val.id);
        let values = [...selectedValue];
        if (ind === -1) {
          values = [...values, val];
        } else {
          values.splice(ind, 1);
        }

        onChange(values.map((v) => v.value));
        onSelectChange(values.map((v) => v.item));
        input.onChange(values.map((v) => v.value));
        input.onBlur();
      }
    } else {
      setModalVisible(false);
      setSelectedValue([val].filter((v) => Boolean(v)));
      if (val) {
        onChange(val.value);
        onSelectChange(val.item);
        input.onChange(val.value);
        input.onBlur();
      } else {
        onChange(null);
        onSelectChange(null);
        input.onChange(null);
        input.onBlur();
      }
    }
  };

  React.useEffect(() => {
    const params = {
      ...(props.params || {}),
      filter: debouncedSearchText,
    };
    getOptions(params);
  }, [JSON.stringify(props.params), debouncedSearchText]);

  React.useEffect(() => {
    if (val) {
      if (Array.isArray(val)) {
        setSelectedValue(
          val.map((v) => ({
            item: v,
            label: labelExtractor(v),
            secondaryLabel: secondaryLabelExtractor(v),
            avatar: avatarExtractor(v),
            value: valueExtractor(v),
            selected: true,
          }))
        );
      } else {
        setSelectedValue([
          {
            item: val,
            label: labelExtractor(val),
            secondaryLabel: secondaryLabelExtractor(val),
            avatar: avatarExtractor(val),
            value: valueExtractor(val),
            selected: true,
          },
        ]);
      }
    } else {
      setSelectedValue([]);
    }
  }, [JSON.stringify(val)]);

  const renderRow = ({ item, index }) => {
    const { label, secondaryLabel, avatar, isOnline } = item;

    const initials = AvatarHelper.getInitials(label);
    const animationProps = AnimatableManager.getEntranceByIndex(index);

    const isSelected = selectedValue.map((v) => v.id).includes(item.id);

    return (
      <Animatable.View {...animationProps}>
        <ListItem
          key={index}
          onPress={() => logChange(item)}
          style={{
            backgroundColor: isSelected ? Colors.grey50 : null,
          }}
        >
          <ListItem.Part left>
            <Avatar
              source={avatar.uri ? { uri: avatar.uri } : null}
              label={initials}
              badgeProps={{
                backgroundColor: isOnline ? Colors.green30 : undefined,
              }}
              backgroundColor={randomColor()}
              containerStyle={{ marginHorizontal: 18 }}
            />
          </ListItem.Part>
          <ListItem.Part
            middle
            containerStyle={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: Colors.white,
              paddingRight: 15,
            }}
          >
            <Block>
              <Text dark semiBold>{`${label}`}</Text>
              <Text text70>{secondaryLabel}</Text>
            </Block>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  };

  const inputStyle = {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: colors.milkyWhite,
    borderColor: meta.touched && meta.error ? colors.error : colors.gray,
    height: sizes.inputHeight,
    padding: moderateScale(2),
    alignItems: 'center',
    marginHorizontal: 2.5,
    marginBottom: verticalScale(5),
    overflow: 'hidden',
    ...style,
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={inputStyle}
        disabled={disabled}
      >
        {selectedValue.length > 0 ? (
          <Block row middle>
            <Block row middle>
              {selectedValue.map((val, index) => {
                const initials = AvatarHelper.getInitials(val.label);
                return (
                  <Chip
                    key={`${val.id}-${index}`}
                    label={`${val.label}`}
                    avatarProps={{
                      label: initials,
                      source: val.avatar,
                      backgroundColor: randomColor(),
                      size: 20,
                    }}
                  />
                );
              })}
            </Block>

            <Block flex={false}>
              {showIcon && (
                <IconButton size={iconSize} onPress={() => logChange(null)}>
                  <MaterialIcons
                    name="close"
                    style={{ fontSize: 16, ...iconStyle }}
                  />
                </IconButton>
              )}
            </Block>
          </Block>
        ) : (
          <Text style={{ flex: 1, ...textStyle, color: '#BBB' }}>
            {placeholder}
          </Text>
        )}

        {selectedValue ? (
          <IconButton disabled={disabled} onPress={() => logChange(null)}>
            <MaterialIcons name="close" size={18} color={colors.dark} />
          </IconButton>
        ) : (
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={colors.darkGray}
          />
        )}
      </TouchableOpacity>

      {meta.touched && meta.error && <Text error>{meta.error}</Text>}

      <Modal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView>
          <Header
            onBack={() => setModalVisible(false)}
            style={{
              ...(Platform.OS === 'android' ? { height: 45 } : {}),
            }}
            hasHeight
          >
            <Block row middle>
              <SearchComponent onChange={(text) => setSearchText(text)} />
              {isMulti && (
                <Button
                  small
                  rounded
                  style={{ height: 35, marginLeft: sizes.margin }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text dark>Done</Text>
                </Button>
              )}
            </Block>
          </Header>

          <Block pointerEvents="box-none">
            <KeyboardAvoidingView style={{ marginTop: 10, flex: 1 }}>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index}
                renderItem={renderRow}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getOptions(searchText || '')}
                  />
                }
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
              />
            </KeyboardAvoidingView>
          </Block>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

RemoteSelector.defaultProps = {
  input: {
    value: null,
    onChange: () => null,
    onBlur: () => null,
  },
};

export default RemoteSelector;
