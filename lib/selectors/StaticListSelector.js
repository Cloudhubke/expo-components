import React from 'react';

import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Fuse from 'fuse.js';
import * as Animatable from 'react-native-animatable';
import {
  AnimatableManager,
  Colors,
  ListItem,
  Avatar,
  AvatarHelper,
} from 'react-native-ui-lib';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import Text from '../Text';
import Block from '../Block';
import Header from '../Header';

import IconButton from '../IconButton';
import ThemeContext from '../theme/ThemeContext';
import SearchComponent from '../SearchComponent';
import SafeAreaView from '../SafeAreaView';

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
  secondaryLabelExtractor,
  valueExtractor,
  keyExtractor,
  disabled,
  style,
  onDialogOpen = () => null,
  ...props
}) => {
  const { colors, sizes } = React.useContext(ThemeContext);

  const incomingoptions = props.options.map((option) => ({
    item: option,
    value: valueExtractor(option),
    label: labelExtractor(option),
    secondaryLabel: secondaryLabelExtractor(option),
    key: keyExtractor(option),
  }));

  const val = input.value || value;

  const [options, setOptions] = React.useState(incomingoptions);
  const [filtered, setFiltered] = React.useState(options);

  const keys = options.map((o) => o.key);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(null);

  React.useEffect(() => {
    setOptions(incomingoptions);
  }, [JSON.stringify(keys)]);

  React.useEffect(() => {
    if (val) {
      const opt = {
        item: val,
        value: valueExtractor(val),
        label: labelExtractor(val),
        secondaryLabel: secondaryLabelExtractor(val),
        key: keyExtractor(val),
      };

      setSelectedValue(opt);
    } else {
      setSelectedValue(null);
    }
  }, [JSON.stringify(val)]);

  const logChange = (val, index) => {
    const { onChange, onSelectChange } = props;

    if (val) {
      onChange(val.value);
      input.onChange(val.value);
      onSelectChange(val.item);
      input.onBlur();
    } else {
      onChange(null);
      onSelectChange(null);
      input.onChange(null);
      input.onBlur();
    }
    setModalVisible(false);
  };

  const { placeholder, meta, iconSize, textStyle, iconStyle, showIcon } = props;

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

  React.useEffect(() => {
    if (modalVisible) {
      onDialogOpen();
    }
  }, [modalVisible]);

  const renderItem = ({ item, index }) => {
    const initials = AvatarHelper.getInitials(item.label);
    const animationProps = AnimatableManager.getEntranceByIndex(index);

    return (
      <Animatable.View {...animationProps}>
        <ListItem key={index} onPress={() => logChange(item, index)}>
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

  const inputStyle = {
    flexDirection: 'row',
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: colors.milkyWhite,
    borderColor: meta.touched && meta.error ? colors.error : colors.gray,
    minHeight: sizes.inputHeight,
    padding: moderateScale(2),
    alignItems: 'center',
    marginHorizontal: 2.5,
    marginBottom: verticalScale(sizes.margin),
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
            <Text style={{ flex: 1, color: '#333', ...textStyle }}>
              {`${selectedValue.label}`}
            </Text>

            <Block flex={false}>
              {showIcon && (
                <IconButton
                  size={iconSize}
                  onPress={() => logChange(null)}
                  disabled={disabled}
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
          <Text style={{ flex: 1, color: '#BBB' }}>{` ${placeholder}`}</Text>
        )}
        <Ionicons
          name="ios-arrow-down"
          style={{ fontSize: 16, marginHorizontal: 7 }}
        />
      </TouchableOpacity>

      {meta.touched && meta.error && (
        <Block
          flex={false}
          style={{
            backgroundColor: Colors.red70,
            borderRadius: 5,
          }}
        >
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
        <SafeAreaView>
          <Header onBack={() => setModalVisible(false)} hasHeight>
            <SearchComponent onChange={handleFilterChange} />
          </Header>

          <View style={{ marginTop: 10, flex: 1 }}>
            <FlatList
              data={filtered}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={renderItem}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

StaticListSelector.defaultProps = {
  params: {},
  options: [],
  onChange: () => {},
  input: {
    value: null,
    onChange: () => {},
    onBlur: () => {},
  },
  keyExtractor: (value) => value.id || value,
  valueExtractor: (value) => value.id || value,
  labelExtractor: (value) => value.id || value,
  secondaryLabelExtractor: (value) => value.id || value,
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
