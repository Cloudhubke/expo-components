import React, { CSSProperties } from 'react';
import { StyleSheetProperties, ViewStyle } from 'react-native';
import RNModal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { verticalScale, scale } from 'react-native-size-matters';
import SafeAreaView from '../SafeAreaView';
import ThemeContext from '../theme/ThemeContext';
import Block from '../Block';
import Text from '../Text';
import defaultcolors from '../theme/Colors';

const BlockModal = ({
  children,
  margin = 0,

  top,
  bottom,
  middle,
  roundedTop,
  roundedBottom,
  fill,
  style,
  isVisible,
  minHeight,
  containerStyle,
  color = defaultcolors.milkyWhite,
  onClose = () => {},
  showHandle = false,
  avoidKeyboard = true,
  center = false,
  SafeAreaViewProps = {},
  ...props
}: {
  children: any;
  margin?: number;
  color?: string;
  top?: boolean;
  bottom?: boolean;
  middle?: boolean;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  fill?: boolean;
  showHandle?: boolean;
  onClose?: () => void;
  style?: ViewStyle;
  isVisible?: boolean;
  minHeight?: number;
  avoidKeyboard?: boolean;
  containerStyle?: ViewStyle;
  SafeAreaViewProps?: any;
  center?: boolean;
}) => {
  const { colors } = React.useContext(ThemeContext);
  const [visible, setVisible] = React.useState(isVisible);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const modalstyles: ViewStyle = {
    margin: margin || 0,
    ...(bottom && top && { justifyContent: 'flex-end' }),
    ...(top && { justifyContent: 'flex-start' }),
    ...(middle && { justifyContent: 'center' }),
    ...style,
  };

  const blockstyles: ViewStyle = {
    ...(!fill &&
      !center && {
        position: 'absolute',
        right: 0,
        left: 0,
      }),
    ...(bottom && { bottom: verticalScale(-25) }),
    ...(top && { top: 0 }),
    ...(roundedTop && {
      borderTopLeftRadius: verticalScale(10),
      borderTopRightRadius: verticalScale(10),
    }),
    ...(roundedBottom && {
      borderBottomLeftRadius: verticalScale(10),
      borderBottomRightRadius: verticalScale(10),
    }),
    ...(minHeight && { minHeight: verticalScale(minHeight) }),
    overflow: 'hidden',
    ...containerStyle,
  };

  const onCloseModal = () => {
    // setVisible(false);
    onClose();
  };

  return (
    <RNModal
      isVisible={visible}
      style={modalstyles}
      animationIn={top ? 'slideInDown' : 'slideInUp'}
      animationOut={top ? 'slideOutUp' : 'slideOutDown'}
      swipeDirection={top ? 'up' : 'down'} // 'none'
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      onSwipeComplete={onCloseModal}
      onModalHide={onCloseModal}
      onModalShow={() => setModalVisible(true)}
      {...props}
    >
      <SafeAreaView top {...SafeAreaViewProps}>
        <Block middle center>
          <Block flex={!center} shadow style={blockstyles} color={color}>
            {!top && showHandle && (
              <Block flex={false} center>
                <MaterialIcons
                  name="drag-handle"
                  style={{ fontSize: scale(32), color: colors.darkGray }}
                />
              </Block>
            )}
            {modalVisible && <>{children}</>}

            {bottom && (
              <Block flex={false} style={{ height: verticalScale(40) }} />
            )}

            {top && showHandle && (
              <Block flex={false} center color={color}>
                <MaterialIcons
                  name="drag-handle"
                  style={{ fontSize: scale(32), color: colors.darkGray }}
                />
              </Block>
            )}
          </Block>
        </Block>
      </SafeAreaView>
    </RNModal>
  );
};
export default BlockModal;
