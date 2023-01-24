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
    const { marginTop, marginBottom, marginRight, marginLeft } = props;

    const margin = props.margin;
    const style = props.style || {};

    if (!margin && !style.marginVertical && !style.marginHorizontal) {
      const marginStyle = {
        marginTop: isNumber(marginTop)
          ? marginTop
          : Boolean(marginTop)
          ? sizes.margin
          : 0,
        marginRight: isNumber(marginRight)
          ? marginRight
          : Boolean(marginRight)
          ? sizes.margin
          : 0,
        marginBottom: isNumber(marginBottom)
          ? marginBottom
          : Boolean(marginBottom)
          ? sizes.margin
          : 0,
        marginLeft: isNumber(marginLeft)
          ? marginLeft
          : Boolean(marginLeft)
          ? sizes.margin
          : 0,
      };
      return marginStyle;
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
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
  }

  function handlePaddings() {
    const { paddingTop, paddingBottom, paddingRight, paddingLeft } = props;

    const padding = props.padding;
    const style = props.style || {};

    if (!padding && !style.paddingVertical && !style.paddingHorizontal) {
      const paddingStyle = {
        paddingTop: isNumber(paddingTop)
          ? paddingTop
          : Boolean(paddingTop)
          ? sizes.padding
          : 0,
        paddingRight: isNumber(paddingRight)
          ? paddingRight
          : Boolean(paddingRight)
          ? sizes.padding
          : 0,
        paddingBottom: isNumber(paddingBottom)
          ? paddingBottom
          : Boolean(paddingBottom)
          ? sizes.padding
          : 0,
        paddingLeft: isNumber(paddingLeft)
          ? paddingLeft
          : Boolean(paddingLeft)
          ? sizes.padding
          : 0,
      };
      return paddingStyle;
    }

    const paddingStyle = {
      paddingTop: Boolean(paddingTop)
        ? isNumber(paddingTop)
          ? paddingTop
          : sizes.padding
        : 0,
      paddingBottom: Boolean(paddingBottom)
        ? isNumber(paddingBottom)
          ? paddingBottom
          : sizes.padding
        : 0,
      paddingRight: Boolean(paddingRight)
        ? isNumber(paddingRight)
          ? paddingRight
          : sizes.padding
        : 0,
      paddingLeft: Boolean(paddingLeft)
        ? isNumber(paddingLeft)
          ? paddingLeft
          : sizes.padding
        : 0,
    };

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

    return paddingStyle;
  }

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

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={blockStyles}
        {...otherprops}
      >
        {children}
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
