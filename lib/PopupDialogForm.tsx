import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import BlockModal from './modal/BlockModal';

import Block from './Block';
import Text from './Text';
import ThemeContext from './theme/ThemeContext';
import IconButton from './IconButton';

const PopupDialogForm: React.FC<{
  [x: string]: any;
  title?: string;
  header?: any;
  showClose?: boolean;
  children?: any;
  marginTop?: any;
  style?: any;
  titleStyle?: any;
}> = ({
  title = '',
  header,
  showClose = true,
  children,
  marginTop,
  style,
  titleStyle,
  ...props
}) => {
  const { sizes, colors } = React.useContext(ThemeContext);
  const renderTitle = () => {
    if (typeof title === 'string') {
      return <Text h5>{title}</Text>;
    }

    return title;
  };

  const dialogStyle = {
    ...(marginTop && { marginTop: verticalScale(marginTop) }),
    ...style,
  };

  return (
    <BlockModal
      swipeDirection="down"
      bottom
      roundedTop
      fill
      propagateSwipe
      avoidKeyboard
      style={dialogStyle}
      {...props}
    >
      <Block>
        {header}
        {Boolean(title) && (
          <Block
            flex={false}
            padding={sizes.padding}
            row
            middle
            style={titleStyle}
          >
            <Block>{renderTitle()}</Block>
            <Block flex={false}>
              {showClose && (
                <IconButton onPress={props.onClose}>
                  <MaterialIcons
                    name="close"
                    style={{
                      fontSize: 24,
                      marginHorizontal: 7,
                      color: colors.darkGray,
                    }}
                  />
                </IconButton>
              )}
            </Block>
          </Block>
        )}
        <Block>{children}</Block>
      </Block>
    </BlockModal>
  );
};

export default PopupDialogForm;
