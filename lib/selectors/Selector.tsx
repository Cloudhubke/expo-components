import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';

import {
  Colors,
  ListItem,
  Avatar,
  AvatarHelper,
  Badge,
} from '@expocraft/rnuilib';
import * as Animatable from 'react-native-animatable';
import Fuse from 'fuse.js';

import AnimatableManager from '../AnimatableManager';

import ThemeContext from '../theme/ThemeContext';
import SearchComponent from '../SearchComponent';
import Block from '../Block';
import Text from '../Text';
import Header from '../Header';
import Modal from '../modal/Modal';

import KeyboardView from '../KeyboardView';
import SelectedValue from './SelectedValue';
import SelectedValues from './SelectedValues';
import { MaterialIcons } from '@expo/vector-icons';
import BlockModal from '../modal/BlockModal';

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

const Selector: React.FC<any> = React.forwardRef(
  (
    {
      value,
      onChange,
      onSelectChange = () => {},
      labelExtractor,
      keyExtractor,
      valueExtractor,
      iconSize = 24,
      iconStyle = {},
      disabled = false,
      placeholder = 'Select...',

      isMulti = false,
      showIcon = true,
      meta = {},
      textStyle = {},
      inputStyle = {},
      ...props
    },
    ref
  ) => {
    const { sizes, colors } = React.useContext(ThemeContext);

    const [state, setState] = React.useState<{
      searchText: string;
      selectedValue: any[];
      modalVisible: boolean;
      filtered: any[];
    }>({
      searchText: '',
      selectedValue: [],
      modalVisible: false,
      filtered: [],
    });

    const selectRef = React.useRef<any>();

    const options = React.useMemo(() => {
      const options: any[] = uniqBy(
        [...(props.options || [])].map((item, index) => ({
          value: keyExtractor(item, index),
          label: labelExtractor(item, index),
          item,
        })),
        'value'
      );

      let valoptions: any[] = [];

      if (Array.isArray(value)) {
        valoptions = [...value].map((item, index) => ({
          value: keyExtractor(item, index),
          label: labelExtractor(item, index),
          item,
        }));
      } else {
        if (value) {
          valoptions = [value].map((item, index) => ({
            value: keyExtractor(item, index),
            label: labelExtractor(item, index),
            item,
          }));
        }
      }

      const unnfiltered = uniqBy([...valoptions, ...options], 'value');

      setState((state) => ({
        ...state,
        selectedValue: valoptions,
        filtered: unnfiltered,
      }));

      return unnfiltered;
    }, [JSON.stringify(props.options), JSON.stringify(value)]);

    const thisfuse = React.useMemo(() => {
      const fuseOptions = {
        // includeScore: true,
        useExtendedSearch: true,
        keys: ['label'],
      };

      return new Fuse(options, fuseOptions);
    }, [options]);

    const handleFilterChange = (value) => {
      const str = `${value}`
        .split(' ')
        .filter((i) => Boolean(i))
        .map((str) => `'${str}`)
        .join(' ');
      // const filtered = thisfuse.search(str || '');
      const filtered = !value ? options : thisfuse.search(str || '');

      setState((state) => ({
        ...state,
        filtered: filtered.map((i) =>
          typeof i.refIndex === 'number' ? i.item : i
        ),
      }));
    };

    const logChange = (val: any, index?: number) => {
      if (!isMulti) {
        setState((state) => ({
          ...state,
          modalVisible: false,
        }));
      }

      if (!val || isEmpty(val)) {
        onSelectChange(isMulti ? [] : null);
        return onChange(isMulti ? [] : null);
      }
      if (isMulti) {
        let newSelectedValue = [...state.selectedValue, val];
        const ind = state.selectedValue.findIndex((v) => v.value === val.value);

        if (ind > -1) {
          newSelectedValue = [...state.selectedValue].filter(
            (v) => v.value !== val.value
          );
        }

        if (newSelectedValue && Array.isArray(newSelectedValue)) {
          const options = newSelectedValue.map((item) => {
            if (!isPlainObject(item.item)) {
              return item.item;
            }
            const objValue = { ...item.item };
            return valueExtractor(objValue);
          });

          onChange(options);
          onSelectChange(newSelectedValue.map((o) => o.item));
          return true;
        }
      }

      if (val && val.value) {
        if (!isPlainObject(val.item)) {
          onSelectChange(val.item);
          return onChange(val.item);
        }
        const objValue = { ...val.item };

        onChange(valueExtractor(objValue));
        onSelectChange(objValue);
        return true;
      }
    };

    const openMenu = () => {
      setState((state) => ({
        ...state,
        modalVisible: true,
      }));
      handleFilterChange(state.searchText);
    };

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        if (selectRef && selectRef.current) {
          if (typeof selectRef.current.focus === 'function') {
            selectRef.current.focus();
          }
        }
      },
    }));

    const styles = React.useMemo(() => {
      return {
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
          borderRadius: sizes.borderRadius || 5,
          borderWidth: 1,
          borderColor:
            meta.touched && meta.error ? colors.error : colors.inputBorderColor,
          minHeight: sizes.inputHeight,
          backgroundColor: colors.inputBackgroundColor,
          padding: 7,
          margin: 1,
          alignItems: 'center',
          marginBottom: 2.5,
          overflow: 'scroll',
          ...inputStyle,
        }),
        listItem: {
          minHeight: 55,
          borderBottomWidth: 0.5,
          borderBottomColor: '#CCC',
          paddingVertical: 5,
          paddingHorizontal: sizes.padding,
          flexDirection: 'row',
          alignItems: 'center',
        },
        error: {
          color: '#F44336',
        },
      };
    }, []);

    const renderItem = ({ item, index }: any) => {
      const initials = AvatarHelper.getInitials(item.label);
      const animationProps = AnimatableManager.getEntranceByIndex(index);

      const selected =
        state.selectedValue.findIndex((v) => v.value === item.value) > -1;

      return (
        <Animatable.View {...animationProps}>
          {props.renderItem ? (
            <TouchableOpacity onPress={() => logChange(item, index)}>
              {props.renderItem({ item, index })}
            </TouchableOpacity>
          ) : (
            <ListItem
              key={index}
              onPress={() => logChange(item, index)}
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: selected ? Colors.grey40 : Colors.grey50,
                ...(selected ? { backgroundColor: Colors.grey60 } : {}),
              }}
            >
              <ListItem.Part left>
                <Avatar
                  source={item.thumbnail ? { uri: item.thumbnail } : null}
                  label={initials}
                  backgroundColor={randomColor()}
                  containerStyle={{ marginHorizontal: 18 }}
                />
              </ListItem.Part>
              <ListItem.Part middle>
                <Block row middle>
                  <Block>
                    <Text bold>{`${item.label}`}</Text>
                    {/* <Text text70>{item.Phone}</Text> */}
                  </Block>
                  <Block flex={false} margin={[0, 10]}>
                    {selected && <MaterialIcons name="done" size={24} />}
                  </Block>
                </Block>
              </ListItem.Part>
            </ListItem>
          )}
        </Animatable.View>
      );
    };

    const selectedValue = isMulti
      ? state.selectedValue
      : state.selectedValue[0];

    return (
      <>
        <Block flex={false}>
          <TouchableOpacity
            disabled={disabled}
            onPress={openMenu}
            style={styles.textField(meta)}
          >
            {isMulti ? (
              <SelectedValues
                selectedValue={selectedValue}
                onRemove={(item) => logChange(item)}
                iconSize={iconSize}
                iconStyle={iconStyle}
                showIcon={showIcon}
                placeholder={placeholder}
                onPress={openMenu}
              />
            ) : (
              <SelectedValue
                selectedValue={selectedValue}
                iconSize={iconSize}
                iconStyle={iconStyle}
                showIcon={showIcon}
                placeholder={placeholder}
                textStyle={textStyle}
                onRemove={() => logChange([])}
                onPress={openMenu}
              />
            )}
          </TouchableOpacity>
          {isMulti && state.selectedValue.length > 0 && (
            <Badge
              label={state.selectedValue.length}
              size={16}
              backgroundColor={colors.dark}
              containerStyle={{
                position: 'absolute',
                top: -10,
                right: 0,
              }}
            />
          )}
        </Block>

        <BlockModal
          isVisible={state.modalVisible}
          onClose={() => {
            setState((state) => ({
              ...state,
              modalVisible: false,
            }));
          }}
          // fill={options.length > 10}
          // modal={options.length >= 10}
          showHandle
          bottom
          roundedTop
        >
          <Block color={colors.mistyWhite}>
            {options.length >= 10 && (
              <Header
                style={styles.header}
                hasHeight
                onBack={() => {
                  setState((state) => ({
                    ...state,
                    modalVisible: false,
                  }));
                }}
              >
                <SearchComponent
                  autoFocus={false}
                  onChange={(text) => handleFilterChange(text)}
                />
              </Header>
            )}

            <Block pointerEvents="box-none">
              <KeyboardView style={{ marginTop: 10, flex: 1 }}>
                <FlatList
                  data={state.filtered}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  renderItem={({ item, index }) => renderItem({ item, index })}
                  keyboardShouldPersistTaps="always"
                  keyboardDismissMode="on-drag"
                />
              </KeyboardView>
            </Block>
          </Block>
        </BlockModal>
      </>
    );
  }
);

export default Selector;
