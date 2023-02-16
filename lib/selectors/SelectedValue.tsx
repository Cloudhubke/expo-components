import React from 'react';
import Block from '../Block';
import Text from '../Text';
import IconButton from '../IconButton';
import { MaterialIcons } from '@expo/vector-icons';
import ThemeContext from '../theme/ThemeContext';

const SelectedValue = ({
  selectedValue,
  showIcon = true,
  onRemove = () => null,
  textStyle = {},
  iconSize = 20,
  iconStyle = {},
  placeholder = 'Select...',
  onPress = () => null,
}: {
  selectedValue?: any;
  showIcon?: boolean;
  onRemove?: () => void;
  iconSize?: number;
  textStyle?: any;
  iconStyle?: any;
  placeholder?: string;
  onPress?: () => void;
}) => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <Block row middle>
      {Boolean(selectedValue) ? (
        <>
          <Block row middle>
            <Text style={{ flex: 1, color: '#333', ...textStyle }}>
              {`${selectedValue.label}`}
            </Text>
          </Block>

          <Block flex={false}>
            {showIcon && (
              <IconButton size={iconSize} onPress={onRemove}>
                <MaterialIcons
                  name="close"
                  style={{ fontSize: 16, ...iconStyle }}
                />
              </IconButton>
            )}
          </Block>
        </>
      ) : (
        <Text style={{ flex: 1, ...textStyle, color: '#AAA' }}>
          {placeholder}
        </Text>
      )}

      {!selectedValue && showIcon && (
        <Block flex={false}>
          <IconButton size={iconSize} onPress={onPress}>
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

export default SelectedValue;
