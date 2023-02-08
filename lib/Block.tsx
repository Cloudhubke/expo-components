import React from 'react';
import {
  StyleSheet,
  Animated,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  ViewStyle,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { View, Card } from '@expocraft/rnuilib';
import * as Animatable from 'react-native-animatable';
import Ripple from './bread/Components/Ripple';
import ThemeContext from './theme/ThemeContext';
import { isNumber } from 'lodash';

export type Animation =
  | 'bounce'
  | 'flash'
  | 'jello'
  | 'pulse'
  | 'rotate'
  | 'rubberBand'
  | 'shake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInUp'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutUp'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedIn'
  | 'lightSpeedOut'
  | 'slideInDown'
  | 'slideInUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideOutDown'
  | 'slideOutUp'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInUp'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutUp'
  | 'zoomOutLeft'
  | 'zoomOutRight';

// platform
const android = Platform.OS === 'android';

const Block: React.FC<{
  [key: string]: any;
  flex?: boolean;
  row?: boolean;
  wrap?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  margin?: number | number[] | boolean;
  padding?: number | number[] | boolean;
  paddingTop?: number | boolean;
  paddingRight?: number | boolean;
  paddingBottom?: number | boolean;
  paddingLeft?: number | boolean;

  absolute?: boolean;
  card?: boolean;
  shadow?: boolean;
  shadowTop?: boolean;
  elevation?: number;
  color?: any;
  space?: 'between' | 'around' | 'evenly';
  style?: ViewStyle;
  animated?: boolean;
  animatable?: boolean;
  scrollView?: boolean;
  linearGradient?: boolean;
  ripple?: boolean;
  children?: any;
  keyboardAvoiding?: boolean;
  rounded?: boolean;
  animation?: Animation;
}> = (props): any => {
  const { sizes, colors }: any = React.useContext(ThemeContext);

  const {
    flex,
    row,
    wrap,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,

    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,

    absolute,
    card,
    shadow,
    shadowTop,
    elevation,
    color,
    space,
    style,
    animated,
    animatable,
    scrollView,
    linearGradient,
    ripple,
    children,
    keyboardAvoiding,
    rounded,
    ...otherprops
  } = props;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        block: {
          flex: 1,
        },
        row: {
          flexDirection: 'row',
        },
        column: {
          flexDirection: 'column',
        },

        card: {
          borderRadius: sizes.border,
        },

        shadow: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: android ? 10 : 1,
        },
        shadowTop: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: android ? 10 : 1,
        },
        absolute: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
        accent: { backgroundColor: colors.accent },
        primary: { backgroundColor: colors.primary },
        secondary: { backgroundColor: colors.secondary },
        tertiary: { backgroundColor: colors.tertiary },
        black: { backgroundColor: colors.black },
        white: { backgroundColor: colors.white },
        gray: { backgroundColor: colors.gray },
        gray2: { backgroundColor: colors.gray2 },
        gray3: { backgroundColor: colors.gray3 },
        gray4: { backgroundColor: colors.gray4 },
        dark: { backgroundColor: colors.dark },
        mistyWhite: { backgroundColor: colors.mistyWhite },
        milkyWhite: { backgroundColor: colors.milkyWhite },
        error: { backgroundColor: colors.error },
        clear: { backgroundColor: colors.clear },
        facebook: { backgroundColor: colors.facebook },
        transparent: { backgroundColor: colors.transparent },
        silver: { backgroundColor: colors.silver },
        steel: { backgroundColor: colors.steel },
        ricePaper: { backgroundColor: colors.ricePaper },
        frost: { backgroundColor: colors.frost },
        cloud: { backgroundColor: colors.cloud },
        windowTint: { backgroundColor: colors.windowTint },
        panther: { backgroundColor: colors.panther },
        charcoal: { backgroundColor: colors.charcoal },
        coal: { backgroundColor: colors.coal },
        bloodOrange: { backgroundColor: colors.bloodOrange },
        snow: { backgroundColor: colors.snow },
        ember: { backgroundColor: colors.ember },
        fire: { backgroundColor: colors.fire },
        drawer: { backgroundColor: colors.drawer },
        eggplant: { backgroundColor: colors.eggplant },

        twitterColor: { backgroundColor: colors.twitterColor },
        facebookColor: { backgroundColor: colors.twitterColor },
        googleColor: { backgroundColor: colors.twitterColor },
        linkedinColor: { backgroundColor: colors.twitterColor },
        pinterestColor: { backgroundColor: colors.twitterColor },
        youtubeColor: { backgroundColor: colors.twitterColor },
        tumblrColor: { backgroundColor: colors.twitterColor },
        behanceColor: { backgroundColor: colors.twitterColor },
        dribbbleColor: { backgroundColor: colors.twitterColor },
        redditColor: { backgroundColor: colors.twitterColor },
        instagramColor: { backgroundColor: colors.twitterColor },
        success: { backgroundColor: colors.successColors.main },
        info: { backgroundColor: colors.infoColors.main },
        rose: { backgroundColor: colors.rose },
        warning: { backgroundColor: colors.warningColors.main },
        danger: { backgroundColor: colors.dangerColors.main },
      }),
    []
  );

  function handleMargins() {
    const margin = props.margin;
    const style = props.style || {};

    if (marginTop && !margin && !style.marginVertical) {
      style.marginTop = Boolean(marginTop)
        ? sizes.margin
        : isNumber(marginTop)
        ? marginTop
        : 0;
    }

    if (marginBottom && !margin && !style.marginVertical) {
      style.marginBottom = Boolean(marginBottom)
        ? sizes.margin
        : isNumber(marginBottom)
        ? marginBottom
        : 0;
    }

    if (marginRight && !margin && !style.marginHorizontal) {
      style.marginRight = Boolean(marginRight)
        ? sizes.margin
        : isNumber(marginRight)
        ? marginRight
        : 0;
    }

    if (marginLeft && !margin && !style.marginHorizontal) {
      style.marginLeft = Boolean(marginLeft)
        ? sizes.margin
        : isNumber(marginLeft)
        ? marginLeft
        : 0;
    }

    if (typeof margin === 'boolean') {
      return {
        marginTop: sizes.margin,
        marginRight: sizes.margin,
        marginBottom: sizes.margin,
        marginLeft: sizes.margin,
      };
    }
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0] || 0,
            marginRight: margin[0] || 0,
            marginBottom: margin[0] || 0,
            marginLeft: margin[0] || 0,
          };
        case 2:
          return {
            marginTop: margin[0] || 0,
            marginRight: margin[1] || 0,
            marginBottom: margin[0] || 0,
            marginLeft: margin[1] || 0,
          };
        case 3:
          return {
            marginTop: margin[0] || 0,
            marginRight: margin[1] || 0,
            marginBottom: margin[2] || 0,
            marginLeft: margin[1] || 0,
          };
        default:
          return {
            marginTop: margin[0] || 0,
            marginRight: margin[1] || 0,
            marginBottom: margin[2] || 0,
            marginLeft: margin[3] || 0,
          };
      }
    }
  }

  function handlePaddings() {
    const padding = props.padding;
    const style = props.style || {};

    if (paddingTop && !padding && !style.paddingVertical) {
      style.paddingTop = Boolean(paddingTop)
        ? sizes.padding
        : isNumber(paddingTop)
        ? paddingTop
        : 0;
    }

    if (paddingBottom && !padding && !style.paddingVertical) {
      style.paddingBottom = Boolean(paddingBottom)
        ? sizes.padding
        : isNumber(paddingBottom)
        ? paddingBottom
        : 0;
    }

    if (paddingRight && !padding && !style.paddingHorizontal) {
      style.paddingRight = Boolean(paddingRight)
        ? sizes.padding
        : isNumber(paddingRight)
        ? paddingRight
        : 0;
    }

    if (paddingLeft && !padding && !style.paddingHorizontal) {
      style.paddingLeft = Boolean(paddingLeft)
        ? sizes.padding
        : isNumber(paddingLeft)
        ? paddingLeft
        : 0;
    }

    if (typeof padding === 'boolean') {
      return {
        paddingTop: sizes.padding,
        paddingRight: sizes.padding,
        paddingBottom: sizes.padding,
        paddingLeft: sizes.padding,
      };
    }

    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
  }

  const blockStyles = [
    styles.block,
    flex && { flex: 1 },
    flex === false && { flex: 0 }, // reset / disable flex
    row && styles.row,
    wrap && { flexWrap: 'wrap' },
    !row && styles.column,
    center && (row ? { justifyContent: 'center' } : { alignItems: 'center' }),
    middle && (row ? { alignItems: 'center' } : { justifyContent: 'center' }),
    left &&
      (row ? { justifyContent: 'flex-start' } : { alignItems: 'flex-start' }),
    right &&
      (row ? { justifyContent: 'flex-end' } : { alignItems: 'flex-end' }),
    top &&
      (row ? { alignItems: 'flex-start' } : { justifyContent: 'flex-start' }),
    bottom &&
      (row ? { alignItems: 'flex-end' } : { justifyContent: 'flex-end' }),
    { ...handleMargins() },
    { ...handlePaddings() },
    absolute && styles.absolute,
    card && styles.card,
    shadow && styles.shadow,
    shadowTop && styles.shadowTop,
    elevation && { elevation },
    space && { justifyContent: `space-${space}` },
    color && styles[color],
    color && !styles[color] && { backgroundColor: color },
    rounded && { borderRadius: sizes.borderRadius || 5 },
    style, // rewrite predefined styles
  ];

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...otherprops}>
        {children}
      </Animated.View>
    );
  }

  if (ripple) {
    return (
      <Ripple style={blockStyles} {...otherprops} rippleDuration={200}>
        {children}
      </Ripple>
    );
  }

  if (card) {
    return (
      <Card
        elevation={10}
        enableShadow
        style={blockStyles}
        {...otherprops}
        color="cyan"
      >
        {children}
      </Card>
    );
  }

  if (scrollView) {
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={blockStyles}
        {...otherprops}
      >
        {children}
      </ScrollView>
    );
  }

  if (animatable) {
    return (
      <Animatable.View style={blockStyles} {...otherprops}>
        {children}
      </Animatable.View>
    );
  }
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 30 : 0;
  const keyboardAvoidingProps = {
    ...(Platform.OS === 'ios' && { behavior: 'height' }),
  };

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        {...keyboardAvoidingProps}
        // keyboardVerticalOffset={keyboardVerticalOffset}
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <View style={blockStyles} {...otherprops}>
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // if (linearGradient) {
  //   return (
  //     <LinearGradient
  //       behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
  //       style={blockStyles}
  //       {...otherprops}
  //     >
  //       {children}
  //     </LinearGradient>
  //   );
  // }

  return (
    <View style={blockStyles} {...otherprops}>
      {children}
    </View>
  );
};

export default Block;
