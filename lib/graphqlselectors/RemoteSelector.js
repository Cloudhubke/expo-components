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
  onChange = () => null,
  onSelectChange = () => null,
  isMulti = false,
  Graphqlmodel,
  disabled,
  ...props
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { colors, sizes } = React.useContext(ThemeContext);

  const val = value || input.value;

  const [loading, setLoading] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    val
      ? {
          item: val,
          label: labelExtractor(val),
          secondaryLabel: secondaryLabelExtractor(val),
          value: valueExtractor(val),
          key: keyExtractor(val),
          selected: true,
        }
      : null
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
    setSelectedValue(val);
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
    if (!isMulti) {
      setModalVisible(false);
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
      if (selectedValue && keyExtractor(val) === selectedValue.key) {
        return;
      }
      setSelectedValue({
        item: val,
        label: labelExtractor(val),
        secondaryLabel: secondaryLabelExtractor(val),
        value: valueExtractor(val),
        selected: true,
      });
    } else {
      setSelectedValue(null);
    }
  }, [JSON.stringify(val)]);

  const renderRow = ({ item, index }) => {
    const { label, secondaryLabel } = item;

    const initials = AvatarHelper.getInitials(label);
    const animationProps = AnimatableManager.getEntranceByIndex(index);

    return (
      <Animatable.View {...animationProps}>
        <ListItem key={index} onPress={() => logChange(item)}>
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
        {selectedValue ? (
          <Block row middle>
            <Block row middle>
              <Text style={{ flex: 1, color: '#333', ...textStyle }}>
                {`${selectedValue.label}`}
              </Text>
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
        transparent
      >
        <Block color={colors.mistyWhite}>
          <Header
            onBack={() => setModalVisible(false)}
            style={{
              ...(Platform.OS === 'android' ? { height: 45 } : {}),
            }}
          >
            <SearchComponent onChange={(text) => setSearchText(text)} />
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
        </Block>
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
