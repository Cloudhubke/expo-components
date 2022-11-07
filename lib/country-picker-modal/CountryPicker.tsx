import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';

import Fuse from 'fuse.js';

import cca2List from './data/cca2.json';
import { getHeightPercent } from './ratio';
import CloseButton from './CloseButton';
import countryPickerStyles from './CountryPicker.style';
import StatusBar from '../StatusBar';
import Text from '../Text';

import defaultsizes from '../theme/Sizes';
import defaultcolors from '../theme/Colors';

import Block from '../Block';

let countries = null;
let Emoji = null;
let styles = {};

let isEmojiable = Platform.OS === 'ios';

const FLAG_TYPES = {
  flat: 'flat',
  emoji: 'emoji',
};

const setCountries = (flagType) => {
  if (typeof flagType !== 'undefined') {
    isEmojiable = flagType === FLAG_TYPES.emoji;
  }

  if (isEmojiable) {
    countries = require('./data/countries-emoji.json');
    Emoji = require('./emoji').default;
  } else {
    countries = require('./data/countries.json');
    Emoji = <View />;
  }
};

setCountries();

export const getAllCountries = () =>
  cca2List.map((cca2) => ({ ...countries[cca2], cca2 }));

export default class CountryPicker extends Component {
  static propTypes = {
    cca2: PropTypes.string.isRequired,
    translation: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    closeable: PropTypes.bool,
    filterable: PropTypes.bool,
    children: PropTypes.node,
    countryList: PropTypes.array,
    excludeCountries: PropTypes.array,
    styles: PropTypes.object,
    filterPlaceholder: PropTypes.string,
    autoFocusFilter: PropTypes.bool,
    // to provide a functionality to disable/enable the onPress of Country Picker.
    disabled: PropTypes.bool,
    filterPlaceholderTextColor: PropTypes.string,
    closeButtonImage: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    transparent: PropTypes.bool,
    animationType: PropTypes.oneOf(['slide', 'fade', 'none']),
    flagType: PropTypes.oneOf(Object.values(FLAG_TYPES)),
    hideAlphabetFilter: PropTypes.bool,
    hideCountryFlag: PropTypes.bool,
    renderFilter: PropTypes.func,
    showCallingCode: PropTypes.bool,
    filterOptions: PropTypes.object,
    showCountryNameWithFlag: PropTypes.bool,
  };

  static defaultProps = {
    translation: 'eng',
    countryList: cca2List,
    hideCountryFlag: false,
    excludeCountries: [],
    filterPlaceholder: 'Filter',
    autoFocusFilter: true,
    transparent: false,
    animationType: 'none',
  };

  static renderEmojiFlag(cca2, emojiStyle) {
    return (
      <Text
        style={[countryPickerStyles.emojiFlag, emojiStyle]}
        allowFontScaling={false}
      >
        {cca2 !== '' && countries[cca2.toUpperCase()] ? (
          <Emoji name={countries[cca2.toUpperCase()].flag} />
        ) : null}
      </Text>
    );
  }

  static renderImageFlag(cca2, imageStyle) {
    return cca2 ? (
      <Image
        style={[countryPickerStyles.imgStyle, imageStyle]}
        source={{ uri: countries[cca2]?.flag }}
      />
    ) : null;
  }

  static renderFlag(cca2, emojiStyle, imageStyle) {
    return (
      <Block flex={false} style={{ marginRight: defaultsizes.margin }}>
        {isEmojiable
          ? CountryPicker.renderEmojiFlag(cca2, emojiStyle)
          : CountryPicker.renderImageFlag(cca2, imageStyle)}
      </Block>
    );
  }

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);

    setCountries(props.flagType);
    let countryList = [...props.countryList];
    const excludeCountries = [...props.excludeCountries];

    excludeCountries.forEach((excludeCountry) => {
      const index = countryList.indexOf(excludeCountry);

      if (index !== -1) {
        countryList.splice(index, 1);
      }
    });

    // Sort country list
    countryList = countryList
      .sort((a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      })
      .map((c) => ({
        name: this.getCountryName(countries[c]),
        cca2: c,
      }));

    const options = Object.assign(
      {
        useExtendedSearch: true,
        keys: ['name'],
        id: 'cca2',
      },
      this.props.filterOptions
    );

    this.fuse = new Fuse(countryList, options);

    this.state = {
      modalVisible: false,
      cca2List: countryList,
      flatListMap: countryList,
      filter: '',
      letters: this.getLetters(countryList),
    };

    if (this.props.styles) {
      Object.keys(countryPickerStyles).forEach((key) => {
        styles[key] = StyleSheet.flatten([
          countryPickerStyles[key],
          this.props.styles[key],
        ]);
      });
      styles = StyleSheet.create(styles);
    } else {
      styles = countryPickerStyles;
    }
  }

  onSelectCountry(country) {
    this.setState({
      modalVisible: false,
      filter: '',
    });

    this.props.onChange({
      ...country,
    });
  }

  onClose = () => {
    this.setState({
      modalVisible: false,
      filter: '',
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  getCountryName(country, optionalTranslation) {
    if (!country) {
      return '';
    }
    const translation = optionalTranslation || this.props.translation || 'eng';
    return country.name[translation] || country.name.common;
  }

  setVisibleListHeight(offset) {
    this.visibleListHeight = getHeightPercent(100) - offset;
  }

  getLetters = (list) =>
    Object.keys(
      list.reduce(
        (acc, val) => ({
          ...acc,
          [val.name.slice(0, 1).toUpperCase()]: '',
        }),
        {}
      )
    ).sort();

  openModal = this.openModal.bind(this);

  // dimensions of country list and window
  itemHeight = getHeightPercent(7);

  listHeight = countries.length * this.itemHeight;

  openModal() {
    this.setState({ modalVisible: true });
  }

  scrollTo(letter) {
    // find position of first country that starts with letter
    const index = this.state.flatListMap
      .map((country) => country.name[0])
      .indexOf(letter);
    if (index === -1) {
      return;
    }
    let position = index * this.itemHeight;

    // do not scroll past the end of the list
    if (position + this.visibleListHeight > this.listHeight) {
      position = this.listHeight - this.visibleListHeight;
    }

    this._flatList.scrollToIndex({ index });
  }

  handleFilterChange = (value) => {
    const filteredCountries = !value
      ? this.state.cca2List
      : this.fuse.search(value);

    this._flatList.scrollToIndex({ index: 0 });

    this.setState({
      filter: value,
      flatListMap: filteredCountries.map((n) => (n.item ? n.item : n)),
    });
  };

  renderLetters(letter, index) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.scrollTo(letter)}
        activeOpacity={0.6}
      >
        <Block flex={false}>
          <Text size={14} allowFontScaling={false}>
            {letter}
          </Text>
        </Block>
      </TouchableOpacity>
    );
  }

  renderCountryDetail(item) {
    const { cca2 } = item;

    const country = countries[item.cca2];
    return (
      <Block
        row
        style={{
          height: 45,
          borderBottomWidth: 0.5,
          borderBottomColor: defaultcolors.gray,
        }}
        middle
      >
        {!this.props.hideCountryFlag && CountryPicker.renderFlag(cca2)}
        <Block style={styles.itemCountryName}>
          <Text small allowFontScaling>
            {this.getCountryName(country)}
          </Text>
          {this.props.showCallingCode && country.callingCode && (
            <Text style={styles.countryCode}>{`+${country.callingCode}`}</Text>
          )}
        </Block>
      </Block>
    );
  }

  renderCountry = ({ item: country, index }) => (
    <TouchableOpacity
      key={country.cca2}
      onPress={() => this.onSelectCountry(country)}
    >
      {this.renderCountryDetail(country)}
    </TouchableOpacity>
  );

  renderFilter = () => {
    const {
      renderFilter,
      autoFocusFilter,
      filterPlaceholder,
      filterPlaceholderTextColor,
    } = this.props;

    const value = this.state.filter;
    const onChange = this.handleFilterChange;
    const { onClose } = this;

    return renderFilter ? (
      renderFilter({ value, onChange, onClose })
    ) : (
      <TextInput
        autoFocus={autoFocusFilter}
        autoCorrect={false}
        placeholder={filterPlaceholder}
        placeholderTextColor={filterPlaceholderTextColor}
        style={[styles.input, !this.props.closeable && styles.inputOnly]}
        onChangeText={onChange}
        value={value}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={this.props.disabled}
          onPress={() => this.setState({ modalVisible: true })}
          activeOpacity={0.7}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Block flex={false} style={{ minWidth: 32 }}>
            {!this.props.showCountryNameWithFlag &&
              CountryPicker.renderFlag(
                this.props.cca2,
                styles.emojiFlag,
                styles.imgStyle
              )}
          </Block>
          <Block flex={false}>{this.props.children}</Block>
        </TouchableOpacity>
        <Modal
          transparent={this.props.transparent}
          animationType={this.props.animationType}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <Block pointerEvents="box-none">
            <StatusBar hasHeight />
            <Block
              row
              middle
              flex={false}
              padding={[0, defaultsizes.padding]}
              style={{
                borderBottomWidth: 0.5,
                borderBottomColor: defaultcolors.gray,
              }}
            >
              <Block>{this.props.filterable && this.renderFilter()}</Block>
              {this.props.closeable && (
                <CloseButton
                  image={this.props.closeButtonImage}
                  styles={[styles.closeButton, styles.closeButtonImage]}
                  onPress={() => this.onClose()}
                />
              )}
            </Block>

            <Block
              row
              margin={[defaultsizes.margin, 0]}
              pointerEvents="box-none"
            >
              <Block
                style={{ marginLeft: defaultsizes.margin }}
                pointerEvents="box-none"
              >
                <FlatList
                  data={this.state.flatListMap}
                  ref={(flatList) => (this._flatList = flatList)}
                  initialNumToRender={30}
                  renderItem={this.renderCountry}
                  keyExtractor={(item, index) => `index-${item.id}-${index}`}
                  getItemLayout={(data, index) => ({
                    length: this.itemHeight,
                    offset: this.itemHeight * index,
                    index,
                  })}
                  keyboardShouldPersistTaps="always"
                />
              </Block>
              <Block flex={false} padding={[0, defaultsizes.padding]}>
                {!this.props.hideAlphabetFilter && (
                  <ScrollView
                    contentContainerStyle={styles.letters}
                    keyboardShouldPersistTaps="always"
                  >
                    {this.state.filter === '' &&
                      this.state.letters.map((letter, index) =>
                        this.renderLetters(letter, index)
                      )}
                  </ScrollView>
                )}
              </Block>
            </Block>
          </Block>
        </Modal>
      </View>
    );
  }
}
