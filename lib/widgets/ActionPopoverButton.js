import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { verticalScale } from 'react-native-size-matters';
import { StatusBar } from 'react-native';
import BlockModal from '../modal/BlockModal';
import Block from '../Block';
import Text from '../Text';
import ThemeContext from '../theme/ThemeContext';
import IconButton from '../IconButton';

const PopupDialogForm = React.forwardRef(
  (
    {
      title = '',
      header,
      showClose = true,
      scrollView = true,
      children,
      marginTop = StatusBar.currentHeight,
      style,
      titleStyle,
      anchorComponent: AnchorComponent,
      actionsComponent,
      ...props
    },
    ref
  ) => {
    const { sizes, colors } = React.useContext(ThemeContext);

    const [open, setOpen] = React.useState(false);

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

    const Anchor = React.useMemo(
      () => () => {
        if (!AnchorComponent) {
          return null;
        }
        if (typeof AnchorComponent === 'function') {
          return AnchorComponent();
        }

        return React.cloneElement(AnchorComponent, {
          ...AnchorComponent.props,
          onPress: () => {
            setOpen(true);
          },
        });
      },
      [AnchorComponent]
    );

    React.useImperativeHandle(ref, () => ({
      close: () => setOpen(false),
    }));

    return (
      <React.Fragment>
        <Anchor />
        <BlockModal
          swipeDirection={null}
          bottom
          roundedTop
          fill
          propagateSwipe
          avoidKeyboard
          style={dialogStyle}
          isVisible={open}
          onClose={() => setOpen(false)}
          {...props}
        >
          <Block top>
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
                    <IconButton onPress={() => setOpen(false)}>
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
            <Block scrollView={scrollView}>{children}</Block>
          </Block>
        </BlockModal>
      </React.Fragment>
    );
  }
);

export default PopupDialogForm;
