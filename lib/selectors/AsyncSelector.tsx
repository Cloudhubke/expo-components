import React, { Component, CSSProperties } from 'react';

import axios from 'axios';

import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';

import useDebounce from '../customhooks/useDebounce';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';

import {
  Colors,
  ListItem,
  Avatar,
  AvatarHelper,
  Badge,
} from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';

import AnimatableManager from '../AnimatableManager';

import ThemeContext from '../theme/ThemeContext';
import SearchComponent from '../SearchComponent';
import Block from '../Block';
import Header from '../Header';
import Modal from '../modal/Modal';

import KeyboardView from '../KeyboardView';
import SelectedValue from './SelectedValue';
import SelectedValues from './SelectedValues';

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

const AsyncSelector: React.FC<any> = React.forwardRef(
  (
    {
      value,
      onChange,
      onSelectChange = () => {},
      axiosinstance,
      Graphqlmodel,
      labelExtractor,
      keyExtractor,
      valueExtractor,
      filterKey = 'filter',
      iconSize = 24,
      iconStyle = {},
      disabled = false,
      placeholder = 'Select...',
      url = '/api',
      params = {},
      isMulti = false,
      debounceTime = 1000,
      otheroptions = [],
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
      loading: boolean;
      loaded: boolean;
      options: any[];
      searchText: string;
      firstoptions: any[];
      selectedValue: any[];
      modalVisible: boolean;
    }>({
      loading: false,
      loaded: false,
      options: [],
      searchText: '',
      firstoptions: [],
      selectedValue: [],
      modalVisible: false,
    });

    const selectRef = React.useRef<any>();

    const debouncedSearchText = useDebounce(state.searchText, debounceTime);

    const getOptions = React.useMemo(
      () => async (searchText: string) => {
        try {
          if (!state.loaded) {
            setState((state) => ({
              ...state,
              loaded: true,
              loading: true,
            }));
          }

          let data;
          if (Graphqlmodel) {
            try {
              data = await Graphqlmodel()
                .find({
                  ...params,
                  filter: `${searchText || ''}`.trim(),
                })
                .toJson();
            } catch (error: any) {
              console.log(error.toString());
            }
          } else {
            const { data: axiosdata } = await axiosinstance().get(url, {
              params: { ...params, [filterKey]: `${searchText || ''}`.trim() },
            });

            data = axiosdata;
          }

          const array = data ? data.items || data : [];
          let valoptions: any[] = [];
          if (!isEmpty(value)) {
            valoptions = Array.isArray(value) ? value : [value];
          }

          const options: any[] = uniqBy(
            [...array, ...valoptions, ...otheroptions].map((item, index) => ({
              value: keyExtractor(item, index),
              label: labelExtractor(item, index),
              item,
            })),
            'value'
          );

          if (state.firstoptions.length === 0) {
            setState((state) => ({
              ...state,
              firstoptions: options,
              options,
              loading: false,
            }));
          } else {
            setState((state) => ({
              ...state,
              options,
              loading: false,
            }));
          }
        } catch (error) {
          console.log('====================================');
          console.log('error', error);
          console.log('====================================');
          setState((state) => ({
            ...state,
            loading: false,
          }));

          // do nothing
        }
      },
      [
        JSON.stringify(params),
        state.loaded,
        axiosinstance,
        url,
        state.firstoptions.length,
      ]
    );

    React.useEffect(() => {
      if (!state.loaded) {
        return;
      }

      if (!debouncedSearchText) {
        if (state.firstoptions.length > 0) {
          setState((state) => ({
            ...state,
            firstoptions: [],
          }));
        }
      } else {
        getOptions(debouncedSearchText);
      }
    }, [debouncedSearchText, state.firstoptions.length]);

    React.useEffect(() => {
      if (!value || isEmpty(value)) {
        setState((state) => ({
          ...state,
          selectedValue: [],
        }));
        return;
      }

      if (Array.isArray(value)) {
        const valoptions: any[] = [...value].map((item, index) => ({
          value: keyExtractor(item, index),
          label: labelExtractor(item, index),
          item,
        }));

        setState((state) => ({
          ...state,
          selectedValue: valoptions,
          options: uniqBy([...valoptions, ...state.options], 'value'),
        }));
      } else {
        const valoptions = [value].map((item, index) => ({
          value: keyExtractor(item, index),
          label: labelExtractor(item, index),
          item,
        }));

        setState((state) => ({
          ...state,
          selectedValue: valoptions,
          options: uniqBy([...valoptions, ...state.options], 'value'),
        }));
      }
    }, [JSON.stringify(value), isMulti]);

    const handleInputChange = (text: string) => {
      setState((state) => ({
        ...state,
        searchText: text,
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

    const onModalOpen = () => {
      if (state.modalVisible) {
        getOptions(debouncedSearchText || '');
      }
    };

    React.useEffect(() => {
      if (state.modalVisible) {
        onModalOpen();
      }
    }, [state.modalVisible]);

    React.useImperativeHandle(ref, () => ({
      reload: () => {
        getOptions(state.searchText);
      },
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
                <Block>
                  <Text semibold>{`${item.label}`}</Text>
                  {/* <Text text70>{item.Phone}</Text> */}
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
            onPress={() => {
              setState((state) => ({
                ...state,
                modalVisible: true,
              }));
              handleInputChange(state.searchText);
            }}
            style={styles.textField(meta)}
          >
            {isMulti ? (
              <SelectedValues
                selectedValue={selectedValue}
                onRemove={(item) => logChange(item)}
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

        <Modal
          isVisible={state.modalVisible}
          onClose={() => {
            setState((state) => ({
              ...state,
              modalVisible: false,
            }));
          }}
          transparent
        >
          <Block color={colors.mistyWhite}>
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
              <SearchComponent onChange={(text) => handleInputChange(text)} />
            </Header>

            <Block pointerEvents="box-none">
              <KeyboardView style={{ marginTop: 10, flex: 1 }}>
                <FlatList
                  data={state.options}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  renderItem={({ item, index }) => renderItem({ item, index })}
                  refreshControl={
                    <RefreshControl
                      refreshing={state.loading}
                      onRefresh={() => handleInputChange('')}
                    />
                  }
                  keyboardShouldPersistTaps="always"
                  keyboardDismissMode="on-drag"
                />
              </KeyboardView>
            </Block>
          </Block>
        </Modal>
      </>
    );
  }
);

export default AsyncSelector;
