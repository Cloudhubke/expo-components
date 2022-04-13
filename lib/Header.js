import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import ThemeContext from './theme/ThemeContext';
import Block from './Block';
import StatusBar from './StatusBar';

const Header = ({
  onBack = () => null,
  onClose = () => null,
  leftComponent,
  middleComponent,
  rightComponent: RightComponent,
  titlecenter,
  color,
  style,
  children,
  height,
  shadow,
  hasHeight,
  dark,
  light,
  borderBottom,
  hasStatusBar = true,
  ...props
}) => {
  const { colors, sizes } = React.useContext(ThemeContext);
  const goBack = () => {
    onBack();
    onClose();
  };

  const renderLeft = () => (
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

  const renderMiddle = () => (
    <Block
      style={{ paddingHorizontal: sizes.base, position: 'relative' }}
      center={Boolean(titlecenter)}
      middle
    >
      {typeof middleComponent === 'function' ? middleComponent() : children}
    </Block>
  );

  const renderRight = () => (
    <Block flex={false} style={{ paddingLeft: sizes.base }} middle>
      {typeof RightComponent === 'function' ? RightComponent() : RightComponent}
    </Block>
  );

  const headerStyles = [
    height && {
      minHeight: height,
      paddingTop: verticalScale(5),
      paddingBottom: verticalScale(5),
    },

    borderBottom && {
      borderBottomColor: colors.gray2,
      borderBottomWidth: 0.5,
    },
    Array.isArray(style) ? [...style] : style,
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor: color,
      }}
    >
      {hasStatusBar && (
        <StatusBar
          light={light}
          dark={dark}
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
        {...props}
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

export default Header;
