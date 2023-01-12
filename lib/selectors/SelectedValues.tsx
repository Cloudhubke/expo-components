import React from 'react';
import Block from '../Block';
import Text from '../Text';
import IconButton from '../IconButton';
import { MaterialIcons } from '@expo/vector-icons';
import ThemeContext from '../theme/ThemeContext';
import { Chip, Colors } from 'react-native-ui-lib';

const SelectedValues = ({
  selectedValue,
  showIcon = true,
  onRemove = () => null,
  textStyle = {},
  iconSize = 20,
  iconStyle = {},
  placeholder = 'Select...',
}: {
  selectedValue?: any;
  showIcon?: boolean;
  onRemove?: (val: any) => void;
  iconSize?: number;
  textStyle?: any;
  iconStyle?: any;
  placeholder?: string;
}) => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <Block row middle>
      {selectedValue && selectedValue.length === 0 && (
        <Text style={{ flex: 1, ...textStyle, color: '#AAA' }}>
          {placeholder}
        </Text>
      )}
      {(selectedValue || []).map((item, index) => (
        <Chip
          key={item.value}
          label={item.label}
          iconProps={{ tintColor: Colors.$iconDefault }}
          onDismiss={() => onRemove(item)}
          dismissIconStyle={{ width: 10, height: 10 }}
          containerStyle={{ margin: 1 }}
        />
      ))}
      {selectedValue && selectedValue.length === 0 && showIcon && (
        <Block flex={false}>
          <IconButton size={iconSize}>
            <MaterialIcons
              name="arrow-drop-down"
              color={colors.darkGray}
              style={{ fontSize: 16, ...iconStyle }}
            />
          </IconButton>
        </Block>
      )}
    </Block>
  );
};

export default SelectedValues;
