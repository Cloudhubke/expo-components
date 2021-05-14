import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemeContext from 'expo-components/lib/theme/ThemeContext';
import defaultsizes from './theme/Sizes';
import Block from './Block';
import StatusBar from './StatusBar';

const Header = ({
  onBack,
  onClose,
  leftComponent,
  middleComponent,
  rightComponent,
  titlecenter,
  ...props
}) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const goBack = () => {
    onBack();
    onClose();
  };

  function renderLeft() {
    return (
      <Block flex={false} style={{ paddingRight: sizes.base }} middle>
        {typeof leftComponent === 'function'
          ? leftComponent()
          : leftComponent || (
              <TouchableOpacity onPress={goBack}>
                <Ionicons name="md-arrow-back" size={32} color="black" />
              </TouchableOpacity>
            )}
      </Block>
    );
  }

  function renderMiddle() {
    return (
      <Block
        style={{ paddingHorizontal: sizes.base, position: 'relative' }}
        center={Boolean(titlecenter)}
        middle
      >
        {typeof middleComponent === 'function' ? middleComponent() : children}
      </Block>
    );
  }

  function renderRight() {
    return (
      <Block flex={false} style={{ paddingLeft: sizes.base }} middle>
        {typeof rightComponent === 'function'
          ? rightComponent()
          : rightComponent}
      </Block>
    );
  }

  const {
    color,
    style,
    children,
    height,
    shadow,
    hasHeight,
    dark,
    light,
    borderBottom,
    hasStatusBar,
    ...otherprops
  } = props;

  const headerStyles = [
    height && { height },
    borderBottom && {
      borderBottomColor: colors.gray2,
      borderBottomWidth: 0.5,
    },
    Array.isArray(style) ? [...style] : style,
  ];

  return (
    <SafeAreaView>
      {hasStatusBar && (
        <StatusBar
          dark={dark}
          light={light}
          hasHeight={hasHeight}
          color={color}
        />
      )}
      <Block
        row
        middle
        flex={false}
        style={headerStyles}
        padding={[0, sizes.padding]}
        {...otherprops}
      >
        <Block row flex={false}>
          {renderLeft()}
          {renderMiddle()}
          {renderRight()}
        </Block>
      </Block>
    </SafeAreaView>
  );
};

Header.defaultProps = {
  style: {},
  barStyle: 'light-content',
  leftComponent: null,
  middleComponent: null,
  rightComponent: null,
  titlecenter: false,
  height: defaultsizes.navBarHeight,
  onBack: () => {},
  onClose: () => {},
  hasHeight: false,
  dark: true,
  hasStatusBar: false,
};
export default Header;
