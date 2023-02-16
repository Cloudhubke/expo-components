import React from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useDebounce from './useDebounce';
import ThemeContext from './theme/ThemeContext';

const SearchComponent = ({
  placeholder,
  disabled,
  icon: Icon,
  onChange = (value: string) => {},
  inputStyle = {},
  style = {},
  autoFocus = true,
}: {
  placeholder?: string;
  disabled?: boolean;
  icon?: any;
  onChange?: (value: string) => void;
  inputStyle?: any;
  style?: any;
  autoFocus?: boolean;
}) => {
  const { fonts, sizes } = React.useContext(ThemeContext);
  const [text, setText] = React.useState('');

  const debouncedtext = useDebounce(text, 400);

  React.useEffect(() => {
    onChange(debouncedtext);
  }, [debouncedtext]);

  const onSearch = (text) => {
    setText(text);
  };

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: '#CCC',
        borderRadius: sizes.borderRadius || 5,
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
    >
      <TextInput
        onChangeText={onSearch}
        style={{
          flex: 1,
          color: '#333',
          paddingHorizontal: 7,
          height: sizes.inputHeight || 35,
          ...fonts.body,
          ...inputStyle,
        }}
        placeholder={placeholder || 'Search...'}
        underlineColorAndroid="transparent"
        autoFocus={autoFocus}
        disabled={disabled}
      />

      {Icon || (
        <Ionicons name="ios-search" style={{ marginRight: 7, fontSize: 24 }} />
      )}
    </View>
  );
};

export default SearchComponent;
